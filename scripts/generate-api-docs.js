#!/usr/bin/env node

/**
 * API Documentation Generator
 * Generates comprehensive API documentation from endpoints
 */

const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║  Generate API Documentation                            ║');
console.log('║  Lawfully Illegal Master Hub                           ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

const documentation = `# API Documentation

## Lawfully Illegal Master Hub API

**Version:** 1.0.0  
**Base URL:** \`http://localhost:3000\` (development) or your production URL

---

## Overview

The Lawfully Illegal Master Hub provides REST API endpoints for:
- Legal term definitions with statutory citations
- Money type definitions and classifications
- Statute search across USC, CFR, and UCC
- Evidence submission with blockchain timestamping
- Trust verification for oath-taking officials
- UCC Article 3 tender letter generation

---

## Authentication

Currently, all endpoints are publicly accessible. Future versions will implement API key authentication.

---

## Endpoints

### 1. Legal Definitions

#### Get Legal Definition
\`\`\`
GET /api/legal/define/:term
\`\`\`

**Description:** Retrieve legal definition for a specific term with USC/UCC citations.

**Parameters:**
- \`term\` (path parameter): Legal term to define (e.g., "money", "person", "corporation")

**Example Request:**
\`\`\`bash
curl http://localhost:3000/api/legal/define/money
\`\`\`

**Example Response:**
\`\`\`json
{
  "term": "money",
  "definition": "A medium of exchange currently authorized or adopted...",
  "usc_citation": "12 USC § 411, 31 USC § 5103",
  "ucc_citation": "UCC § 1-201(24)",
  "constitution_ref": "Article I, Section 8; Article I, Section 10",
  "blacks_law_ref": "A medium of exchange authorized or adopted...",
  "source": "legal-decipher-system"
}
\`\`\`

#### List All Terms
\`\`\`
GET /api/legal/terms
\`\`\`

**Description:** Get list of all available legal terms.

---

### 2. Money Types

#### Get All Money Types
\`\`\`
GET /api/money/types
\`\`\`

**Description:** Retrieve all money type definitions with statutory basis.

**Example Response:**
\`\`\`json
{
  "definitions": [
    {
      "type": "Commodity Money",
      "legal_definition": "Money that has intrinsic value...",
      "statutory_basis": "Article I, Section 10...",
      "characteristics": {...}
    }
  ],
  "source": "medium-of-exchange repository",
  "legal_basis": {...}
}
\`\`\`

#### Get Specific Money Type
\`\`\`
GET /api/money/types/:type
\`\`\`

**Parameters:**
- \`type\`: Money type (commodity-money, fiat-money, credit-money, electronic-money)

---

### 3. Statute Search

#### Search Statutes
\`\`\`
GET /api/statute/search?q=<query>&type=<usc|cfr|ucc|all>
\`\`\`

**Description:** Search USC, CFR, and UCC by keyword.

**Query Parameters:**
- \`q\` (required): Search query
- \`type\` (optional): Filter by statute type (default: "all")

**Example Request:**
\`\`\`bash
curl "http://localhost:3000/api/statute/search?q=legal+tender&type=usc"
\`\`\`

---

### 4. Evidence Submission

#### Submit Evidence
\`\`\`
POST /api/evidence/submit
\`\`\`

**Description:** Submit evidence with legal citations and blockchain timestamping.

**Request Body:**
\`\`\`json
{
  "evidence_type": "affidavit",
  "description": "Evidence of constitutional rights violation",
  "legal_citations": ["42 USC § 1983", "18 USC § 242"],
  "affidavit_url": "https://example.com/affidavit.pdf",
  "submitter_info": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Evidence submitted successfully",
  "submission": {
    "id": "EVID-1234567890-ABC123XYZ",
    "submission_date": "2026-02-08T08:52:00.000Z",
    "blockchain_hash": "abc123...",
    "status": "submitted"
  }
}
\`\`\`

---

### 5. Trust Verification

#### Verify Trust
\`\`\`
POST /api/trust/verify
\`\`\`

**Description:** Verify trust identifier and check for oath violations.

**Request Body:**
\`\`\`json
{
  "trustee_name": "John Smith",
  "trustee_title": "State Senator",
  "oath_date": "2024-01-15",
  "jurisdiction": "California",
  "trust_type": "constitutional_oath"
}
\`\`\`

#### Get Trust Obligations
\`\`\`
GET /api/trust/obligations
\`\`\`

**Description:** Get list of trust obligations for oath-taking officials.

---

### 6. Tender Generation

#### Generate UCC Article 3 Tender Letter
\`\`\`
POST /api/tender/generate
\`\`\`

**Description:** Generate UCC Article 3 compliant tender letter for debt discharge.

**Request Body:**
\`\`\`json
{
  "debtor_name": "John Doe",
  "debtor_address": "123 Main St, City, State 12345",
  "creditor_name": "ABC Corporation",
  "creditor_address": "456 Corporate Blvd, City, State 67890",
  "debt_amount": "5000.00",
  "account_number": "ACCT-12345",
  "debt_description": "Credit card debt",
  "tender_type": "full_payment"
}
\`\`\`

**Response:** Returns formatted tender letter with UCC citations and instructions.

---

## Error Responses

All endpoints return standard HTTP status codes:

- \`200 OK\`: Successful request
- \`201 Created\`: Resource created successfully
- \`400 Bad Request\`: Invalid request parameters
- \`404 Not Found\`: Resource not found
- \`500 Internal Server Error\`: Server error

**Error Response Format:**
\`\`\`json
{
  "error": "Error message",
  "timestamp": "2026-02-08T08:52:00.000Z"
}
\`\`\`

---

## Rate Limiting

Currently no rate limiting is implemented. Future versions will implement reasonable rate limits.

---

## Support

- Website: https://lawfully-illegal.com
- Email: lawfullyillegal@gmail.com
- GitHub: https://github.com/lawfullyillegal-droid/lawfully-illegal-master-hub

---

**Built to Decipher and Overcome Legal Terminology Manipulation** ⚖️
`;

async function generateDocs() {
  console.log('📝 Generating API documentation...\n');

  const docsPath = path.join(__dirname, '..', 'API-DOCS.md');
  
  fs.writeFileSync(docsPath, documentation);
  
  console.log(`  ✓ Documentation generated: ${docsPath}`);
  console.log('  - Format: Markdown');
  console.log('  - Endpoints documented: 6 categories');
  console.log('  - Examples included: Yes');
  console.log('\n✅ API documentation generation completed!');
}

generateDocs().catch(err => {
  console.error('Documentation generation error:', err);
  process.exit(1);
});
