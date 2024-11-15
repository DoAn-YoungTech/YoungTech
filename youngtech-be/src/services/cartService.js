 
const cartRepository = require('../repositories/cartRepository');

const cartService = {
  addCustomerToCart: async (customer_id) => {
    return await cartRepository.addCustomerToCart(customer_id);
  },

  //checkProduct

  getCustomerIdByAccountId: async (user_id) => {
    return await cartRepository.getCustomerIdByAccountId(user_id);
  },
  // checkCartItem

  checkCartItem: async (cart_id, product_id) => {
    return await cartRepository.checkCartItem(cart_id, product_id);
  },

  // updateQuantity

  updateQuantity: async (quantity, cart_id) => {
    return await cartRepository.updateQuantity(quantity, cart_id);
  },

  //   addProToCart(quantity , cart_id , product_id)
  addProToCart: async (quantity, cart_id, product_id) => {
    return await cartRepository.addProToCart(quantity, cart_id, product_id);
  },

  //checkCustomer(customer_id)

  checkCustomer: async (customer_id) => {
    return await cartRepository.checkCustomer(customer_id);
  },

  // viewCart

  viewCart: async (cartId) => {
    return await cartRepository.viewCart(cartId);
  },

  // getCustomerId(userId)

  getCustomerId: async (userId) => {
    return await cartRepository.getCustomerId(userId);
  },

  // getCartId(getCustomerId)
  getCartId: async (getCustomerId) => {
    return await cartRepository.getCartId(getCustomerId);
  },

  // removeProduct(productId)
  removeProduct: async (productId, getCartIdByCustomerId) => {
    return await cartRepository.removeProduct(productId, getCartIdByCustomerId);
  },

  // checkCartItem
  checkProductExist: async (productId) => {
    return await cartRepository.checkProductExist(productId);
  },

  // checkCustomerId(productId)
  checkCustomerId: async (userId) => {
    return await cartRepository.checkCustomerId(userId);
  },
  // getCartIdByCustomerId(customerId)

  getCartIdByCustomerId: async (customerId) => {
    return await cartRepository.getCartIdByCustomerId(customerId);
  },

  // checkCustomerExistInCart(getCustomerId)
  checkCustomerExistInCart: async (getCustomerId) => {
    return await cartRepository.checkCustomerExistInCart(getCustomerId)
  },

  // checkUserExist(userId)
  checkUserExist: async (userId) => {
   return await cartRepository.checkUserExist(userId);
  },

  // getIdCart
  getIdCart : async (customerId) => {
   return await cartRepository.getIdCart(customerId)
  },

  // updateProduct(getProductId) 
  updateProduct : async (quantity, getProductId) => {
    return await cartRepository.updateProduct(quantity, getProductId)
  }
};

 
