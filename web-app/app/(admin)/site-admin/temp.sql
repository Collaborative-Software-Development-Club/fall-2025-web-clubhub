CREATE TABLE users (
    id TEXT PRIMARY KEY,
    year INTEGER,
    major TEXT,
    profile_visibility TEXT NOT NULL DEFAULT 'private',
    bio TEXT
);

CREATE TABLE clubs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    visibility TEXT NOT NULL DEFAULT 'public'
);

CREATE TABLE club_leaders (
    id TEXT PRIMARY KEY,
    club_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (club_id) REFERENCES clubs(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);