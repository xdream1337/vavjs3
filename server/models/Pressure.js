module.exports = (sequelize, DataTypes) => {
    const Pressures = sequelize.define("Pressures", {
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
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            format: 'YYYY-MM-DD'
        }
    });

    return Pressures;
};