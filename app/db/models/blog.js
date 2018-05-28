'use strict';
const SequelizeSlugify = require('sequelize-slugify');
module.exports = (sequelize, DataTypes) => {
    const blog = sequelize.define('blog', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            }
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        blog: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        post_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        video_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        place: {
            type: DataTypes.STRING,
            allowNull: true,
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
            defaultValue: DataTypes.NOW,
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
            defaultValue: true,
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

    SequelizeSlugify.slugifyModel(blog, {
        source: ['title']
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