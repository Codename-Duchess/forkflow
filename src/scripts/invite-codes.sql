CREATE TABLE invite_codes (
    code TEXT PRIMARY KEY,
    created_by TEXT,
    used_by TEXT [],
    created_at TIMESTAMP DEFAULT NOW(),
    max_uses INT DEFAULT 5
);