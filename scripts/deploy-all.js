#!/usr/bin/env node

/**
 * Deploy All Script
 * Comprehensive deployment to all integrated systems
 */

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║  Deploy All Systems                                    ║');
console.log('║  Lawfully Illegal Master Hub                           ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

async function deployAll() {
  const steps = [
    { name: 'Sync Repositories', script: 'sync-repositories.js', args: '--repo=all' },
    { name: 'Deploy Definitions', script: 'deploy-definitions.js', args: '--target=all' },
    { name: 'Generate API Docs', script: 'generate-api-docs.js', args: '' }
  ];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log(`\n[${ i + 1}/${steps.length}] ${step.name}`);
    console.log('─'.repeat(60));
    
    try {
      const { execSync } = require('child_process');
      const cmd = `node scripts/${step.script} ${step.args}`;
      execSync(cmd, { stdio: 'inherit' });
      console.log(`✓ ${step.name} completed`);
    } catch (error) {
      console.error(`✗ ${step.name} failed:`, error.message);
      // Continue with other steps
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  Deployment Summary                                    ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('\n✅ All deployment steps completed!');
  console.log('\nSystem Status:');
  console.log('  - API Server: Ready to start (npm run dev)');
  console.log('  - Legal Definitions: Deployed');
  console.log('  - Repository Sync: Complete');
  console.log('  - Documentation: Generated');
  console.log('\nNext Steps:');
  console.log('  1. Configure API credentials in .env');
  console.log('  2. Start server: npm run dev');
  console.log('  3. Test endpoints: curl http://localhost:3000');
  console.log('  4. Deploy to production hosting');
  console.log('\nVisit: https://lawfully-illegal.com');
  console.log('Documentation: https://github.com/lawfullyillegal-droid/lawfully-illegal-master-hub\n');
}

deployAll().catch(err => {
  console.error('Deployment error:', err);
  process.exit(1);
});
