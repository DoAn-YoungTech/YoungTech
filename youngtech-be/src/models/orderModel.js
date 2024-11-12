// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    succesDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    succesDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "Order",
    timestamps: false
  }
);

module.exports = { Order, sequelize };
