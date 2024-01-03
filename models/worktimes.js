'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workTimes extends Model {

    static associate(models) {
      // Wortime belongs to user
      this.belongsTo(models.User, {'targetKey': 'id'})
    }
  }
  workTimes.init({
    userId: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'workTimes',
  });
  return workTimes;
};