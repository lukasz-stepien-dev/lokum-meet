#!/bin/bash

# Skrypt resetowania bazy danych dla Lokum Meet (PostgreSQL w Docker)

echo "🔄 Resetowanie bazy danych Lokum Meet (Docker)..."
echo ""

# Kolory
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Parametry
CONTAINER_NAME="community-events-postgres"
DB_NAME="community_events_dev"
DB_USER="postgres"

# Sprawdź czy kontener działa
if ! docker ps | grep -q $CONTAINER_NAME; then
    echo -e "${RED}❌ Kontener PostgreSQL '$CONTAINER_NAME' nie działa!${NC}"
    echo ""
    echo "Sprawdź dostępne kontenery:"
    docker ps -a | grep postgres
    echo ""
    echo "Uruchom kontener komendą:"
    echo "  docker start $CONTAINER_NAME"
    exit 1
fi

echo -e "${YELLOW}⚠️  Ta operacja usunie wszystkie dane z bazy!${NC}"
echo ""
read -p "Czy na pewno chcesz kontynuować? (wpisz 'tak'): " confirm

if [ "$confirm" != "tak" ]; then
    echo -e "${RED}Operacja anulowana.${NC}"
    exit 0
fi

echo ""
echo "🗑️  Czyszczenie bazy danych przez Docker..."
echo ""

# Wykonaj reset przez docker exec
docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME << 'EOSQL'
-- Wyłącz sprawdzanie kluczy obcych tymczasowo
SET session_replication_role = 'replica';

-- Usuń wszystkie dane z tabel
TRUNCATE TABLE event_attendees CASCADE;
TRUNCATE TABLE events CASCADE;
TRUNCATE TABLE user_favorite_categories CASCADE;
TRUNCATE TABLE user_preferences CASCADE;
TRUNCATE TABLE user_institution CASCADE;
TRUNCATE TABLE user_roles CASCADE;
TRUNCATE TABLE institutions CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE audit_log CASCADE;

-- Włącz sprawdzanie kluczy obcych
SET session_replication_role = 'origin';

-- Zresetuj sekwencje (auto-increment)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'users_id_seq') THEN
        ALTER SEQUENCE users_id_seq RESTART WITH 1;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'events_id_seq') THEN
        ALTER SEQUENCE events_id_seq RESTART WITH 1;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'institutions_id_seq') THEN
        ALTER SEQUENCE institutions_id_seq RESTART WITH 1;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'event_attendees_id_seq') THEN
        ALTER SEQUENCE event_attendees_id_seq RESTART WITH 1;
    END IF;
END $$;

-- Pokaż statystyki
\echo ''
\echo '📊 Statystyki po wyczyszczeniu:'
SELECT
    'users' as "Tabela",
    COUNT(*) as "Liczba rekordów"
FROM users
UNION ALL
SELECT 'events', COUNT(*) FROM events
UNION ALL
SELECT 'institutions', COUNT(*) FROM institutions
UNION ALL
SELECT 'event_attendees', COUNT(*) FROM event_attendees;
EOSQL

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Baza danych została pomyślnie wyczyszczona!${NC}"
    echo ""
    echo "📝 Następne kroki:"
    echo "   1. Uruchom aplikację Spring Boot:"
    echo "      ${GREEN}./mvnw spring-boot:run${NC}"
    echo ""
    echo "   2. Dane testowe zostaną automatycznie załadowane"
    echo ""
    echo "📧 Dane logowania (po załadowaniu):"
    echo "   ${GREEN}Admin:${NC}  admin@lokummeet.pl / admin123"
    echo "   ${GREEN}Anna:${NC}   anna.kowalska@example.com / password123"
    echo "   ${GREEN}Jan:${NC}    jan.nowak@example.com / password123"
    echo "   ${GREEN}Maria:${NC}  maria.wisniewska@example.com / password123"
    echo "   ${GREEN}Piotr:${NC}  piotr.zielinski@example.com / password123"
    echo "   ${GREEN}Kasia:${NC}  kasia.lewandowska@example.com / password123"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Wystąpił błąd podczas czyszczenia bazy!${NC}"
    echo ""
    echo "Możliwe przyczyny:"
    echo "  - Kontener PostgreSQL nie działa poprawnie"
    echo "  - Baza danych nie istnieje"
    echo "  - Brak uprawnień"
    echo ""
    echo "Sprawdź logi kontenera:"
    echo "  docker logs $CONTAINER_NAME"
    echo ""
    exit 1
fi

