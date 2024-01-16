/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


Cypress.Commands.add('login', (email, password) => { 
    cy.get('.ml-auto > .ml-2').click();
    if (email) {
            cy.get('#mail').type(email);
    }
    if (password) {
        cy.get('#pass').type(password);
    }
    cy.get('form > .ml-2').click();
   
 })

 Cypress.Commands.add('addFavoriteBook', (book) => {
    cy.get('.p-0 > .btn').click();
    cy.contains('Book description');
    cy.get('#title').type(book.title);
    cy.get('#description').type(book.description); 
    cy.get('#authors').type(book.author);
    cy.get('#favorite').click();
    cy.get('form > .ml-2').click();

 })

 Cypress.Commands.add('addNotFavoriteBook', (book) => {
    cy.get('.p-0 > .btn').click();
    cy.contains('Book description');
    cy.get('#title').type(book.title);
    cy.get('#description').type(book.description); 
    cy.get('#authors').type(book.author);
    cy.get('form > .ml-2').click();

 })