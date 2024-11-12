// models/userModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Customer = sequelize.define(
  'Customer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: '',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: '',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      defaultValue: '',
    },
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Account', // 'Customer' refers to table name
        key: 'id',
      },
    },
  },
  {
    tableName: 'Customer',
    timestamps: false,
  }
);

module.exports = {Customer, sequelize};
