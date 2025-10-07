import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Shield, Trophy, Newspaper, User, Gamepad2, ShieldAlert, Brain, Code, Mail, Terminal, BookOpen, Sparkles } from 'lucide-react';
import AudioControl from './AudioControl';
import Matrix from './Matrix';
import AICoach from './AICoach';

const navItems = [
  { to: '/', label: 'Dashboard', icon: <Gamepad2 size={18} /> },
  { to: '/ctf', label: 'CTF Challenges', icon: <Terminal size={18} /> },
  { to: '/phish-hunt', label: 'Phish Hunt', icon: <Mail size={18} /> },
  { to: '/code-and-secure', label: 'Code & Secure', icon: <Code size={18} /> },
  { to: '/firewall-defender', label: 'Firewall Defender', icon: <ShieldAlert size={18} /> },
  { to: '/ai-quizbot', label: 'AI Cyber QuizBot', icon: <Brain size={18} /> },
  { to: '/leaderboard', label: 'Leaderboard', icon: <Trophy size={18} /> },
  { to: '/news', label: 'News Feed', icon: <Newspaper size={18} /> },
  { to: '/tutorials', label: 'Tutorials', icon: <BookOpen size={18} /> },
  { to: '/profile', label: 'Profile', icon: <User size={18} /> },
];

export default function Layout() {
  const [coachOpen, setCoachOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 grid md:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col border-r border-slate-800 p-4 gap-4 bg-black/20 backdrop-blur relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="relative flex items-center gap-2">
          <Shield className="text-cyan-400 drop-shadow-[0_0_8px_#08f7fe]" />
          <div className="font-extrabold tracking-wide">
            <span className="text-cyan-400">CyberSec</span> <span className="text-fuchsia-400">Arena</span>
          </div>
        </div>
        <nav className="relative flex flex-col gap-1">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/30'
                    : 'hover:bg-white/5 border border-transparent'
                }`
              }
            >
              <span className="opacity-90">{n.icon}</span>
              <span className="text-sm">{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="relative mt-auto">
          <AudioControl />
        </div>
      </aside>

      {/* Main */}
      <main className="relative">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-black/30 backdrop-blur">
          <div className="flex items-center gap-2">
            <Shield className="text-cyan-400" />
            <div className="font-bold">
              <span className="text-cyan-400">CyberSec</span> <span className="text-fuchsia-400">Arena</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCoachOpen(true)} className="px-2 py-1 text-xs rounded bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-400/30 flex items-center gap-1">
              <Sparkles size={14} /> Coach
            </button>
            <AudioControl />
          </div>
        </header>
        <div className="relative p-6">
          <Matrix />
          <div className="absolute inset-0 -z-10 opacity-[0.08]" style={{ background: 'radial-gradient(circle at 20% 10%, #08f7fe 0%, transparent 25%), radial-gradient(circle at 80% 30%, #f608f7 0%, transparent 25%)' }} />
          <Outlet />
        </div>
        {coachOpen && <AICoach onClose={() => setCoachOpen(false)} />}
      </main>
    </div>
  );
}
