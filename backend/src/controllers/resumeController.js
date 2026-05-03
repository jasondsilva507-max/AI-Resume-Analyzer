const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Resume = require('../models/Resume');
const aiService = require('../services/aiService');

// ─── Parse resume file ─────────────────────────────────────────────────────
exports.parseResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    let text = '';

    try {
      if (ext === '.pdf') {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        text = data.text;
      } else if (ext === '.docx' || ext === '.doc') {
        const result = await mammoth.extractRawText({ path: filePath });
        text = result.value;
      } else if (ext === '.txt') {
        text = fs.readFileSync(filePath, 'utf8');
      }
    } finally {
      // Clean up temp file
      fs.unlink(filePath, () => {});
    }

    if (!text || text.trim().length < 50) {
      return res.status(422).json({
        success: false,
        message: 'Could not extract readable text from this file. Please paste your resume text directly.',
      });
    }

    res.json({
      success: true,
      text: text.trim(),
      wordCount: text.split(/\s+/).length,
      charCount: text.length,
    });
  } catch (err) {
    next(err);
  }
};

// ─── Analyze resume with AI ────────────────────────────────────────────────
exports.analyzeResume = async (req, res, next) => {
  try {
    const { resumeText, jobDesc, resumeId, saveName } = req.body;

    if (!resumeText?.trim()) {
      return res.status(400).json({ success: false, message: 'Resume text is required.' });
    }

    // Run AI analysis
    const analysis = await aiService.analyzeResume(resumeText, jobDesc);

    // Save or update resume record
    let resume;
    if (resumeId) {
      resume = await Resume.findOneAndUpdate(
        { _id: resumeId, user: req.user._id },
        {
          $push: { analyses: mapAnalysis(analysis, jobDesc) },
          latestScore: analysis.overall_score,
        },
        { new: true }
      );
    } else {
      resume = await Resume.create({
        user: req.user._id,
        name: saveName || `Resume ${new Date().toLocaleDateString()}`,
        textContent: resumeText,
        fileType: 'text',
        latestScore: analysis.overall_score,
        analyses: [mapAnalysis(analysis, jobDesc)],
      });
    }

    // Increment usage counter
    req.user.usage.analysesThisMonth += 1;
    await req.user.save({ validateBeforeSave: false });

    res.json({ success: true, analysis, resumeId: resume._id });
  } catch (err) {
    next(err);
  }
};

// ─── Get user's resumes ────────────────────────────────────────────────────
exports.getUserResumes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, archived = false } = req.query;
    const resumes = await Resume.find({ user: req.user._id, isArchived: archived === 'true' })
      .select('-textContent -analyses.suggestions')
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Resume.countDocuments({ user: req.user._id });

    res.json({ success: true, resumes, total, page: parseInt(page) });
  } catch (err) {
    next(err);
  }
};

// ─── Get single resume ─────────────────────────────────────────────────────
exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) return res.status(404).json({ success: false, message: 'Resume not found.' });
    res.json({ success: true, resume });
  } catch (err) {
    next(err);
  }
};

// ─── Delete resume ─────────────────────────────────────────────────────────
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!resume) return res.status(404).json({ success: false, message: 'Resume not found.' });
    res.json({ success: true, message: 'Resume deleted.' });
  } catch (err) {
    next(err);
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────
function mapAnalysis(a, jobDesc) {
  return {
    overallScore: a.overall_score,
    atsScore: a.ats_score,
    recruiterScore: a.recruiter_score,
    readabilityScore: a.readability_score,
    jobMatchPercent: a.job_match_percent,
    sections: a.sections,
    keywordsFound: a.keywords_found,
    keywordsMissing: a.keywords_missing,
    strengths: a.strengths,
    weaknesses: a.weaknesses,
    suggestions: a.suggestions,
    grammarIssues: a.grammar_issues,
    formattingIssues: a.formatting_issues,
    summary: a.summary,
    jobDescription: jobDesc || '',
  };
}
