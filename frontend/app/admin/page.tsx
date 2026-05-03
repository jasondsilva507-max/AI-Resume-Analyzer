'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { Users, FileText, TrendingUp, DollarSign, Trash2, Shield } from 'lucide-react';

// Sample admin data
const sampleUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', plan: 'pro', analyses: 24, joined: '2025-01-10', status: 'active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', plan: 'free', analyses: 3, joined: '2025-01-12', status: 'active' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', plan: 'team', analyses: 87, joined: '2024-12-05', status: 'active' },
  { id: '4', name: 'David Lee', email: 'david@example.com', plan: 'free', analyses: 1, joined: '2025-01-14', status: 'suspended' },
];

const adminStats = [
  { label: 'Total Users', value: '2,847', icon: Users, color: '#7c6aff', change: '+12%' },
  { label: 'Analyses Today', value: '342', icon: FileText, color: '#3b9eff', change: '+8%' },
  { label: 'MRR', value: '$4,210', icon: DollarSign, color: '#22c77a', change: '+23%' },
  { label: 'Pro Upgrades', value: '47', icon: TrendingUp, color: '#f5a623', change: '+5%' },
];

function PlanBadge({ plan }: { plan: string }) {
  const colors: Record<string, string> = {
    free: 'rgba(96,96,120,0.2)',
    pro: 'rgba(124,106,255,0.15)',
    team: 'rgba(34,199,122,0.12)',
  };
  const textColors: Record<string, string> = {
    free: 'var(--text3)',
    pro: 'var(--accent3)',
    team: '#22c77a',
  };
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
      style={{ background: colors[plan], color: textColors[plan] }}>{plan}</span>
  );
}

const TABS = ['overview', 'users', 'analytics'] as const;

export default function AdminPage() {
  const [tab, setTab] = useState<typeof TABS[number]>('overview');
  const [users, setUsers] = useState(sampleUsers);

  const suspendUser = (id: string) =>
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
  const deleteUser = (id: string) => setUsers(prev => prev.filter(u => u.id !== id));

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.15)' }}>
            <Shield size={20} color="#ef4444" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-2xl" style={{ letterSpacing: '-0.5px', color: 'var(--text)' }}>Admin Panel</h1>
            <p className="text-xs" style={{ color: 'var(--text3)' }}>Platform management and analytics</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg mb-6 w-fit" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2 rounded-md text-xs font-medium capitalize transition-all"
              style={{
                background: tab === t ? 'var(--bg4)' : 'transparent',
                color: tab === t ? 'var(--text)' : 'var(--text3)',
                border: tab === t ? '1px solid var(--border2)' : '1px solid transparent',
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {adminStats.map(stat => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                        <Icon size={17} color={stat.color} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: '#22c77a' }}>{stat.change}</span>
                    </div>
                    <div className="font-display font-extrabold text-2xl" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text3)' }}>{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Revenue chart (visual) */}
            <div className="p-6 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <h3 className="font-display font-bold text-sm mb-5" style={{ color: 'var(--text)' }}>Monthly Revenue</h3>
              <div className="flex items-end gap-3 h-36">
                {[1800, 2100, 1950, 2400, 2800, 3200, 4210].map((val, i) => {
                  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
                  const pct = (val / 4500) * 100;
                  return (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                      <span className="text-xs font-bold" style={{ color: '#22c77a' }}>${(val / 1000).toFixed(1)}k</span>
                      <div className="w-full rounded-t-md" style={{ height: `${pct}%`, background: 'linear-gradient(to top, rgba(34,199,122,0.3), rgba(34,199,122,0.7))', border: '1px solid rgba(34,199,122,0.4)' }} />
                      <span className="text-xs" style={{ color: 'var(--text3)' }}>{months[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Users */}
        {tab === 'users' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div className="grid grid-cols-6 p-4 text-xs font-semibold" style={{ background: 'var(--bg3)', borderBottom: '1px solid var(--border)', color: 'var(--text3)' }}>
                <div className="col-span-2">User</div>
                <div>Plan</div>
                <div>Analyses</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              {users.map((user, i) => (
                <div key={user.id} className="grid grid-cols-6 p-4 items-center text-sm"
                  style={{ background: i % 2 === 0 ? 'var(--bg2)' : 'var(--bg3)', borderBottom: i < users.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div className="col-span-2">
                    <div className="font-medium" style={{ color: 'var(--text)' }}>{user.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text3)' }}>{user.email}</div>
                  </div>
                  <div><PlanBadge plan={user.plan} /></div>
                  <div className="text-sm" style={{ color: 'var(--text2)' }}>{user.analyses}</div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: user.status === 'active' ? 'rgba(34,199,122,0.12)' : 'rgba(239,68,68,0.1)',
                        color: user.status === 'active' ? '#22c77a' : '#ef4444',
                      }}>
                      {user.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => suspendUser(user.id)}
                      className="px-2.5 py-1 rounded-lg text-xs transition-all"
                      style={{ background: 'var(--bg4)', color: 'var(--text2)', border: '1px solid var(--border)' }}>
                      {user.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="p-1.5 rounded-lg" style={{ color: '#ef4444' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics */}
        {tab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plan distribution */}
            <div className="p-6 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <h3 className="font-display font-bold text-sm mb-5" style={{ color: 'var(--text)' }}>Plan Distribution</h3>
              {[
                { label: 'Free', count: 2100, total: 2847, color: 'var(--text3)' },
                { label: 'Pro', count: 620, total: 2847, color: 'var(--accent3)' },
                { label: 'Team', count: 127, total: 2847, color: '#22c77a' },
              ].map(p => (
                <div key={p.label} className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: 'var(--text2)' }}>{p.label}</span>
                    <span style={{ color: p.color }}>{p.count.toLocaleString()} ({Math.round(p.count / p.total * 100)}%)</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg4)' }}>
                    <div className="h-full rounded-full" style={{ width: `${p.count / p.total * 100}%`, background: p.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Top features used */}
            <div className="p-6 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <h3 className="font-display font-bold text-sm mb-5" style={{ color: 'var(--text)' }}>Top Features Used</h3>
              {[
                { label: 'ATS Score', usage: 98, color: '#7c6aff' },
                { label: 'Keyword Analysis', usage: 87, color: '#3b9eff' },
                { label: 'AI Suggestions', usage: 74, color: '#22c77a' },
                { label: 'JD Matching', usage: 61, color: '#f5a623' },
                { label: 'Grammar Check', usage: 45, color: '#ef4444' },
              ].map(f => (
                <div key={f.label} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--text2)' }}>{f.label}</span>
                    <span style={{ color: f.color }}>{f.usage}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg4)' }}>
                    <div className="h-full rounded-full" style={{ width: `${f.usage}%`, background: f.color }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
