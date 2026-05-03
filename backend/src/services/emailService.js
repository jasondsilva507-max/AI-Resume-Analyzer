const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const FROM = process.env.EMAIL_FROM || 'ResumeAI Pro <noreply@resumeaipro.com>';

/**
 * Send welcome email to new user
 */
exports.sendWelcomeEmail = async (user) => {
  if (!process.env.EMAIL_USER) return; // Skip if not configured

  const transporter = createTransporter();
  await transporter.sendMail({
    from: FROM,
    to: user.email,
    subject: 'Welcome to ResumeAI Pro 🚀',
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #111118; color: #f0f0f8; padding: 32px; border-radius: 16px;">
        <div style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Welcome, ${user.name}! 🎉</div>
        <p style="color: #a0a0b8; line-height: 1.7;">Your ResumeAI Pro account is ready. You can now analyze up to <strong style="color: #f0f0f8;">3 resumes per month</strong> on the free plan.</p>
        <a href="${process.env.CLIENT_URL}/analyzer" style="display: inline-block; margin-top: 24px; padding: 12px 28px; background: #7c6aff; color: #fff; border-radius: 10px; text-decoration: none; font-weight: 600;">Analyze My Resume →</a>
        <p style="margin-top: 24px; font-size: 12px; color: #606078;">ResumeAI Pro · Helping you land interviews faster</p>
      </div>
    `,
  });
};

/**
 * Send password reset email
 */
exports.sendPasswordResetEmail = async (user, resetUrl) => {
  if (!process.env.EMAIL_USER) return;

  const transporter = createTransporter();
  await transporter.sendMail({
    from: FROM,
    to: user.email,
    subject: 'Reset your ResumeAI Pro password',
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #111118; color: #f0f0f8; padding: 32px; border-radius: 16px;">
        <div style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">Password Reset Request</div>
        <p style="color: #a0a0b8; line-height: 1.7;">Hi ${user.name}, we received a request to reset your password. Click the button below. This link expires in 1 hour.</p>
        <a href="${resetUrl}" style="display: inline-block; margin-top: 24px; padding: 12px 28px; background: #7c6aff; color: #fff; border-radius: 10px; text-decoration: none; font-weight: 600;">Reset Password</a>
        <p style="margin-top: 24px; font-size: 12px; color: #606078;">If you didn't request this, you can safely ignore this email. Your password won't change.</p>
      </div>
    `,
  });
};

/**
 * Send analysis report email
 */
exports.sendReportEmail = async (user, reportUrl, score) => {
  if (!process.env.EMAIL_USER) return;

  const transporter = createTransporter();
  await transporter.sendMail({
    from: FROM,
    to: user.email,
    subject: `Your Resume Analysis Report — ATS Score: ${score}/100`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #111118; color: #f0f0f8; padding: 32px; border-radius: 16px;">
        <div style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">Your Resume Analysis is Ready</div>
        <div style="font-size: 48px; font-weight: 800; color: ${score >= 80 ? '#22c77a' : score >= 60 ? '#f5a623' : '#ef4444'}; margin: 16px 0;">${score}<span style="font-size: 20px; color: #a0a0b8;">/100</span></div>
        <p style="color: #a0a0b8; line-height: 1.7;">Your full report with keyword analysis, suggestions, and AI rewrites is ready to view.</p>
        <a href="${reportUrl}" style="display: inline-block; margin-top: 24px; padding: 12px 28px; background: #7c6aff; color: #fff; border-radius: 10px; text-decoration: none; font-weight: 600;">View Full Report →</a>
      </div>
    `,
  });
};
