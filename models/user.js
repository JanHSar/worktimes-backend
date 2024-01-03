'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    
    static associate(models) {
      // User as worktimes
      this.hasMany(models.WorkTimes, {foreignKey: 'userId'})
    }
  }
  user.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    xApiKey: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};