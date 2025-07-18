/// <reference types="cypress" />

// const { describe } = require("mocha");

  describe('Checkout', () => {
  
    beforeEach(() => {
      cy.log('Przygotowanie: Dodanie produktu do koszyka i przejście do checkoutu');
        cy.checkout()
      });
    
    it('Poprawne wypełnienie danych osobowych w pierwszym kroku', () => {
      cy.log('Sprawdzenie widoczności pierwszego kroku');
      cy.sprawdzenie_kroku1() 
      cy.log('Wpisanie poprawnych danych');
        cy.poprawne_dane1krok()
      cy.log('Zgody: regulamin i polityka prywatności');
        cy.checkboxy()
      cy.log('Kliknięcie buttona z przejściem dalej');
      cy.button1_continue()
      cy.log('Sprawdzenie, czy przeszedł do kroku "Adresy"');
      cy.sprawdzenie_kroku2()
      });
  
      it('Niepoprawne imię', () => {
        cy.get('input[name="firstname"]').type('Test123');
        cy.get('input[name="lastname"]').type('Testowy');
        cy.get('input[name="email"]').type('test@test.st');
      cy.log('Zaznaczenie zgód');
      cy.checkboxy()
      cy.log('Próba przejścia dalej');
      cy.button1_continue()
      cy.log('Sprawdzenie, czy zostaliśmy na pierwszym kroku');
      cy.sprawdzenie_kroku1()
      cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.sprawdzenie_error1krok()
      });
  
      it('Niepoprawne nazwisko', () => {
        cy.get('input[name="firstname"]').type('Test');
        cy.get('input[name="lastname"]').type('Testowy123');
        cy.get('input[name="email"]').type('test@test.st');
      cy.log('Zaznaczenie zgód');
      cy.checkboxy()
      cy.log('Próba przejścia dalej');
      cy.button1_continue()
      cy.log('Sprawdzenie, czy zostaliśmy na pierwszym kroku');
      cy.sprawdzenie_kroku1()
      cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.sprawdzenie_error1krok()
      });
    
      it('Niepoprawny adres e-mail', () => {
        cy.get('input[name="firstname"]').type('Test');
        cy.get('input[name="lastname"]').type('Testowy');
        cy.get('input[name="email"]').type('testtest.st'); // brak @
      cy.log('Zaznaczenie zgód');
      cy.checkboxy()
      cy.log('Próba przejścia dalej');
      cy.button1_continue()
      cy.log('Sprawdzenie, czy zostaliśmy na pierwszym kroku');
      cy.sprawdzenie_kroku1()
      cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.sprawdzenie_error1krok()
      });
    
      it('Brak zaznaczenia zgód', () => {
        cy.poprawne_dane1krok()
      cy.log('Brak zaznaczenia zgód i próba przejścia dalej');
      cy.button1_continue()
        cy.log('Sprawdzenie, czy zostaliśmy na pierwszym kroku');
        cy.sprawdzenie_kroku1()
      });
    
      it('Poprawne wypełnienie formularza Adresy', () => {
        cy.poprawne_dane1krok()
        cy.checkboxy()
        cy.button1_continue()
      cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.sprawdzenie_kroku2()
      cy.log('Wprowadzanie poprawnych danych adresowych');
        cy.get('input[name="address1"]').type('Testowa 12');
        cy.get('input[name="postcode"]').type('0123');
        cy.get('input[name="city"]').type('Test');
        cy.get('input[name="phone"]').type('123123123');
      cy.log('Kliknięcie "Dalej"');
      cy.button2_continue()
      cy.log('Sprawdzenie, czy przeszło do kolejnego kroku z wyborem dostawy');
      cy.sprawdzenie_kroku3()
    });
  
   // cy.get('#checkout-addresses-step').should('not.be.visible');    takie przejścia między krokami?
   // cy.get('#checkout-delivery-step').should('be.visible');
  
   // .type('{selectall}{del}')
  
    it('Niepoprawne imię w adresie (cyfry)', () => {
        cy.poprawne_dane1krok()
        cy.checkboxy()
        cy.button1_continue()
      cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.sprawdzenie_kroku2()
      cy.log('Wprowadzanie niepoprawnego imienia');
        cy.get('#checkout-addresses-step input[name="firstname"]').clear().type('1234');
        cy.get('input[name="address1"]').type('Testowa 12');
        cy.get('input[name="postcode"]').type('1234');
        cy.get('input[name="city"]').type('Test');
        cy.get('input[name="phone"]').type('123123123');
        cy.button2_continue()
      cy.log('Sprawdzenie, czy pojawia się błąd');
        cy.get('#checkout-addresses-step .alert-form') 
          .should('be.visible') 
          .and('contain.text', 'Invalid name')
      });
  
    it('Niepoprawne nazwisko w adresie (cyfry)', () => {
        cy.poprawne_dane1krok()
        cy.checkboxy()
        cy.button1_continue()
      cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.sprawdzenie_kroku2()
      cy.log('Wprowadzanie niepoprawnego nazwiska');
        cy.get('#checkout-addresses-step input[name="lastname"]').clear().type('1234');
        cy.get('input[name="address1"]').type('Testowa 12');
        cy.get('input[name="postcode"]').type('1234');
        cy.get('input[name="city"]').type('Test');
        cy.get('input[name="phone"]').type('123123123');
        cy.button2_continue()
      cy.log('Sprawdzenie, czy pojawia się błąd');
        cy.get('#checkout-addresses-step .alert-form') 
          .should('be.visible') 
          .and('contain.text', 'Invalid name')
      });
  
    it('Niepoprawny numer telefonu', () => {
        cy.poprawne_dane1krok()
        cy.checkboxy()
        cy.button1_continue()
      cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.sprawdzenie_kroku2()
      cy.log('Wprowadzanie niepoprawnego numeru telefonu');
        cy.get('input[name="address1"]').type('Testowa 12');
        cy.get('input[name="postcode"]').type('1234');
        cy.get('input[name="city"]').type('Test');
        cy.get('input[name="phone"]').type('abcd');
        cy.button2_continue()
      cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.sprawdzenie_error2krok()
      });
  
    it('Niepoprawny kod pocztowy (np. @)', () => {
        cy.poprawne_dane1krok()
        cy.checkboxy()
        cy.button1_continue()
        cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
        cy.sprawdzenie_kroku2()
      cy.log('Wprowadzanie niepoprawnego kodu pocztowego');
        cy.get('input[name="address1"]').type('Testowa 12');
        cy.get('input[name="postcode"]').type('@');
        cy.get('input[name="city"]').type('Test');
        cy.get('input[name="phone"]').type('123123123');
        cy.button2_continue()
        cy.log('Sprawdzenie, czy pojawia się błąd');
        cy.sprawdzenie_error2krok()
      });
  
    it('Niepoprawne miasto (np. @@@)', () => {
        cy.poprawne_dane1krok()
        cy.checkboxy()
        cy.button1_continue()
      cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.sprawdzenie_kroku2()
      cy.log('Wprowadzanie niepoprawnej nazwy miasta');
        cy.get('input[name="address1"]').type('Testowa 12');
        cy.get('input[name="postcode"]').type('12');
        cy.get('input[name="city"]').type('@@@');
        cy.get('input[name="phone"]').type('123123123');
        cy.button2_continue()
      cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.sprawdzenie_error2krok()
      });
  })  