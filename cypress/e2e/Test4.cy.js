describe('Product Management on E-Commerce Website', function () {


  before('Extract and save all products to JSON', function () {
    
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');

    cy.wait(2000);
    const extractedProducts = [];       

    // Извлекаем данные о продуктах
    cy.get('.products .product').each(($product, index) => {
      const productName = $product.find('.product-name').text().trim(); 
      const productPrice = $product.find('.product-price').text().trim(); 

      // Добавляем данные в массив
      extractedProducts.push({
        name: productName,
        price: productPrice,
        index: index
      });
    }).then(() => {
      // Сохраняем данные в JSON-файл
      cy.writeFile('cypress/fixtures/AllProducts.json', extractedProducts);
    });
  });


   //-------------------------------------------------------------------------------------------------->


  it('Count the total number of products on the page', function () {
    cy.get('.products').children().should('have.length.greaterThan', 0)
      .then((products) => {
        const count = products.length;
        cy.log(`Количество товаров: ${count}`);
      });
  });


  //-------------------------------------------------------------------------------------------------->


  it('Filter and save desired products to JSON', function () {
    // Загружаем сохраненные продукты
    cy.fixture('AllProducts.json').then((products) => {
      // Определяем нужные продукты
      const desiredProducts = ['Brocolli - 1 Kg', 'Cucumber - 1 Kg'];

      // Фильтруем продукты
      const filteredProducts = products.filter(product => desiredProducts.includes(product.name));

      // Сохраняем отфильтрованные продукты в новый JSON-файл
      cy.writeFile('cypress/fixtures/RequiredProducts.json', filteredProducts);
    });
  });



  //-------------------------------------------------------------------------------------------------->


  it('Should add products from the RequiredProducts.json file to the cart', function() {


      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

      cy.wait(1000)
      cy.fixture('RequiredProducts.json').then((products) => {
        // Перебираем названия продуктов на сайте
        cy.get('[class="product-name"]').each((element) => {
          const productName = element.text().trim(); 
  
          // Находим соответствующий продукт в JSON
          const matchingProduct = products.find(product => product.name === productName);
  
          if (matchingProduct) {
            // Приводим индекс из JSON к числу
            const productIndex = parseInt(matchingProduct.index, 10);
            cy.wait(1000)
            // Кликаем по кнопке "ADD TO CART" соответствующего элемента
            cy.get('[class="products"]')
              .find('.product')
              .eq(productIndex)
              .contains('ADD TO CART')
              .click();
          }
        });
      });


      

  })

});