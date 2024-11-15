'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pagamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      valor: {
        type: Sequelize.DECIMAL,
      },
      data_pagamento: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      metodo_pagamento: {
        type: Sequelize.STRING,
      },
      reserva_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'reservas',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pagamentos');
  },
};
