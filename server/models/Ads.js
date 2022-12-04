module.exports = (sequelize, DataTypes) => {
    const Ads = sequelize.define("Ads", {
        ad_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            increment: true
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Ads;
};