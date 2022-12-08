module.exports = (sequelize, DataTypes) => {
    const Weights = sequelize.define("Weights", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
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

    return Weights;
};