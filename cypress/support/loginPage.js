class LoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }

  usernameField() {
    return cy.get('input[name="username"]');
  }

  passwordField() {
    return cy.get('input[name="password"]');
  }

  loginButton() {
    return cy.get('button[type="submit"]');
  }

  forgotPasswordLink() {
    return cy.contains('Forgot your password?');
  }

  cancelButton() {
    return cy.contains('Cancel');
  }

  errorMessage(text) {
    return cy.contains(text);
  }

  fillUsername(username) {
    if (username) {
      this.usernameField().type(username);
    }
  }

  fillPassword(password) {
    if (password) {
      this.passwordField().type(password);
    }
  }

  clickLogin() {
    this.loginButton().click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
  }
}

export default new LoginPage();
