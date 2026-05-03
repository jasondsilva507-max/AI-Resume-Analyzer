'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import toast from 'react-hot-toast';
import { Loader2, Mail, MessageSquare, Twitter } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill in required fields'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // simulate API
    setLoading(false);
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
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
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <h1 className="font-display font-extrabold text-4xl mb-4" style={{ letterSpacing: '-1.5px', color: 'var(--text)' }}>
              Get in touch
            </h1>
            <p className="text-base max-w-md mx-auto" style={{ color: 'var(--text2)' }}>
              Have a question, feedback, or want to explore enterprise options? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-4">
              {[
                { icon: Mail, label: 'Email', value: 'hello@resumeaipro.com', href: 'mailto:hello@resumeaipro.com' },
                { icon: MessageSquare, label: 'Support', value: 'support@resumeaipro.com', href: 'mailto:support@resumeaipro.com' },
                { icon: Twitter, label: 'Twitter', value: '@resumeaipro', href: 'https://twitter.com' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} className="flex items-start gap-4 p-5 rounded-xl no-underline group"
                    style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(124,106,255,0.15)' }}>
                      <Icon size={18} color="var(--accent3)" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text3)' }}>{item.label}</div>
                      <div className="text-sm" style={{ color: 'var(--text)' }}>{item.value}</div>
                    </div>
                  </a>
                );
              })}

              <div className="p-5 rounded-xl" style={{ background: 'rgba(124,106,255,0.06)', border: '1px solid rgba(124,106,255,0.2)' }}>
                <h4 className="font-display font-bold text-sm mb-2" style={{ color: 'var(--text)' }}>Response Time</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>
                  We typically respond within 24 hours on business days. Pro and Team plan customers get priority support.
                </p>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="md:col-span-2 p-8 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <h2 className="font-display font-bold text-xl mb-6" style={{ color: 'var(--text)' }}>Send a message</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text2)' }}>Name *</label>
                    <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text2)' }}>Email *</label>
                    <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text2)' }}>Subject</label>
                  <input type="text" placeholder="How can we help?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text2)' }}>Message *</label>
                  <textarea rows={6} placeholder="Tell us more..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <button type="submit" disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm disabled:opacity-50"
                  style={{ background: 'var(--accent)', color: '#fff' }}>
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
