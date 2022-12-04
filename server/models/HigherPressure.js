module.exports = (sequelize, DataTypes) => {
    const HighPressure = sequelize.define("HighPressure", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            increment: true
        },
        high_pressure: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return HighPressure;
};