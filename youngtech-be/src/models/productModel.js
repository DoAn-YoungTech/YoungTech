// models/productModel.js
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
        createAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Thêm giá trị mặc định cho createAt
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
        supplier_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Supplier",
                key: "id",
            },
        },
    },
    {
        tableName: "Product",
        timestamps: false,
    }
);

module.exports = {Product, sequelize};
