const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { protect, checkAnalysisLimit } = require('../middleware/auth');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: (parseInt(process.env.MAX_FILE_SIZE_MB) || 10) * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|docx|doc|txt/;
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error('Only PDF, DOCX, and TXT files are allowed.'));
  },
});

// Routes
router.post('/parse', upload.single('resume'), resumeController.parseResume);
router.post('/analyze', protect, checkAnalysisLimit, resumeController.analyzeResume);
router.get('/', protect, resumeController.getUserResumes);
router.get('/:id', protect, resumeController.getResume);
router.delete('/:id', protect, resumeController.deleteResume);

module.exports = router;
