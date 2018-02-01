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
        comment.belongsTo(models.blog, {
            foreignKey: 'blog_id',
        });
        comment.belongsTo(models.user, {
            foreignKey: 'commenter_id',
            constraints: false
        });
        comment.belongsTo(models.blogger, {
            foreignKey: 'commenter_id',
            constraints: false
        });
        comment.hasOne(models.comment, {as: 'parent'});
        comment.belongsToMany(models.user, {
            through: 'comment_like',
            foreignKey: 'comment_id',
            constraints: false,
        });
        comment.belongsToMany(models.blogger, {
            through: 'comment_like',
            foreignKey: 'comment_id',
            constraints: false,
        });
    };

    return comment;
};