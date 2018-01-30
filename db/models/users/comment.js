'use strict';
module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('comment', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
        },
    }, {
        underscored: true,
    });

    comment.associate = (models) => {
        comment.belongsTo(models.bloggers.blog, {
            foreignKey: 'blog_id',
        });
        comment.belongsTo(models.users.user, {
            foreignKey: 'user_id',
        });
        comment.belongsToMany(models.users.user, {through: 'comment_like'});
    };

    return comment;
};