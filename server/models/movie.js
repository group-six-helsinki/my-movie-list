'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: "UserID" })
    }
  };
  Movie.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a title'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'Please enter datatype boolean'
        }
      }
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter a User ID'
      }
    },
    synopsis: DataTypes.STRING,
    poster: DataTypes.STRING,
    rating: DataTypes.STRING,
    release_year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};