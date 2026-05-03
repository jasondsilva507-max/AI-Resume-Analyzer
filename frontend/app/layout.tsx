import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'ResumeAI Pro — AI-Powered Resume Analyzer',
  description: 'Get your ATS score, keyword analysis, and AI-powered suggestions to land more interviews.',
  keywords: 'resume analyzer, ATS score, AI resume, job application',
  openGraph: {
    title: 'ResumeAI Pro',
    description: 'AI-Powered Resume Analysis & ATS Scoring',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e1e28',
              color: '#f0f0f8',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '12px',
              fontSize: '13px',
            },
          }}
        />
      </body>
    </html>
  );
}
