"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Todo.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Todo.init(
    {
      name: DataTypes.STRING,
      status: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
