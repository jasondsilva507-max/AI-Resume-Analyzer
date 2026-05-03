'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/authStore';
import { Loader2, Eye, EyeOff, Check } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { signup, isLoading } = useAuthStore();
  const router = useRouter();

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = passwordStrength();
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', '#ef4444', '#f5a623', '#3b9eff', '#22c77a'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error('Please fill in all fields'); return; }
    if (password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    try {
      await signup(name, email, password);
      toast.success('Account created! Welcome 🎉');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const inputStyle = {
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: 'var(--bg)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 no-underline">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-display font-bold"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--blue))' }}>A</div>
            <span className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>ResumeAI Pro</span>
          </Link>
        </div>

        <div className="p-8 rounded-2xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          <h1 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--text)' }}>Create your account</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--text3)' }}>Start analyzing resumes for free</p>

          {/* Benefits */}
          <div className="flex flex-col gap-2 mb-6 p-4 rounded-xl" style={{ background: 'rgba(124,106,255,0.06)', border: '1px solid rgba(124,106,255,0.2)' }}>
            {['3 free resume analyses/month', 'ATS score & keyword analysis', 'AI-powered suggestions'].map(b => (
              <div key={b} className="flex items-center gap-2">
                <Check size={13} color="#22c77a" />
                <span className="text-xs" style={{ color: 'var(--text2)' }}>{b}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text2)' }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" style={inputStyle} />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text2)' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text2)' }}>Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 8 characters" style={{ ...inputStyle, paddingRight: '40px' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text3)' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength ? strengthColors[strength] : 'var(--bg4)' }} />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
                </div>
              )}
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              style={{ background: 'var(--accent)', color: '#fff' }}>
              {isLoading ? <><Loader2 size={16} className="animate-spin" /> Creating account...</> : 'Create Free Account'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--text3)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <button className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
            style={{ border: '1px solid var(--border2)', color: 'var(--text2)', background: 'var(--bg3)' }}
            onClick={() => toast('Google OAuth — configure GOOGLE_CLIENT_ID in .env')}>
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-xs mt-6" style={{ color: 'var(--text3)' }}>
            Already have an account?{' '}
            <Link href="/auth/login" className="no-underline" style={{ color: 'var(--accent3)' }}>Sign in</Link>
          </p>
          <p className="text-center text-xs mt-3" style={{ color: 'var(--text3)' }}>
            By signing up you agree to our{' '}
            <Link href="/terms" className="no-underline" style={{ color: 'var(--text3)', textDecoration: 'underline' }}>Terms</Link>{' '}
            and{' '}
            <Link href="/privacy" className="no-underline" style={{ color: 'var(--text3)', textDecoration: 'underline' }}>Privacy Policy</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
