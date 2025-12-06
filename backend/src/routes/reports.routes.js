const express = require('express');
const router = express.Router();
const ItemReport = require('../models/ItemReport');
const auth = require('../middlewares/auth.middleware'); // Import the middleware

const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const upload = multer({ dest: 'uploads/' }); // Temp folder for uploads
const fs = require('fs'); // To remove temp files after upload

// POST /api/reports - Protected Route
// 'image' is the name of the field in the form data
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';

    // 1. If a file was uploaded, send it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "back2you", // optional folder name in cloudinary
      });
      imageUrl = result.secure_url;

      // Clean up local temp file
      fs.unlinkSync(req.file.path);
    }

    // 2. Create the report
    const newReport = {
      ...req.body,
      images: imageUrl ? [imageUrl] : [], // Store as array since your model expects array
      reportedBy: req.user.id
    };

    const report = await ItemReport.create(newReport);
    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reports for the logged-in user
router.get('/my-reports', auth, async (req, res) => {
  try {
    const reports = await ItemReport.find({ reportedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
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


// DELETE /api/reports/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const report = await ItemReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    // Security Check: Ensure the logged-in user owns this report
    if (report.reportedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this report' });
    }

    await report.deleteOne();
    res.json({ message: 'Report deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
