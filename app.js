require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const { logSuccess } = require('./utils/logger');
const apiInfo = require('./config/apiInfo');

const studentsRouter = require('./routes/students');
const responseTime = require('./middleware/responseTime');
const errorHandler = require('./middleware/errorHandler'); // <-- important

const app = express();

// ============================
// CONFIG
// ============================
const PORT = process.env.PORT || 3000;

// ============================
// SECURITY MIDDLEWARE
// ============================
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:5173' // bisa diganti sesuai frontend
}));

// ============================
// LOGGING
// ============================
app.use(morgan('combined'));

// ============================
// RATE LIMIT
// ============================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.RATE_LIMIT || 100,
  message: { status: "fail", message: "Terlalu banyak request." }
});
app.use(limiter);

// ============================
// OTHER MIDDLEWARE
// ============================
app.use(express.json());
app.use(responseTime);

// serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// ============================
// ROUTES
// ============================
app.use('/api/students', studentsRouter);

// INFO ENDPOINT
app.get('/api/info', (req, res) => {
  res.status(200).json({
    status: "success",
    code: 200,
    timestamp: new Date().toISOString(),
    data: apiInfo,
    message: "Service aktif dan siap digunakan!"
  });
});

// HEALTH ENDPOINT (WAJIB)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// ============================
// GLOBAL ERROR HANDLER
// ============================
// ERROR TEST ROUTE
app.get('/api/error-test', (req, res, next) => {
  next(new Error("Ini error test"));
});

app.use(errorHandler);

// ============================
// 404 HANDLER (PALING BAWAH)
// ============================
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    code: 404,
    message: "Endpoint tidak ditemukan"
  });
});

// ============================
// RUN SERVER
// ============================
app.listen(PORT, () => {
  logSuccess(`Server running on http://localhost:${PORT}`);
});
