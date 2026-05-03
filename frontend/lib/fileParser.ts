/**
 * Extracts text content from uploaded resume files.
 * Supports TXT (direct read) and PDF/DOCX (best-effort binary extraction).
 * For production, wire up the backend /api/parse-resume endpoint.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    } else {
      // PDF/DOCX: read binary and strip non-printable chars
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Keep printable ASCII + newlines
        const text = result
          .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
          .replace(/ {3,}/g, ' ')
          .replace(/\n{3,}/g, '\n\n')
          .trim();

        if (text.length > 300) {
          resolve(text);
        } else {
          resolve(
            `[File: ${file.name}]\n\nThis appears to be a binary/scanned file. ` +
            `For best results, please paste your resume text directly into the text area.`
          );
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsBinaryString(file);
    }
  });
}

/**
 * For production use — sends file to backend for proper parsing.
 * Backend uses pdf-parse for PDFs and mammoth for DOCX.
 */
export async function parseResumeViaAPI(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('resume', file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/parse`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to parse resume');
  const data = await res.json();
  return data.text;
}
