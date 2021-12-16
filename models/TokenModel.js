'use strict';

module.exports = (sequelize, DataTypes) => {
    const TokenModel = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            refresh_token: {
                type: DataTypes.STRING,
            },
        }, 
        {
            timestamp: false,
            createdAt: false,
            updatedAt: false,
        }
    );

    TokenModel.associate = function(models) {
        TokenModel.belongsTo(models.User, {
            as: 'user_id',
            foreignKey: 'id'
        })
    };

    return TokenModel;
};