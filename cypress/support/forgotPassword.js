class ForgotPasswordPage {

  visitLogin() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }

  forgotLink() {
    return cy.contains('Forgot your password?');
  }

  usernameInput() {
    return cy.get('input[name="username"]');
  }

  resetButton() {
    return cy.get('button[type="submit"]');
  }

  cancelButton() {
    return cy.contains('Cancel');
  }

  backButton() {
    return cy.get('button').first();
  }

  successMessage() {
    return cy.contains('Reset Password link sent successfully');
  }

  requiredMessage() {
    return cy.contains('Required');
  }
}

export default ForgotPasswordPage;
