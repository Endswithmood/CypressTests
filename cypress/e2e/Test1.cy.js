describe('Registration Form', () => {

  it('Fills and submits the login form', () => {


    cy.readFile('cypress/fixtures/fortest1.json').then((config) => {
      const checkboxStates = config.checkboxConfig;

    cy.visit('https://rahulshettyacademy.com/angularpractice/');

    
    cy.get('form').within(() => {
      cy.get('input[name="name"]')
        .should('exist')
        .type('John Doe')
        .should('have.value', 'John Doe'); 
    });

   
    cy.get('input[name="email"]')
      .should('exist')
      .type('johndoe@example.com')
      .its('0') 
      .should('have.property', 'tagName', 'INPUT');   


    cy.get('input#exampleInputPassword1')
      .should('have.attr', 'placeholder', 'Password') 
      .type('SecurePassword123')
      .invoke('attr', 'type') 
      .should('equal', 'password');

    
    cy.get('input#exampleCheck1')
      .check()
      .should('be.checked')
      .parent() 
      .should('have.class', 'form-check');

    
    cy.get('select#exampleFormControlSelect1')
      .select('Male')
      .find('option:checked')          
      .should('be.selected')
      .should('have.text', 'Male')
      .parent()
      .siblings('label') 
      .should('have.text', 'Gender');

    
    cy.get('input#inlineRadio2')
      .check()
      .should('be.checked')
      .parents('.form-group')
      .should('exist')
      .within(() => {
        cy.get('label')
          .first()
          .should('have.text', 'Employment Status: ');
      });

      //cy.get('input[id="inlineRadio3"]').should('be.disabled');
      //or
      cy.get('[class="form-check form-check-inline"]')
       .last()
       .find('input[id="inlineRadio3"]')
       .should('have.prop', 'disabled', true); 


      cy.get('[class="form-group"]')
      .eq(4)
      .each(($checkbox, index) => {
        if (checkboxStates[index]) {
          const isChecked = checkboxStates[index].checked;
          if (isChecked) {
            // Если состояние должно быть "отмечено" (checked: true), проверяем, что чекбокс выбран
            cy.wrap($checkbox)
              .find('input[class="form-check-input"]')
              .should('be.selected');
          } else {
            // Если состояние должно быть "не отмечено" (checked: false), проверяем, что чекбокс не выбран
            cy.wrap($checkbox)
              .find('input[class="form-check-input"]')
              .should('not.be.selected');
          }
        }
      });

    
    cy.get('input[name="bday"]')
      .type('1990-01-01')
      .should('have.value', '1990-01-01')
      .siblings() 
      .should('have.length', 1);

    
    cy.window()
      .then((win) => {
        expect(win).to.have.property('location');
        expect(win.location.href).to.include('/angularpractice');
      });

    
    cy.get('input[type="submit"]')
      .should('exist')
      .should('be.enabled')  
      .dblclick(); //не нашел функцию на котором можно использовать этот метод


      cy.contains(' The Form has been submitted successfully!.').should('be.visible');
      

});
});

});
