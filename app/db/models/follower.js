'use strict';
module.exports = (sequelize, DataTypes) => {
    const follower = sequelize.define('follower', {
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        },
        b_user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        },
        blogger_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        }
    }, {
        underscored: true,
        indexes: [{
            unique: true,
            fields: ['user_id', 'b_user_id', 'blogger_id']
        }]
    });

    return follower;
};