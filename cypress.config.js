const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://presta-gb.vasco-technologies.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
