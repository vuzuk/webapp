'use strict';
module.exports = (sequelize, DataTypes) => {
    const notification = sequelize.define('notification', {
        blog_id: {
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
        },
        b_user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        },
        seen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    }, {
        underscored: true,
        indexes: [{
            unique: true,
            fields: ['blog_id', 'blogger_id', 'user_id']
        }]
    });

    return notification;
};