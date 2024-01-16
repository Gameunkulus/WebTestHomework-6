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
  title: 'Crime and Punishmen', 
  description: 'From the beginning we are locked into the frenzied consciousness of Raskolnikov who, against his better instincts, is inexorably drawn to commit a brutal double murder.',
  author: 'Fyodor Dostoyevsky'
}
const bookThird = {
  title: 'Mu-mu', 
  description: 'Heartbroken Gerasim finds his only joy – a puppy, whom he calls Mumu.',
  author: 'Ivan Turgenev'
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