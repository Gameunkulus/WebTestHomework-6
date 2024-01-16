const { element } = require("prop-types");

describe('log in to the site', () => {

  beforeEach(()=> {
    cy.visit('/');
  })
  it('login successful test', () => {
    cy.login('test@test.com', 'test');
    cy.get('.pt-2').should('be.visible');
  })

  it('empty email test', () => {
    cy.login(' ', 'test');   
    cy.get('#mail').then((elements)=>{
      expect(elements[0].checkValidity()).to.be.false
    });
    
  })

  it('wrong password', () => {
    cy.login('test@test.com', 'test1');
    cy.get(('.mb-3')).should('be.visible');
  })  
})

const bookFirst = {
  title: 'IT', 
  description: 'Seven friends from the fictional city of Derry in Maine are fighting the IT monster, which kills children and is able to take on any physical appearance based on the deepest fears of its victims.',
  author: 'Stiven King'
}
const bookSecond = {
  title: 'Sherlock Holmes and Doctor Watson', 
  description: 'The story of the beginning of one of the most famous detective team, which starts on the baker street.',
  author: 'Artur Conan Doyle'
}
const bookThird = {
  title: 'The Wonderful Wizard of Oz', 
  description: 'A Kansas farm girl named Dorothy ends up in the magical Land of Oz after she and her pet dog Toto are swept away from their home by a tornado. .',
  author: 'Laiman Frank Baum'
}

describe('add book', () => {

  beforeEach(()=> {
    cy.visit('/');
    cy.login('test@test.com', 'test');
  })


  it('add favorite book', () => {
   cy.addFavoriteBook(bookFirst);
   cy.get('.card-title').should("contain.text", bookFirst.title);
  })

  it('add not favorite book', ()=> {
    cy.addNotFavoriteBook(bookThird);
    cy.get('.card-title').should("contain.text", bookThird.title);
  })

  it('Add a non-favorite to favorites', ()=> {
    cy.addNotFavoriteBook(bookThird);
    cy.contains(bookThird.title)
    .should('be.visible')
    .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit('/favorites');
    cy.contains(bookThird.title).should('be.visible');
  })

  it('Delete from favorite', ()=> {
    cy.visit("/favorites");
    cy.contains(bookFirst.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });    ;

  })