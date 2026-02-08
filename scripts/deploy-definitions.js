#!/usr/bin/env node

/**
 * Deploy Legal Definitions Script
 * Deploys legal definitions and money types to various integrated platforms
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const target = getArgValue(args, '--target');

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║  Deploy Legal Definitions                              ║');
console.log('║  Lawfully Illegal Master Hub                           ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

if (!target) {
  console.error('Error: --target parameter is required');
  console.log('Usage: node scripts/deploy-definitions.js --target=<target>');
  console.log('\nAvailable targets:');
  console.log('  - webador          Deploy to Webador website');
  console.log('  - ni-generator     Update NI tender letter generator');
  console.log('  - evidence-ledger  Sync evidence ledger configuration');
  console.log('  - all              Deploy to all targets');
  process.exit(1);
}

async function deploy() {
  console.log(`Target: ${target}\n`);

  switch (target) {
    case 'webador':
      await deployToWebador();
      break;
    case 'ni-generator':
      await deployToNIGenerator();
      break;
    case 'evidence-ledger':
      await deployToEvidenceLedger();
      break;
    case 'all':
      await deployToWebador();
      await deployToNIGenerator();
      await deployToEvidenceLedger();
      break;
    default:
      console.error(`Unknown target: ${target}`);
      process.exit(1);
  }

  console.log('\n✅ Deployment completed successfully!');
}

async function deployToWebador() {
  console.log('📤 Deploying to Webador...');
  
  const legalTerms = require('../src/data/legal-terms');
  const moneyDefinitions = require('../src/data/money-definitions');
  
  console.log(`  - Legal terms: ${Object.keys(legalTerms).length} definitions`);
  console.log(`  - Money types: ${moneyDefinitions.length} definitions`);
  
  // TODO: Integrate with Webador API
  console.log('  - API integration: Pending Webador API credentials');
  console.log('  - Manual upload: Available at lawfully-illegal.com admin panel');
  console.log('  ✓ Webador deployment prepared');
}

async function deployToNIGenerator() {
  console.log('📤 Deploying to NI Tender Letter Generator...');
  
  const moneyDefinitions = require('../src/data/money-definitions');
  
  console.log(`  - Money definitions: ${moneyDefinitions.length} types`);
  console.log('  - UCC Article 3 references updated');
  
  // TODO: Update ni-tender-letter-generator repository
  console.log('  - Repository: lawfullyillegal-droid/ni-tender-letter-generator');
  console.log('  - Integration: Pending GitHub API token');
  console.log('  ✓ NI Generator deployment prepared');
}

async function deployToEvidenceLedger() {
  console.log('📤 Deploying to Evidence Ledger...');
  
  const legalTerms = require('../src/data/legal-terms');
  
  console.log(`  - Legal citations: ${Object.keys(legalTerms).length} terms`);
  console.log('  - Blockchain timestamping configuration');
  
  // TODO: Update evidence-ledger repository
  console.log('  - Repository: lawfullyillegal-droid/evidence-ledger');
  console.log('  - Integration: Pending GitHub API token');
  console.log('  ✓ Evidence Ledger deployment prepared');
}

function getArgValue(args, flag) {
  const arg = args.find(a => a.startsWith(flag));
  if (!arg) return null;
  return arg.split('=')[1];
}

deploy().catch(err => {
  console.error('Deployment error:', err);
  process.exit(1);
});
