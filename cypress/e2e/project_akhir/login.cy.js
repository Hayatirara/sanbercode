import LoginFinal from '../../support/loginFinal'

describe('Tugas Akhir - Login (POM & Intercept)', () => {

  const loginPage = new LoginFinal()

  beforeEach(function () {
    loginPage.visit()
    cy.fixture('project_akhir/loginFinal').as('data')
  })

  it('TC-LOGIN-001 - Halaman login dapat diakses', () => {
    loginPage.username().should('be.visible')
    loginPage.password().should('be.visible')
    loginPage.loginBtn().should('be.visible')
  })

  it('TC-LOGIN-002 - Username dapat diisi', function () {
    loginPage.username().type(this.data.valid.username)
  })

  it('TC-LOGIN-003 - Password dapat diisi', function () {
    loginPage.password().type(this.data.valid.password)
  })

  it('TC-LOGIN-004 & 005 - Login sukses', function () {
    loginPage.login(
      this.data.valid.username,
      this.data.valid.password
    )

    cy.url().should('include', '/dashboard')
  })

  it('TC-LOGIN-006 - Password tersembunyi', function () {
    loginPage.password().type(this.data.valid.password)
    loginPage.password().should('have.attr', 'type', 'password')
  })

  it('TC-LOGIN-007 - Username kosong', function () {
    loginPage.login('', this.data.valid.password)
    cy.contains('Required').should('be.visible')
  })

  it('TC-LOGIN-008 - Password kosong', function () {
    loginPage.login(this.data.valid.username, '')
    cy.contains('Required').should('be.visible')
  })

  it('TC-LOGIN-009 - Username & password kosong', () => {
    loginPage.loginBtn().click()
    cy.contains('Required').should('be.visible')
  })

  it('TC-LOGIN-010 - Password salah', function () {
    loginPage.login(
      this.data.valid.username,
      this.data.invalid.password
    )
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOGIN-011 - Username tidak terdaftar', function () {
    loginPage.login(
      this.data.invalid.username,
      this.data.valid.password
    )
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOGIN-012 - Username diawali spasi', function () {
    loginPage.login(
      '   Admin',
      this.data.valid.password
    )
    cy.contains('Invalid credentials').should('be.visible')
  })

})
