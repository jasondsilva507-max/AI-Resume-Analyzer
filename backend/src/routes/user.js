const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Resume = require('../models/Resume');
const { protect } = require('../middleware/auth');

// GET /api/user/usage
router.get('/usage', protect, async (req, res, next) => {
  try {
    const user = req.user;
    const limits = { free: 3, pro: -1, team: -1 }; // -1 = unlimited
    const resumeCount = await Resume.countDocuments({ user: user._id });

    res.json({
      success: true,
      usage: {
        analysesThisMonth: user.usage.analysesThisMonth,
        monthlyLimit: limits[user.plan],
        plan: user.plan,
        resumeCount,
      },
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/user/profile
router.put('/profile', protect, async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const allowed = {};
    if (name) allowed.name = name.trim().substring(0, 80);
    if (avatar) allowed.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.user._id, allowed, { new: true, runValidators: true });
    res.json({ success: true, user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/user/account
router.delete('/account', protect, async (req, res, next) => {
  try {
    await Resume.deleteMany({ user: req.user._id });
    await User.findByIdAndDelete(req.user._id);
    res.json({ success: true, message: 'Account deleted.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
