describe('OrangeHRM - Login Feature (Quiz 3 Final)', () => {

 it('TC-LOGIN-001 - Verify login page can be accessed', () => {
  cy.intercept('GET', '**/auth/login').as('loginPage');

  cy.visit('https://opensource-demo.orangehrmlive.com/');

  cy.get('input[name="username"]').should('be.visible');
  cy.get('input[name="password"]').should('be.visible');
  cy.get('button[type="submit"]').should('be.visible');
});


  it('TC-LOGIN-002 - Verify username field can be filled', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('i18nMessage');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('input[name="username"]').type('Admin');
  });

  it('TC-LOGIN-003 - Verify password field can be filled', () => {
    cy.intercept('GET', '**/core/i18n/messages?lang=en_US').as('i18nEN');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('input[name="password"]').type('admin123');
  });

  it('TC-LOGIN-006 - Verify password is hidden', () => {
  cy.intercept('GET', '**/auth/login').as('loginPage');

  cy.visit('https://opensource-demo.orangehrmlive.com/');

  cy.get('input[name="password"]', { timeout: 10000 })
    .should('be.visible')
    .and('have.attr', 'type', 'password');
});


  it('TC-LOGIN-004 - Verify login with valid credentials', () => {
    cy.intercept('POST', '**/auth/validate').as('loginSuccess');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginSuccess').its('response.statusCode').should('eq', 302);
  });

  it('TC-LOGIN-005 - Verify user redirected to dashboard after login', () => {
    cy.intercept('GET', '**/dashboard/index').as('dashboardPage');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@dashboardPage');
    cy.url().should('include', '/dashboard');
  });

  it('TC-LOGIN-007 - Login fails when username is empty', () => {
    cy.intercept('POST', '**/auth/validate?emptyUsername=true').as('emptyUser');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Required').should('be.visible');
  });

  it('TC-LOGIN-008 - Login fails when password is empty', () => {
    cy.intercept('POST', '**/auth/validate?emptyPassword=true').as('emptyPass');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.contains('Required').should('be.visible');
  });

  it('TC-LOGIN-009 - Login fails when username and password are empty', () => {
    cy.intercept('POST', '**/auth/validate?emptyAll=true').as('emptyAll');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('button[type="submit"]').click();

    cy.contains('Required').should('be.visible');
  });

  it('TC-LOGIN-010 - Login fails with invalid password', () => {
    cy.intercept('POST', '**/auth/validate?invalidPassword=true').as('invalidPass');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salahpassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-022 - Forgot password link is visible', () => {
    cy.intercept('GET', '**/auth/login?forgotLink=true').as('forgotLink');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.contains('Forgot your password?').should('be.visible');
  });

  it('TC-LOGIN-023 - Forgot password page can be opened', () => {
    cy.intercept('GET', '**/requestPasswordResetCode').as('forgotPage');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.contains('Forgot your password?').click();

    cy.wait('@forgotPage');
    cy.url().should('include', 'requestPasswordResetCode');
  });

  it('TC-LOGIN-028 - Reset password fails without username', () => {
  cy.intercept('POST', '**/auth/sendPasswordReset').as('resetFail');

  cy.visit('https://opensource-demo.orangehrmlive.com/');
  cy.contains('Forgot your password?').click();
  cy.get('button[type="submit"]').click();

  cy.contains('Required').should('be.visible');
});


  it('TC-LOGIN-026 - Cancel reset password navigates back to login', () => {
    cy.intercept('GET', '**/auth/login?cancelReset=true').as('cancelReset');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.contains('Forgot your password?').click();
    cy.contains('Cancel').click();

    cy.url().should('include', '/auth/login');
  });

});
