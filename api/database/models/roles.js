"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.belongsToMany(models["permissoes"], {
        through: "roles_permissoes",
        as: "roles-e-permissoes",
        foreignKey: "role_id",
      });

      roles.belongsToMany(models["usuarios"], {
        through: "usuarios_roles",
        as: "roles-e-usuarios",
        foreignKey: "role_id",
      });
    }
  }
  roles.init(
    {
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "roles",
    }
  );
  return roles;
};
