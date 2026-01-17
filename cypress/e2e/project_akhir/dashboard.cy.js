import DashboardPage from '../../support/dashboard';

describe('Dashboard Menu Automation - OrangeHRM', () => {
  const dashboard = new DashboardPage();

  beforeEach(() => {
    // 1️⃣ Login langsung via UI
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    cy.fixture('project_akhir/dashboard').then(data => {
      cy.get('input[name="username"]').type(data.login.username);
      cy.get('input[name="password"]').type(data.login.password);
      cy.get('button[type="submit"]').click();
    });

    // 2️⃣ Pastikan dashboard muncul dulu
    dashboard.header().should('be.visible');

    // 3️⃣ Baru intercept dashboard API (fix timeout)
    cy.intercept('GET', '**/dashboard*').as('dashboardAPI');
  });

  // Positive Test Cases
  it('TC_DASH_POS_01 - Dashboard page loaded', () => {
    dashboard.header().should('be.visible');
  });

  it('TC_DASH_POS_02 - Time at Work widget visible', () => {
    dashboard.timeAtWork().should('be.visible');
  });

  it('TC_DASH_POS_03 - My Actions widget visible', () => {
    dashboard.myActions().should('be.visible');
  });

  it('TC_DASH_POS_04 - Quick Launch widget visible', () => {
    dashboard.quickLaunch().should('be.visible');
  });

  it('TC_DASH_POS_05 - Buzz Latest Posts widget visible', () => {
    dashboard.buzzLatestPosts().should('be.visible');
  });

  it('TC_DASH_POS_06 - Employee charts visible', () => {
    dashboard.employeeCharts().should('have.length.greaterThan', 0);
  });

  
});
