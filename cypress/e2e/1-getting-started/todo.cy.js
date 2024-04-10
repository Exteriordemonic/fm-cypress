/// <reference types="cypress" />

describe('Create a New Item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  it('shuld have the words "Add Item"', () => {
    cy.contains('Add Item');
  });

  it('should not have the words "Add Item"', () => {
    cy.contains('Add Item').should('exist');
  });

  it('shuld put stuff in an input', () => {
    cy.get('[data-test="new-item-input"]').type('New Item').should('have.value', 'New Item');
  });

  it
});
