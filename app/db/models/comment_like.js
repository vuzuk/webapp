'use strict';
module.exports = (sequelize, DataTypes) => {
    const comment_like = sequelize.define('comment_like', {
        comment_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        blogger_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        }
    }, {
        underscored: true,
        indexes: [{
            unique: true,
            fields: ['comment_id', 'blogger_id', 'user_id']
        }]
    });

    return comment_like;
};