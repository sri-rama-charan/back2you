const express = require('express');
const router = express.Router();
const ItemReport = require('../models/ItemReport');
const auth = require('../middlewares/auth.middleware'); // Import the middleware

// POST /api/reports - Protected Route
router.post('/', auth, async (req, res) => {
  try {
    // Now we can trust req.user.id exists because 'auth' middleware passed
    const newReport = {
      ...req.body,
      reportedBy: req.user.id // Link the report to the logged-in user
    };
    
    const report = await ItemReport.create(newReport);
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// get reports with simple filters
router.get('/', async (req, res) => {
  const { q, type, category } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (q) filter.$or = [
    { title: new RegExp(q, 'i') },
    { description: new RegExp(q, 'i') },
    { location: new RegExp(q, 'i') }
  ];
  try {
    const results = await ItemReport.find(filter).sort({ createdAt: -1 }).limit(100);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// get single report
router.get('/:id', async (req, res) => {
  try {
    const r = await ItemReport.findById(req.params.id).populate('reportedBy', 'name email');
    if (!r) return res.status(404).json({ message: 'Not found' });
    res.json(r);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Get reports for the logged-in user
router.get('/my-reports', auth, async (req, res) => {
  try {
    const reports = await ItemReport.find({ reportedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
