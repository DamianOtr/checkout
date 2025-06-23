/// <reference types="cypress" />

describe('Checkout', () => {

    beforeEach(() => {

        cy.setCookie('__lglaw', '1')

        cy.visit('https://vasco-electronics.pl/akcesoria/powerbank-vasco.html')

        cy.get('.order-1.col-12 > #add-to-cart-or-refresh > .price-block > .price-container > .price-last-block > .col-sm-7 > .product-add-to-cart > .add-to-cart-block > .add-to-cart')
            .click()

        cy.get('.btn-color-secondary')
            .click()

        cy.get('.col-12 > .btn')
            .click()

    })


    it('Dane osobowe - poprawne uzupełnienie pól', () => {

        // Wybranie osoby prywatnej

        cy.get(':nth-child(1) > .custom-radio > input')
            .check()

        // Wybranie firmy

        // cy.get(':nth-child(2) > .custom-radio > input')
        //     .check()

        cy.get(':nth-child(3) > .col-md-6 > .form-control')
            .type('Test')

        cy.get(':nth-child(4) > .col-md-6 > .form-control')
            .type('Testowy')

        cy.get(':nth-child(5) > .col-md-6 > .form-control')
            .type('d.otrebski@vasco-electronics.com')

        cy.get('.text-right > .checkbox_to_accpet > .row > .col-12 > .select_all > .d-flex > .me-3 > .all')
            .check()

        cy.get('.col-sm-12 > .continue')
            .click()

        // przechodzi dalej...

        cy.get('.h4')
            .contains('Adres do faktury')

    })


    it('Niepoprawne uzupełnienie pól', () => {

        // Niepoprawne imie

        cy.get(':nth-child(3) > .col-md-6 > .form-control')
            .type('Test123')

        cy.get(':nth-child(4) > .col-md-6 > .form-control')
            .type('Testowy')

        cy.get(':nth-child(5) > .col-md-6 > .form-control')
            .type('d.otrebski@vasco-electronics.com')

        cy.get('.text-right > .checkbox_to_accpet > .row > .col-12 > .select_all > .d-flex > .me-3 > .all')
            .check()

        cy.get('.col-sm-12 > .continue')
            .click()

        // nie przechodzi dalej -> komunikat

        cy.get('.alert')
            .contains('Nieprawidłowa nazwa')

        // Niepoprawne nazwisko

        cy.get(':nth-child(3) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('Test')

        cy.get(':nth-child(4) > .col-md-6 > .form-control')
            .type('123')

        cy.get('.text-right > .checkbox_to_accpet > .row > .col-12 > .select_all > .d-flex > .me-3 > .all')
            .check()

        cy.get('.col-sm-12 > .continue')
            .click()

        // nie przechodzi dalej -> komunikat

        cy.get('.alert')
            .contains('Nieprawidłowa nazwa')

        // Niepoprawny format adresu email

        cy.get(':nth-child(4) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('Testowy')

        cy.get(':nth-child(5) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('d.otrebskivasco-electronics.com')

        cy.get('.text-right > .checkbox_to_accpet > .row > .col-12 > .select_all > .d-flex > .me-3 > .all')
            .check()

        cy.get('.col-sm-12 > .continue')
            .click()

        // nie przechodzi dalej...

        cy.get('#customer-form > .form-fields > :nth-child(1) > .form-control-label')
            .contains('Zamów jako')

    })


    it('Adresy - poprawne uzupełnienie pól', () => {

        // Wybranie osoby prywatnej

        cy.get(':nth-child(1) > .custom-radio > input')
            .check()

        // Wybranie firmy

        // cy.get(':nth-child(2) > .custom-radio > input')
        //     .check()

        cy.get(':nth-child(3) > .col-md-6 > .form-control')
            .type('Test')

        cy.get(':nth-child(4) > .col-md-6 > .form-control')
            .type('Testowy')

        cy.get(':nth-child(5) > .col-md-6 > .form-control')
            .type('d.otrebski@vasco-electronics.com')

        cy.get('.text-right > .checkbox_to_accpet > .row > .col-12 > .select_all > .d-flex > .me-3 > .all')
            .check()

        cy.get('.col-sm-12 > .continue')
            .click()

        // Adresy

        cy.get(':nth-child(7) > .col-md-6 > .form-control')
            .type('Adres testowy 12')

        cy.get(':nth-child(9) > .col-md-6 > .form-control')
            .type('12-345')

        cy.get(':nth-child(10) > .col-md-6 > .form-control')
            .type('Miasto testowe')

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        // cy.wait(2000)

        cy.get('#delivery_container_847 > .delivery-row')
            .contains('Kurier UPS')

    })


    it('Adresy - niepoprawne uzupełnienie pól', () => {

        // Wybranie osoby prywatnej

        cy.get(':nth-child(1) > .custom-radio > input')
            .check()

        // Wybranie firmy

        // cy.get(':nth-child(2) > .custom-radio > input')
        //     .check()

        cy.get(':nth-child(3) > .col-md-6 > .form-control')
            .type('Test')

        cy.get(':nth-child(4) > .col-md-6 > .form-control')
            .type('Testowy')

        cy.get(':nth-child(5) > .col-md-6 > .form-control')
            .type('d.otrebski@vasco-electronics.com')

        cy.get('.text-right > .checkbox_to_accpet > .row > .col-12 > .select_all > .d-flex > .me-3 > .all')
            .check()

        cy.get('.col-sm-12 > .continue')
            .click()

        //Adresy

        // Niepoprawne imie

        cy.get('.js-address-form > .form-fields > :nth-child(5) > .col-md-6 > .form-control')
            .type('123')

        cy.get(':nth-child(7) > .col-md-6 > .form-control')
            .type('Adres testowy 12')

        cy.get(':nth-child(9) > .col-md-6 > .form-control')
            .type('12-345')

        cy.get(':nth-child(10) > .col-md-6 > .form-control')
            .type('Miasto testowe')

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        cy.get('.error')
            .contains('Nieprawidłowa nazwa')

        // Nieprawidłowe nazwisko

        cy.get('.js-address-form > .form-fields > :nth-child(5) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('Test')

        cy.get(':nth-child(6) > .col-md-6 > .form-control')
            .type('123')

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        cy.get('.error')
            .contains('Nieprawidłowa nazwa')

        // Nieprawidłowy adres

        cy.get(':nth-child(6) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('Testowy')

        cy.get(':nth-child(7) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('@')

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        cy.get('.error')
            .contains('Nieprawidłowy format.')

        // Nieprawidłowy kod pocztowy

        cy.get(':nth-child(7) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('Adres testowy 12')

        cy.get(':nth-child(9) > .col-md-6 > .form-control')
            .type('3')

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        cy.get('.error')
            .contains('Nieprawidłowy kod pocztowy - powinien wyglądać tak: "NN-NNN"')

        // Nieprawidłowe miasto

        cy.get(':nth-child(9) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('12-345')

        cy.get(':nth-child(10) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('@')

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        cy.get('.error')
            .contains('Nieprawidłowy format.')

        // Nieprawidłowy telefon

        cy.get(':nth-child(10) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('Miasto testowe')

        cy.get(':nth-child(12) > .col-md-6 > .form-control')
            .type('aaaa')

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        cy.get('.error')
            .contains('Nieprawidłowy format.')

        // Nieprawidłowe uzupełnienie adresu

        cy.get(':nth-child(12) > .col-md-6 > .form-control')
            .type('{selectall}{del}')
            .type('111222333')

        cy.get(':nth-child(8) > .col-md-6 > .form-control')
            .type('@')

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        cy.get('.error')
            .contains('Nieprawidłowy format.')

    })


    it('Płatności', () => {

        // Wybranie osoby prywatnej

        cy.get(':nth-child(1) > .custom-radio > input')
            .check()

        // Wybranie firmy

        // cy.get(':nth-child(2) > .custom-radio > input')
        //     .check()

        cy.get(':nth-child(3) > .col-md-6 > .form-control')
            .type('Test')

        cy.get(':nth-child(4) > .col-md-6 > .form-control')
            .type('Testowy')

        cy.get(':nth-child(5) > .col-md-6 > .form-control')
            .type('d.otrebski@vasco-electronics.com')

        cy.get('.text-right > .checkbox_to_accpet > .row > .col-12 > .select_all > .d-flex > .me-3 > .all')
            .check()

        cy.get('.col-sm-12 > .continue')
            .click()

        // Adresy

        cy.get(':nth-child(7) > .col-md-6 > .form-control')
            .type('Adres testowy 12')

        cy.get(':nth-child(9) > .col-md-6 > .form-control')
            .type('12-345')

        cy.get(':nth-child(10) > .col-md-6 > .form-control')
            .type('Miasto testowe')

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        // Sposób dostawy

        cy.get('#delivery_container_847 > .delivery-row')
            .click()

        cy.get('#delivery_message')
            .type('Testowy komentarz')

        cy.get(':nth-child(2) > .continue-container > .continue-button > .continue')
            .click()

        // Przejście dalej do płatności

        cy.get('#payment-option-1-container > .row')
            .contains('Zapłać')

    })


    it('2 różne Adresy', () => {

        // Wybranie osoby prywatnej

        cy.get(':nth-child(1) > .custom-radio > input')
            .check()

        // Wybranie firmy

        // cy.get(':nth-child(2) > .custom-radio > input')
        //     .check()

        cy.get(':nth-child(3) > .col-md-6 > .form-control')
            .type('Test')

        cy.get(':nth-child(4) > .col-md-6 > .form-control')
            .type('Testowy')

        cy.get(':nth-child(5) > .col-md-6 > .form-control')
            .type('d.otrebski@vasco-electronics.com')

        cy.get('.text-right > .checkbox_to_accpet > .row > .col-12 > .select_all > .d-flex > .me-3 > .all')
            .check()

        cy.get('.col-sm-12 > .continue')
            .click()

        // Adres 1

        cy.get(':nth-child(7) > .col-md-6 > .form-control')
            .type('Adres testowy 12')

        cy.get(':nth-child(9) > .col-md-6 > .form-control')
            .type('12-345')

        cy.get(':nth-child(10) > .col-md-6 > .form-control')
            .type('Miasto testowe')

        cy.get('#use_same_address')
            .check()

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        // Adres 2  (poprawne uzupełnienie pól)

        cy.get('.h4')
            .contains('Adres dostawy')

        cy.get(':nth-child(8) > .col-md-6 > .form-control')
            .type('Adres testowy 34')

        cy.get(':nth-child(10) > .col-md-6 > .form-control')
            .type('34-567')

        cy.get(':nth-child(11) > .col-md-6 > .form-control')
            .type('Testowe Miasto 2')

        cy.get('.js-address-form > .form-footer > .continue')
            .click()

        // Przejście dalej

        cy.get('#delivery_container_847 > .delivery-row')
            .contains('Kurier UPS')

        // Powrót do adresów

        cy.get('#checkout-addresses-step > .section-header')
            .click()

        cy.get('#checkout-addresses-step > .content')
            .contains('Adres do faktury')

        cy.get('#checkout-addresses-step > .content')
            .contains('Adres dostawy')

        // Edycja adresu do faktury ***

        // cy.get('#id-address-invoice-address-110546 > .radio-block > .address-footer > .row > :nth-child(1) > .edit-address')
        //     .click()

        // cy.get('.js-address-form > .form-fields > :nth-child(5) > .col-md-6 > .form-control')
        //     .type('no i tak to jest')

        // cy.get('.js-address-form > .form-footer > .continue')
        //     .click()

        // cy.get('#checkout-addresses-step > .section-header')
        //     .click()

        // cy.get('#id-address-invoice-address-109742')
        //     .contains('Test no i tak to jest Testowy')


        // Edycja adresu dostawy

        // cy.get('#id-address-delivery-address-109743 > .radio-block > .address-footer > .row > :nth-child(1) > .edit-address')
        // .click


        // Usuwanie zapisanych adresów



    })

})