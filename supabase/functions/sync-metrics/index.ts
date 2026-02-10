import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SyncRequest {
  companyId?: string;   // optional: skip DB save when absent (preview mode)
  userId?: string;      // fallback: used to look up company when auth token is stale
  provider: 'stripe' | 'ga4';
  code: string;
  redirectUri: string;
  ga4PropertyId?: string; // optional: skip Admin API discovery if provided
}

interface MetricRow {
  company_id: string;
  month: string;
  revenue: number | null;
  mau: number | null;
  retention: number | null;
  sessions: number | null;
  conversions: number | null;
  source: 'stripe' | 'ga4';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Soft auth: try to verify, but proceed even if token is stale (OAuth redirect scenario)
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    if (authHeader) {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser(
          authHeader.replace('Bearer ', '')
        );
        if (!authError && user) {
          userId = user.id;
        } else {
          console.warn('Auth token invalid (may be stale after OAuth redirect):', authError?.message);
        }
      } catch (e) {
        console.warn('Auth verification failed:', e);
      }
    }

    const body: SyncRequest = await req.json();
    let { companyId } = body;
    const { userId: bodyUserId, provider, code, redirectUri, ga4PropertyId: bodyGa4PropertyId } = body;

    // Use auth-verified userId if available, otherwise fall back to body userId
    if (!userId && bodyUserId) {
      userId = bodyUserId;
      console.log('Using userId from request body (auth token was stale)');
    }

    if (!provider || !code || !redirectUri) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // If no companyId but we have userId, look up the company
    if (!companyId && userId) {
      const { data: companyRows } = await supabase
        .from('companies')
        .select('id')
        .eq('user_id', userId)
        .limit(1);
      if (companyRows?.[0]?.id) {
        companyId = companyRows[0].id;
        console.log('Resolved companyId from userId:', companyId);
      }
    }

    // If companyId provided, verify ownership only when we have a valid userId
    if (companyId && userId) {
      const { data: company } = await supabase
        .from('companies')
        .select('id, user_id')
        .eq('id', companyId)
        .eq('user_id', userId)
        .single();

      if (!company) {
        return new Response(JSON.stringify({ success: false, error: 'Company not found or not owned by user' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else if (companyId && !userId) {
      // No valid auth but companyId given — verify company exists at minimum
      const { data: company } = await supabase
        .from('companies')
        .select('id')
        .eq('id', companyId)
        .single();

      if (!company) {
        return new Response(JSON.stringify({ success: false, error: 'Company not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Resolve GA4 property ID: body param > company record > auto-discover
    let ga4PropertyId = bodyGa4PropertyId || null;
    if (!ga4PropertyId && companyId && provider === 'ga4') {
      const { data: companyRow } = await supabase
        .from('companies')
        .select('ga4_property_id')
        .eq('id', companyId)
        .single();
      if (companyRow?.ga4_property_id) {
        ga4PropertyId = companyRow.ga4_property_id;
        console.log('Using ga4_property_id from company record:', ga4PropertyId);
      }
    }

    // Fetch metrics from external API
    const placeholder = companyId || 'preview';
    let metrics: MetricRow[] = [];

    let discoveredPropertyId: string | null = null;

    if (provider === 'stripe') {
      metrics = await syncStripeMetrics(placeholder, code, redirectUri);
    } else if (provider === 'ga4') {
      const result = await syncGA4Metrics(placeholder, code, redirectUri, ga4PropertyId);
      metrics = result.metrics;
      discoveredPropertyId = result.propertyId;
    }

    // Only save to DB if companyId is provided
    if (companyId && metrics.length > 0) {
      // Fix company_id in metrics
      const dbMetrics = metrics.map((m) => ({ ...m, company_id: companyId }));

      for (const metric of dbMetrics) {
        const { error: upsertError } = await supabase
          .from('company_metrics')
          .upsert(metric, { onConflict: 'company_id,month,source' });
        if (upsertError) {
          console.error('Metric upsert error:', upsertError);
        }
      }

      // Update company connection status + save discovered property ID
      const connectionField = provider === 'stripe' ? 'stripe_connected' : 'ga4_connected';
      const updatePayload: Record<string, unknown> = {
        [connectionField]: true,
        last_data_update: new Date().toISOString(),
      };
      if (discoveredPropertyId) {
        updatePayload.ga4_property_id = discoveredPropertyId;
      }
      await supabase
        .from('companies')
        .update(updatePayload)
        .eq('id', companyId);
    }

    return new Response(
      JSON.stringify({ success: true, metrics }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('sync-metrics error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err instanceof Error ? err.message : 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// --- Stripe: code → token → balance transactions → monthly revenue ---
async function syncStripeMetrics(
  companyId: string,
  code: string,
  _redirectUri: string
): Promise<MetricRow[]> {
  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
  if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY not configured');

  const tokenRes = await fetch('https://connect.stripe.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_secret: stripeSecretKey,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || tokenData.error) {
    throw new Error(tokenData.error_description || tokenData.error || 'Stripe token exchange failed');
  }

  const accessToken = tokenData.access_token;

  // 전체 기간 데이터: 페이지네이션으로 모든 charge 트랜잭션 수집
  let allTransactions: Array<{ created: number; amount: number }> = [];
  let hasMore = true;
  let startingAfter: string | null = null;

  while (hasMore) {
    const params = new URLSearchParams({ limit: '100', type: 'charge' });
    if (startingAfter) params.set('starting_after', startingAfter);

    const txRes = await fetch(
      `https://api.stripe.com/v1/balance_transactions?${params.toString()}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const txData = await txRes.json();
    if (!txRes.ok) throw new Error('Failed to fetch Stripe transactions');

    const batch = txData.data || [];
    allTransactions = allTransactions.concat(batch);
    hasMore = txData.has_more && batch.length > 0;
    if (batch.length > 0) startingAfter = batch[batch.length - 1].id;
  }

  const monthlyRevenue: Record<string, number> = {};
  for (const tx of allTransactions) {
    const date = new Date(tx.created * 1000);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (tx.amount / 100);
  }

  return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    company_id: companyId,
    month,
    revenue,
    mau: null,
    retention: null,
    sessions: null,
    conversions: null,
    source: 'stripe' as const,
  }));
}

// --- GA4: code → token → Analytics Data API → monthly MAU ---
async function syncGA4Metrics(
  companyId: string,
  code: string,
  redirectUri: string,
  knownPropertyId: string | null = null
): Promise<{ metrics: MetricRow[]; propertyId: string }> {
  const googleClientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
  const googleClientId = Deno.env.get('GOOGLE_CLIENT_ID');
  if (!googleClientSecret || !googleClientId) {
    throw new Error('GOOGLE_CLIENT_SECRET or GOOGLE_CLIENT_ID not configured');
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || tokenData.error) {
    throw new Error(tokenData.error_description || tokenData.error || 'Google token exchange failed');
  }

  const accessToken = tokenData.access_token;

  // Use known property ID if provided, otherwise try Admin API discovery
  let propertyId: string | null = knownPropertyId || null;

  if (propertyId) {
    // Strip "properties/" prefix if present
    propertyId = propertyId.replace('properties/', '');
    console.log('Using provided GA4 property ID:', propertyId);
  } else {
    // Try Analytics Admin API discovery
    const apiErrors: string[] = [];

    const accountsRes = await fetch(
      'https://analyticsadmin.googleapis.com/v1beta/accountSummaries',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (accountsRes.ok) {
      const accountsData = await accountsRes.json();
      console.log('GA4 accountSummaries response:', JSON.stringify(accountsData).slice(0, 500));
      const firstProperty = accountsData.accountSummaries?.[0]?.propertySummaries?.[0];
      if (firstProperty) {
        propertyId = firstProperty.property.replace('properties/', '');
        console.log('Found GA4 property via Admin API:', propertyId);
      } else {
        apiErrors.push(`Admin API returned no properties (accounts: ${accountsData.accountSummaries?.length || 0})`);
      }
    } else {
      const errBody = await accountsRes.text();
      apiErrors.push(`Admin API ${accountsRes.status}: ${errBody.slice(0, 300)}`);
      console.warn('GA4 Admin API failed:', accountsRes.status, errBody);
    }

    // If Admin API failed or returned no properties, try listing accessible properties
    if (!propertyId) {
      const propsRes = await fetch(
        'https://analyticsadmin.googleapis.com/v1beta/properties?filter=parent:accounts/-',
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (propsRes.ok) {
        const propsData = await propsRes.json();
        console.log('GA4 properties list response:', JSON.stringify(propsData).slice(0, 500));
        const firstProp = propsData.properties?.[0];
        if (firstProp) {
          propertyId = firstProp.name.replace('properties/', '');
          console.log('Found GA4 property via properties list:', propertyId);
        } else {
          apiErrors.push('Properties list returned empty');
        }
      } else {
        const errBody = await propsRes.text();
        apiErrors.push(`Properties list ${propsRes.status}: ${errBody.slice(0, 300)}`);
        console.warn('GA4 properties list failed:', propsRes.status, errBody);
      }
    }

    if (!propertyId) {
      throw new Error(
        `No GA4 property found. Please enter your GA4 Property ID manually in Company Edit page. ` +
        `You can find it in Google Analytics → Admin → Property Settings. Details: ${apiErrors.join(' | ')}`
      );
    }
  }

  // 전체 기간 데이터: 2015-01-01부터 현재까지
  const reportRes = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [{
          startDate: '2015-01-01',
          endDate: 'today',
        }],
        dimensions: [{ name: 'yearMonth' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'conversions' },
        ],
      }),
    }
  );

  const reportData = await reportRes.json();
  if (!reportRes.ok) {
    console.error('GA4 report error:', JSON.stringify(reportData));
    const errMsg = reportData.error?.message || `HTTP ${reportRes.status}`;
    if (reportRes.status === 403 && errMsg.includes('not been used in project')) {
      throw new Error(`Google Analytics Data API is not enabled. Enable it at: https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview`);
    }
    throw new Error(`GA4 report failed (property ${propertyId}): ${errMsg}`);
  }

  const metrics: MetricRow[] = [];
  for (const row of reportData.rows || []) {
    const yearMonth = row.dimensionValues?.[0]?.value;
    if (!yearMonth) continue;
    const month = `${yearMonth.slice(0, 4)}-${yearMonth.slice(4, 6)}`;
    const mau = parseInt(row.metricValues?.[0]?.value || '0', 10);
    const sessions = parseInt(row.metricValues?.[1]?.value || '0', 10);
    const conversions = parseInt(row.metricValues?.[2]?.value || '0', 10);

    metrics.push({
      company_id: companyId,
      month,
      revenue: null,
      mau,
      retention: null,
      sessions,
      conversions,
      source: 'ga4' as const,
    });
  }

  return { metrics, propertyId };
}
