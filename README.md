# Online-store

Projekt zaliczeniowy z przedmiotu **Wstęp do Aplikacji Internetowych**.  
Aplikacja przedstawia prosty sklep internetowy z obsługą użytkowników, koszyka oraz historii zamówień.

## Autorzy

- Anna Konieczna
- Alicja Czeleń

## 📌 Funkcjonalności:

### 👤 Użytkownicy

- logowanie do strony
- rejestracja nowego użytkownika
- zachowanie sesji użytkownika
- role użytkowników:
  - **user** – dodawanie opinii, zarządzanie koszykiem, edycja swoih opinii
  - **admin** – usuwanie wszystkich opinii

### 🛍️ Produkty

- pobranie listy produktów (mock API)
- wyszukiwarka po nazwie
- filtrowanie produktów po nazwie, cenie i kategorii
- widok szczegółów produktu
- dostępność produktu
- dodawanie opinii (1 opinia na użytkownika)

### 🛒 Koszyk

- dodawanie produktów do koszyka
- usuwanie produktów z koszyka
- przeliczanie wartości koszyka
- akceptacja koszyka (złożenie zamówienia)
- dostęp do koszyka tylko dla zalogowanych użytkowników

### 📦 Zamówienia

- lista zamówień użytkownika
- historia zamówień
- widok szczegółów pojedynczego zamówienia

---

## Użyte technologie

### Frontend

- React
- React Router
- Context API
- CSS

### Backend (mockowany)

- lokalne pliki JSON
- symulacja API
- autoryzacja JWT (mock)

### Użyte biblioteki

- Tailwind
- MUI react
- Axios
- Shadcn ui
