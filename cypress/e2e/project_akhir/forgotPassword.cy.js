import ForgotPasswordPage from '../../support/forgotPassword';

const forgotPage = new ForgotPasswordPage();

describe('Tugas Akhir - Forgot Password Automation (POM & Intercept)', () => {

  beforeEach(() => {
    forgotPage.visitLogin();
  });

  // TC-LOGIN-022
  it('TC-LOGIN-022 - Halaman forgot password dapat dibuka', () => {
    forgotPage.forgotLink().click();
    cy.contains('Reset Password').should('be.visible');
  });

  // TC-LOGIN-023
  it('TC-LOGIN-023 - Link forgot password dapat diklik', () => {
    forgotPage.forgotLink().should('be.visible').click();
    cy.get('input[name="username"]').should('be.visible');
  });

  // TC-LOGIN-024
  it('TC-LOGIN-024 - Forgot password tidak mengarah ke halaman error', () => {
    forgotPage.forgotLink().click();
    cy.contains('Reset Password').should('exist');
  });


  // TC-LOGIN-026
  it('TC-LOGIN-026 - Navigasi kembali ke login via tombol back', () => {
    forgotPage.forgotLink().click();
    forgotPage.backButton().click();
    cy.contains('Login').should('be.visible');
  });

  // TC-LOGIN-027
  it('TC-LOGIN-027 - Reset password gagal username tidak terdaftar', () => {
    forgotPage.forgotLink().click();
    forgotPage.usernameInput().type('Admin123');
    forgotPage.resetButton().click();

    // OrangeHRM tidak tampil error, tetap di halaman reset
    cy.contains('Reset Password').should('be.visible');
  });

  // TC-LOGIN-028
  it('TC-LOGIN-028 - Reset password tanpa input username', () => {
    forgotPage.forgotLink().click();
    forgotPage.resetButton().click();
    forgotPage.requiredMessage().should('be.visible');
  });

  // TC-LOGIN-029
  it('TC-LOGIN-029 - Field username tampil dan dapat diisi', () => {
    forgotPage.forgotLink().click();
    forgotPage.usernameInput()
      .should('be.visible')
      .and('be.enabled')
      .type('Admin');
  });

  // TC-LOGIN-031
  it('TC-LOGIN-031 - Navigasi ke login via tombol Cancel', () => {
    forgotPage.forgotLink().click();
    forgotPage.cancelButton().click();
    cy.contains('Login').should('be.visible');
  });

  // TC-LOGIN-032
  it('TC-LOGIN-032 - Reset password gagal jika username kosong', () => {
    forgotPage.forgotLink().click();
    forgotPage.resetButton().click();
    forgotPage.requiredMessage().should('be.visible');
  });

});
