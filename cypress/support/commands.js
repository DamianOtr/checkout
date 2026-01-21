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

Cypress.Commands.add('checkout1', () => {
  cy.setCookie('CookieConsent', '{"stamp":"fake","necessary":true,"preferences":true,"statistics":true,"marketing":true,"ver":1}');
  cy.visit('https://presta-gb.vasco-technologies.com/translator/vasco-translator-v4#/7-color-black_onyx');

cy.get('body').then($body => {
  const modalBtn = $body.find('#fancybox-accept-gdpr-button');
  const overlay = $body.find('.fancybox-overlay-fixed');

if (modalBtn.length) {
  cy.wrap(modalBtn).click({ force: true });
  cy.then(() => {
    if (overlay.length) overlay.remove();
  });
}
});

    cy.get('.js-product-actions button[data-button-action="add-to-cart"]').click();
    cy.get('#blockcart-modal .cart-drawer-content-btn > a', { timeout: 10000 })
        .should('be.visible')
        .click();
    cy.get('.cart-detailed-actions a').click();
    })

Cypress.Commands.add('checkout', (productUrl) => {
  cy.setCookie('CookieConsent', '{"stamp":"fake","necessary":true,"preferences":true,"statistics":true,"marketing":true,"ver":1}');
  cy.visit(productUrl);


cy.get('body').then($body => {
  const modalBtn = $body.find('#fancybox-accept-gdpr-button');
  const overlay = $body.find('.fancybox-overlay-fixed');

if (modalBtn.length) {
  cy.wrap(modalBtn).click({ force: true });
  cy.then(() => {
    if (overlay.length) overlay.remove();
  });
}
});


   cy.get('.js-product-actions button[data-button-action="add-to-cart"]').click();
   cy.get('#blockcart-modal .cart-drawer-content-btn > a', { timeout: 10000 })
     .should('be.visible')
     .click();
   cy.get('.cart-detailed-actions a').click();
});


Cypress.Commands.add('fillPostalByHost', () => {
  const codes = {
    pl: '30-001',
    es: '28001',
    fr: '75001',
    de: '10115',
    it: '00184',
    gb: 'SW1A 1AA',
    us: '90210',
    hu: '1051',
    cz: '110 00',
    sk: '811 01',
    nl: '1012 AB',
    bg: '3001',
    dk: '2801',
    fi: '10115',
    hr: '12345',
    lt: '12345',
    pt: '9021-123',
    ro: '105122',
    se: '110 00',
    be: '1051',
    eu: '12345' 
  };
  return cy.location('hostname').then((host) => {
    const cc = (host.match(/presta-([a-z]{2})/i)?.[1] || 'eu').toLowerCase();
    const code = codes[cc] || codes.eu;
    cy.get('input[name="postcode"]').clear({ force: true }).type(code);
  });
});



    Cypress.Commands.add('poprawne_dane1krok', () => {
        cy.get('#checkout-personal-information-step input[name="firstname"]').type('Test');
        cy.get('#checkout-personal-information-step input[name="lastname"]').type('Testowy');
        cy.get('#checkout-personal-information-step input[name="email"]').type('test@test.st');
    })

    Cypress.Commands.add('checkboxy', () => {
        // cy.get('input[name="vasco-terms"]').check().should('be.checked');
        // cy.get('input[name="vasco-privacy"]').check().should('be.checked');
        cy.get('input[type="checkbox"]')
        .filter(':visible')
        .filter(':not(:disabled)')
        .check({ force: true });

cy.get('input[type="checkbox"]:visible:not(:disabled)')
  .should('be.checked');

    })

    Cypress.Commands.add('sprawdzenie_kroku1', () => {
        cy.get('#checkout-personal-information-step').should('be.visible');
        cy.get('input[name="email"]').should('exist')
    })

    Cypress.Commands.add('sprawdzenie_kroku2', () => {
        cy.get('#checkout-addresses-step').should('be.visible');
        cy.get('input[name="postcode"]').should('exist');
    })

    Cypress.Commands.add('sprawdzenie_kroku3', () => {
        cy.get('#checkout-delivery-step').should('be.visible');
      //  cy.get('#hook-display-before-carrier').should('exist');
    })

    Cypress.Commands.add('sprawdzenie_error1krok', () => {
        cy.get('#checkout-personal-information-step .alert-form') 
          .should('be.visible') 
        //   .and('contain.text', 'Invalid format.')
    })

    Cypress.Commands.add('sprawdzenie_error2krok', () => {
        cy.get('#checkout-addresses-step .alert-form') 
          .should('be.visible') 
        //   .and('contain.text', 'Invalid format.')
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