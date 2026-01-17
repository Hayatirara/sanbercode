import LoginPage from '../../support/loginPage.js';
import loginData from '../../fixtures/loginData.json';


describe('OrangeHRM - Login Feature (POM)', () => {

  beforeEach(() => {
    LoginPage.visit();
  });

  it('TC-LOGIN-001 - Verify login page can be accessed', () => {
    LoginPage.usernameField().should('be.visible');
    LoginPage.passwordField().should('be.visible');
    LoginPage.loginButton().should('be.visible');
  });

  it('TC-LOGIN-002 - Verify username field can be filled', () => {
    LoginPage.fillUsername(loginData.validUsername);
  });

  it('TC-LOGIN-003 - Verify password field can be filled', () => {
    LoginPage.fillPassword(loginData.validPassword);
  });

  it('TC-LOGIN-006 - Verify password is hidden', () => {
    LoginPage.passwordField()
      .should('have.attr', 'type', 'password');
  });

  it('TC-LOGIN-004 - Verify login with valid credentials', () => {
    LoginPage.login(
      loginData.validUsername,
      loginData.validPassword
    );
  });


  it('TC-LOGIN-007 - Login fails when username is empty', () => {
    LoginPage.fillPassword(loginData.validPassword);
    LoginPage.clickLogin();
    LoginPage.errorMessage('Required').should('be.visible');
  });

  it('TC-LOGIN-008 - Login fails when password is empty', () => {
    LoginPage.fillUsername(loginData.validUsername);
    LoginPage.clickLogin();
    LoginPage.errorMessage('Required').should('be.visible');
  });

  it('TC-LOGIN-009 - Login fails when username and password are empty', () => {
    LoginPage.clickLogin();
    LoginPage.errorMessage('Required').should('be.visible');
  });


  it('TC-LOGIN-022 - Forgot password link is visible', () => {
    LoginPage.forgotPasswordLink().should('be.visible');
  });

  it('TC-LOGIN-023 - Forgot password page can be opened', () => {
    LoginPage.forgotPasswordLink().click();
    cy.url().should('include', 'requestPasswordResetCode');
  });

  it('TC-LOGIN-028 - Reset password fails without username', () => {
    LoginPage.forgotPasswordLink().click();
    LoginPage.clickLogin();
    LoginPage.errorMessage('Required').should('be.visible');
  });

  it('TC-LOGIN-026 - Cancel reset password navigates back to login', () => {
    LoginPage.forgotPasswordLink().click();
    LoginPage.cancelButton().click();
    cy.url().should('include', '/auth/login');
  });

});