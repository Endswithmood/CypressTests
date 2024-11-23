describe('Product Filtering Functionality on E-commerce Website', function() {

    // Функция для выбора и проверки фильтров
    function checkFilters(filterIndexes) {
      filterIndexes.forEach(index => {
        cy.get('[type="checkbox"]').eq(index).check().should('be.checked');
      });
    }
  
   
  
    it('Applies filters correctly and displays matching products', function() {
  
      cy.visit('https://alifshop.uz/ru');
  
      cy.wait(2000);
  
      cy.get('.container [aria-label="btn"]').first().as('submitButton');
      cy.get('@submitButton').click({ force: true });
  
      cy.wait(2000);
  
      // Навигация к категории товаров
      cy.get('li [href="/ru/categories/noutbuki-i-kompjyuteri"]').should('be.visible').trigger('mouseover').click();
      cy.url().should('include', '/noutbuki-i-kompjyuteri');
  
      cy.get('[href="/ru/categories/noutbuki"]').click();
      cy.title().should('contain', 'Ноутбуки');
  
      cy.wait(2000);
  

      cy.contains('Показать ещё 9').scrollIntoView().click();

      // Применение фильтров
      checkFilters([2, 3, 5, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

  
      // Снятие одного фильтра
      cy.get('[type="checkbox"]').eq(5).uncheck({ force: true }).should('not.be.checked');
  
      cy.wait(2000);
  
      cy.scrollTo('top');
      cy.wait(1000)
      cy.get('[type="text"]').eq(2).clear();
      cy.get('[type="text"]').eq(2).clear().type('11500000');
      cy.scrollTo('top')
      cy.get('[type="text"]').eq(3).clear()
      cy.get('[type="text"]').eq(3).clear().type('120000000');
      cy.wait(1000)
      cy.scrollTo('top')
  
      // Проверка отображения товаров
      cy.get('[class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-9"]')
        .children()
        .should('have.length.greaterThan', 0)
        .then(products => {
          const count = products.length;
          cy.log(`Количество товаров: ${count}`);
        });
  
        cy.get('[class="text-blue p-0"]').wait(2000).click()
        cy.scrollTo('top')
        cy.wait(2000)
  
        cy.contains('Сначала дешёвые').click({force: true});
        cy.contains('Все').click({force: true});
        cy.contains('Сначала дорогие').click({force: true});
  
       cy.get('[href="/ru/offer/noutbuk-apple-macbook-pro-14-late-2021-m1-max-64gb-ssd-8tb-macos-serebristyy-apple-3"]').click();
    });
  
  });