describe('Google Translate File Upload', () => {


    it('Uploads a file and verifies it', () => {

        cy.visit('https://translate.google.com/?hl=ru&tab=TT&sl=en&tl=ru&op=translate')

        const filePath = 'cypress/fixtures/a.png'; 
        cy.get('[aria-label="Перевод текста на изображениях"]').click();
        cy.get('input[type="file"]') 
          .eq(1)
          .selectFile(filePath, { force: true })
          .then(($input) => {
            expect($input[0].files[0].name).to.equal('a.png');
          });



    });
  });
  