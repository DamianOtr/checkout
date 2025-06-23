describe('Porównanie tekstu i meta danych (title, description) na dwóch URL-ach', () => {
    const url1 = 'https://presta-fi.vasco-technologies.com/aloitteet/auta-ukrainaa'; // pierwszy URL
    const url2 = 'https://vasco-translator.fi/aloitteet/auta-ukrainaa'; // drugi URL
    const className = '#wrapper'; // klasa diva do sprawdzenia

    // Funkcja do pobierania tekstu z HTML
    const getTextFromHtml = (html, selector) => {
        const parser = new DOMParser();
        const document = parser.parseFromString(html, 'text/html');
        const element = document.querySelector(selector);
        return element
            ? element.textContent
                .replace(/\t/g, '')               // Usuń wszystkie tabulatory
                .replace(/\n+/g, '\n')           // Zamień wiele nowych linii na jedną
                .trim()
            : null;
    };

    // Funkcja do pobierania meta title z HTML
    const getMetaTitleFromHtml = (html) => {
        const parser = new DOMParser();
        const document = parser.parseFromString(html, 'text/html');
        const titleTag = document.querySelector('title');
        return titleTag ? titleTag.textContent.trim() : null;
    };

    // Funkcja do pobierania meta description z HTML
    const getMetaDescriptionFromHtml = (html) => {
        const parser = new DOMParser();
        const document = parser.parseFromString(html, 'text/html');
        const metaTag = document.querySelector('meta[name="description"], meta[property="og:description"]');
        return metaTag ? metaTag.getAttribute('content') : null;
    };

    let textFromUrl1; // Zmienna na tekst z pierwszego URL-a
    let metaTitleFromUrl1; // Zmienna na meta title z pierwszego URL-a
    let metaDescriptionFromUrl1; // Zmienna na meta description z pierwszego URL-a

    it('Pobiera tekst i meta dane (title, description) z pierwszego URL-a', () => {
        cy.request(url1).then((response) => {
            expect(response.status).to.eq(200);
            textFromUrl1 = getTextFromHtml(response.body, className);
            metaTitleFromUrl1 = getMetaTitleFromHtml(response.body);
            metaDescriptionFromUrl1 = getMetaDescriptionFromHtml(response.body);
        });
    });

    it('Porównuje tekst i meta dane (title, description) na drugim URL-u i pokazuje różnice', () => {
        cy.request(url2).then((response) => {
            expect(response.status).to.eq(200);
            const textFromUrl2 = getTextFromHtml(response.body, className);
            const metaTitleFromUrl2 = getMetaTitleFromHtml(response.body);
            const metaDescriptionFromUrl2 = getMetaDescriptionFromHtml(response.body);

            // Porównanie tekstów
            if (textFromUrl1 !== textFromUrl2) {
                const diff = require('diff');
                const differences = diff.diffWords(textFromUrl1, textFromUrl2);
                differences.forEach((part) => {
                    if (part.added) {
                        cy.log(`+ ${part.value}`);
                    } else if (part.removed) {
                        cy.log(`- ${part.value}`);
                    }
                });
            } else {
                cy.log('Teksty są identyczne.');
            }

            // Porównanie meta title
            if (metaTitleFromUrl1 !== metaTitleFromUrl2) {
                cy.log(`Różnice w meta title:`);
                cy.log(`URL 1: ${metaTitleFromUrl1}`);
                cy.log(`URL 2: ${metaTitleFromUrl2}`);
            } else {
                cy.log('Meta title jest identyczne.');
            }

            // Porównanie meta description
            if (metaDescriptionFromUrl1 !== metaDescriptionFromUrl2) {
                cy.log(`Różnice w meta description:`);
                cy.log(`URL 1: ${metaDescriptionFromUrl1}`);
                cy.log(`URL 2: ${metaDescriptionFromUrl2}`);
            } else {
                cy.log('Meta description jest identyczne.');
            }
        });
    });
});