'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Skol Lata 250ml',
        price: 2.20,
        url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      },
      {
        name: 'Heineken 600ml',
        price: 7.50,
        url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
      },
      {
        name: 'Antarctica Pilsen 300ml',
        price: 2.49,
        url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
      }
  ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
