const { defineConfig } = require('cypress');

module.exports =  defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
  },
  viewportWidth: 1280, // macbook-13
  viewportHeight: 800,
  video: false,
});

// Orig settings
// viewportWidth: 1024,
// viewportHeight: 768,
