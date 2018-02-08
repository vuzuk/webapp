'use strict';
module.exports = (sequelize, DataTypes) => {
    const view = sequelize.define('view', {
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
        }
    }, {
        underscored: true,
        indexes: [{
            unique: true,
            fields: ['blog_id', 'blogger_id', 'user_id']
        }]
    });

    return view;
};