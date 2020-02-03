// https://docs.cypress.io/api/introduction/api.html

describe('Visit the app', () => {
  it('Visits the app root url', () => {
    cy.visit('https://localhost:8080/')
    cy.contains('h1', 'Welcome')
  })
})

describe('Login with admin role', () => {
  before(() => {
    cy.visit('https://localhost:8080/')
    cy.contains('span', 'Login').click({ force: true })
    cy.url().should('include', '/login')

    cy.get('[data-id="username"]')
      .type('dumbo111')
      .should('have.value', 'dumbo111')

    cy.get('[data-id="password"]')
      .type('dumbo111')
      .should('have.value', 'dumbo111')

    cy.get('[data-id="signin-btn"]').click()
    cy.url().should('include', '/myprofile')
  })

  it('add new post', () => {
    cy.get('[data-id="newpost-btn"]').click()
    cy.url().should('include', '/myprofile/newpost')

    cy.get('input[name="input-title"]').type('Hello Cypress')
    cy.get('input[name="input-image"]').type(
      'https://st3.depositphotos.com/1420973/13147/i/1600/depositphotos_131478896-stock-photo-tuscany-cypress-trees-white-road.jpg'
    )
    cy.get('textarea').type('Hello cypress')

    cy.get('[data-id="addpost-btn"]').click()
    cy.url().should('include', '/posts/')
  })

  it('goes to posts on nav menu, goes to first post and add/edit/delete no-offensive-words comment', () => {
    cy.get('[data-id="nav-menu-btn"]').click({ force: true })

    cy.contains('Posts').click({ force: true })
    cy.url().should('include', '/posts')

    cy.get('[data-id="post-link"]')
      .first()
      .click({ force: true })
    cy.get('[data-id="show-comments-btn"]').click()
    cy.get('input[name="input-comment"]').type(
      'this is a no-offensive-words comment'
    )
    cy.get('[data-id="add-comment-btn"]').click()

    cy.get('[data-id="edit-comment-btn"]').click()
    cy.get('input[name="input-comment-edit"]').type(' EDITED')
    cy.get('[data-id="send-comment-btn"]').click()

    cy.get('[data-id="delete-comment-btn"]').click()
    cy.contains('this is a no-offensive-words comment').should('not.exist')
  })

  it('goes to posts on nav menu, goes to first post and add offensive-words comment', () => {
    cy.get('[data-id="nav-menu-btn"]').click({ force: true })

    cy.contains('Posts').click({ force: true })
    cy.url().should('include', '/posts')

    cy.get('[data-id="post-link"]')
      .first()
      .click({ force: true })
    cy.get('[data-id="show-comments-btn"]').click()
    cy.get('input[name="input-comment"]').type(
      'this is a puta offensive-words comment'
    )
    cy.get('[data-id="add-comment-btn"]').click()
    cy.get('[data-id="error-text"]').contains(
      'Your comment cannot contain offensive words'
    )
    cy.contains('Word: puta')
    cy.contains('Level: 5')
    cy.contains('Agree').click()
  })

  it('goes to edit post', () => {
    cy.get('[data-id="edit-post-btn"]').click()
    cy.url().should('include', '/myprofile/newpost')
    cy.get('input[name="input-title"]').type(' EDITED')
    cy.get('textarea').type(' EDITED')

    cy.get('[data-id="editpost-btn"]').click()
    cy.url().should('include', '/posts/')
  })

  it('goes to delete post', () => {
    cy.get('[data-id="delete-post-btn"]').click()
    cy.url().should('include', '/myprofile')
    cy.contains('Hello Cypress').should('not.exist')
  })

  it('goes to myprofile/words and add one offensive word', () => {
    cy.get('[data-id="nav-menu-btn"]').click({ force: true })

    cy.contains('My Profile').click({ force: true })
    cy.url().should('include', '/myprofile')

    cy.get('[data-id="words-btn"]').click()
    cy.url().should('include', '/myprofile/words')

    cy.get('input[name="input-word"]').type('feo')
    cy.get('input[name="input-level"]').type(1)
    cy.get('[data-id="add-word-btn"]').click()
    cy.contains('Word: feo')
  })

  it('goes to delete word', () => {
    cy.get('[data-id="delete-word-btn"]')
      .first()
      .click({ force: true })
    cy.contains('feo').should('not.exist')
  })
})
