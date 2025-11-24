# 🎯 Dane Testowe - Lokum Meet

## 📊 Przegląd

Aplikacja automatycznie ładuje przykładowe dane przy pierwszym uruchomieniu. Dane są tworzone tylko raz - przy kolejnych uruchomieniach będą zachowane.

## 👥 Konta Użytkowników

### Administrator
- **Email**: `admin@lokummeet.pl`
- **Hasło**: `admin123`
- **Role**: ROLE_USER, ROLE_ADMIN
- **Opis**: Pełne uprawnienia administracyjne

### Użytkownicy Testowi

| Imię | Email | Hasło | Opis |
|------|-------|-------|------|
| Anna Kowalska | anna.kowalska@example.com | password123 | Pasjonatka filmów i fotografii |
| Jan Nowak | jan.nowak@example.com | password123 | Student informatyki, miłośnik sportu |
| Maria Wiśniewska | maria.wisniewska@example.com | password123 | Artystka i miłośniczka kultury |
| Piotr Zieliński | piotr.zielinski@example.com | password123 | Instruktor fitness |
| Kasia Lewandowska | kasia.lewandowska@example.com | password123 | Studentka psychologii |

## 🏢 Instytucje (wszystkie zweryfikowane)

1. **Biblioteka Miejska w Krakowie**
   - Kategoria: LIBRARY
   - Email: kontakt@biblioteka-krakow.pl

2. **Fundacja Rozwoju Społecznego**
   - Kategoria: NGO
   - Email: kontakt@fundacja-rozwoj.org

3. **Centrum Kultury i Sztuki**
   - Kategoria: CULTURAL_CENTER
   - Email: info@centrum-kultury.pl

4. **Klub Sportowy Orlik**
   - Kategoria: SPORTS_CLUB
   - Email: kontakt@orlik-sport.pl

## 🎉 Wydarzenia (8 aktywnych)

### 1. Wieczór Filmowy: Klasyka Kina Europejskiego
- **Organizator**: Anna Kowalska
- **Kategoria**: FILM_CLUB
- **Instytucja**: Biblioteka Miejska
- **Data**: Za 7 dni, 18:00-21:00
- **Miejsce**: Biblioteka Miejska, sala konferencyjna
- **Uczestnicy**: 5/30

### 2. Joga dla Początkujących - Poranne Warsztaty
- **Organizator**: Kasia Lewandowska
- **Kategoria**: SPORTS
- **Instytucja**: Klub Sportowy Orlik
- **Data**: Za 3 dni, 8:00-9:30
- **Miejsce**: Park Jordana
- **Uczestnicy**: 8/20

### 3. Wieczór Gier Planszowych
- **Organizator**: Jan Nowak
- **Kategoria**: HOBBY_GROUP
- **Instytucja**: Centrum Kultury
- **Data**: Za 5 dni, 17:00-22:00
- **Miejsce**: Centrum Kultury, pokój 205
- **Uczestnicy**: 12/25

### 4. Warsztaty Fotografii Ulicznej
- **Organizator**: Anna Kowalska
- **Kategoria**: HOBBY_GROUP
- **Instytucja**: Centrum Kultury
- **Data**: Za 10 dni, 10:00-14:00
- **Miejsce**: Rynek Główny
- **Uczestnicy**: 6/15

### 5. Kuchnia Włoska - Warsztaty Kulinarne
- **Organizator**: Maria Wiśniewska
- **Kategoria**: HOBBY_GROUP
- **Instytucja**: Centrum Kultury
- **Data**: Za 14 dni, 16:00-20:00
- **Miejsce**: Centrum Kultury, pracownia kulinarna
- **Uczestnicy**: 4/12

### 6. Poranny Bieg - Grupa Biegowa
- **Organizator**: Piotr Zieliński
- **Kategoria**: SPORTS
- **Instytucja**: Klub Sportowy Orlik
- **Data**: Za 2 dni, 6:30-7:30
- **Miejsce**: Park Krakowski
- **Uczestnicy**: 15/30

### 7. Klub Książki - Dyskusja: '1984' George Orwell
- **Organizator**: Anna Kowalska
- **Kategoria**: STUDY_CIRCLE
- **Instytucja**: Biblioteka Miejska
- **Data**: Za 12 dni, 18:30-20:30
- **Miejsce**: Biblioteka Miejska, czytelnia
- **Uczestnicy**: 9/20

### 8. Piknik Integracyjny dla Nowych Mieszkańców
- **Organizator**: Admin
- **Kategoria**: SOCIAL
- **Instytucja**: Fundacja Rozwoju Społecznego
- **Data**: Za 8 dni, 14:00-18:00
- **Miejsce**: Błonia Krakowskie
- **Uczestnicy**: 22/50

## 🔄 Resetowanie Danych

Jeśli chcesz zresetować dane testowe:

1. **Opcja 1: Usuń bazę danych**
   ```bash
   # Usuń i utwórz bazę na nowo
   sudo -u postgres psql
   DROP DATABASE community_events_dev;
   CREATE DATABASE community_events_dev;
   ```

2. **Opcja 2: Wyczyść wszystkie tabele**
   ```bash
   # Połącz się z bazą
   psql -U postgres -d community_events_dev
   
   # Wyczyść tabele (w odpowiedniej kolejności)
   TRUNCATE event_attendees CASCADE;
   TRUNCATE events CASCADE;
   TRUNCATE user_favorite_categories CASCADE;
   TRUNCATE user_preferences CASCADE;
   TRUNCATE user_institution CASCADE;
   TRUNCATE user_roles CASCADE;
   TRUNCATE users CASCADE;
   TRUNCATE institutions CASCADE;
   ```

3. **Uruchom aplikację ponownie** - dane zostaną automatycznie załadowane.

## 🧪 Testowanie API

### Przykładowe zapytania:

**1. Logowanie jako Anna:**
```bash
curl -X POST http://localhost:8080/auth/generateToken \
  -H "Content-Type: application/json" \
  -d '{
    "username": "anna.kowalska@example.com",
    "password": "password123"
  }'
```

**2. Pobierz wszystkie wydarzenia:**
```bash
curl http://localhost:8080/api/events
```

**3. Pobierz uczestników wydarzenia:**
```bash
curl http://localhost:8080/api/event-attendees/event/1
```

**4. Pobierz instytucje:**
```bash
curl http://localhost:8080/api/institutions
```

## 📈 Statystyki Danych Testowych

- **Użytkownicy**: 6 (w tym 1 admin)
- **Instytucje**: 4 (wszystkie zweryfikowane)
- **Wydarzenia**: 8 (różne kategorie)
- **Zapisy na wydarzenia**: ~35
- **Preferencje użytkowników**: 5

## 🎨 Kategorie Wydarzeń w Danych

- `FILM_CLUB` - 1 wydarzenie
- `SPORTS` - 2 wydarzenia
- `HOBBY_GROUP` - 3 wydarzenia
- `STUDY_CIRCLE` - 1 wydarzenie
- `SOCIAL` - 1 wydarzenie

## 💡 Wskazówki

1. Wszystkie hasła użytkowników testowych to `password123` (oprócz admina: `admin123`)
2. Wszystkie instytucje są już zweryfikowane
3. Wydarzenia są zaplanowane na przyszłość (od 2 do 14 dni)
4. Każde wydarzenie ma już kilku zapisanych uczestników
5. Avatary użytkowników to zdjęcia z [pravatar.cc](https://pravatar.cc)
6. Zdjęcia wydarzeń to obrazy z [Unsplash](https://unsplash.com)

---

**Miłego testowania! 🚀**

