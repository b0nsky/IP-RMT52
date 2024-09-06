'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "Category",
      });
      Event.belongsTo(models.User, { foreignKey: "userId", as: "User" });
    }
  }
  Event.init({
    eventName: DataTypes.STRING,
    venue: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    price: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Event",
  });
  return Event;
};