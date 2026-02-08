/**
 * Tender Generation API
 * Generate UCC Article 3 tender letters for debt discharge
 */

const express = require('express');
const router = express.Router();

/**
 * POST /api/tender/generate
 * Generate UCC Article 3 compliant tender letter
 */
router.post('/generate', (req, res) => {
  const {
    debtor_name,
    debtor_address,
    creditor_name,
    creditor_address,
    debt_amount,
    account_number,
    debt_description,
    tender_type
  } = req.body;

  if (!debtor_name || !creditor_name || !debt_amount) {
    return res.status(400).json({
      error: 'debtor_name, creditor_name, and debt_amount are required fields'
    });
  }

  const tender_id = generateTenderId();
  const tender_date = new Date().toISOString();

  // Generate tender letter content
  const tender_letter = generateTenderLetter({
    tender_id,
    tender_date,
    debtor_name,
    debtor_address,
    creditor_name,
    creditor_address,
    debt_amount,
    account_number,
    debt_description,
    tender_type: tender_type || 'full_payment'
  });

  res.json({
    success: true,
    tender_id: tender_id,
    tender_date: tender_date,
    tender_letter: tender_letter,
    instructions: [
      'Review the generated tender letter carefully',
      'Print on official letterhead if available',
      'Send via certified mail with return receipt',
      'Keep copies for your records',
      'Track delivery confirmation',
      'Upload tracking evidence to evidence-ledger'
    ],
    legal_basis: {
      ucc: 'UCC § 3-603 (Tender of payment)',
      discharge: 'UCC § 3-604 (Discharge by cancellation)',
      accord_satisfaction: 'UCC § 3-311 (Accord and satisfaction)'
    },
    source: 'ni-tender-letter-generator',
    disclaimer: 'This is a legal document. Consult with legal counsel if needed.'
  });
});

function generateTenderId() {
  return 'TENDER-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function generateTenderLetter(data) {
  const letter = `
NEGOTIABLE INSTRUMENT - UCC ARTICLE 3 TENDER LETTER

Tender ID: ${data.tender_id}
Date: ${new Date(data.tender_date).toLocaleDateString()}

FROM:
${data.debtor_name}
${data.debtor_address || '[Your Address]'}

TO:
${data.creditor_name}
${data.creditor_address || '[Creditor Address]'}

RE: Tender of Payment - Account #${data.account_number || '[Account Number]'}

Dear Sir/Madam,

Pursuant to the Uniform Commercial Code (UCC) Article 3, specifically UCC § 3-603 regarding tender of payment, I hereby tender payment for the following obligation:

DEBT DESCRIPTION: ${data.debt_description || 'Outstanding obligation'}
DEBT AMOUNT: $${data.debt_amount}
ACCOUNT NUMBER: ${data.account_number || 'N/A'}

LEGAL BASIS:
This tender is made in accordance with:
- UCC § 3-603: Tender of payment
- UCC § 3-604: Discharge by cancellation or renunciation
- UCC § 3-311: Accord and satisfaction by use of instrument

MONEY DEFINITION:
"Money" is defined as a medium of exchange currently authorized or adopted by a domestic or foreign government (UCC § 1-201(24)). This tender constitutes lawful money as defined under:
- 12 USC § 411: Federal Reserve notes as obligations of the United States
- 31 USC § 5103: United States coins and currency as legal tender

TENDER TYPE: ${data.tender_type}

This constitutes full and complete tender of payment. Upon acceptance, this obligation shall be discharged in accordance with UCC Article 3.

Please acknowledge receipt and acceptance of this tender within thirty (30) days. Failure to respond constitutes acceptance by acquiescence.

Sincerely,

_________________________
${data.debtor_name}

CC: Evidence Ledger - lawfully-illegal.com
`;

  return letter;
}

module.exports = router;
