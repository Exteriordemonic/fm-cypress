import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
    },
    supportFile: false, // Add this line
  },
})