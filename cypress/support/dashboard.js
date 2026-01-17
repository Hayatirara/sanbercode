// POM Dashboard
class DashboardPage {
  header() {
    return cy.contains('Dashboard');
  }

  timeAtWork() {
    return cy.contains('Time at Work');
  }

  myActions() {
    return cy.contains('My Actions');
  }

  quickLaunch() {
    return cy.contains('Quick Launch');
  }

  buzzLatestPosts() {
    return cy.contains('Buzz Latest Posts');
  }

  employeeCharts() {
    return cy.get('canvas');
  }
}

export default DashboardPage;
