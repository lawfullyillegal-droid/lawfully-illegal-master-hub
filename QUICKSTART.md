# 🚀 Quick Start Guide

Get the Lawfully Illegal Master Dashboard up and running in 5 minutes!

## Prerequisites

- Node.js 14.0.0 or higher
- npm (comes with Node.js)
- Git (for cloning the repository)

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/lawfullyillegal-droid/lawfully-illegal-master-hub.git
cd lawfully-illegal-master-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` if needed (optional for local development):
```env
PORT=3000
NODE_ENV=development
# Database and API keys are optional for basic functionality
```

### 4. Start the Development Server
```bash
npm run dev
```

The server will start on **http://localhost:3000**

You should see:
```
╔════════════════════════════════════════════════════════════╗
║  Lawfully Illegal Master Hub API Server                   ║
║  Unified Legal Accountability Ecosystem                    ║
╚════════════════════════════════════════════════════════════╝

🚀 Server running on port 3000
🌐 Dashboard → http://localhost:3000
📊 Environment: development
```

### 5. Access the Dashboard

Open your browser and navigate to:
```
http://localhost:3000
```

## Dashboard Features

### 🔍 Legal Term Search
Search for legal definitions with statutory citations:
- Try searching: `money`, `person`, `corporation`, `trust`, `fraud`
- Each result includes USC, UCC, Constitutional references, and Black's Law Dictionary definitions

### 💰 Money Types & Definitions
Explore legal definitions of money based on:
- **UCC § 1-201(24)**: Legal definition of money as medium of exchange
- **12 USC § 411, 31 USC § 5103**: Federal statutes
- **Article I, Section 8 & 10**: Constitutional provisions

Money types available:
- Commodity Money (gold, silver)
- Fiat Money (Federal Reserve Notes)
- Credit Money (checks, promissory notes)
- Electronic Money (digital transfers)

### 📋 Evidence Submission
Submit evidence to the blockchain-timestamped ledger:
1. Select evidence type (Affidavit, Contract, etc.)
2. Enter description with legal citations
3. Receive unique submission ID and blockchain hash
4. Evidence is timestamped for immutable record-keeping

### 📄 Tender Letter Generator
Generate UCC Article 3 compliant negotiable instrument tender letters.

### 📊 API Status
Monitor the health and status of all API endpoints.

## API Endpoints

The dashboard connects to these REST API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/legal/define/:term` | GET | Get legal definition for a term |
| `/api/legal/terms` | GET | List all available legal terms |
| `/api/money/types` | GET | Get all money type definitions |
| `/api/money/types/:type` | GET | Get specific money type |
| `/api/evidence/submit` | POST | Submit evidence to ledger |
| `/api/tender/generate` | POST | Generate tender letter |
| `/api/trust/verify` | POST | Verify trust obligations |
| `/api/statute/search` | GET | Search statutes |

## Testing API Endpoints

You can test API endpoints directly using curl:

```bash
# Get definition of "money"
curl http://localhost:3000/api/legal/define/money

# Get all money types
curl http://localhost:3000/api/money/types

# Submit evidence
curl -X POST http://localhost:3000/api/evidence/submit \
  -H "Content-Type: application/json" \
  -d '{"evidence_type":"affidavit","description":"Test submission"}'
```

## Production Deployment

To run in production mode:

```bash
# Set production environment
export NODE_ENV=production

# Start server
npm start
```

For deployment to cloud platforms, see [DEPLOYMENT.md](DEPLOYMENT.md)

## Database Integration (Optional)

To enable database features:

1. Install and start PostgreSQL:
```bash
# Using Docker
docker run --name lawfully-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=lawfully \
  -p 5432:5432 \
  -d postgres
```

2. Update `.env`:
```env
DATABASE_URL=postgres://postgres:password@localhost:5432/lawfully
```

3. Load the database schema:
```bash
psql -U postgres -d lawfully -f database-schema.sql
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change it in `.env`:
```env
PORT=3001
```

### Dependencies Not Installing
Clear npm cache and reinstall:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Module Not Found Errors
Ensure you're in the project root directory and dependencies are installed:
```bash
cd lawfully-illegal-master-hub
npm install
```

## Next Steps

1. **Explore the API**: Try all the dashboard features
2. **Review Documentation**: Check [README.md](README.md) for full details
3. **Integrate Other Repos**: Connect with other Lawfully Illegal ecosystem tools
4. **Customize**: Modify the dashboard to suit your needs

## Resources

- **Main Website**: [lawfully-illegal.com](https://www.lawfully-illegal.com)
- **GitHub Organization**: [github.com/lawfullyillegal-droid](https://github.com/lawfullyillegal-droid)
- **API Documentation**: [API-DOCS.md](API-DOCS.md)
- **System Overview**: [SYSTEM-OVERVIEW.md](SYSTEM-OVERVIEW.md)
- **Contributing Guide**: [CONTRIBUTING.md](CONTRIBUTING.md)

## Support

For questions or issues:
- Open an issue on GitHub
- Email: lawfullyillegal@gmail.com
- ORCID: [0009-0002-7324-9643](https://orcid.org/0009-0002-7324-9643)

---

**Built to Decipher and Overcome Legal Terminology Manipulation** ⚖️🚀
