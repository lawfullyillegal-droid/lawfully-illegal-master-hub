/**
 * Money Types API
 * Retrieve money type definitions with statutory basis
 */

const express = require('express');
const router = express.Router();
const moneyData = require('../data/money-definitions');

/**
 * GET /api/money/types
 * Get all money type definitions
 */
router.get('/types', (req, res) => {
  res.json({
    definitions: moneyData,
    source: 'medium-of-exchange repository',
    legal_basis: {
      ucc: 'UCC § 1-201(24)',
      federal: ['12 USC § 411', '31 USC § 5103'],
      constitutional: ['Article I, Section 8', 'Article I, Section 10']
    }
  });
});

/**
 * GET /api/money/types/:type
 * Get specific money type definition
 */
router.get('/types/:type', (req, res) => {
  const type = req.params.type.toLowerCase().replace(/-/g, '_');
  const definition = moneyData.find(d => d.type.toLowerCase().replace(/ /g, '_') === type);

  if (!definition) {
    return res.status(404).json({
      error: 'Money type not found',
      type: req.params.type,
      available_types: moneyData.map(d => d.type)
    });
  }

  res.json(definition);
});

module.exports = router;
