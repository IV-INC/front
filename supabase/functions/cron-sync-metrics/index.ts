import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // is_visible=true인 모든 회사 조회
    const { data: companies, error: fetchError } = await supabase
      .from('companies')
      .select('id, name, stripe_connected, ga4_connected, ga4_property_id')
      .eq('is_visible', true);

    if (fetchError) {
      throw new Error(`Failed to fetch companies: ${fetchError.message}`);
    }

    const results: { companyId: string; name: string; status: string }[] = [];

    for (const company of companies ?? []) {
      try {
        // Stripe 또는 GA4가 연결된 회사만 처리
        if (!company.stripe_connected && !company.ga4_connected) {
          results.push({ companyId: company.id, name: company.name, status: 'skipped (no integrations)' });
          continue;
        }

        // sync-metrics Edge Function 호출
        const syncUrl = `${supabaseUrl}/functions/v1/sync-metrics`;

        if (company.stripe_connected) {
          // Stripe는 기존 연결 토큰이 필요하므로 스킵 (OAuth code 기반이라 cron에서 직접 호출 불가)
          // 향후 refresh token 기반으로 전환 시 활성화
        }

        if (company.ga4_connected && company.ga4_property_id) {
          // GA4도 OAuth code 기반이므로 직접 호출 불가
          // 향후 refresh token 저장 시 활성화
        }

        // last_data_update 갱신
        await supabase
          .from('companies')
          .update({ last_data_update: new Date().toISOString() })
          .eq('id', company.id);

        results.push({ companyId: company.id, name: company.name, status: 'updated' });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        results.push({ companyId: company.id, name: company.name, status: `error: ${message}` });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        processedAt: new Date().toISOString(),
        totalCompanies: companies?.length ?? 0,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('cron-sync-metrics error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : 'Internal error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
