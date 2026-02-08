-- Add unique constraint for upsert support on company_metrics
ALTER TABLE public.company_metrics
  ADD CONSTRAINT company_metrics_company_month_source_unique
  UNIQUE (company_id, month, source);
