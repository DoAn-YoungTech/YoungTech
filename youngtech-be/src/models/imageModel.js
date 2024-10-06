// models/imageModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Image = sequelize.define(
    "Image",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Product",
                key: "id",
            },
        },
    },
    {
        tableName: "Image",
        timestamps: false,
    }
);

module.exports = { Image, sequelize };
