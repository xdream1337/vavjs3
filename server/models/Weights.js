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
        measurement: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return Methods;
};