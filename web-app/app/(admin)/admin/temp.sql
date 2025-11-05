CREATE TABLE users (
    id TEXT PRIMARY KEY,
    year INTEGER,
    major TEXT,
    profile_visibility TEXT NOT NULL DEFAULT 'private',
    bio TEXT
);