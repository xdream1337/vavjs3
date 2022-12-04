module.exports = (sequelize, DataTypes) => {
    const LowPressure = sequelize.define("LowPressure", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            increment: true
        },
        low_pressure: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return LowPressure;
};