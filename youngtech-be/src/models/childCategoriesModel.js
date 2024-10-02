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
    childCateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    parentCategory_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "ParentCategories", // 'Employee' refers to table name
        key: "id",
      },
    },
  },
  {
    tableName: "childCategories",
    timestamps: false,
  }
);

module.exports = { ParentCategories, sequelize };
