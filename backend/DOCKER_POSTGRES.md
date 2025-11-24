# 🐳 Konfiguracja Docker - Lokum Meet Backend

## Status Obecnej Konfiguracji

✅ **PostgreSQL działa w kontenerze Docker:**
- Kontener: `community-events-postgres`
- Image: `postgres:16-alpine`
- Port: `5432:5432`
- Status: Healthy & Running

## Przydatne Komendy Docker

### Zarządzanie Kontenerem PostgreSQL

```bash
# Sprawdź status kontenera
docker ps | grep postgres

# Zatrzymaj kontener
docker stop community-events-postgres

# Uruchom kontener
docker start community-events-postgres

# Sprawdź logi kontenera
docker logs community-events-postgres

# Sprawdź ostatnie 50 linii logów
docker logs --tail 50 community-events-postgres

# Podążaj za logami w czasie rzeczywistym
docker logs -f community-events-postgres
```

### Dostęp do Bazy Danych

```bash
# Połącz się z bazą danych przez Docker
docker exec -it community-events-postgres psql -U postgres -d community_events_dev

# Przykładowe zapytania SQL:
\dt                                    # Lista tabel
\d users                               # Struktura tabeli users
SELECT * FROM users;                   # Wszystkie użytkownicy
SELECT COUNT(*) FROM events;           # Liczba wydarzeń
\q                                     # Wyjście z psql
```

### Resetowanie Bazy Danych

```bash
# Użyj dedykowanego skryptu
./reset-db-docker.sh

# Lub ręcznie:
docker exec -it community-events-postgres psql -U postgres -d community_events_dev -c "TRUNCATE TABLE users CASCADE;"
```

## Konfiguracja Aplikacji

### application.properties

Aplikacja jest już skonfigurowana do pracy z PostgreSQL w Docker:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/community_events_dev
spring.datasource.username=postgres
spring.datasource.password=postgres123
```

**Uwaga:** Port `5432` jest mapowany z kontenera na localhost, więc aplikacja Spring Boot może się łączyć przez `localhost:5432`.

## Docker Compose (Opcjonalnie)

Jeśli chcesz zarządzać PostgreSQL przez Docker Compose, możesz stworzyć plik `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: community-events-postgres
    environment:
      POSTGRES_DB: community_events_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres-data:
```

Użycie:
```bash
# Uruchom
docker-compose up -d

# Zatrzymaj
docker-compose down

# Zatrzymaj i usuń dane
docker-compose down -v
```

## Troubleshooting

### Problem: Nie można połączyć się z bazą danych

**Sprawdź czy kontener działa:**
```bash
docker ps | grep postgres
```

**Jeśli nie działa, uruchom:**
```bash
docker start community-events-postgres
```

### Problem: Port 5432 już zajęty

**Sprawdź co używa portu:**
```bash
sudo lsof -i :5432
```

**Zatrzymaj konfliktowy proces lub zmień port w Docker:**
```bash
# Zatrzymaj lokalny PostgreSQL jeśli działa
sudo systemctl stop postgresql

# Lub usuń kontener i stwórz nowy z innym portem
docker rm -f community-events-postgres
docker run --name community-events-postgres \
  -e POSTGRES_DB=community_events_dev \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -p 5433:5432 \
  -d postgres:16-alpine
```

Wtedy zmień w `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/community_events_dev
```

### Problem: Dane testowe się nie ładują

**Wyczyść bazę i zrestartuj aplikację:**
```bash
# 1. Wyczyść bazę
./reset-db-docker.sh

# 2. Zrestartuj aplikację
./mvnw spring-boot:run
```

### Problem: Wolne działanie bazy danych

**Sprawdź zasoby kontenera:**
```bash
docker stats community-events-postgres
```

**Zwiększ zasoby dla Docker Desktop** (Settings → Resources)

## Backup i Restore

### Backup bazy danych

```bash
# Backup do pliku
docker exec community-events-postgres pg_dump -U postgres community_events_dev > backup.sql

# Backup z kompresją
docker exec community-events-postgres pg_dump -U postgres community_events_dev | gzip > backup.sql.gz
```

### Restore bazy danych

```bash
# Restore z pliku
docker exec -i community-events-postgres psql -U postgres -d community_events_dev < backup.sql

# Restore z kompresją
gunzip -c backup.sql.gz | docker exec -i community-events-postgres psql -U postgres -d community_events_dev
```

## Przydatne Skrypty

### reset-db-docker.sh ✅
Automatyczne czyszczenie bazy danych dla PostgreSQL w Docker

```bash
chmod +x reset-db-docker.sh
./reset-db-docker.sh
```

### Sprawdzanie stanu bazy

```bash
#!/bin/bash
# check-db-status.sh

docker exec community-events-postgres psql -U postgres -d community_events_dev << 'EOF'
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = tablename) AS columns
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
EOF
```

## Monitorowanie

### Sprawdzenie połączeń

```bash
docker exec community-events-postgres psql -U postgres -c "SELECT count(*) FROM pg_stat_activity;"
```

### Aktywne zapytania

```bash
docker exec community-events-postgres psql -U postgres -c "SELECT pid, usename, query FROM pg_stat_activity WHERE state = 'active';"
```

---

**📌 Notatka:** Wszystkie skrypty i komendy zostały zaktualizowane aby działały z PostgreSQL w kontenerze Docker!

