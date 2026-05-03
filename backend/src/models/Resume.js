const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  overallScore: { type: Number, required: true },
  atsScore: { type: Number, required: true },
  recruiterScore: { type: Number },
  readabilityScore: { type: Number },
  jobMatchPercent: { type: Number, default: null },
  sections: { type: mongoose.Schema.Types.Mixed },
  keywordsFound: [String],
  keywordsMissing: [String],
  strengths: [String],
  weaknesses: [String],
  suggestions: [mongoose.Schema.Types.Mixed],
  grammarIssues: [String],
  formattingIssues: [String],
  summary: { type: String },
  jobDescription: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
}, { _id: true });

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  originalName: { type: String },
  fileType: { type: String, enum: ['pdf', 'docx', 'txt', 'text'], default: 'text' },
  textContent: { type: String, required: true },
  fileSize: { type: Number, default: 0 },
  latestScore: { type: Number, default: 0 },
  analyses: [analysisSchema],
  tags: [String],
  isArchived: { type: Boolean, default: false },
}, {
  timestamps: true,
});

// Indexes
resumeSchema.index({ user: 1, createdAt: -1 });
resumeSchema.index({ user: 1, isArchived: 1 });

// Virtual for analysis count
resumeSchema.virtual('analysisCount').get(function () {
  return this.analyses.length;
});

module.exports = mongoose.model('Resume', resumeSchema);
