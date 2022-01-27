'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friendrequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }
  };
  Friendrequest.init({
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      allowNull: false
    },
    userOne: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userTwo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Friendrequest',
  });
  return Friendrequest;
};