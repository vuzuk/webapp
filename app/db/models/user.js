'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isAlphanumeric: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isContactVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        emailVerifKey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        otp: {
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            allowNull: true
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
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '/users/images/default.png',
            validate: {
                notEmpty: true,
            }
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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
        contact: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
            validate: {
                max: 9999999999,
                min: 1000000000,
                isInt: true
            }
        },
        signed_up_via: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "local",
            validate: {
                notEmpty: true,
                isAlpha: true,
            }
        },
        points: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                isInt: true
            }
        },
        liking: {   // stringified array
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '[]',
            validate: {
                notEmpty: true
            }
        }
    }, {
        underscored: true,
        indexes: [{
            unique: true,
            fields: ['username', 'email']
        }]
    });

    user.associate = (models) => {
        user.belongsToMany(models.blogger, {through: models.follower});
        user.hasMany(models.comment, {
            foreignKey: {
                name: 'user_id',
                allowNull: true
            }
        });
    };

    return user;
};