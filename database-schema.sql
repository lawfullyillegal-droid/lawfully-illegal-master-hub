-- Database Schema for Lawfully Illegal Master Hub
-- Legal Accountability Ecosystem Database Structure

-- ============================================================================
-- Legal Terms and Definitions
-- ============================================================================

CREATE TABLE legal_terms (
  id SERIAL PRIMARY KEY,
  term VARCHAR(255) NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  usc_citation VARCHAR(500),
  ucc_citation VARCHAR(500),
  cfr_citation VARCHAR(500),
  constitution_ref VARCHAR(500),
  blacks_law_ref TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_legal_terms_term ON legal_terms(term);
CREATE INDEX idx_legal_terms_usc ON legal_terms(usc_citation);
CREATE INDEX idx_legal_terms_ucc ON legal_terms(ucc_citation);

-- ============================================================================
-- Money Definitions
-- ============================================================================

CREATE TABLE money_definitions (
  id SERIAL PRIMARY KEY,
  money_type VARCHAR(100) NOT NULL UNIQUE,
  legal_definition TEXT NOT NULL,
  statutory_basis TEXT NOT NULL,
  characteristics JSONB,
  historical_context TEXT,
  current_status TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_money_type ON money_definitions(money_type);

-- ============================================================================
-- Evidence Records
-- ============================================================================

CREATE TABLE evidence_records (
  id VARCHAR(100) PRIMARY KEY,
  submission_date TIMESTAMP NOT NULL,
  evidence_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  legal_citations TEXT[],
  affidavit_url VARCHAR(500),
  blockchain_hash VARCHAR(128) UNIQUE,
  verification_status VARCHAR(50) DEFAULT 'pending',
  submitter_info JSONB,
  status VARCHAR(50) DEFAULT 'submitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_evidence_date ON evidence_records(submission_date);
CREATE INDEX idx_evidence_type ON evidence_records(evidence_type);
CREATE INDEX idx_evidence_status ON evidence_records(status);
CREATE INDEX idx_evidence_blockchain ON evidence_records(blockchain_hash);

-- ============================================================================
-- Trust Verifications
-- ============================================================================

CREATE TABLE trust_verifications (
  id SERIAL PRIMARY KEY,
  trustee_name VARCHAR(255) NOT NULL,
  trustee_title VARCHAR(255) NOT NULL,
  oath_date DATE,
  jurisdiction VARCHAR(255),
  trust_type VARCHAR(100) DEFAULT 'constitutional_oath',
  verification_status VARCHAR(50) DEFAULT 'verified',
  violations_detected TEXT[],
  verification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verification_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_trust_trustee_name ON trust_verifications(trustee_name);
CREATE INDEX idx_trust_jurisdiction ON trust_verifications(jurisdiction);
CREATE INDEX idx_trust_status ON trust_verifications(verification_status);

-- ============================================================================
-- Tender Letters
-- ============================================================================

CREATE TABLE tender_letters (
  id VARCHAR(100) PRIMARY KEY,
  tender_date TIMESTAMP NOT NULL,
  debtor_name VARCHAR(255) NOT NULL,
  debtor_address TEXT,
  creditor_name VARCHAR(255) NOT NULL,
  creditor_address TEXT,
  debt_amount DECIMAL(15,2) NOT NULL,
  account_number VARCHAR(100),
  debt_description TEXT,
  tender_type VARCHAR(50) DEFAULT 'full_payment',
  letter_content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'generated',
  tracking_number VARCHAR(100),
  delivery_confirmation_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tender_debtor ON tender_letters(debtor_name);
CREATE INDEX idx_tender_creditor ON tender_letters(creditor_name);
CREATE INDEX idx_tender_date ON tender_letters(tender_date);
CREATE INDEX idx_tender_status ON tender_letters(status);

-- ============================================================================
-- Statute References
-- ============================================================================

CREATE TABLE statute_references (
  id SERIAL PRIMARY KEY,
  statute_type VARCHAR(50) NOT NULL, -- USC, CFR, UCC
  citation VARCHAR(500) NOT NULL UNIQUE,
  title TEXT NOT NULL,
  full_text TEXT,
  summary TEXT,
  related_citations TEXT[],
  effective_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_statute_type ON statute_references(statute_type);
CREATE INDEX idx_statute_citation ON statute_references(citation);

-- ============================================================================
-- Public Officials (Oath-Taking Officials as Trustees)
-- ============================================================================

CREATE TABLE public_officials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  jurisdiction VARCHAR(255),
  office_type VARCHAR(100),
  oath_date DATE,
  oath_text TEXT,
  term_start DATE,
  term_end DATE,
  status VARCHAR(50) DEFAULT 'active',
  contact_info JSONB,
  violations JSONB,
  accountability_score DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_official_name ON public_officials(name);
CREATE INDEX idx_official_jurisdiction ON public_officials(jurisdiction);
CREATE INDEX idx_official_status ON public_officials(status);

-- ============================================================================
-- Repository Integration Status
-- ============================================================================

CREATE TABLE repository_sync_status (
  id SERIAL PRIMARY KEY,
  repository_name VARCHAR(255) NOT NULL UNIQUE,
  last_sync_date TIMESTAMP,
  sync_status VARCHAR(50) DEFAULT 'pending',
  definitions_synced INTEGER DEFAULT 0,
  errors TEXT[],
  next_sync_scheduled TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_repo_sync_status ON repository_sync_status(sync_status);
CREATE INDEX idx_repo_last_sync ON repository_sync_status(last_sync_date);

-- ============================================================================
-- API Access Logs (for future authentication)
-- ============================================================================

CREATE TABLE api_logs (
  id SERIAL PRIMARY KEY,
  endpoint VARCHAR(500) NOT NULL,
  method VARCHAR(10) NOT NULL,
  request_data JSONB,
  response_status INTEGER,
  response_data JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  api_key VARCHAR(100),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_api_endpoint ON api_logs(endpoint);
CREATE INDEX idx_api_timestamp ON api_logs(timestamp);
CREATE INDEX idx_api_key ON api_logs(api_key);

-- ============================================================================
-- Views for Common Queries
-- ============================================================================

-- View: Active Evidence Submissions
CREATE VIEW active_evidence AS
SELECT id, submission_date, evidence_type, description, 
       blockchain_hash, verification_status
FROM evidence_records
WHERE status = 'submitted'
ORDER BY submission_date DESC;

-- View: Constitutional Oath Violations
CREATE VIEW oath_violations AS
SELECT po.name, po.title, po.jurisdiction, po.oath_date,
       tv.violations_detected, tv.verification_date
FROM public_officials po
LEFT JOIN trust_verifications tv ON po.name = tv.trustee_name
WHERE array_length(tv.violations_detected, 1) > 0;

-- ============================================================================
-- Sample Data Inserts
-- ============================================================================

-- Insert core legal terms
INSERT INTO legal_terms (term, definition, usc_citation, ucc_citation, constitution_ref)
VALUES 
  ('money', 'A medium of exchange currently authorized or adopted by a domestic or foreign government', 
   '12 USC § 411, 31 USC § 5103', 'UCC § 1-201(24)', 
   'Article I, Section 8; Article I, Section 10'),
  ('person', 'Includes an individual or an organization', 
   '1 USC § 1', 'UCC § 1-201(30)', 'Fourteenth Amendment');

-- Insert money types
INSERT INTO money_definitions (money_type, legal_definition, statutory_basis)
VALUES 
  ('Commodity Money', 'Money that has intrinsic value as a commodity', 
   'Article I, Section 10: gold and silver coin'),
  ('Fiat Money', 'Government-issued currency not backed by physical commodity', 
   '12 USC § 411, 31 USC § 5103');

-- ============================================================================
-- Functions and Triggers
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_legal_terms_updated_at BEFORE UPDATE ON legal_terms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_money_definitions_updated_at BEFORE UPDATE ON money_definitions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evidence_records_updated_at BEFORE UPDATE ON evidence_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trust_verifications_updated_at BEFORE UPDATE ON trust_verifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tender_letters_updated_at BEFORE UPDATE ON tender_letters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_public_officials_updated_at BEFORE UPDATE ON public_officials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- End of Schema
-- ============================================================================
