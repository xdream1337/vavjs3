module.exports = (sequelize, DataTypes) => {
    const Weights = sequelize.define("Methods", {
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

    Weights.associate = (models) => {
        Weights.hasOne(models.Methods, {
            onDelete: "cascade",
        });
    };

    return Weights;
};