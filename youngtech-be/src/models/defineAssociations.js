const { Account } = require("./accountModel");
const { Cart } = require("./cartModel");
const { CartItem } = require("./cartItemModel");
const { ChildCategories } = require("./childCategoriesModel");
const { Comment } = require("./commentModel");
const { Customer } = require("./customerModel");
const { InputInvoice } = require("./inputInvoiceModel");
const { Order } = require("./orderModel");
const { OrderDetail } = require("./orderDetailModel");
const { OutInvoice } = require("./outInvoiceModel");
const { ParentCategories } = require("./parentCategoriesModel");
const { Role } = require("./roleModel");
const { Supplier } = require("./supplierModel");
const { roleAccount } = require("./roleAccountModel");
const { Employee } = require("./employeeModel");
const { Image } = require("./imageModel");
const { Product } = require("./productModel");

const defineAssociations = () => {
  // Product - Image: One-to-Many
  Product.hasMany(Image, { foreignKey: "product_id" });
  Image.belongsTo(Product, { foreignKey: "product_id" });

  // Account - Customer: One-to-One
  Account.hasOne(Customer, { foreignKey: "account_id" });
  Customer.belongsTo(Account, { foreignKey: "account_id" });

  // Account - Employee: One-to-One
  Account.hasOne(Employee, { foreignKey: "account_id" });
  Employee.belongsTo(Account, { foreignKey: "account_id" });

  // Cart - Customer: One-to-One
  Customer.hasOne(Cart, { foreignKey: "customer_id" });
  Cart.belongsTo(Customer, { foreignKey: "customer_id" });

  // CartItem - Cart: One-to-Many
  Cart.hasOne(CartItem, { foreignKey: "cart_id" });
  CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

  // CartItem - Product: One-to-One
  Product.hasMany(CartItem, { foreignKey: "product_id" });
  CartItem.belongsTo(Product, { foreignKey: "product_id" });

  // Comment - Product: One-to-Many
  Product.hasMany(Comment, { foreignKey: "product_id" });
  Comment.belongsTo(Product, { foreignKey: "product_id" });

  // Comment - Customer: One-to-Many
  Customer.hasMany(Comment, { foreignKey: "customer_id" });
  Comment.belongsTo(Customer, { foreignKey: "customer_id" });

  // Order - Customer: One-to-Many
  Customer.hasMany(Order, { foreignKey: "customer_id" });
  Order.belongsTo(Customer, { foreignKey: "customer_id" });

  // OrderDetail - Order: One-to-Many
  Order.hasMany(OrderDetail, { foreignKey: "order_id" });
  OrderDetail.belongsTo(Order, { foreignKey: "order_id" });

  // OrderDetail - Product: One-to-One
  Product.hasMany(OrderDetail, { foreignKey: "product_id" });
  OrderDetail.belongsTo(Product, { foreignKey: "product_id" });

  // OutInvoice - Order: One-to-One
  Order.hasOne(OutInvoice, { foreignKey: "order_id" });
  OutInvoice.belongsTo(Order, { foreignKey: "order_id" });

  // OutInvoice - Customer: One-to-One
  Customer.hasMany(OutInvoice, { foreignKey: "customer_id" });
  OutInvoice.belongsTo(Customer, { foreignKey: "customer_id" });

  Supplier.hasMany(Product, { foreignKey: "supplier_id" });
  Product.belongsTo(Supplier, { foreignKey: "supplier_id" });

  // InputInvoice - Employee: One-to-One
  Employee.hasMany(InputInvoice, { foreignKey: "employee_id" });
  InputInvoice.belongsTo(Employee, { foreignKey: "employee_id" });

  // Product - Category: One-to-One
  ChildCategories.hasMany(Product, { foreignKey: "childCategory_id" });
  Product.belongsTo(ChildCategories, { foreignKey: "childCategory_id" });

  // ParentCategories - ChildCategories: One-to-Many
  ParentCategories.hasMany(ChildCategories, {
    foreignKey: "parentCategory_id"
  });
  ChildCategories.belongsTo(ParentCategories, {
    foreignKey: "parentCategory_id"
  });

  // Account - RoleAccount: One-to-ManProduct.y
  Account.hasMany(roleAccount, { foreignKey: "accouProduct.nt_id" });
  roleAccount.belongsTo(Account, { foreignKey: "account_id" });

  // Role - RoleAccount: One-to-Many
  Role.hasMany(roleAccount, { foreignKey: "role_id" });
  roleAccount.belongsTo(Role, { foreignKey: "role_id" });
};

module.exports = defineAssociations;
