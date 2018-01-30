'use strict';
module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: true,
            }
        }
    }, {
        underscored: true,
    });

    category.associate = (models) => {
        category.hasMany(models.bloggers.blog, {
            foreignKey: 'category_id',
        });
    };

    return category;
};