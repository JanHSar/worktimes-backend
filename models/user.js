'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    
    static associate(models) {
      // User add worktimes
      this.hasMany(models.workTimes, {foreignKey: 'userId'})
    }
  }
  user.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    xApiKey: DataTypes.STRING
  }, {
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    },
    scopes: {
      auth: {
        attributes: ['id', 'name', 'password']
      }
    },
    sequelize,
    modelName: 'user',
  }
  );
  return user;
};