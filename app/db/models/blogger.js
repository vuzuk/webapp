'use strict';
module.exports = (sequelize, DataTypes) => {
  var Blogger = sequelize.define('Blogger', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    username: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['male','female','others']]
      }
    },
    contact: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    deletedAt: DataTypes.DATEONLY
  }, {
    deletedAt: 'destroyTime',
    paranoid: true
  });
  return Blogger;
};