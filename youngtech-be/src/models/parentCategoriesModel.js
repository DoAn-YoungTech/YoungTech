// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const ParentCategories = sequelize.define(
  "ParentCategories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "ParentCategories",
    timestamps: false,
  }
);

module.exports = { ParentCategories, sequelize };
