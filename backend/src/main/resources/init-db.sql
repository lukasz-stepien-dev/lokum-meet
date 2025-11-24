-- ==========================================
-- LOKUM MEET - INITIAL DATABASE DATA
-- ==========================================

-- Clean up existing data (order matters due to foreign keys)
DELETE FROM user_favorite_categories;
DELETE FROM user_preferences;
DELETE FROM event_attendees;
DELETE FROM events;
DELETE FROM user_institution;
DELETE FROM institutions;
DELETE FROM user_roles;
DELETE FROM users;

-- Reset sequences
ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS institutions_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS events_id_seq RESTART WITH 1;

-- ==========================================
-- USERS
-- ==========================================

-- Admin user (password: admin123)
INSERT INTO users (username, email, password_hash, birth_date, age, avatar_url, bio, is_verified, created_at, updated_at)
VALUES ('admin', 'admin@lokummeet.pl', '$2a$10$qpjZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8', '1990-01-01', 34,
        'https://ui-avatars.com/api/?name=Admin&background=random', 'Administrator systemu', true, NOW(), NOW());

-- Regular users (password: password123)
INSERT INTO users (username, email, password_hash, birth_date, age, avatar_url, bio, is_verified, created_at, updated_at)
VALUES
('anna_kowalska', 'anna.kowalska@example.com', '$2a$10$qpjZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8', '1998-05-15', 26,
 'https://ui-avatars.com/api/?name=Anna+Kowalska&background=random', 'Miłośniczka filmów i dobrych książek. Szukam ludzi do wspólnych wyjazdów do kina!', true, NOW(), NOW()),

('jan_nowak', 'jan.nowak@example.com', '$2a$10$qpjZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8', '2000-03-22', 24,
 'https://ui-avatars.com/api/?name=Jan+Nowak&background=random', 'Student informatyki, pasjonat nowych technologii i sportu.', true, NOW(), NOW()),

('maria_wisniewski', 'maria.wisniewski@example.com', '$2a$10$qpjZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8', '1995-11-08', 29,
 'https://ui-avatars.com/api/?name=Maria+Wisniewski&background=random', 'Graficzka komputerowa. Uwielbianie robić zdjęcia i poznawać nowych ludzi.', true, NOW(), NOW()),

('piotr_lewandowski', 'piotr.lewandowski@example.com', '$2a$10$qpjZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8', '1992-07-30', 32,
 'https://ui-avatars.com/api/?name=Piotr+Lewandowski&background=random', 'Trener personalny. Organizuję treningi w parku i wspólne wyjścia na rower.', true, NOW(), NOW()),

('kasia_dabrowska', 'kasia.dabrowska@example.com', '$2a$10$qpjZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8W3qw0JQKXQZ8', '2001-09-12', 23,
 'https://ui-avatars.com/api/?name=Kasia+Dabrowska&background=random', 'Studentka psychologii. Interesuję się jogą i medytacją.', true, NOW(), NOW());

-- ==========================================
-- USER ROLES
-- ==========================================

-- Admin role
INSERT INTO user_roles (user_id, user_roles) VALUES (1, 'ADMIN');
INSERT INTO user_roles (user_id, user_roles) VALUES (1, 'USER');

-- Regular user roles
INSERT INTO user_roles (user_id, user_roles) VALUES (2, 'USER');
INSERT INTO user_roles (user_id, user_roles) VALUES (3, 'USER');
INSERT INTO user_roles (user_id, user_roles) VALUES (4, 'USER');
INSERT INTO user_roles (user_id, user_roles) VALUES (5, 'USER');
INSERT INTO user_roles (user_id, user_roles) VALUES (6, 'USER');

-- ==========================================
-- INSTITUTIONS
-- ==========================================

INSERT INTO institutions (name, email, category, description, verification_status, verified_by, verified_at, logo_url, website_url, created_at, updated_at)
VALUES
('Klub Filmowy Muza', 'kontakt@klubmuza.pl', 'CULTURAL_INSTITUTION',
 'Miejsce dla miłośników dobrego kina. Organizujemy seanse filmów artystycznych i dyskusje.',
 'VERIFIED', 1, NOW(), 'https://ui-avatars.com/api/?name=Klub+Muza&background=random',
 'https://klubmuza.pl', NOW(), NOW()),

('Akademia Sportu', 'info@akademiasportu.pl', 'SPORTS_ORGANIZATION',
 'Zajęcia sportowe dla każdego. Od jogi po crossfit!',
 'VERIFIED', 1, NOW(), 'https://ui-avatars.com/api/?name=Akademia+Sportu&background=random',
 'https://akademiasportu.pl', NOW(), NOW()),

('Dom Kultury Centrum', 'biuro@dkcentrum.pl', 'CULTURAL_INSTITUTION',
 'Organizujemy warsztaty, koncerty i wystawy. Serce kulturalne miasta!',
 'VERIFIED', 1, NOW(), 'https://ui-avatars.com/api/?name=DK+Centrum&background=random',
 'https://dkcentrum.pl', NOW(), NOW()),

('Stowarzyszenie Młodych Twórców', 'kontakt@mlodzi.org', 'NGO',
 'Wspieramy młodych artystów i organizujemy wydarzenia kulturalne.',
 'PENDING', NULL, NULL, 'https://ui-avatars.com/api/?name=SMT&background=random',
 'https://mlodzi.org', NOW(), NOW());

-- ==========================================
-- EVENTS
-- ==========================================

-- Film Club events
INSERT INTO events (title, description, location, start_time, end_time, date_event, max_capacity, current_capacity, category, image_url, created_by, approved_institution, min_age, max_age, created_at, updated_at)
VALUES
('Wieczór z Klasycznym Kinem',
 'Projekcja kultowych filmów z lat 70. Dyskusja przy kawie po seansie.',
 'Klub Filmowy Muza, ul. Główna 15',
 '2025-12-15 18:00:00', '2025-12-15 22:00:00', '2025-12-15',
 30, 0, 'FILM_CLUB', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
 2, 1, 18, 99, NOW(), NOW()),

('Kino na Dachu - Lato 2025',
 'Letnie kino pod gwiazdami. Przegląd najlepszych polskich filmów.',
 'Klub Filmowy Muza, dach budynku',
 '2025-07-20 21:00:00', '2025-07-21 00:00:00', '2025-07-20',
 50, 0, 'FILM_CLUB', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
 2, 1, 16, 99, NOW(), NOW());

-- Sports events
INSERT INTO events (title, description, location, start_time, end_time, date_event, max_capacity, current_capacity, category, image_url, created_by, approved_institution, min_age, max_age, created_at, updated_at)
VALUES
('Poranny Jogging w Parku',
 'Wspólny bieg dla początkujących. Dystans ok. 5km, tempo spokojne.',
 'Park Miejski, wejście główne',
 '2025-12-10 07:00:00', '2025-12-10 08:30:00', '2025-12-10',
 20, 0, 'SPORTS', 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
 5, 2, 16, 60, NOW(), NOW()),

('Turniej Siatkówki Plażowej',
 'Letni turniej dla amatorów. Zgłoszenia drużynowe (4 osoby).',
 'Plaża Miejska, boisko nr 2',
 '2025-08-15 10:00:00', '2025-08-15 18:00:00', '2025-08-15',
 40, 0, 'SPORTS', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800',
 5, 2, 18, 50, NOW(), NOW());

-- Hobby Group events
INSERT INTO events (title, description, location, start_time, end_time, date_event, max_capacity, current_capacity, category, image_url, created_by, approved_institution, min_age, max_age, created_at, updated_at)
VALUES
('Warsztaty Fotograficzne',
 'Podstawy fotografii dla początkujących. Zabierz swój aparat!',
 'Dom Kultury Centrum, sala 3',
 '2025-12-12 16:00:00', '2025-12-12 19:00:00', '2025-12-12',
 15, 0, 'HOBBY_GROUP', 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
 4, 3, 16, 99, NOW(), NOW()),

('Klub Książki - Spotkanie #12',
 'Omówimy "Mistrza i Małgorzatę" Bułhakowa. Dla fanów literatury rosyjskiej.',
 'Kawiarnia Literacka, ul. Bookowa 7',
 '2025-12-18 18:00:00', '2025-12-18 20:00:00', '2025-12-18',
 12, 0, 'HOBBY_GROUP', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
 2, NULL, 18, 99, NOW(), NOW());

-- Study Circle events
INSERT INTO events (title, description, location, start_time, end_time, date_event, max_capacity, current_capacity, category, image_url, created_by, approved_institution, min_age, max_age, created_at, updated_at)
VALUES
('Koło Programistyczne - Python',
 'Wspólna nauka programowania w Pythonie. Mile widziani początkujący!',
 'Centrum IT, sala konferencyjna',
 '2025-12-14 17:00:00', '2025-12-14 20:00:00', '2025-12-14',
 25, 0, 'STUDY_CIRCLE', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800',
 3, NULL, 16, 99, NOW(), NOW());

-- Social events
INSERT INTO events (title, description, location, start_time, end_time, date_event, max_capacity, current_capacity, category, image_url, created_by, approved_institution, min_age, max_age, created_at, updated_at)
VALUES
('Piknik Integracyjny',
 'Wspólne grillowanie i gry terenowe. Rodziny mile widziane!',
 'Park Miejski, polana przy jeziorze',
 '2025-12-25 12:00:00', '2025-12-25 18:00:00', '2025-12-25',
 100, 0, 'SOCIAL', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
 4, 3, 13, 99, NOW(), NOW());

-- ==========================================
-- EVENT ATTENDEES
-- ==========================================

-- Wieczór z Klasycznym Kinem (event_id = 1)
INSERT INTO event_attendees (event_id, user_id, joined_at, status) VALUES
(1, 2, NOW() - INTERVAL '5 days', 'JOINED'),
(1, 3, NOW() - INTERVAL '3 days', 'JOINED'),
(1, 4, NOW() - INTERVAL '2 days', 'JOINED');

-- Kino na Dachu (event_id = 2)
INSERT INTO event_attendees (event_id, user_id, joined_at, status) VALUES
(2, 2, NOW() - INTERVAL '1 day', 'JOINED'),
(2, 6, NOW() - INTERVAL '8 hours', 'JOINED');

-- Poranny Jogging (event_id = 3)
INSERT INTO event_attendees (event_id, user_id, joined_at, status) VALUES
(3, 5, NOW() - INTERVAL '6 days', 'JOINED'),
(3, 6, NOW() - INTERVAL '4 days', 'JOINED'),
(3, 3, NOW() - INTERVAL '2 days', 'JOINED');

-- Turniej Siatkówki (event_id = 4)
INSERT INTO event_attendees (event_id, user_id, joined_at, status) VALUES
(4, 5, NOW() - INTERVAL '10 days', 'JOINED'),
(4, 3, NOW() - INTERVAL '7 days', 'JOINED');

-- Warsztaty Fotograficzne (event_id = 5)
INSERT INTO event_attendees (event_id, user_id, joined_at, status) VALUES
(5, 2, NOW() - INTERVAL '4 days', 'JOINED'),
(5, 4, NOW() - INTERVAL '3 days', 'JOINED'),
(5, 6, NOW() - INTERVAL '1 day', 'JOINED');

-- Klub Książki (event_id = 6)
INSERT INTO event_attendees (event_id, user_id, joined_at, status) VALUES
(6, 2, NOW() - INTERVAL '9 days', 'JOINED'),
(6, 3, NOW() - INTERVAL '5 days', 'JOINED');

-- Koło Programistyczne (event_id = 7)
INSERT INTO event_attendees (event_id, user_id, joined_at, status) VALUES
(7, 3, NOW() - INTERVAL '8 days', 'JOINED'),
(7, 6, NOW() - INTERVAL '2 days', 'JOINED');

-- Piknik Integracyjny (event_id = 8)
INSERT INTO event_attendees (event_id, user_id, joined_at, status) VALUES
(8, 2, NOW() - INTERVAL '6 days', 'JOINED'),
(8, 3, NOW() - INTERVAL '5 days', 'JOINED'),
(8, 4, NOW() - INTERVAL '4 days', 'JOINED'),
(8, 5, NOW() - INTERVAL '3 days', 'JOINED'),
(8, 6, NOW() - INTERVAL '2 days', 'JOINED');

-- Update event current_capacity based on attendees
UPDATE events SET current_capacity = 3 WHERE id = 1;
UPDATE events SET current_capacity = 2 WHERE id = 2;
UPDATE events SET current_capacity = 3 WHERE id = 3;
UPDATE events SET current_capacity = 2 WHERE id = 4;
UPDATE events SET current_capacity = 3 WHERE id = 5;
UPDATE events SET current_capacity = 2 WHERE id = 6;
UPDATE events SET current_capacity = 2 WHERE id = 7;
UPDATE events SET current_capacity = 5 WHERE id = 8;

-- ==========================================
-- USER PREFERENCES
-- ==========================================

INSERT INTO user_preferences (user_id, preferred_distance, notify_new_events, notify_event_updates, updated_at) VALUES
(2, 10, true, true, NOW()),
(3, 10, true, true, NOW()),
(4, 10, true, true, NOW()),
(5, 10, true, true, NOW()),
(6, 10, true, true, NOW());

-- ==========================================
-- USER FAVORITE CATEGORIES
-- ==========================================

-- Anna's favorites
INSERT INTO user_favorite_categories (user_id, category) VALUES
(2, 'FILM_CLUB'),
(2, 'HOBBY_GROUP');

-- Jan's favorites
INSERT INTO user_favorite_categories (user_id, category) VALUES
(3, 'SPORTS'),
(3, 'HOBBY_GROUP');

-- Maria's favorites
INSERT INTO user_favorite_categories (user_id, category) VALUES
(4, 'HOBBY_GROUP'),
(4, 'SOCIAL');

-- Piotr's favorites
INSERT INTO user_favorite_categories (user_id, category) VALUES
(5, 'SPORTS');

-- Kasia's favorites
INSERT INTO user_favorite_categories (user_id, category) VALUES
(6, 'SPORTS'),
(6, 'STUDY_CIRCLE');

-- ==========================================
-- SUMMARY
-- ==========================================

DO $$
DECLARE
    user_count INTEGER;
    institution_count INTEGER;
    event_count INTEGER;
    attendee_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO user_count FROM users;
    SELECT COUNT(*) INTO institution_count FROM institutions;
    SELECT COUNT(*) INTO event_count FROM events;
    SELECT COUNT(*) INTO attendee_count FROM event_attendees;

    RAISE NOTICE '✅ Database initialization completed!';
    RAISE NOTICE '📊 Created:';
    RAISE NOTICE '   - % users', user_count;
    RAISE NOTICE '   - % institutions', institution_count;
    RAISE NOTICE '   - % events', event_count;
    RAISE NOTICE '   - % event attendees', attendee_count;
END $$;

