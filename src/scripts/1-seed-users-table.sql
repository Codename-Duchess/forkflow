-- Drop table if it exists
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_sessions INTEGER DEFAULT 0,
    average_session_length INTERVAL DEFAULT '0 minutes',
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    account_status TEXT DEFAULT 'active',
    password_hash VARCHAR(255),
    profile_picture_url VARCHAR(500),
    total_time INTERVAL DEFAULT '0 minutes',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    invite_codes TEXT[],
    free_trial_expiry TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days')
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_last_login ON users(last_login);
CREATE INDEX idx_users_status ON users(account_status);
CREATE INDEX idx_users_date_created ON users(date_created);

-- Create a function to automatically update last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update last_updated
CREATE TRIGGER update_users_last_updated
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_last_updated_column();

-- Table is now ready for user signups from your UI
-- No sample data inserted - clean database ready for production

-- Create some useful views for common queries
CREATE VIEW active_users AS
SELECT 
    id,
    first_name,
    last_name,
    email,
    user_sessions,
    last_login,
FROM users 
WHERE account_status = "active";

CREATE VIEW user_statistics AS
SELECT 
    id,
    first_name || ' ' || last_name as full_name,
    email,
    user_sessions,
    EXTRACT(EPOCH FROM average_session_length) / 60 as avg_session_minutes,
    EXTRACT(EPOCH FROM total_time) / 3600 as total_hours_in_app,
    CASE 
        WHEN last_login > CURRENT_TIMESTAMP - INTERVAL '7 days' THEN 'Active'
        WHEN last_login > CURRENT_TIMESTAMP - INTERVAL '30 days' THEN 'Inactive'
        ELSE 'Dormant'
    END as user_status
FROM users 
WHERE account_status = 'active';

-- Display success message
SELECT 'Users table created successfully with sample data!' as message;