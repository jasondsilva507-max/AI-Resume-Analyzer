'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { authAPI } from '@/lib/api';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email'); return; }
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setSent(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 no-underline">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-display font-bold"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--blue))' }}>A</div>
            <span className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>ResumeAI Pro</span>
          </Link>
        </div>

        <div className="p-8 rounded-2xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          {!sent ? (
            <>
              <h1 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--text)' }}>Reset password</h1>
              <p className="text-sm mb-6" style={{ color: 'var(--text3)' }}>We'll send you a reset link</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text2)' }}>Email address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                    className="w-full p-3 rounded-xl outline-none text-sm"
                    style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ background: 'var(--accent)', color: '#fff' }}>
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Mail size={15} /> Send Reset Link</>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(34,199,122,0.15)' }}>
                <Mail size={24} color="#22c77a" />
              </div>
              <h2 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text)' }}>Check your inbox</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text2)' }}>
                We've sent a password reset link to <strong style={{ color: 'var(--text)' }}>{email}</strong>
              </p>
              <p className="text-xs" style={{ color: 'var(--text3)' }}>Didn't receive it? Check your spam folder or try again.</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-xs no-underline" style={{ color: 'var(--text3)' }}>
              <ArrowLeft size={13} /> Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
