'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('avaliacao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comentario: {
        type: Sequelize.STRING,
      },
      nota: {
        type: Sequelize.INTEGER,
      },
      data: {
        type: Sequelize.DATE,
      },
      propriedade_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'propriedades',
          key: 'id',
        },
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
    await queryInterface.dropTable('avaliacaos');
  },
};
