# Lokum Meet
[Screencast from 2025-11-25 12-54-43.webm](https://github.com/user-attachments/assets/2ef2214e-75c9-4d01-babb-ef77c274a177)
## 📋 Wymagania


Przed uruchomieniem upewnij się, że masz zainstalowane:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Instrukcja uruchomienia

Ze względu na specyfikę inicjalizacji bazy danych, proces uruchamiania został podzielony na trzy kroki. Proszę wykonywać je w podanej kolejności.

### Krok 1: Budowanie obrazów

W głównym katalogu projektu wykonaj polecenie, aby zbudować obrazy dla bazy danych, frontendu i backendu:

```bash
docker compose build postgres frontend backend
```

### Krok 2: Inicjalizacja Bazy Danych

Uruchom kontener bazy danych jako pierwszy:

```bash
docker compose up postgres -d
```

> **⚠️ Ważna uwaga:**
> Za pierwszym razem kontener `postgres` może wyrzucić błąd lub się zatrzymać (exit code). Jest to znane zachowanie związane z pierwszą inicjalizacją wolumenu danych. Jeśli tak się stanie, po prostu przejdź do Kroku 3 – kolejne uruchomienie naprawi problem automatycznie.

### Krok 3: Uruchomienie całej aplikacji

Gdy baza danych jest już zainicjowana (nawet jeśli za pierwszym razem wystąpił błąd), uruchom wszystkie serwisy poleceniem:

```bash
docker compose up postgres frontend backend -d
```

To polecenie podniesie całą infrastrukturę w trybie "detached" (w tle).

---

## 🌐 Dostęp do aplikacji

Po poprawnym uruchomieniu, serwisy będą dostępne pod następującymi adresami:

| Serwis | Adres URL | Opis |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:3000](http://localhost:3000) | Interfejs użytkownika (Next.js) |
| **Backend API** | [http://localhost:8080](http://localhost:8080) | API (Spring Boot) |
| **Baza Danych** | `localhost:5432` | PostgreSQL |

## 🛠️ Przydatne komendy

**Zatrzymanie wszystkich kontenerów:**
```bash
docker compose down
```

**Podgląd logów (np. dla backendu):**
```bash
docker compose logs -f backend
```

**Restart konkretnego serwisu:**
```bash
docker compose restart frontend
```

**Usunięcie danych (wyczyszczenie bazy):**
Jeśli chcesz zacząć od zera (usunąć wolumeny bazy danych):
```bash
docker compose down -v
```
