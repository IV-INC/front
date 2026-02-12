import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// navigator.locks 대신 사용할 in-memory mutex
// 동시 토큰 갱신 race condition 방지
let lockPromise: Promise<void> = Promise.resolve();

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    lock: async <R,>(_name: string, acquireTimeout: number, fn: () => Promise<R>): Promise<R> => {
      let release: () => void;
      const prev = lockPromise;
      lockPromise = new Promise<void>((r) => { release = r; });

      // 이전 lock 대기 (acquireTimeout 또는 5초 중 큰 값)
      const timeout = Math.max(acquireTimeout || 5000, 5000);
      await Promise.race([
        prev,
        new Promise<void>((r) => setTimeout(r, timeout)),
      ]);

      try {
        return await fn();
      } finally {
        release!();
      }
    },
  },
});
