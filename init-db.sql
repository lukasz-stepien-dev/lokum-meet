-- Initialize database with initial schema and seed data
-- This file is automatically run when PostgreSQL container starts

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create enum types
CREATE TYPE user_role AS ENUM ('ROLE_USER', 'ROLE_INSTITUTION_ADMIN', 'ROLE_ADMIN');
CREATE TYPE verification_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE institution_category AS ENUM ('SCHOOL', 'UNIVERSITY', 'NGO', 'SPORTS_CLUB', 'CULTURAL_CENTER', 'LIBRARY', 'OTHER');
CREATE TYPE event_category AS ENUM ('FILM_CLUB', 'HOBBY_GROUP', 'SPORTS', 'STUDY_CIRCLE', 'SOCIAL', 'OTHER');

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  age INT NOT NULL,
  avatar_url VARCHAR(500),
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  roles user_role[] DEFAULT ARRAY['ROLE_USER']:user_role[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_age ON users(age);

-- Institutions table
CREATE TABLE institutions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  category institution_category NOT NULL,
  description TEXT,
  verification_status verification_status DEFAULT 'PENDING',
  verified_by INT REFERENCES users(id),
  verified_at TIMESTAMP,
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_institutions_status ON institutions(verification_status);

-- User-Institution relationship (many-to-many)
CREATE TABLE user_institutions (
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  institution_id INT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'MEMBER',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, institution_id)
);

-- Events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(500) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  max_capacity INT,
  current_capacity INT DEFAULT 0,
  category event_category,
  image_url VARCHAR(500),
  image_filename VARCHAR(255),
  created_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  trusted_institution_only BOOLEAN DEFAULT FALSE,
  approved_institution INT REFERENCES institutions(id),
  min_age INT DEFAULT 0,
  max_age INT DEFAULT 999,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_institution ON events(approved_institution);
CREATE INDEX idx_events_location ON events(latitude, longitude);

-- Event attendees (many-to-many with additional data)
CREATE TABLE event_attendees (
  id SERIAL PRIMARY KEY,
  event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'JOINED',
  UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_attendees_event ON event_attendees(event_id);
CREATE INDEX idx_event_attendees_user ON event_attendees(user_id);

-- User preferences (JSON column for flexibility)
CREATE TABLE user_preferences (
  user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  favorite_categories event_category[] DEFAULT ARRAY[],
  preferred_distance INT DEFAULT 10,
  notify_new_events BOOLEAN DEFAULT TRUE,
  notify_event_updates BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log for institutional changes
CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(100),
  action VARCHAR(10),
  record_id INT,
  changed_by INT REFERENCES users(id),
  changes JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_log_table ON audit_log(table_name);
CREATE INDEX idx_audit_log_record ON audit_log(record_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);

-- Seed data for testing

-- Test Users
INSERT INTO users (email, username, password_hash, date_of_birth, age, is_verified, roles)
VALUES
  ('adult@example.com', 'adult_user', '$2a$10$encrypted_password_here', '1995-03-15', 30, true, ARRAY['ROLE_USER']),
  ('teen@example.com', 'teen_user', '$2a$10$encrypted_password_here', '2009-06-20', 16, true, ARRAY['ROLE_USER']),
  ('admin@example.com', 'admin_user', '$2a$10$encrypted_password_here', '1990-01-01', 35, true, ARRAY['ROLE_ADMIN']);

-- Test Institution
INSERT INTO institutions (name, email, category, description, verification_status, verified_by)
VALUES
  ('Central High School', 'admin@centralhigh.edu', 'SCHOOL', 'Main high school in the city', 'APPROVED', 3),
  ('City University', 'events@cityuni.edu', 'UNIVERSITY', 'Local university', 'APPROVED', 3);

-- Link users to institutions
INSERT INTO user_institutions (user_id, institution_id, role)
VALUES
  (2, 1, 'MEMBER'),
  (1, 2, 'MEMBER');

-- Test Events
INSERT INTO events (title, description, location, latitude, longitude, start_time, end_time, max_capacity, category, created_by, trusted_institution_only, approved_institution)
VALUES
  ('Film Club - Sci-Fi Night', 'Watch and discuss classic sci-fi films', 'Central Library, Room 201', 51.5074, -0.1278, '2025-11-20 19:00:00', '2025-11-20 21:00:00', 30, 'FILM_CLUB', 1, false, NULL),
  ('High School Basketball', 'Friendly basketball match', 'Central High School Gym', 51.5085, -0.1270, '2025-11-18 17:00:00', '2025-11-18 19:00:00', 20, 'SPORTS', 1, true, 1);

-- Create application.properties for docker profile
-- This should be created in backend/src/main/resources/application-docker.properties

-- COMMENT: This file initializes the PostgreSQL database.
-- To use: ensure this file is in backend/src/main/resources/db/migration/
-- Or mount it as a volume in docker-compose.yml (already configured)
