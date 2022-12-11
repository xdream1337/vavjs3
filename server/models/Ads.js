module.exports = (sequelize, DataTypes) => {
    const Ad = sequelize.define("Ads", {
        src: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "#"
        },
        href: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "#"
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
    return Ad;
};