// Groq API — free tier (https://console.groq.com/keys)
// Model: llama-3.3-70b-versatile  |  Free: 30 req/min, 14,400 req/day

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

async function callGroq(messages, maxTokens = 2000) {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: maxTokens,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq API error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Analyzes a resume using Groq (LLaMA 3.3 70B).
 * Returns structured JSON with scores, keywords, suggestions, etc.
 */
exports.analyzeResume = async (resumeText, jobDesc = '') => {
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

  const raw = await callGroq([{ role: 'user', content: prompt }], 2000);
  const clean = raw
    .replace(/^```json?\n?/, '')
    .replace(/\n?```$/, '')
    .trim();

  try {
    return JSON.parse(clean);
  } catch {
    throw new Error('AI returned an invalid response. Please try again.');
  }
};

/**
 * Generates an improved version of a single resume bullet point.
 */
exports.improveBullet = async (bullet, context = '') => {
  const raw = await callGroq([{
    role: 'user',
    content: `Rewrite this resume bullet point to be more achievement-focused, quantified, and impactful.
${context ? `Context: ${context}` : ''}
Original: "${bullet}"
Return ONLY the improved bullet point, nothing else.`,
  }], 400);
  return raw.trim() || bullet;
};

/**
 * Generates a professional summary based on resume content.
 */
exports.generateSummary = async (resumeText, targetRole = '') => {
  const raw = await callGroq([{
    role: 'user',
    content: `Based on this resume, write a compelling 3-sentence professional summary${targetRole ? ` for a ${targetRole} role` : ''}.
Resume: ${resumeText.substring(0, 2000)}
Return ONLY the summary paragraph, nothing else.`,
  }], 300);
  return raw.trim() || '';
};
