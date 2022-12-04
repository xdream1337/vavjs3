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
        },
        measurement_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    LowPressure.associate = (models) => {
        LowPressure.hasOne(models.Methods, {
            onDelete: "cascade",
        });
    };

    return LowPressure;
};