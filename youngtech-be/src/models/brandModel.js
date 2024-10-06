// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Brand = sequelize.define(
  "Brand",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "Brand",
    timestamps: false,
  }
);

module.exports = { Brand, sequelize };
