const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const dns = require("dns");

// Change DNS setup for network stability on cloud services
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// Database Connection call
connectDB();

// Sahi allowedOrigins jisme aapka live Vercel link added hai
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:3000',
  'https://zohobooks-amber.vercel.app' // Aapka live frontend domain
];

// FIXED: Duplicate block ko hata kar sirf ek baar clean CORS setup kiya hai
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());

// Console Logger setup taaki incoming requests live terminal me dikhein
app.use((req, res, next) => {
    console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} request received at: ${req.url}`);
    next();
});

// Main Registered Routes Setup 
app.use('/api/customers', require('./routes/customerRoutes')); 
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/uploads', express.static('uploads'));
app.use('/api/estimates', require('./routes/estimateRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));

// Root Fallback Route
app.get('/', (req, res) => {
    res.send('🚀 Zoho Clone Backend Server Running Perfectly.');
});

// Port activation setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running smoothly on port ${PORT}`);
});
