// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//  Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add('checkout', () => {
    cy.visit('https://presta-gb.vasco-technologies.com/translator/vasco-translator-m3#/1-color-arctic_white');
    cy.get('.js-product-actions button[data-button-action="add-to-cart"]').click();
    cy.get('#blockcart-modal .cart-drawer-content-btn > a').click(); 
    cy.get('.cart-detailed-actions a').click();
    })

    Cypress.Commands.add('poprawne_dane1krok', () => {
        cy.get('#checkout-personal-information-step input[name="firstname"]').type('Test');
        cy.get('#checkout-personal-information-step input[name="lastname"]').type('Testowy');
        cy.get('#checkout-personal-information-step input[name="email"]').type('test@test.st');
    })

    Cypress.Commands.add('checkboxy', () => {
        cy.get('input[name="vasco-terms"]').check().should('be.checked');
        cy.get('input[name="vasco-privacy"]').check().should('be.checked');
    })

    Cypress.Commands.add('sprawdzenie_kroku1', () => {
        cy.get('#checkout-personal-information-step').should('be.visible');
        cy.get('#checkout-personal-information-step').should('contain.text', 'Fill in basic information');
        cy.get('input[name="email"]').should('exist')
    })

    Cypress.Commands.add('sprawdzenie_kroku2', () => {
        cy.get('#checkout-addresses-step').should('be.visible');
        cy.get('#checkout-addresses-step').should('contain.text', 'What is your billing address?');
        cy.get('input[name="postcode"]').should('exist');
    })

    Cypress.Commands.add('sprawdzenie_kroku3', () => {
        cy.get('#checkout-delivery-step').should('be.visible');
        cy.get('#checkout-delivery-step').should('contain.text', 'Choose your delivery method');
       // cy.get('input[name="postcode"]').should('exist');
    })

    Cypress.Commands.add('sprawdzenie_error1krok', () => {
        cy.get('#checkout-personal-information-step .alert-form') 
          .should('be.visible') 
          .and('contain.text', 'Invalid format.')
    })

    Cypress.Commands.add('sprawdzenie_error2krok', () => {
        cy.get('#checkout-addresses-step .alert-form') 
          .should('be.visible') 
          .and('contain.text', 'Invalid format.')
    })

    Cypress.Commands.add('button1_continue', () => {
        cy.get('#checkout-personal-information-step .form-footer button[type="submit"]').click();
    })

    Cypress.Commands.add('button2_continue', () => {
        cy.get('#checkout-addresses-step .form-footer button[type="submit"]').click();
    })

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })