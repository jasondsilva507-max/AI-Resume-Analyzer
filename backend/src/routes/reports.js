const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/auth');

// GET /api/reports — all analyses for user
router.get('/', protect, async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .select('name latestScore analyses.overallScore analyses.atsScore analyses.createdAt')
      .sort({ updatedAt: -1 });

    const reports = resumes.flatMap(r =>
      r.analyses.map(a => ({
        resumeId: r._id,
        resumeName: r.name,
        overallScore: a.overallScore,
        atsScore: a.atsScore,
        date: a.createdAt,
        analysisId: a._id,
      }))
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ success: true, reports });
  } catch (err) {
    next(err);
  }
});

// GET /api/reports/:resumeId/:analysisId
router.get('/:resumeId/:analysisId', protect, async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.resumeId, user: req.user._id });
    if (!resume) return res.status(404).json({ success: false, message: 'Report not found.' });

    const analysis = resume.analyses.id(req.params.analysisId);
    if (!analysis) return res.status(404).json({ success: false, message: 'Analysis not found.' });

    res.json({ success: true, analysis, resumeName: resume.name });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
