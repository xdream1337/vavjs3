module.exports = (sequelize, DataTypes) => {
    const Pressure = sequelize.define("Pressures", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lower_pressure: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        high_pressure: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        method_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return Pressure;
};