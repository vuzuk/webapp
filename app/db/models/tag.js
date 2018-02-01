'use strict';
module.exports = (sequelize, DataTypes) => {
    const tag = sequelize.define('tag', {
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

    tag.associate = (models) => {
        tag.belongsToMany(models.blog, {through: 'blog_tag'});
    };

    return tag;
};