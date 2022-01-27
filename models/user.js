'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Friendrequest, Friends }) {
      // define association here
      this.hasMany(Friendrequest, { foreignKey: 'userId', as: 'friendrequests' })
      this.hasMany(Friends, { foreignKey: 'userId', as: 'friends' })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: 'Must have a username'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: 'User must have an email'},
        notEmpty: { message: 'Email must not be empty' },
        isEmail: { message: 'Must have a valid email address' }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: 'Must have a password' }
      }
    },
    token: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};