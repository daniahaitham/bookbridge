-- BookBridge schema (PostgreSQL). Run:  psql -U postgres -d BookBridge -f database/schema.sql
-- Create the database first:  CREATE DATABASE "BookBridge";

CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    phonenum    VARCHAR(20),
    password    VARCHAR(255) NOT NULL,          -- bcrypt hash
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin    BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE books (
    id            SERIAL PRIMARY KEY,
    userid        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title         VARCHAR(255) NOT NULL,
    author        VARCHAR(255) NOT NULL,
    price         NUMERIC(10,2),
    category      VARCHAR(50),
    description   TEXT,
    notebyowner   TEXT,
    cover         TEXT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    availability  BOOLEAN DEFAULT TRUE
);

CREATE TABLE requests (
    id           SERIAL PRIMARY KEY,
    bookid       INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    requesterid  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ownerid      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status       VARCHAR(20) DEFAULT 'pending',
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE complaints (
    id           SERIAL PRIMARY KEY,
    userid       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject      VARCHAR(255),
    description  TEXT NOT NULL,
    status       VARCHAR(20) DEFAULT 'pending',
    priority     VARCHAR(20) DEFAULT 'normal',
    actiontaken  TEXT,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
