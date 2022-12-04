module.exports = (sequelize, DataTypes) => {
    const Methods = sequelize.define("Methods", {
        method_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            increment: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        measurement_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
    return Methods;
};