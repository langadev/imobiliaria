'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('propriedades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nr_quartos: {
        type: Sequelize.INTEGER,
      },
      preco_por_dia: {
        type: Sequelize.DECIMAL,
      },
      disponibilidade: {
        type: Sequelize.STRING,
      },
      proprietario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'proprietarios',
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
    await queryInterface.dropTable('propriedades');
  },
};
