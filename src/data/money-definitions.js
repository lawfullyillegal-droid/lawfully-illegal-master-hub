/**
 * Money Definitions Database
 * Integrated from medium-of-exchange repository
 */

module.exports = [
  {
    type: 'Commodity Money',
    legal_definition: 'Money that has intrinsic value as a commodity. The material from which it is made has value in itself.',
    statutory_basis: 'Article I, Section 10 of the U.S. Constitution: "No State shall...make any Thing but gold and silver Coin a Tender in Payment of Debts"',
    characteristics: {
      intrinsic_value: true,
      examples: ['Gold coins', 'Silver coins', 'Precious metals'],
      advantages: ['Retains value', 'Limited supply', 'Cannot be created arbitrarily'],
      disadvantages: ['Heavy', 'Difficult to transport', 'Supply constraints']
    },
    historical_context: 'Used throughout human history. U.S. Constitution specifically mentions gold and silver.',
    current_status: 'Still recognized as legal tender in coin form, but not commonly used in daily transactions'
  },
  {
    type: 'Fiat Money',
    legal_definition: 'Government-issued currency that is not backed by a physical commodity. It has value because the government maintains it and people have faith in its value.',
    statutory_basis: '12 USC § 411: Federal Reserve notes shall be obligations of the United States; 31 USC § 5103: United States coins and currency are legal tender',
    characteristics: {
      intrinsic_value: false,
      examples: ['U.S. Dollar bills', 'Federal Reserve Notes', 'Most modern currencies'],
      advantages: ['Convenient', 'Easy to transport', 'Supply can be managed'],
      disadvantages: ['Subject to inflation', 'Value based on government backing', 'Can be created without limit']
    },
    historical_context: 'U.S. left gold standard in 1971. Modern fiat currency system began.',
    current_status: 'Primary form of money in the United States and most countries worldwide'
  },
  {
    type: 'Credit Money',
    legal_definition: 'Represents a claim on future money. Any agreement that involves a purchase now with payment in the future.',
    statutory_basis: 'UCC Article 3 (Negotiable Instruments): Covers checks, promissory notes, drafts, and other instruments; UCC § 3-104 defines negotiable instruments',
    characteristics: {
      intrinsic_value: false,
      examples: ['Checks', 'Promissory notes', 'Bills of exchange', 'Credit cards'],
      advantages: ['Facilitates commerce', 'Enables lending', 'Creates liquidity'],
      disadvantages: ['Risk of default', 'Requires trust', 'Can create debt spirals']
    },
    historical_context: 'Credit instruments have existed for centuries. UCC Article 3 standardized rules.',
    current_status: 'Widely used in commercial transactions. Governed by UCC in all 50 states'
  },
  {
    type: 'Electronic Money',
    legal_definition: 'Digital representation of currency stored electronically and transferred between parties via electronic systems.',
    statutory_basis: '31 USC § 5103 (applies to digital representations of legal tender); Electronic Fund Transfer Act (15 USC § 1693)',
    characteristics: {
      intrinsic_value: false,
      examples: ['Bank account balances', 'Wire transfers', 'ACH payments', 'Digital wallets'],
      advantages: ['Instant transfers', 'Lower transaction costs', 'Convenient', 'Trackable'],
      disadvantages: ['Requires technology', 'Privacy concerns', 'Hacking risk', 'System dependency']
    },
    historical_context: 'Emerged with computer technology. Accelerated with internet banking.',
    current_status: 'Dominant form of money transfer. Most money exists only as electronic records'
  },
  {
    type: 'Medium of Exchange (General Definition)',
    legal_definition: 'Any item or verifiable record that is generally accepted as payment for goods and services and repayment of debts. The fundamental characteristic of money.',
    statutory_basis: 'UCC § 1-201(24): "Money" means a medium of exchange currently authorized or adopted by a domestic or foreign government',
    characteristics: {
      intrinsic_value: 'Varies by type',
      examples: ['All forms of money', 'Currency', 'Coins', 'Digital currency'],
      advantages: ['Enables trade', 'Unit of account', 'Store of value', 'Standard of deferred payment'],
      disadvantages: ['Value fluctuation', 'Counterfeiting risk', 'Systemic vulnerabilities']
    },
    historical_context: 'Core concept throughout monetary history. UCC § 1-201(24) provides modern legal definition.',
    current_status: 'Fundamental concept in all modern economies. Legally defined in commercial code'
  }
];
