/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test=new-item-input]').type('New Item');
      cy.get('[data-test="add-item"]').click();
      cy.contains('New Item');
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test=new-item-input]').type('New Item');
      cy.get('[data-test="add-item"]').click();
      cy.get('[data-test="items-unpacked"] > ul').contains('New Item');
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test=new-item-input]').type('New Item');
      cy.get('[data-test="add-item"]').click();
      cy.get('[data-test="items-unpacked"] > ul > li:last-child > label').contains('New Item');
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');
      cy.get('[data-test="items-unpacked"] > ul').contains('Tooth');
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');
      cy.get('[data-test="items-unpacked"] > ul').contains('Deoderant').should('not.exist');
    });

    it('should show all items when the filter field is empty', () => {
      cy.get('[data-test="filter-items"]').clear();
      cy.get('[data-test="items-unpacked"] > ul').contains('Tooth');
      cy.get('[data-test="items-unpacked"] > ul').contains('Deoderant');
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items-unpacked"] > ul > li').should('not.exist');
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items-unpacked"] > ul > li [data-test="remove"]').should('exist');
        cy.get('[data-test="items-packed"] > ul > li [data-test="remove"]').should('exist');
      });

      it('should remove an item from the page', () => {
        const firstItem = cy.get('[data-test="items-unpacked"] > ul > li:first-child');
        firstItem.find('[data-test="remove"]').click();

        firstItem.should('not.exist');
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"] > ul > li').should('not.exist');
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      const itemsCheckbox = cy.get('[data-test="items-unpacked"] > ul > li input[type="checkbox"]');
      itemsCheckbox.each(($el) => {
        cy.wrap($el).check({ force: true });
      });

      cy.get('[data-test="item-unpacked"] li').should('not.exist');
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items-unpacked"] > ul > li:first-child input[type="checkbox"]').then((firstItem) => {
        const firstItemID = firstItem.attr('id');
        console.log(firstItem, firstItemID);
        cy.wrap(firstItem).check({ force: true });
        cy.get('[data-test="items-packed"] > ul').not(firstItemID);
      });

      cy.get('[data-test="items-unpacked"] > ul > li:last-child input[type="checkbox"]').then((firstItem) => {
        const firstItemID = firstItem.attr('id');
        console.log(firstItem, firstItemID);
        cy.wrap(firstItem).check({ force: true });
        cy.get('[data-test="items-packed"] > ul').not(firstItemID);
      });

    });
  });
});
