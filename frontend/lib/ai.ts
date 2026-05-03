// Groq API — free tier (https://console.groq.com/keys)
// Model: llama-3.3-70b-versatile  |  Free: 30 req/min, 14,400 req/day
// NOTE: Groq does not support direct browser access.
// The frontend calls your own Next.js API route (/api/analyze) which proxies to Groq.
// This keeps your GROQ_API_KEY secret and avoids CORS issues.

export async function analyzeResume(resumeText: string, jobDesc?: string) {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText, jobDesc }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.error || 'Analysis failed. Please try again.');
  }

  return res.json();
}

export function getDemoAnalysis() {
  return {
    overall_score: 74,
    ats_score: 68,
    recruiter_score: 79,
    readability_score: 82,
    sections: {
      summary: { score: 62, feedback: 'Too generic — lacks quantified impact and unique value proposition' },
      experience: { score: 78, feedback: 'Good detail but some bullets need stronger action verbs and metrics' },
      skills: { score: 71, feedback: 'Missing several in-demand keywords for your target role' },
      education: { score: 88, feedback: 'Well-formatted with relevant coursework mentioned' },
      formatting: { score: 70, feedback: 'Minor inconsistencies in bullet punctuation and spacing' },
    },
    keywords_found: ['JavaScript', 'React', 'Node.js', 'Git', 'Agile', 'REST API', 'SQL', 'Problem-solving'],
    keywords_missing: ['TypeScript', 'Docker', 'CI/CD', 'AWS', 'GraphQL', 'Testing', 'Performance optimization'],
    strengths: ['Quantified achievements in 60% of bullets', 'Clean chronological structure', 'Relevant tech stack'],
    weaknesses: ['Summary lacks differentiation', 'Missing cloud/DevOps keywords', "Some weak verb choices ('helped', 'worked on')"],
    suggestions: [
      {
        type: 'bullet_improvement',
        section: 'Experience',
        before: 'Helped improve website performance and worked on React components',
        after: 'Optimized React component architecture, reducing initial load time by 40% and improving Lighthouse score from 62 to 91',
      },
      {
        type: 'summary_rewrite',
        section: 'Summary',
        before: 'Experienced software developer with knowledge of React and Node.js looking for new opportunities',
        after: 'Full-stack Engineer with 4+ years delivering high-impact web applications using React and Node.js. Proven track record of optimizing performance and shipping features that serve 100K+ users.',
      },
    ],
    grammar_issues: ['Inconsistent past/present tense in most recent role', 'Missing periods at end of several bullet points'],
    formatting_issues: ['Slight spacing inconsistency between sections'],
    job_match_percent: null,
    summary: 'Your resume shows solid technical foundation but needs strategic keyword optimization to pass ATS filters. Focus on quantifying impact and adding cloud/DevOps terminology to significantly boost your score.',
  };
}
