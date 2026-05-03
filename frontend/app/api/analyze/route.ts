// Next.js API route — proxies resume analysis to Groq
// Keeps GROQ_API_KEY server-side only (never exposed to browser)
import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDesc } = await req.json();

    if (!resumeText?.trim()) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const prompt = `You are an expert ATS (Applicant Tracking System) analyst and career coach with 15+ years of recruiting experience at top companies. Analyze the following resume${jobDesc ? ' against the provided job description' : ''} comprehensively.

RESUME:
${resumeText.substring(0, 4000)}

${jobDesc ? `JOB DESCRIPTION:\n${jobDesc.substring(0, 2000)}` : ''}

Return ONLY valid JSON (no markdown, no code fences, no preamble) with this exact structure:
{
  "overall_score": <0-100>,
  "ats_score": <0-100>,
  "recruiter_score": <0-100>,
  "readability_score": <0-100>,
  "sections": {
    "summary": {"score": <0-100>, "feedback": "<specific feedback>"},
    "experience": {"score": <0-100>, "feedback": "<specific feedback>"},
    "skills": {"score": <0-100>, "feedback": "<specific feedback>"},
    "education": {"score": <0-100>, "feedback": "<specific feedback>"},
    "formatting": {"score": <0-100>, "feedback": "<specific feedback>"}
  },
  "keywords_found": ["<keyword1>", "<keyword2>"],
  "keywords_missing": ["<keyword1>", "<keyword2>"],
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "weaknesses": ["<weakness1>", "<weakness2>", "<weakness3>"],
  "suggestions": [
    {
      "type": "bullet_improvement",
      "section": "Experience",
      "before": "<original weak text>",
      "after": "<improved achievement-focused text with metrics>"
    },
    {
      "type": "summary_rewrite",
      "section": "Summary",
      "before": "<original text>",
      "after": "<improved professional summary>"
    }
  ],
  "grammar_issues": ["<issue1>", "<issue2>"],
  "formatting_issues": ["<issue1>"],
  "job_match_percent": ${jobDesc ? '<0-100>' : 'null'},
  "summary": "<2-3 sentence overall assessment>"
}`;

    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.json().catch(() => ({}));
      throw new Error((err as any)?.error?.message || `Groq API error: ${groqRes.status}`);
    }

    const groqData = await groqRes.json();
    const raw = groqData.choices?.[0]?.message?.content || '';
    const clean = raw.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();

    try {
      const parsed = JSON.parse(clean);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ error: 'AI returned an invalid response. Please try again.' }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
