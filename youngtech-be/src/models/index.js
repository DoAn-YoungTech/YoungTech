const Account = require("./accountModel");
const Brand = require("./brandModel");
const Cart = require("./cartModel");
const CartItem = require("./cartItemModel");
const Category = require("./categoryModel");
const ChildCategories = require("./childCategoriesModel");
const Comment = require("./commentModel");
const Customer = require("./customerModel");
const Employee = require("./employeeModel");
const InputInvoice = require("./inputInvoiceModel");
const Order = require("./orderModel");
const OrderDetail = require("./orderDetailModel");
const OutInvoice = require("./outInvoiceModel");
const ParentCategories = require("./parentCategoriesModel");
const Product = require("./productModel");
const Role = require("./roleModel");
const Supplier = require("./supplierModel");
const roleAccount = require("./roleAccountModel");
const User = require("./userModel");

const rootModel = {
  Account,
  Brand,
  Customer,
  Cart,
  CartItem,
  Category,
  ChildCategories,
  Comment,
  Employee,
  InputInvoice,
  Order,
  OrderDetail,
  OutInvoice,
  ParentCategories,
  Product,
  Role,
  Supplier,
  roleAccount,
  // User,
};

module.exports = rootModel;
