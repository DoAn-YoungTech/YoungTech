// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    colorOption: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    brand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Brand",
        key: "id",
      },
    },

    childCategory_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "ChildCategories",
        key: "id",
      },
    },
  },
  {
    tableName: "Product",
    timestamps: false,
  }
);

module.exports = { Product, sequelize };
