import { useState } from 'react';
import {
  Power,
  UserCircle,
  Files,
  Database,
  Keyboard,
  RefreshCw,
  KeyRound,
  LogOut,
} from 'lucide-react';
import type { User, UserProfile } from '../../../shared/types/api';

interface MainViewProps {
  user: User | null;
  profile: UserProfile | null;
  enabled: boolean;
  onLogout: () => void;
  onRefresh: () => Promise<void>;
  onToggle: (enabled: boolean) => void;
}

export default function MainView({
  user,
  profile,
  enabled,
  onLogout,
  onRefresh,
  onToggle,
}: MainViewProps) {
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setTimeout(() => setRefreshing(false), 500);
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      {/* Profile Header Card */}
      <div className="bg-white m-3 rounded-2xl shadow-sm border border-gray-100 p-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-indigo-500/10 blur-xl"></div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 shrink-0">
            <UserCircle size={20} strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-gray-900 truncate tracking-tight">
              {[user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
                user?.email ||
                'Loading...'}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${enabled ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`}
              />
              <p className="text-xs text-gray-500 truncate font-medium">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            title="Sync Profile"
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 ease-out active:scale-95"
          >
            <RefreshCw size={18} className={refreshing ? 'animate-spin text-indigo-500' : ''} />
          </button>
        </div>
      </div>

      <div className="px-3 flex flex-col gap-2.5">
        {/* Master Toggle */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-colors">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-1.5 rounded-xl transition-colors ${enabled ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-500'}`}
            >
              <Power size={16} strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 leading-none mb-0.5">
                Auto-Fill Engine
              </p>
              <p className="text-[11px] text-gray-500">
                {enabled ? 'Actively observing forms' : 'Monitoring paused'}
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => onToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 shadow-inner"></div>
          </label>
        </div>

        {/* Intelligence Stats */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm flex flex-col hover:border-purple-100 transition-colors group">
            <div className="flex items-center gap-1.5 mb-1 text-gray-400 group-hover:text-purple-500 transition-colors">
              <Database size={14} strokeWidth={2} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Data Points
              </span>
            </div>
            <div className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-purple-600 transition-colors">
              {profile?.fields?.length ?? 0}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm flex flex-col hover:border-indigo-100 transition-colors group">
            <div className="flex items-center gap-1.5 mb-1 text-gray-400 group-hover:text-indigo-500 transition-colors">
              <Files size={14} strokeWidth={2} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Sources
              </span>
            </div>
            <div className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
              {profile?.documentCount ?? 0}
            </div>
          </div>
        </div>

        {/* Shortcuts Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm pb-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Keyboard size={14} className="text-gray-400" />
                <span className="text-xs font-medium text-gray-600">Summon Suggestions</span>
              </div>
              <div className="flex gap-1">
                <kbd className="px-1.5 py-0.5 min-w-[20px] text-center bg-gray-50 border border-gray-200 rounded text-[10px] font-mono text-gray-600 shadow-sm">
                  Ctrl
                </kbd>
                <kbd className="px-1.5 py-0.5 min-w-[20px] text-center bg-gray-50 border border-gray-200 rounded text-[10px] font-mono text-gray-600 shadow-sm">
                  Shift
                </kbd>
                <kbd className="px-1.5 py-0.5 min-w-[20px] text-center bg-gray-50 border border-gray-200 rounded text-[10px] font-mono text-gray-600 shadow-sm transition-colors text-indigo-600 border-indigo-100 bg-indigo-50">
                  F
                </kbd>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound size={14} className="text-gray-400" />
                <span className="text-xs font-medium text-gray-600">Force Sync Data</span>
              </div>
              <div className="flex gap-1">
                <kbd className="px-1.5 py-0.5 min-w-[20px] text-center bg-gray-50 border border-gray-200 rounded text-[10px] font-mono text-gray-600 shadow-sm">
                  Ctrl
                </kbd>
                <kbd className="px-1.5 py-0.5 min-w-[20px] text-center bg-gray-50 border border-gray-200 rounded text-[10px] font-mono text-gray-600 shadow-sm">
                  Shift
                </kbd>
                <kbd className="px-1.5 py-0.5 min-w-[20px] text-center bg-gray-50 border border-gray-200 rounded text-[10px] font-mono text-gray-600 shadow-sm">
                  R
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto px-3 pb-3 pt-4">
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-50 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-98"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
