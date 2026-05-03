'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/analyzer', label: 'Analyzer' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--blue))' }}
          >
            A
          </div>
          <span className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>
            ResumeAI <span style={{ color: 'var(--accent3)' }}>Pro</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm transition-all duration-200 no-underline"
              style={{
                color: pathname === link.href ? 'var(--text)' : 'var(--text2)',
                background: pathname === link.href ? 'var(--bg3)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-lg text-sm transition-colors no-underline"
            style={{ color: 'var(--text2)' }}
          >
            Sign In
          </Link>
          <Link
            href="/analyzer"
            className="px-4 py-2 rounded-lg text-sm font-medium no-underline flex items-center gap-2"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            <Zap size={14} />
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: 'var(--text2)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 pb-4 flex flex-col gap-1"
            style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-lg text-sm no-underline"
                style={{ color: 'var(--text2)' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-2">
              <Link href="/auth/login" className="flex-1 px-4 py-2 rounded-lg text-sm text-center no-underline" style={{ border: '1px solid var(--border2)', color: 'var(--text2)' }}>Sign In</Link>
              <Link href="/analyzer" className="flex-1 px-4 py-2 rounded-lg text-sm text-center font-medium no-underline" style={{ background: 'var(--accent)', color: '#fff' }}>Start Free</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
