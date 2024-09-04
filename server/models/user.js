'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Event, { foreignKey: "userId" })
    }
  }
  User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args:true,
          msg: " Email already exist"
        },
        validate: {
          notNull: {
            msg: "email is required",
          },
          notEmpty: {
            msg: "email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "password is required",
          },
          len: {
            args: [6],
            msg: "Password at least 6 characters"
          }
        },
      },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    role: {
        type: DataTypes.STRING,
        defaultValue: "User"
      }
  }, {
    sequelize,
    modelName: "User",
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  return User;
};