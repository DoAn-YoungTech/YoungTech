 
const { query } = require('express');
const sequelize = require('../configs/db');
const cartRepository = {
  addCustomerToCart: async (customer_id) => {
    const query = `INSERT INTO cart (customer_id) values (:customer_id)`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id },
    });

    const [cart] = await sequelize.query(
      `SELECT * FROM cart WHERE customer_id =:customer_id`,
      { replacements: { customer_id } }
    );
    return cart[0];
  },

  //checkProduct

  getCustomerIdByAccountId: async (user_id) => {
    const query = `SELECT * FROM customer WHERE account_id = :account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: user_id },
    });
    return result[0].id;
  },

  //checkCartItem

  checkCartItem: async (cart_id, product_id) => {
    const query = `SELECT * FROM cartitem WHERE  product_id=:product_id AND cart_id =:cart_id`;
    const [result] = await sequelize.query(query, {
      replacements: { product_id, cart_id },
    });
    return result[0];
  },

  //updateQuantity
  updateQuantity: async (quantity, cart_id) => {
    const query = `update cartitem set quantity = :quantity WHERE id= :id `;
    const [result] = await sequelize.query(query, {
      replacements: { quantity: quantity, id: cart_id },
    });
    return result;
  },

  // addProToCart(quantity , cart_id , product_id)
  addProToCart: async (quantity, cart_id, product_id) => {
    const query = `INSERT INTO cartitem (quantity , cart_id , product_id) values (:quantity , :cart_id , :product_id)`;
    const [result] = await sequelize.query(query, {
      replacements: { quantity, cart_id, product_id },
    });
    return result;
  },

  // checkCustomer(customer_id)
  checkCustomer: async (customer_id) => {
    const query = `SELECT * FROM cart WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id },
    });
    return result[0];
  },

  // viewCart

  viewCart: async (cartId) => {
    const query = `
    SELECT
    cartitem.id AS cart_item_id,
    cartitem.quantity,
    cartitem.cart_id,
    product.id AS product_id,
    product.productName AS product_name,
    product.description,
    product.productPrice AS price,  
    image.imageUrl AS image_url
    FROM cartitem
    JOIN product ON cartitem.product_id = product.id
    LEFT JOIN image ON product.id = image.product_id
    WHERE cartitem.cart_id =:cart_id
     `;
    const [result] = await sequelize.query(query, {
      replacements: { cart_id: cartId },
    });
    return result;
  },

  // getCustomerId(userId)

  getCustomerId: async (userId) => {
    const query = `SELECT * FROM customer WHERE account_id = :account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0].id;
  },

  // getCartId(getCustomerId)
  getCartId: async (getCustomerId) => {
    const query = `SELECT * FROM cart WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id: getCustomerId },
    });
    return result[0].id;
  },
  // removeProduct

  removeProduct: async (productId, cartId) => {
    const query = `DELETE  FROM cartitem WHERE product_id = :product_id  AND cart_id = :cart_id`;
    const [result] = await sequelize.query(query, {
      replacements: { product_id: productId, cart_id: cartId },
    });
    return result.affectedRows > 0;
  },

  //checkCartItem
  checkProductExist: async (productId) => {
    const query = `SELECT * FROM product WHERE id= :id `;
    const [result] = await sequelize.query(query, {
      replacements: { id: productId },
    });
    return result[0];
  },

  // checkCustomerId(productId)
  checkCustomerId: async (userId) => {
    const query = `SELECT * FROM customer WHERE account_id = :account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0].id;
  },

  getCartIdByCustomerId: async (customerId) => {
    const query = `SELECT * FROM cart WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id: customerId },
    });
    return result[0].id;
  },

  // checkCustomerExistInCart(getCustomerId)
  checkCustomerExistInCart: async (getCustomerId) => {
    const query = `SELECT * FROM cart WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id: getCustomerId },
    });
    return result[0];
  },

  // checkUserExist(userId)
  checkUserExist: async (userId) => {
    const query = `SELECT * FROM customer WHERE account_id = :account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0].id;
  },

  getIdCart: async (customerId) => {
    const query = `
    SELECT 
    cart.id AS cart_id, 
    cartitem.quantity ,
    cartitem.product_id 
     FROM cart 
     JOIN cartitem ON cart.id = cartitem.cart_id
     WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id: customerId },
    });
    return result;
  },

  // updateProduct(getProductId)
  updateProduct: async (quantity, getProductId) => {
    const query = `UPDATE  cartitem SET quantity = :quantity WHERE product_id = :product_id`;
    const [result] = await sequelize.query(query, {
      replacements: { quantity: quantity, product_id: getProductId.product_id },
    });
    return result;
  },
};

module.exports = cartRepository;
 
