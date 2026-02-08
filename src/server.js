/**
 * Lawfully Illegal Master Hub API Server
 * 
 * Main server for the Legal Accountability Ecosystem
 * Provides REST API endpoints for legal definitions, money types, statute search,
 * evidence submission, trust verification, and tender generation.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const legalApi = require('./api/legal');
const moneyApi = require('./api/money');
const statuteApi = require('./api/statute');
const evidenceApi = require('./api/evidence');
const trustApi = require('./api/trust');
const tenderApi = require('./api/tender');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Lawfully Illegal Master Hub API',
    version: '1.0.0',
    status: 'active',
    description: 'Unified Legal Accountability Ecosystem',
    endpoints: {
      legal: '/api/legal/define/:term',
      money: '/api/money/types',
      statute: '/api/statute/search',
      evidence: '/api/evidence/submit',
      trust: '/api/trust/verify',
      tender: '/api/tender/generate'
    },
    documentation: 'https://github.com/lawfullyillegal-droid/lawfully-illegal-master-hub'
  });
});

// API Routes
app.use('/api/legal', legalApi);
app.use('/api/money', moneyApi);
app.use('/api/statute', statuteApi);
app.use('/api/evidence', evidenceApi);
app.use('/api/trust', trustApi);
app.use('/api/tender', tenderApi);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  Lawfully Illegal Master Hub API Server                   ║
║  Unified Legal Accountability Ecosystem                    ║
╚════════════════════════════════════════════════════════════╝

Server running on port ${PORT}
Environment: ${process.env.NODE_ENV || 'development'}

API Endpoints:
  - GET  /api/legal/define/:term
  - GET  /api/money/types
  - GET  /api/statute/search?q=<query>
  - POST /api/evidence/submit
  - POST /api/trust/verify
  - POST /api/tender/generate

Built to Decipher and Overcome Legal Terminology Manipulation
  `);
});

module.exports = app;
