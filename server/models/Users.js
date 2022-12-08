
module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define("Users", {
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Users;
};