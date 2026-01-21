
const PRODUCT_URLS = require('../fixtures/product_urls.json');

const hostOf = (url) => {
  try { return new URL(url).host; } catch { return url; }
};

describe('Checkout smoke test - wszystkie rynki', () => {
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  PRODUCT_URLS.forEach((url) => {
    it('Przejście przez ścieżkę zakupową – ${hostOf(url)}', () => {

      cy.checkout(url);

      cy.poprawne_dane1krok();
      cy.checkboxy();
    cy.button1_continue();
      cy.sprawdzenie_kroku2();
      cy.get('input[name="address1"]').type('Testowa 12');

      cy.fillPostalByHost();

      cy.get('input[name="city"]').type('Test');
      cy.get('input[name="phone"]').type('0123456789');

cy.get('body').then($body => {
  if ($body.find('#dni').length) {
    cy.get('#dni').type('Test');
  }
  if ($body.find('#address2').length) {
    cy.get('#address2').type('Test 13');
  }
});

cy.get('body').then($body => {
  const el = $body.find('.id_state > .form-input > .form-control');
  if (el.length) {
    cy.wrap(el).select(1);
  } else {
  }
});

    cy.button2_continue();
      cy.sprawdzenie_kroku3();
    });
  });
});