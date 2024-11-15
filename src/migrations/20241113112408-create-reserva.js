'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data_inicio: {
        type: Sequelize.DATE,
      },
      data_fim: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      arrendatario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'arrendatarios',
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
    await queryInterface.dropTable('reservas');
  },
};
