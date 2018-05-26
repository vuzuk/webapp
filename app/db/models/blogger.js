'use strict';
module.exports = (sequelize, DataTypes) => {
    const blogger = sequelize.define('blogger', {
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
        contact: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true,
            validate: {
                max: 9999999999,
                min: 1000000000,
                isInt: true
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
            defaultValue: '/images/bloggers/default.jpg',
            validate: {
                notEmpty: true,
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
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
    }, {
        underscored: true,
        indexes: [{
            unique: true,
            fields: ['username', 'email', 'contact']
        }]
    });

    blogger.associate = (models) => {
        blogger.hasMany(models.blog, {
            foreignKey: 'blogger_id',
        });
        blogger.belongsToMany(models.user, {through: models.follower});
        blogger.hasMany(models.comment, {
            foreignKey: {
                name: 'blogger_id',
                allowNull: true
            }
        });
    };

    return blogger;
};