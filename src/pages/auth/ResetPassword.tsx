import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, Check, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function PasswordRequirements({ password }: { password: string }) {
  const rules = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { label: 'One special character (!@#$...)', met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
  ];

  if (!password) return null;

  return (
    <ul className="space-y-1 mt-1">
      {rules.map((rule) => (
        <li key={rule.label} className={`flex items-center gap-1.5 text-xs ${rule.met ? 'text-green-400' : 'text-red-400'}`}>
          {rule.met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          {rule.label}
        </li>
      ))}
    </ul>
  );
}

export function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    let resolved = false;

    // Listen for PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (resolved) return;
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        resolved = true;
        setSessionReady(true);
      }
    });

    // Also check if already in a session
    supabase.auth.getSession().then(({ data }) => {
      if (resolved) return;
      if (data.session) {
        resolved = true;
        setSessionReady(true);
      }
    });

    // Timeout: if no session after 5s, the link is expired/invalid
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        setExpired(true);
      }
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (!hasMinLength || !hasUppercase || !hasSpecial) {
      setError('Password does not meet all requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      // Refresh session to prevent SDK auth lock
      await supabase.auth.getSession();

      const result = await Promise.race([
        supabase.auth.updateUser({ password }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out. Please try again.')), 15000)
        ),
      ]);

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  const inputClass = 'w-full h-12 px-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent';

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 mb-6 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Log In
        </Link>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg">
          <div className="px-6 pt-8 pb-4 text-center space-y-4">
            <div className="mx-auto">
              <img src="/logo-dark.jpg" alt="IV Logo" className="w-[60px] h-[60px] mx-auto rounded-lg" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-semibold text-white">
                {success ? 'Password Updated' : expired ? 'Link Expired' : 'Set New Password'}
              </h1>
              <p className="text-sm text-neutral-400">
                {success
                  ? 'Redirecting to login...'
                  : expired
                    ? 'This reset link has expired or is invalid'
                    : 'Enter your new password below'}
              </p>
            </div>
          </div>

          <div className="px-6 pb-8 space-y-6">
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {success ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-sm text-neutral-400">
                  Your password has been successfully updated.
                </p>
              </div>
            ) : expired ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                </div>
                <p className="text-sm text-neutral-400">
                  Please request a new password reset link.
                </p>
                <Link
                  to="/forgot-password"
                  className="block w-full h-12 inline-flex items-center justify-center font-medium rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors"
                >
                  Request New Link
                </Link>
              </div>
            ) : !sessionReady ? (
              <div className="text-center space-y-4">
                <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full mx-auto" />
                <p className="text-sm text-neutral-400">Verifying reset link...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-300">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={inputClass}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <PasswordRequirements password={password} />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-300">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={inputClass}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 inline-flex items-center justify-center font-medium rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
