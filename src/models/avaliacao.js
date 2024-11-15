'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class avaliacaos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      avaliacaos.belongsTo(models.propriedades, {
        foreignKey: 'propriedade_id',
      });

      avaliacaos.belongsTo(models.arrendatarios, {
        foreignKey: 'arrendatario_id',
      });
    }
  }

  avaliacaos.init(
    {
      comentario: DataTypes.STRING,
      nota: DataTypes.INTEGER,
      data: DataTypes.DATE,
      propriedade_id: DataTypes.INTEGER,
      arrendatario_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'avaliacaos',
    },
  );

  return avaliacaos;
};
