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
    cy.contains('span', 'Login').click({force: true})
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
    cy.get('input[name="input-image"]').type('https://st3.depositphotos.com/1420973/13147/i/1600/depositphotos_131478896-stock-photo-tuscany-cypress-trees-white-road.jpg')
    cy.get('textarea').type('Hello cypress')

    cy.get('[data-id="addpost-btn"]').click()
    cy.url().should('include', '/posts/')
  })

  it('goes to posts on nav menu, goes to first post and add/edit/delete no-offensive-words comment', () => {
    cy.get('[data-id="nav-menu-btn"]').click({ force: true })

    cy.contains('Posts').click({ force: true })
    cy.url().should('include', '/posts')

    cy.get('[data-id="post-link"]').first().click({ force: true })
    cy.get('[data-id="show-comments-btn"]').click()
    cy.get('input[name="input-comment"]').type('this is a no-offensive-words comment')
    cy.get('[data-id="add-comment-btn"]').click()

    cy.get('[data-id="edit-comment-btn"]').click()
    cy.get('input[name="input-comment-edit"]').type(' EDITED')
    cy.get('[data-id="send-comment-btn"]').click()

    cy.get('[data-id="delete-comment-btn"]').click()
    cy.contains('this is a no-offensive-words comment').should('not.exist');
  })

  it('goes to posts on nav menu, goes to first post and add offensive-words comment', () => {
    cy.get('[data-id="nav-menu-btn"]').click({ force: true })

    cy.contains('Posts').click({ force: true })
    cy.url().should('include', '/posts')

    cy.get('[data-id="post-link"]').first().click({ force: true })
    cy.get('[data-id="show-comments-btn"]').click()
    cy.get('input[name="input-comment"]').type('this is a puta offensive-words comment')
    cy.get('[data-id="add-comment-btn"]').click()
    cy.get('[data-id="error-text"]').contains('Your comment cannot contain offensive words')
    cy.contains('Word: puta')
    cy.contains('Level: 5')
  })

  // it('adds a NEW POST', () => {
  //   cy.contains('New Post').click()
  //   cy.get('input[name="input-title"]').type('Write Your Test With Cypress')
  //   cy.get('textarea')
  //     .type(
  //       `This is a relatively straightforward test, but consider how much code has been covered by it, both on the client and the server!`
  //     )
  //   cy.get('.post-btn').click()
  // })
  // it('goes to SETTING and add Offensive Word', () => {
  //   cy.contains('settings').click()
  //   cy.get('input[name="new-word"]').type('aweonao')
  //   cy.get('input[name="new-level"]').type('2')
  //   cy.contains('add +').click()
  //   cy.get('.fa-trash').last().click()
  // })
})
