/// <reference types="cypress" />

describe('Checkout', () => {

  beforeEach(() => {
    cy.log('Przygotowanie: Dodanie produktu do koszyka i przejście do checkoutu');
  
      cy.visit('https://presta-gb.vasco-technologies.com/translator/vasco-translator-m3#/1-color-arctic_white');
  
      cy.get('.js-product-actions button[data-button-action="add-to-cart"]').click();
      cy.get('#blockcart-modal .cart-drawer-content-btn > a').click(); // Przejście do koszyka
      cy.get('.cart-detailed-actions a').click(); // Przejście do checkoutu
    });
  
  it('Poprawne wypełnienie danych osobowych w pierwszym kroku', () => {
    cy.log('Sprawdzenie widoczności pierwszego kroku');
      cy.get('#checkout-personal-information-step').should('be.visible');
      cy.get('#checkout-personal-information-step').should('contain.text', 'Fill in basic information');  // Jak inaczej sprawdzić, czy wyświetla się dobry widok w zaleności od języka?
    cy.log('Wpisanie poprawnych danych');
      cy.get('#checkout-personal-information-step input[name="firstname"]').type('Test');
      cy.get('#checkout-personal-information-step input[name="lastname"]').type('Testowy');
      cy.get('#checkout-personal-information-step input[name="email"]').type('test@test.st');
    cy.log('Zgody: regulamin i polityka prywatności');
      cy.get('input[name="vasco-terms"]').check().should('be.checked');
      cy.get('input[name="vasco-privacy"]').check().should('be.checked');
    cy.log('Kliknięcie buttona z przejściem dalej');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy przeszedł do kroku "Adresy"');
      cy.get('#checkout-addresses-step').should('be.visible');
      cy.get('#checkout-addresses-step').should('contain.text', 'What is your billing address?');
      cy.get('input[name="postcode"]').should('exist');
    });

    it('Niepoprawne imię', () => {
      cy.get('input[name="firstname"]').type('Test123');
      cy.get('input[name="lastname"]').type('Testowy');
      cy.get('input[name="email"]').type('test@test.st');
    cy.log('Zaznaczenie zgód');
      cy.get('input[name="vasco-terms"]').check().should('be.checked');
      cy.get('input[name="vasco-privacy"]').check().should('be.checked');
    cy.log('Próba przejścia dalej');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy zostaliśmy na pierwszym kroku');
      cy.get('#checkout-personal-information-step').should('be.visible');
      cy.get('#checkout-personal-information-step').should('contain.text', 'Fill in basic information'); 
    cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.get('#checkout-personal-information-step .alert-form') 
        .should('be.visible') 
        .and('contain.text', 'Invalid format.')
    });

    it('Niepoprawne nazwisko', () => {
      cy.get('input[name="firstname"]').type('Test');
      cy.get('input[name="lastname"]').type('Testowy123');
      cy.get('input[name="email"]').type('test@test.st');
    cy.log('Zaznaczenie zgód');
      cy.get('input[name="vasco-terms"]').check().should('be.checked');
      cy.get('input[name="vasco-privacy"]').check().should('be.checked');
    cy.log('Próba przejścia dalej');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy zostaliśmy na pierwszym kroku');
      cy.get('#checkout-personal-information-step').should('be.visible');
      cy.get('#checkout-personal-information-step').should('contain.text', 'Fill in basic information');
    cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.get('#checkout-personal-information-step .alert-form') 
        .should('be.visible') 
        .and('contain.text', 'Invalid format.')
    });
  
    it('Niepoprawny adres e-mail', () => {
      cy.get('input[name="firstname"]').type('Test');
      cy.get('input[name="lastname"]').type('Testowy');
      cy.get('input[name="email"]').type('testtest.st'); // brak @
    cy.log('Zaznaczenie zgód');
      cy.get('input[name="vasco-terms"]').check().should('be.checked');
      cy.get('input[name="vasco-privacy"]').check().should('be.checked');
    cy.log('Próba przejścia dalej');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy zostaliśmy na pierwszym kroku');
      cy.get('#checkout-personal-information-step').should('be.visible');
      cy.get('#checkout-personal-information-step').should('contain.text', 'Fill in basic information');
    cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.get('#checkout-personal-information-step .alert-form') 
        .should('be.visible') 
        .and('contain.text', 'Invalid format.')
    });
  
    it('Brak zaznaczenia zgód', () => {
      cy.get('input[name="firstname"]').type('Test');
      cy.get('input[name="lastname"]').type('Testowy');
      cy.get('input[name="email"]').type('test@test.st');
    cy.log('Brak zaznaczenia zgód i próba przejścia dalej');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
      cy.log('Sprawdzenie, czy zostaliśmy na pierwszym kroku');
      cy.get('#checkout-personal-information-step').should('be.visible');
      cy.get('#checkout-personal-information-step').should('contain.text', 'Fill in basic information');
    });
  
    it('Poprawne wypełnienie formularza Adresy', () => {
      cy.get('input[name="firstname"]').type('Test');
      cy.get('input[name="lastname"]').type('Testowy');
      cy.get('input[name="email"]').type('test@test.st');
      cy.get('input[name="vasco-terms"]').check().should('be.checked');
      cy.get('input[name="vasco-privacy"]').check().should('be.checked');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.get('#checkout-addresses-step').should('be.visible');
      cy.get('#checkout-addresses-step').should('contain.text', 'What is your billing address?');
      cy.get('input[name="postcode"]').should('exist');
    cy.log('Wprowadzanie poprawnych danych adresowych');
      cy.get('input[name="address1"]').type('Testowa 12');
      cy.get('input[name="postcode"]').type('0123');
      cy.get('input[name="city"]').type('Test');
      cy.get('input[name="phone"]').type('123123123');
    cy.log('Kliknięcie "Dalej"');
      cy.get('#checkout-addresses-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy przeszło do kolejnego kroku z wyborem dostawy');
      cy.get('#checkout-delivery-step').should('be.visible');
      cy.get('#checkout-delivery-step').should('contain.text', 'Choose your delivery method');
     // cy.get('input[name="postcode"]').should('exist');
  });

 // cy.get('#checkout-addresses-step').should('not.be.visible');    takie przejścia między krokami?
 // cy.get('#checkout-delivery-step').should('be.visible');



 // .type('{selectall}{del}')

  it('Niepoprawne imię w adresie (cyfry)', () => {
      cy.get('input[name="firstname"]').type('Test');
      cy.get('input[name="lastname"]').type('Testowy');
      cy.get('input[name="email"]').type('test@test.st');
      cy.get('input[name="vasco-terms"]').check().should('be.checked');
      cy.get('input[name="vasco-privacy"]').check().should('be.checked');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.get('#checkout-addresses-step').should('be.visible');
      cy.get('#checkout-addresses-step').should('contain.text', 'What is your billing address?');
      cy.get('input[name="postcode"]').should('exist');
    cy.log('Wprowadzanie niepoprawnego imienia');
      cy.get('#checkout-addresses-step input[name="firstname"]').clear().type('1234');
      cy.get('input[name="address1"]').type('Testowa 12');
      cy.get('input[name="postcode"]').type('1234');
      cy.get('input[name="city"]').type('Test');
      cy.get('input[name="phone"]').type('123123123');
      cy.get('#checkout-addresses-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.get('#checkout-addresses-step .alert-form') 
        .should('be.visible') 
        .and('contain.text', 'Invalid name')
    });

  it('Niepoprawne nazwisko w adresie (cyfry)', () => {
      cy.get('input[name="firstname"]').type('Test');
      cy.get('input[name="lastname"]').type('Testowy');
      cy.get('input[name="email"]').type('test@test.st');
      cy.get('input[name="vasco-terms"]').check().should('be.checked');
      cy.get('input[name="vasco-privacy"]').check().should('be.checked');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.get('#checkout-addresses-step').should('be.visible');
      cy.get('#checkout-addresses-step').should('contain.text', 'What is your billing address?');
      cy.get('input[name="postcode"]').should('exist');
    cy.log('Wprowadzanie niepoprawnego nazwiska');
      cy.get('#checkout-addresses-step input[name="lastname"]').clear().type('1234');
      cy.get('input[name="address1"]').type('Testowa 12');
      cy.get('input[name="postcode"]').type('1234');
      cy.get('input[name="city"]').type('Test');
      cy.get('input[name="phone"]').type('123123123');
      cy.get('#checkout-addresses-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.get('#checkout-addresses-step .alert-form') 
        .should('be.visible') 
        .and('contain.text', 'Invalid name')
    });

  it('Niepoprawny numer telefonu', () => {
      cy.get('input[name="firstname"]').type('Test');
      cy.get('input[name="lastname"]').type('Testowy');
      cy.get('input[name="email"]').type('test@test.st');
      cy.get('input[name="vasco-terms"]').check().should('be.checked');
      cy.get('input[name="vasco-privacy"]').check().should('be.checked');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.get('#checkout-addresses-step').should('be.visible');
      cy.get('#checkout-addresses-step').should('contain.text', 'What is your billing address?');
      cy.get('input[name="postcode"]').should('exist');
    cy.log('Wprowadzanie niepoprawnego numeru telefonu');
      cy.get('input[name="address1"]').type('Testowa 12');
      cy.get('input[name="postcode"]').type('1234');
      cy.get('input[name="city"]').type('Test');
      cy.get('input[name="phone"]').type('abcd');
      cy.get('#checkout-addresses-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.get('#checkout-addresses-step .alert-form') 
        .should('be.visible') 
        .and('contain.text', 'Invalid format.')
    });

  it('Niepoprawny kod pocztowy (np. @)', () => {
      cy.get('input[name="firstname"]').type('Test');
      cy.get('input[name="lastname"]').type('Testowy');
      cy.get('input[name="email"]').type('test@test.st');
      cy.get('input[name="vasco-terms"]').check().should('be.checked');
      cy.get('input[name="vasco-privacy"]').check().should('be.checked');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
      cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.get('#checkout-addresses-step').should('be.visible');
      cy.get('#checkout-addresses-step').should('contain.text', 'What is your billing address?');
      cy.get('input[name="postcode"]').should('exist');
    cy.log('Wprowadzanie niepoprawnego kodu pocztowego');
      cy.get('input[name="address1"]').type('Testowa 12');
      cy.get('input[name="postcode"]').type('@');
      cy.get('input[name="city"]').type('Test');
      cy.get('input[name="phone"]').type('123123123');
      cy.get('#checkout-addresses-step .form-footer button[type="submit"]').click();
      cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.get('#checkout-addresses-step .alert-form') 
        .should('be.visible') 
        .and('contain.text', 'Invalid format.')
    });

  it('Niepoprawne miasto (np. @@@)', () => {
      cy.get('input[name="firstname"]').type('Test');
      cy.get('input[name="lastname"]').type('Testowy');
      cy.get('input[name="email"]').type('test@test.st');
      cy.get('input[name="vasco-terms"]').check().should('be.checked');
      cy.get('input[name="vasco-privacy"]').check().should('be.checked');
      cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy przeszło do kroku "Adresy"');
      cy.get('#checkout-addresses-step').should('be.visible');
      cy.get('#checkout-addresses-step').should('contain.text', 'What is your billing address?');
      cy.get('input[name="postcode"]').should('exist');
    cy.log('Wprowadzanie niepoprawnej nazwy miasta');
      cy.get('input[name="address1"]').type('Testowa 12');
      cy.get('input[name="postcode"]').type('12');
      cy.get('input[name="city"]').type('@@@');
      cy.get('input[name="phone"]').type('123123123');
      cy.get('#checkout-addresses-step .form-footer button[type="submit"]').click();
    cy.log('Sprawdzenie, czy pojawia się błąd');
      cy.get('#checkout-addresses-step .alert-form') 
        .should('be.visible') 
        .and('contain.text', 'Invalid format.')
    });



})  