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

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'pdittrich', password: 'Test1234' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blog-title').type('Blogtitle')
      cy.get('#blog-author').type('Blogauthor')
      cy.get('#blog-url').type('Blogurl')
      cy.get('#blog-create').click()

      cy.contains('Blogtitle Blogauthor')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Anotherblog',
          author: 'Anotherauthor',
          url: 'Anotherurl',
          likes: 0
        })
      })

      it('it can be liked', function () {
        cy.get('.blog-list').should('not.contain', 'Anotherblog Anotherauthor')
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('1')
      })

      it('it can be deleted by the user who created it', function () {
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.get('.blog-list').should('not.contain', 'Anotherblog Anotherauthor')
      })

      it('it can not be deleted by another user', function () {
        const anotheruser = {
          name: 'Another User',
          username: 'anotheruser',
          password: 'Test1234'
        }
        cy.request('POST', 'http://localhost:3003/api/users', anotheruser)
        cy.login({ username: 'anotheruser', password: 'Test1234' })
        cy.contains('show').click()
        cy.get('.blog-list').should('not.contain', 'remove')
      })
    })

    describe('and multiple blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'blog 1',
          author: 'author',
          url: 'url',
          likes: 1
        })
        cy.createBlog({
          title: 'blog 2',
          author: 'author',
          url: 'url',
          likes: 2
        })
        cy.createBlog({
          title: 'blog 3',
          author: 'author',
          url: 'url',
          likes: 3
        })
      })

      it.only('they are sorted by the number of likes', function() {
        cy.get('.blog-container').eq(0).should('contain', 'blog 3')
        cy.get('.blog-container').eq(1).should('contain', 'blog 2')
        cy.get('.blog-container').eq(2).should('contain', 'blog 1')
      })
    })
  })
})