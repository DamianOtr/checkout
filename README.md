# Checkout - test na GB

Test checkoutu - Cypress

**Przypadki testowe:**

1. Poprawne wypełnienie danych osobowych w pierwszym kroku

2. Niepoprawne imię

3. Niepoprawne nazwisko

4. Niepoprawny adres e-mail

5. Brak zaznaczenia zgód

6. Poprawne wypełnienie formularza Adresy

7. Niepoprawne imię w adresie (cyfry)

8. Niepoprawne nazwisko w adresie (cyfry)

9. Niepoprawne imię w adresie (cyfry)

10. Niepoprawne nazwisko w adresie (cyfry)

11. Niepoprawny numer telefonu

12. Niepoprawny kod pocztowy (np. @)

13. Niepoprawne miasto (np. @@@)

# Checkout - smoke test na wszystkich rynkach

Happy path checkoutu na kazdym z rynków - Cypress

**Wykonane kroki w teście:**

1. Dodanie produktu do koszyka

2. Przejście do koszyka

3. Przejście do pierwszego kroku checkoutu

4. Poprawne wypełnienie kroku pierwszego “Informacje osobiste“

5. Przejście do drugiego kroku checkoutu

6. Poprawne wypełnienie kroku drugiego “Adresy“

7. Przejście do trzeciego kroku checkoutu

8. Zaznaczenie metody wysyłki 

9. Przejście do czwartego kroku checkoutu → Koniec

10. Zaznaczenie metody płatności

11. Finalizacja zamówienia