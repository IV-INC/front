-- company_metrics: sessions, conversions 컬럼 추가
ALTER TABLE company_metrics ADD COLUMN IF NOT EXISTS sessions integer;
ALTER TABLE company_metrics ADD COLUMN IF NOT EXISTS conversions integer;

-- companies: pinned_until, is_blocked 컬럼 추가
ALTER TABLE companies ADD COLUMN IF NOT EXISTS pinned_until timestamptz;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS is_blocked boolean DEFAULT false;

-- pg_cron: 10일마다 메트릭 자동 동기화 (새벽 3시)
SELECT cron.schedule(
  'sync-metrics-every-10-days',
  '0 3 */10 * *',
  $$SELECT net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/cron-sync-metrics',
    headers := jsonb_build_object('Authorization', 'Bearer ' || current_setting('app.settings.service_key'))
  )$$
);
