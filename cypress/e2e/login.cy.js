/**
 * - Login spec
 *   - Should display login page correctly
 *   - Should display alert when username is empty
 *   - Should display alert when password is empty
 *   - Should display alert when username and password are wrong
 *   - Should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('Should display login page correctly', () => {
    cy.get('input[placeholder="email@example.com"]').should('be.visible');
    cy.get('input[placeholder="***********"]').should('be.visible');
    cy.get('button').contains(/^Masuk$/).should('be.visible');
  });

  it('Should display alert when email is empty', () => {
    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('Should display alert when password is empty', () => {
    cy.get('input[placeholder="email@example.com"]').type('testuser');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('Should display alert when email or password is wrong', () => {
    cy.get('input[placeholder="email@example.com"]').type('testuser');
    cy.get('input[placeholder="***********"]').type('password123');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email or password is wrong');
    });
  });

  it('Should display homepage when email dan password are correct', () => {
    cy.get('input[placeholder="email@example.com"]').type('okgas1@mail.com');
    cy.get('input[placeholder="***********"]').type('okgas12345');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email or password is wrong');
    });

    cy.get('button')
      .contains(/^Logout$/)
      .should('be.visible');
  });
});
