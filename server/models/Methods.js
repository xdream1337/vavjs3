module.exports = (sequelize, DataTypes) => {
    const Methods = sequelize.define("Methods", {
        method_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            increment: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Methods;
};