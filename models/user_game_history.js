'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
 
    }
  }
  user_game_history.init({
    id_user: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    played_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user_game_history',
  });
  return user_game_history;
};