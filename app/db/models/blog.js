'use strict';
module.exports = (sequelize, DataTypes) => {
    const blog = sequelize.define('blog', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        blog: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        images: {   // stringified array
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        date_updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        date_published: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        is_published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        views: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isInt: true
            }
        }
    }, {
        underscored: true,
    });

    blog.associate = (models) => {
        blog.belongsTo(models.category, {
            foreignKey: 'category_id',
        });
        blog.belongsTo(models.blogger, {
            foreignKey: 'blogger_id',
        });
        blog.belongsToMany(models.tag, {through: 'blog_tag'});
        blog.hasMany(models.comment, {
            foreignKey: {
                name: 'blog_id',
                allowNull: false
            }
        });
    };

    return blog;
};