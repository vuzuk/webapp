'use strict';
module.exports = (sequelize, DataTypes) => {
    const follower = sequelize.define('follower', {
        last_post_seen_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            validate:{
                isDate: true
            }
        },
    }, {
        underscored: true,
    });

    return follower;
};