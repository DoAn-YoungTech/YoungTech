
const productRepository = require('../repositories/productRepository');
const inputInvoiceRepository = require('../repositories/inputInvoiceRepository')

const inputInvoiceService = {
  saveInputInvoice: async (invoiceData) => {
    try {
      const savedInvoice = await inputInvoiceRepository.saveInputInvoice(invoiceData);
      return savedInvoice; 
    } catch (error) {
      throw new Error('Error saving input invoice: ' + error.message);
    }
  },

  addProductToInventory: async (products) => {
    const result = [];

    for (const product of products) {
      const existingProduct = await productRepository.getProductByName(product.productName);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
        await productRepository.updateProduct(existingProduct.id, { quantity: existingProduct.quantity });
        result.push({ message: `Updated quantity for ${product.productName}` });
      } else {
        await productRepository.createProduct(product);
        result.push({ message: `Added new product: ${product.productName}` });
      }
    }

    return result;
  }
};

module.exports = inputInvoiceService;
