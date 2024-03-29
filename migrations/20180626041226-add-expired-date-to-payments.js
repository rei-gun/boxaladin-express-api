'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'payments',
      'expiredAt',
      Sequelize.DATE
    );
  },


  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'payments',
      'expiredAt',
      Sequelize.DATE
    );
  }
};
