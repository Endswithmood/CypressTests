describe('API and Page Load Verification', () => {


  it('should verify the API request and page load successfully', () => {

    cy.intercept('GET', 'https://rahulshettyacademy.com/angularpractice/').as('getPosts');

    cy.visit('https://rahulshettyacademy.com/angularpractice/');

   
    cy.request('GET', 'https://rahulshettyacademy.com/angularpractice/')
      .should((response) => {
        assert.equal(response.status, 200, 'Response status is 200'); 
        
      });

    
    cy.wait('@getPosts') 
      .its('response.statusCode')
      .should('eq', 200);



  });
});