'use strict';
module.exports = (sequelize, DataTypes) => {
    const blogger = sequelize.define('blogger', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlphanumeric: true
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: true
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: true
            }
        },
        dob: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            validate: {
                isDate: true
            }
        },
        gender: {
            type: DataTypes.ENUM('M', 'F'),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        contact: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            validate: {
                max: 9999999999,
                min: 1000000000,
                isInt: true
            }
        }
    }, {
        underscored: true,
        indexes: [{
            unique: true,
            fields: ['username', 'email', 'contact']
        }]
    });

    blogger.associate = (models) => {
        blogger.hasMany(models.bloggers.blog, {
            foreignKey: 'blogger_id',
        });
        blogger.belongsToMany(models.users.user, {through: models.users.follower});
    };

    return blogger;
};