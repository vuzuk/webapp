'use strict';
module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('comment', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
    }, {
        underscored: true,
    });

    comment.associate = (models) => {
        comment.belongsTo(models.blog, {
            foreignKey: {
                name: 'blog_id',
                allowNull: false
            }
        });
        comment.belongsTo(models.user, {
            foreignKey: {
                name: 'user_id',
                allowNull: true
            }
            // constraints: false
        });
        comment.belongsTo(models.blogger, {
            foreignKey: {
                name: 'blogger_id',
                allowNull: true
            },
            // constraints: false
        });
        comment.hasOne(models.comment, {as: 'parent'});
    };

    return comment;
};