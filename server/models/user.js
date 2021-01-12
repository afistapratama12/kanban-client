'use strict';

const { genPass } = require('../helper/bcrypt')

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
    static associate(models) {
      User.hasMany(models.Task)
    }
  };
  User.init({
    fullname: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'full Name must be filled'
        },
        notNull : {
          args : true,
          msg : 'full Name must be filled'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Email must be filled'
        },
        notNull : {
          args : true,
          msg : 'Email must be filled'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'password must be filled'
        },
        notNull : {
          args : true,
          msg : 'password must be filled'
        }
      }
    },
    location: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (user, option) => {
        user.password = bcrypt.genPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};