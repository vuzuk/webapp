'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
                isAlphanumeric: true
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
                isAlpha: true
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
                isAlpha: true
            }
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate:{
                isDate: true
            }
        },
        gender: {
            type: DataTypes.ENUM('M', 'F'),
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
                isEmail: true
            }
        },
        contact: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            validate:{
                max: 9999999999,
                min: 1000000000,
                isInt: true
            }
        },
        liking: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    }, {
        underscored: true,
        indexes: [{
            unique: true,
            fields: ['username', 'email', 'contact']
        }]
    });

    user.associate = (models) => {
        user.hasMany(models.comment, {
            foreignKey: 'user_id',
        });
        user.belongsToMany(models.comment, {through: 'comment_like'});
        user.belongsToMany(models.blog, {through: 'blog_like'});
        user.belongsToMany(models.blogger, {through: models.follower});
    };

    return user;
};