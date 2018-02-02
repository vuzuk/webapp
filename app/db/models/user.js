'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
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
            fields: ['username', 'email', 'contact']
        }]
    });

    user.associate = (models) => {
        user.belongsToMany(models.blogger, {through: models.follower});
        user.belongsToMany(models.blog, {
            through: 'blog_like',
            foreignKey: 'liker_id',
            constraints: false,
        });
        user.hasMany(models.comment, {
            foreignKey: 'commenter_id',
            constraints: false,
        });
        user.belongsToMany(models.comment, {
            through: 'comment_like',
            foreignKey: 'liker_id',
            constraints: false,
        });
        user.belongsToMany(models.blog, {
            through: 'views',
            foreignKey: 'viewer_id',
            constraints: false,
        });
    };

    return user;
};