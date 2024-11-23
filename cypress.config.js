const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges:false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    experimentalStudio: true,
    //specPattern: 'cypress/e2e/**/*.spec.js'
  },
});