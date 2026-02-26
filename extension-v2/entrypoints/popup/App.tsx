import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import type { User, UserProfile } from '../../shared/types/api';
import type {
  AuthCheckResult,
  LoginResult,
  ProfileResult,
  UserResult,
} from '../../shared/types/messages';
import LoginView from './components/LoginView';
import MainView from './components/MainView';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = (await browser.runtime.sendMessage({
        action: 'isAuthenticated',
      })) as AuthCheckResult;

      if (response.authenticated) {
        await loadUserData();
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }

  async function loadUserData() {
    const [userResponse, profileResponse] = await Promise.all([
      browser.runtime.sendMessage({ action: 'getCurrentUser' }) as Promise<UserResult>,
      browser.runtime.sendMessage({ action: 'getProfile' }) as Promise<ProfileResult>,
    ]);

    if (userResponse.success && userResponse.user) {
      setUser(userResponse.user);
    }
    if (profileResponse.success && profileResponse.profile) {
      setProfile(profileResponse.profile);
    }

    const settings = await browser.storage.local.get(['settings']);
    const parsed = settings.settings as { enabled?: boolean } | undefined;
    setEnabled(parsed?.enabled !== false);
  }

  async function handleLogin(email: string, password: string): Promise<string | null> {
    const response = (await browser.runtime.sendMessage({
      action: 'login',
      email,
      password,
    })) as LoginResult;

    if (response.success) {
      await loadUserData();
      setIsAuthenticated(true);
      return null;
    }
    return response.error;
  }

  async function handleLogout() {
    await browser.runtime.sendMessage({ action: 'logout' });
    setIsAuthenticated(false);
    setUser(null);
    setProfile(null);
  }

  async function handleRefreshProfile() {
    const response = (await browser.runtime.sendMessage({
      action: 'getProfile',
      forceRefresh: true,
    })) as ProfileResult;

    if (response.success && response.profile) {
      setProfile(response.profile);
    }
  }

  async function handleToggle(newEnabled: boolean) {
    setEnabled(newEnabled);
    const current = await browser.storage.local.get(['settings']);
    const currentSettings = (current.settings as Record<string, unknown>) || {};
    await browser.storage.local.set({
      settings: { ...currentSettings, enabled: newEnabled },
    });
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] bg-[#FAFAFA]">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
          <Loader2
            size={32}
            strokeWidth={2.5}
            className="animate-spin text-indigo-500 relative z-10"
          />
        </div>
        <p className="mt-4 text-sm font-medium text-gray-400">Loading vault...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] text-gray-900 h-[500px] flex flex-col overflow-hidden">
      {/* Sleek Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100/80 px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 2L7 8H3L8 12L6 18L12 14L18 18L16 12L21 8H17L15 2H9Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="text-[15px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600">
            IntelliFill
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <div
            className={`w-1.5 h-1.5 rounded-full ${isAuthenticated && enabled ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : isAuthenticated && !enabled ? 'bg-amber-400' : 'bg-gray-300'}`}
          />
          <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-400">
            {isAuthenticated ? (enabled ? 'Live' : 'Paused') : 'Locked'}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {isAuthenticated ? (
          <MainView
            user={user}
            profile={profile}
            enabled={enabled}
            onLogout={handleLogout}
            onRefresh={handleRefreshProfile}
            onToggle={handleToggle}
          />
        ) : (
          <LoginView onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}
