/**
 * Statute Search API
 * Search USC, CFR, UCC by keyword
 */

const express = require('express');
const router = express.Router();

/**
 * GET /api/statute/search?q=<query>&type=<usc|cfr|ucc>
 * Search statutes by keyword
 */
router.get('/search', (req, res) => {
  const query = req.query.q;
  const type = req.query.type || 'all';

  if (!query) {
    return res.status(400).json({
      error: 'Query parameter "q" is required'
    });
  }

  // Placeholder implementation - will integrate with actual statute databases
  const results = searchStatutes(query, type);

  res.json({
    query: query,
    type: type,
    results: results,
    count: results.length,
    note: 'Integration with full statute databases pending'
  });
});

/**
 * Placeholder search function
 * TODO: Integrate with actual USC/CFR/UCC databases
 */
function searchStatutes(query, type) {
  const sampleResults = [
    {
      type: 'USC',
      citation: '12 USC § 411',
      title: 'Issuance to reserve banks; nature of obligation',
      text: 'Federal Reserve notes shall be obligations of the United States...',
      relevance: 0.95
    },
    {
      type: 'USC',
      citation: '31 USC § 5103',
      title: 'Legal tender',
      text: 'United States coins and currency are legal tender for all debts...',
      relevance: 0.90
    },
    {
      type: 'UCC',
      citation: 'UCC § 1-201(24)',
      title: 'Money',
      text: 'Money means a medium of exchange currently authorized or adopted...',
      relevance: 0.88
    }
  ];

  return sampleResults.filter(result => {
    if (type !== 'all' && result.type.toLowerCase() !== type.toLowerCase()) {
      return false;
    }
    const searchText = `${result.citation} ${result.title} ${result.text}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
  });
}

module.exports = router;
