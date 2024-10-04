// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const OutInvoice = sequelize.define(
  "OutInvoice",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoiceDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Order",
        key: "id",
      },
    },

    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Customer",
        key: "id",
      },
    },
  },
  {
    tableName: "OutInvoice",
    timestamps: false,
  }
);

module.exports = { OutInvoice, sequelize };
