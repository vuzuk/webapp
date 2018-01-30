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
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        date_published: {
            type: DataTypes.DATE,
            allowNull:true,
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
            validate:{
                isInt: true
            }
        }
    }, {
        underscored: true,
    });

    blog.associate = (models) => {
        blog.belongsTo(models.bloggers.blogger, {
            foreignKey: 'blogger_id',
        });
        blog.belongsTo(models.bloggers.category, {
            foreignKey: 'category_id',
        });
        blog.belongsToMany(models.bloggers.tag, {through: 'blog_tag'});
        blog.hasMany(models.users.comment, {
            foreignKey: 'blog_id',
        });
        blog.belongsToMany(models.users.user, {through: 'blog_like'});
    };

    return blog;
};