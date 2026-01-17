class LoginFinal {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
  }

  username() {
    return cy.get('input[name="username"]')
  }

  password() {
    return cy.get('input[name="password"]')
  }

  loginBtn() {
    return cy.get('button[type="submit"]')
  }

  errorMsg() {
    return cy.get('.oxd-alert-content-text')
  }

  login(username, password) {
    if (username) this.username().clear().type(username)
    if (password) this.password().clear().type(password)
    this.loginBtn().click()
  }
}

export default LoginFinal
