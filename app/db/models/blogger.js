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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
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
            defaultValue: '/images/users/default.jpg',
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
            allowNull: false,
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
        blogger.belongsToMany(models.blog, {
            through: 'blog_like',
            foreignKey: 'liker_id',
            constraints: false,
        });
        blogger.hasMany(models.comment, {
            foreignKey: 'commenter_id',
            constraints: false,
        });
        blogger.belongsToMany(models.comment, {
            through: 'comment_like',
            foreignKey: 'liker_id',
            constraints: false,
        });
        blogger.belongsToMany(models.blog, {
            through: 'views',
            foreignKey: 'viewer_id',
            constraints: false,
        });
    };

    return blogger;
};