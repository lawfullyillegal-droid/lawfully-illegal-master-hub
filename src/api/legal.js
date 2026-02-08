/**
 * Legal Definitions API
 * Get legal definitions with USC/UCC citations
 */

const express = require('express');
const router = express.Router();
const legalData = require('../data/legal-terms');

/**
 * GET /api/legal/define/:term
 * Get legal definition for a specific term
 */
router.get('/define/:term', (req, res) => {
  const term = req.params.term.toLowerCase();
  const definition = legalData[term];

  if (!definition) {
    return res.status(404).json({
      error: 'Term not found',
      term: req.params.term,
      suggestions: Object.keys(legalData).filter(key => key.includes(term)).slice(0, 5)
    });
  }

  res.json({
    term: req.params.term,
    definition: definition.definition,
    usc_citation: definition.usc_citation,
    ucc_citation: definition.ucc_citation,
    constitution_ref: definition.constitution_ref,
    blacks_law_ref: definition.blacks_law_ref,
    source: 'legal-decipher-system'
  });
});

/**
 * GET /api/legal/terms
 * List all available legal terms
 */
router.get('/terms', (req, res) => {
  res.json({
    terms: Object.keys(legalData),
    count: Object.keys(legalData).length
  });
});

module.exports = router;
