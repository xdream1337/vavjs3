
module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define("Users", {
    birth_date: {
      type: DataTypes.DATE,
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Users.associate = (models) => {
    Users.hasMany(models.LowPressure, {
      onDelete: "cascade",
    });
  };

  Users.associate = (models) => {
    Users.hasMany(models.Weights, {
      onDelete: "cascade",
    });
  };

  Users.associate = (models) => {
    Users.hasMany(models.HighPressure, {
      onDelete: "cascade",
    });
  };


  return Users;
};