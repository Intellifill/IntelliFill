import { useState, type FormEvent } from 'react';
import { Mail, Lock, ArrowRight, Loader2, Info } from 'lucide-react';

interface LoginViewProps {
  onLogin: (email: string, password: string) => Promise<string | null>;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const errorMsg = await onLogin(email.trim(), password);
      if (errorMsg) {
        setError(errorMsg);
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-6">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-1 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Sign in to access your IntelliFill vault
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail size={16} strokeWidth={2} />
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-2">
            <label
              htmlFor="password"
              className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock size={16} strokeWidth={2} />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 bg-rose-50 border border-rose-100/50 rounded-xl text-[13px] text-rose-600 font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <Info size={16} className="shrink-0 text-rose-500" strokeWidth={2.5} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative flex items-center justify-center gap-2 w-full py-3.5 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] overflow-hidden"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Vault</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-auto pt-6">
          <div className="flex gap-3 p-4 bg-indigo-50/50 border border-indigo-100/50 rounded-2xl text-[13px] text-indigo-900/70">
            <Info size={18} className="shrink-0 text-indigo-500" />
            <p className="leading-snug">
              Don't have an account? Visit the{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:underline">
                IntelliFill Web App
              </a>{' '}
              to sign up and configure your profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
