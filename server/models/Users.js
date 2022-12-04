module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      increment: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    method: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Users;
};