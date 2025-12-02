const express = require('express');
const router = express.Router();
const ItemReport = require('../models/ItemReport');
// auth middleware (simple) can be created later

// create report
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    // in real app: validate, attach req.user.id as reportedBy
    const report = await ItemReport.create(data);
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

module.exports = router;
