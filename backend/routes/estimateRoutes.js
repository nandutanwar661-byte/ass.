const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Estimate = require('../models/Estimate');

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads/'); },
  filename: (req, file, cb) => { cb(null, 'est_' + Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage: storage });

// 1. Save New Estimate (Handles single item image array index for preview cloning)
router.post('/add', upload.single('itemImage'), async (req, res) => {
  try {
    const rawData = { ...req.body };
    
    // JSON parse incoming fields strings from multi-part data stream
    if (typeof rawData.items === 'string') {
      rawData.items = JSON.parse(rawData.items);
    }

    // Attach uploaded item product preview image path if available
    if (req.file && rawData.items && rawData.items.length > 0) {
      // Dynamic link generation (Localhost ho ya Render, dono handle karega)
      const hostUrl = `${req.protocol}://${req.get('host')}`;
      rawData.items[0].itemImageUrl = `${hostUrl}/uploads/${req.file.filename}`;
    }

    const newEstimate = new Estimate(rawData);
    const saved = await newEstimate.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error("Error saving estimate:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// 2. Fetch All Estimates
router.get('/all', async (req, res) => {
  try {
    const data = await Estimate.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;