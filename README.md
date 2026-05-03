# AI Resume Analyzer Pro

A full-stack SaaS platform for AI-powered resume analysis, ATS scoring, and job description matching.

## Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **AI**: Anthropic Claude API
- **Auth**: JWT + Google OAuth
- **File Parsing**: pdf-parse, mammoth (DOCX)

## Project Structure

```
resume-ai-pro/
├── frontend/          # Next.js app
│   ├── app/           # App Router pages
│   ├── components/    # Reusable components
│   ├── lib/           # API clients, utils
│   └── hooks/         # Custom React hooks
├── backend/           # Express API server
│   └── src/
│       ├── routes/    # API routes
│       ├── controllers/
│       ├── models/    # Mongoose models
│       ├── middleware/
│       └── services/  # Business logic
└── README.md
```

## Quick Start

### 1. Clone & Install

```bash
# Install frontend deps
cd frontend && npm install

# Install backend deps
cd ../backend && npm install
```

### 2. Environment Variables

```bash
# frontend/.env.local
cp frontend/.env.example frontend/.env.local

# backend/.env
cp backend/.env.example backend/.env
```

Fill in your API keys (see .env.example files).

### 3. Run Development Servers

```bash
# Terminal 1 – Backend (port 5000)
cd backend && npm run dev

# Terminal 2 – Frontend (port 3000)
cd frontend && npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Required API Keys

| Key | Where to get |
|-----|-------------|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) |
| `MONGODB_URI` | [mongodb.com/atlas](https://mongodb.com/atlas) (free tier) |
| `JWT_SECRET` | Any random 32+ char string |
| `GOOGLE_CLIENT_ID` | [console.cloud.google.com](https://console.cloud.google.com) |
| `GOOGLE_CLIENT_SECRET` | Same as above |

## Deployment

### Vercel (Frontend)
```bash
cd frontend
npx vercel --prod
```

### Railway / Render (Backend)
```bash
cd backend
# Set env vars in Railway/Render dashboard
# Deploy from GitHub or use CLI
```

## API Documentation

See `backend/API.md` for full endpoint reference.

## Features

- ✦ AI resume analysis (10+ dimensions)
- ✦ ATS compatibility scoring
- ✦ Job description matching
- ✦ Keyword gap analysis
- ✦ AI-powered rewrite suggestions
- ✦ Grammar & formatting checks
- ✦ User dashboard with history
- ✦ JWT + Google OAuth authentication
- ✦ PDF/DOCX upload & parsing
- ✦ Admin panel
- ✦ Subscription/pricing system
