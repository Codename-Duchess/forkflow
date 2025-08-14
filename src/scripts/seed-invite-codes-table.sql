-- Drop table if it exists (optional - remove if you want to keep existing data)
DROP TABLE IF EXISTS invite_codes CASCADE;

-- Create invite_codes table
CREATE TABLE invite_codes (
    id SERIAL PRIMARY KEY,
    code UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    user_id INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'Invited' CHECK (status IN ('Invited', 'Accepted', 'Expired', 'Revoked')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    new_user_id INTEGER,
    -- Additional useful columns
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days'),
    accepted_at TIMESTAMP WITH TIME ZONE,
    revoked_at TIMESTAMP WITH TIME ZONE,
    revoked_by INTEGER,
    invite_message TEXT,
    max_uses INTEGER DEFAULT 1,
    current_uses INTEGER DEFAULT 0,
    -- Foreign key constraints (uncomment if users table exists)
    -- CONSTRAINT fk_invite_codes_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    -- CONSTRAINT fk_invite_codes_new_user_id FOREIGN KEY (new_user_id) REFERENCES users(id) ON DELETE SET NULL,
    -- CONSTRAINT fk_invite_codes_revoked_by FOREIGN KEY (revoked_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for better performance
CREATE INDEX idx_invite_codes_code ON invite_codes(code);
CREATE INDEX idx_invite_codes_user_id ON invite_codes(user_id);
CREATE INDEX idx_invite_codes_status ON invite_codes(status);
CREATE INDEX idx_invite_codes_new_user_id ON invite_codes(new_user_id);
CREATE INDEX idx_invite_codes_created_at ON invite_codes(created_at);
CREATE INDEX idx_invite_codes_expires_at ON invite_codes(expires_at);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_invite_codes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    
    -- Automatically set accepted_at when status changes to 'Accepted'
    IF NEW.status = 'Accepted' AND OLD.status != 'Accepted' THEN
        NEW.accepted_at = CURRENT_TIMESTAMP;
        NEW.current_uses = NEW.current_uses + 1;
    END IF;
    
    -- Automatically set revoked_at when status changes to 'Revoked'
    IF NEW.status = 'Revoked' AND OLD.status != 'Revoked' THEN
        NEW.revoked_at = CURRENT_TIMESTAMP;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update timestamps
CREATE TRIGGER update_invite_codes_updated_at
    BEFORE UPDATE ON invite_codes
    FOR EACH ROW
    EXECUTE FUNCTION update_invite_codes_updated_at();

-- Function to automatically expire old invites
CREATE OR REPLACE FUNCTION expire_old_invites()
RETURNS INTEGER AS $$
DECLARE
    expired_count INTEGER;
BEGIN
    UPDATE invite_codes 
    SET status = 'Expired', updated_at = CURRENT_TIMESTAMP
    WHERE status = 'Invited' 
    AND expires_at < CURRENT_TIMESTAMP;
    
    GET DIAGNOSTICS expired_count = ROW_COUNT;
    RETURN expired_count;
END;
$$ language 'plpgsql';

-- Table is now ready for invite code generation from your UI
-- No sample data inserted - clean database ready for production

-- Create some useful views for common queries
CREATE VIEW active_invites AS
SELECT 
    id,
    code,
    user_id,
    status,
    created_at,
    expires_at,
    new_user_id,
    invite_message,
    current_uses,
    max_uses
FROM invite_codes 
WHERE status = 'Invited' 
AND expires_at > CURRENT_TIMESTAMP;

CREATE VIEW invite_statistics AS
SELECT 
    user_id,
    COUNT(*) as total_invites_sent,
    COUNT(CASE WHEN status = 'Accepted' THEN 1 END) as successful_invites,
    COUNT(CASE WHEN status = 'Invited' AND expires_at > CURRENT_TIMESTAMP THEN 1 END) as pending_invites,
    COUNT(CASE WHEN status = 'Expired' THEN 1 END) as expired_invites,
    COUNT(CASE WHEN status = 'Revoked' THEN 1 END) as revoked_invites,
    ROUND(
        (COUNT(CASE WHEN status = 'Accepted' THEN 1 END)::DECIMAL / 
         NULLIF(COUNT(*), 0) * 100), 2
    ) as success_rate_percentage
FROM invite_codes 
GROUP BY user_id;

CREATE VIEW recent_invites AS
SELECT 
    ic.id,
    ic.code,
    ic.user_id,
    ic.status,
    ic.created_at,
    ic.expires_at,
    ic.new_user_id,
    ic.invite_message,
    CASE 
        WHEN ic.status = 'Invited' AND ic.expires_at > CURRENT_TIMESTAMP THEN 'Active'
        WHEN ic.status = 'Invited' AND ic.expires_at <= CURRENT_TIMESTAMP THEN 'Expired'
        ELSE ic.status
    END as current_status
FROM invite_codes ic
WHERE ic.created_at > CURRENT_TIMESTAMP - INTERVAL '30 days'
ORDER BY ic.created_at DESC;

-- Display success message
SELECT 'Invite codes table created successfully!' as message;