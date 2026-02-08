# Deployment Guide

## Lawfully Illegal Master Hub - Deployment Instructions

This guide walks you through deploying the Lawfully Illegal Master Hub and integrating it with the complete ecosystem.

---

## 📋 Prerequisites

### Required Software
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **Git**: Latest version
- **PostgreSQL**: v12 or higher (if using database)

### Optional
- **Docker**: For containerized deployment
- **PM2**: For production process management
- **Nginx**: For reverse proxy (production)

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/lawfullyillegal-droid/lawfully-illegal-master-hub.git
cd lawfully-illegal-master-hub

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 2. Configure Environment

Edit `.env` file with your credentials:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# API Keys
GITHUB_TOKEN=your_github_token_here
WEBADOR_API_KEY=your_webador_api_key_here

# Social Media (for ai-clone-os integration)
TWITTER_API_KEY=your_twitter_api_key_here
TWITTER_API_SECRET=your_twitter_api_secret_here
FACEBOOK_API_KEY=your_facebook_api_key_here
LINKEDIN_API_KEY=your_linkedin_api_key_here

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/lawfully_illegal
```

### 3. Database Setup (Optional)

If using PostgreSQL database:

```bash
# Create database
createdb lawfully_illegal

# Run schema
psql lawfully_illegal < database-schema.sql
```

### 4. Start Development Server

```bash
# Start server
npm run dev

# Server will run on http://localhost:3000
```

### 5. Test API Endpoints

```bash
# Test root endpoint
curl http://localhost:3000

# Test legal definition
curl http://localhost:3000/api/legal/define/money

# Test money types
curl http://localhost:3000/api/money/types

# Test statute search
curl "http://localhost:3000/api/statute/search?q=legal+tender"
```

---

## 🔧 Deployment Scripts

### Deploy Legal Definitions

Deploy definitions to integrated platforms:

```bash
# Deploy to all platforms
node scripts/deploy-definitions.js --target=all

# Deploy to specific platform
node scripts/deploy-definitions.js --target=webador
node scripts/deploy-definitions.js --target=ni-generator
node scripts/deploy-definitions.js --target=evidence-ledger
```

### Sync Repositories

Synchronize with ecosystem repositories:

```bash
# Sync all repositories
node scripts/sync-repositories.js --repo=all

# Sync specific repository
node scripts/sync-repositories.js --repo=medium-of-exchange
node scripts/sync-repositories.js --repo=legal-decipher-system
```

### Social Media Automation

Automate legal definition posts:

```bash
# Daily legal definition post
node scripts/social-media-automation.js --action=daily-post

# Run awareness campaign
node scripts/social-media-automation.js --action=campaign

# Post announcement
node scripts/social-media-automation.js --action=announcement
```

### Generate API Documentation

```bash
node scripts/generate-api-docs.js
# Outputs: API-DOCS.md
```

### Complete Deployment

Run all deployment steps:

```bash
npm run deploy:all
```

---

## 🌐 Production Deployment

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start src/server.js --name "lawfully-illegal-hub"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Using Docker

```dockerfile
# Dockerfile (create this file)
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
```

```bash
# Build Docker image
docker build -t lawfully-illegal-hub .

# Run container
docker run -d -p 3000:3000 --name lawfully-illegal-hub lawfully-illegal-hub
```

### Using Nginx as Reverse Proxy

```nginx
# /etc/nginx/sites-available/lawfully-illegal-hub
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/lawfully-illegal-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📊 GitHub Actions Automation

The repository includes GitHub Actions workflows that automatically:

1. **Sync definitions** on every push to main
2. **Deploy tools** after definition sync
3. **Post daily definitions** on schedule (9 AM UTC)
4. **Build and test API** on pull requests

### Setup GitHub Secrets

Add these secrets in your GitHub repository settings:

- `GITHUB_TOKEN` (automatically provided)
- `WEBADOR_API_KEY`
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `FACEBOOK_API_KEY`
- `LINKEDIN_API_KEY`

---

## 🔗 Integration with Ecosystem

### Integrated Repositories

The hub connects with:

1. **medium-of-exchange**: Money definitions
2. **legal-decipher-system**: Legal term database
3. **Trust-identifier-trace**: Fraud detection
4. **ai-clone-os**: Multi-platform automation
5. **ni-tender-letter-generator**: UCC Article 3 letters
6. **evidence-ledger**: Blockchain timestamping
7. **INVESTIGATOR-DESK**: Source verification
8. **viral-ledger**: Social media tracking

### Integration Setup

Each integrated repository can pull definitions via API:

```javascript
// Example: Fetching definitions from hub
const response = await fetch('https://your-hub-domain.com/api/legal/define/money');
const definition = await response.json();
```

---

## 🔐 Security Considerations

### API Security (Future Enhancement)

Currently, all endpoints are public. For production:

1. Implement API key authentication
2. Add rate limiting
3. Use HTTPS/SSL certificates
4. Implement CORS policies
5. Add request validation

### Environment Variables

- Never commit `.env` file
- Use environment-specific configurations
- Rotate API keys regularly
- Use secrets management (AWS Secrets Manager, etc.)

---

## 📈 Monitoring and Maintenance

### Logs

```bash
# View PM2 logs
pm2 logs lawfully-illegal-hub

# View last 100 lines
pm2 logs lawfully-illegal-hub --lines 100

# Clear logs
pm2 flush
```

### Health Checks

```bash
# Check API status
curl http://localhost:3000

# Should return:
# {
#   "name": "Lawfully Illegal Master Hub API",
#   "version": "1.0.0",
#   "status": "active",
#   ...
# }
```

### Updates

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Restart application
pm2 restart lawfully-illegal-hub
```

---

## 🆘 Troubleshooting

### Server Won't Start

```bash
# Check if port is in use
lsof -i :3000

# Kill process on port 3000
kill -9 $(lsof -t -i:3000)

# Check logs
cat /var/log/pm2/lawfully-illegal-hub-error.log
```

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql -h localhost -U your_user -d lawfully_illegal

# Check database exists
psql -l | grep lawfully_illegal
```

### API Not Responding

```bash
# Check if server is running
pm2 status

# Restart server
pm2 restart lawfully-illegal-hub

# Check firewall rules
sudo ufw status
```

---

## 📞 Support

- **Website**: https://lawfully-illegal.com
- **Email**: lawfullyillegal@gmail.com
- **GitHub**: https://github.com/lawfullyillegal-droid/lawfully-illegal-master-hub
- **Issues**: https://github.com/lawfullyillegal-droid/lawfully-illegal-master-hub/issues

---

## 📝 License

MIT License - See LICENSE file for details

---

**Built to Decipher and Overcome Legal Terminology Manipulation** ⚖️💪
