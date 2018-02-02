'use strict';
module.exports = (sequelize, DataTypes) => {
    const blog = sequelize.define('blog', {
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
        date_published: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        blog.belongsToMany(models.user, {
            through: 'blog_like',
            foreignKey: 'blog_id',
            constraints: false,
        });
        blog.belongsToMany(models.blogger, {
            through: 'blog_like',
            foreignKey: 'blog_id',
            constraints: false,
        });
        blog.hasMany(models.comment, {
            foreignKey: 'blog_id',
        });
        blog.belongsToMany(models.user, {
            through: 'views',
            foreignKey: 'blog_id',
            constraints: false,
        });
        blog.belongsToMany(models.blogger, {
            through: 'views',
            foreignKey: 'blog_id',
            constraints: false,
        });
    };

    return blog;
};