module.exports = (sequelize, DataTypes) => {
    const Weights = sequelize.define("Weights", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            increment: true
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        method_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return Weights;
};