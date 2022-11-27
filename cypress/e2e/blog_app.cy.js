describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Philipp Dittrich',
      username: 'pdittrich',
      password: 'Test1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#login-button').contains('login')
  })

  describe('login', function() {
    it('succeeds with correct credentials ', function() {
      cy.get('#username').type('pdittrich')
      cy.get('#password').type('Test1234')
      cy.get('#login-button').click()

      cy.contains('Philipp Dittrich is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('credentials')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain', 'wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

})