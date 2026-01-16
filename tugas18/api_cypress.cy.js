const apiKey = 'reqres_bda0b5dc48464d8d9e4b19b145b4d6e4'

describe('Reqres.in API Automation - 12 Test Cases with API Key', () => {

  // 1. GET single user
  it('TC-001 - GET single user', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: { 'X-API-Key': apiKey }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data.id).to.eq(2)
    })
  })

  // 2. GET single user not found
  it('TC-002 - GET single user not found', () => {
    cy.request({
      url: 'https://reqres.in/api/users/23',
      failOnStatusCode: false,
      headers: { 'X-API-Key': apiKey }
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })

  // 3. POST create user
  it('TC-003 - POST create user', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: { 'X-API-Key': apiKey },
      body: { name: 'Rara', job: 'QA Engineer' }
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property('id')
    })
  })

  // 4. POST create user empty fields
  it('TC-004 - POST create user empty', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: { 'X-API-Key': apiKey },
      body: { name: '', job: '' }
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property('id')
    })
  })

  // 5. PUT update user
  it('TC-005 - PUT update user', () => {
    cy.request({
      method: 'PUT',
      url: 'https://reqres.in/api/users/2',
      headers: { 'X-API-Key': apiKey },
      body: { name: 'Rara Updated', job: 'Senior QA' }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.name).to.eq('Rara Updated')
    })
  })

  // 6. PATCH update user
  it('TC-006 - PATCH update job only', () => {
    cy.request({
      method: 'PATCH',
      url: 'https://reqres.in/api/users/2',
      headers: { 'X-API-Key': apiKey },
      body: { job: 'QA Lead' }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.job).to.eq('QA Lead')
    })
  })

  // 7. DELETE user
  it('TC-007 - DELETE user', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: { 'X-API-Key': apiKey }
    }).then((res) => {
      expect(res.status).to.eq(204)
    })
  })

  // 8. GET list resource
  it('TC-008 - GET list resource', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown',
      headers: { 'X-API-Key': apiKey }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data.length).to.be.greaterThan(0)
    })
  })

  // 9. GET single resource
  it('TC-009 - GET single resource', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown/2',
      headers: { 'X-API-Key': apiKey }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data.id).to.eq(2)
    })
  })

  // 10. GET single resource not found
  it('TC-010 - GET single resource not found', () => {
    cy.request({
      url: 'https://reqres.in/api/unknown/23',
      failOnStatusCode: false,
      headers: { 'X-API-Key': apiKey }
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })

  // 11. POST create user random
  it('TC-011 - POST create user random', () => {
    const name = `Rara_${Math.floor(Math.random()*1000)}`
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: { 'X-API-Key': apiKey },
      body: { name, job: 'QA' }
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.name).to.eq(name)
    })
  })

  // 12. PATCH update job random
  it('TC-012 - PATCH update job random', () => {
    const job = `Job_${Math.floor(Math.random()*1000)}`
    cy.request({
      method: 'PATCH',
      url: 'https://reqres.in/api/users/2',
      headers: { 'X-API-Key': apiKey },
      body: { job }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.job).to.eq(job)
    })
  })

})

