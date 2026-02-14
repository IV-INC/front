import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/** Fetch wrapper with AbortController timeout to prevent hanging requests */
const fetchWithTimeout: typeof fetch = (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : (input as Request).url;
  const isAuth = url.includes('/auth/v1/');
  const timeoutMs = isAuth ? 8_000 : 20_000;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Respect any existing signal from the caller
  const existingSignal = init?.signal;
  if (existingSignal?.aborted) {
    clearTimeout(timer);
    return Promise.reject(existingSignal.reason ?? new DOMException('Aborted', 'AbortError'));
  }

  const onExternalAbort = () => controller.abort();
  existingSignal?.addEventListener('abort', onExternalAbort, { once: true });

  return fetch(input, { ...init, signal: controller.signal }).finally(() => {
    clearTimeout(timer);
    existingSignal?.removeEventListener('abort', onExternalAbort);
  });
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    lock: async <R,>(_name: string, _acquireTimeout: number, fn: () => Promise<R>): Promise<R> => fn(),
  },
  global: {
    fetch: fetchWithTimeout,
  },
});
