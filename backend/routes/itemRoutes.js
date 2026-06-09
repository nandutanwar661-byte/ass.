const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure backend folder me 'uploads' naam ka folder ho
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 1. Naya Item Save Karne ka Endpoint (With Image)
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const parsedBody = { ...req.body };
    
    // Form data se boolean string ko proper boolean me convert karna
    if (parsedBody.isSellable === 'string') parsedBody.isSellable = parsedBody.isSellable === 'true';
    if (parsedBody.isPurchasable === 'string') parsedBody.isPurchasable = parsedBody.isPurchasable === 'true';
    
    // Price validations numbers handle karna
    parsedBody.sellingPrice = parsedBody.sellingPrice ? Number(parsedBody.sellingPrice) : 0;
    parsedBody.costPrice = parsedBody.costPrice ? Number(parsedBody.costPrice) : 0;

    // Agar image upload hui hai toh uska dynamic static link add karein
    if (req.file) {
      // Dynamic host url nikalna (Local pe localhost aur Render pe Render ki link)
      const hostUrl = `${req.protocol}://${req.get('host')}`;
      parsedBody.imageUrl = `${hostUrl}/uploads/${req.file.filename}`;
    }

    const newItem = new Item(parsedBody);
    const savedItem = await newItem.save();
    return res.status(201).json({ success: true, data: savedItem });
  } catch (error) {
    console.error("Error saving item:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// 2. Saare Items Get Karne Ka Endpoint
router.get('/all', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;