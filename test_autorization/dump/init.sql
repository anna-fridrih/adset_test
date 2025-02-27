CREATE TABLE IF NOT EXISTS Companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('active', 'inactive')) NOT NULL DEFAULT 'active',
  type VARCHAR(20) CHECK (type IN ('client', 'partner', 'other')),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Companies (name, type, address) VALUES
  ('Tech Corp', 'client', 'Silicon Valley'),
  ('Design Studio', 'partner', 'New York');