const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Customer = require('../models/Customer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'cust_' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// 1. Fetch All Customers
router.get('/all', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Add New Customer (with multi-part image upload)
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const bodyData = { ...req.body };
    
    if (req.file) {
      // Dynamic host url nikalna (Local pe localhost aur Render pe Render ki link)
      const hostUrl = `${req.protocol}://${req.get('host')}`;
      bodyData.imageUrl = `${hostUrl}/uploads/${req.file.filename}`;
    }
    
    const newCustomer = new Customer(bodyData);
    await newCustomer.save();
    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 3. Update / Edit Existing Customer
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const bodyData = { ...req.body };
    
    if (req.file) {
      // Dynamic host url nikalna (Local pe localhost aur Render pe Render ki link)
      const hostUrl = `${req.protocol}://${req.get('host')}`;
      bodyData.imageUrl = `${hostUrl}/uploads/${req.file.filename}`;
    }
    
    const updated = await Customer.findByIdAndUpdate(req.params.id, bodyData, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 4. Summary Mock Dashboard API Route
router.get('/dashboard-summary', async (req, res) => {
  try {
    const data = await Customer.find();
    let receivables = 0;
    let payables = 0;
    data.forEach(c => {
      receivables += (c.openingReceivables || 0);
      payables += (c.openingPayables || 0);
    });
    res.status(200).json({ totalReceivables: receivables, totalPayables: payables });
  } catch (err) {
    res.status(500).json({ totalReceivables: 0, totalPayables: 0 });
  }
});

module.exports = router;