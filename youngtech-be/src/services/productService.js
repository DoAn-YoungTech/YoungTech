const productRepository = require('../repositories/productRepository');

const productService = {
    getAllProduct: async ({ offset, limit })=>{
        return await productRepository.getAllProduct({ offset, limit });
    },
    
    getProductById: async (id) => {
        return await productRepository.getProductById(id);
    },

    createProduct: async (data) => {
        return await productRepository.createProduct(data);
    },

    deleteProduct: async (id) => {
        const data = { flag: true }; // Dữ liệu xóa mềm
        return await productRepository.deleteProduct(id, data); // Xóa mềm
    },
      
    restoreProduct: async (id) => {
        return await productRepository.restoreProduct(id);
    },
    updateProduct: async (id, data) => {
        return await productRepository.updateProduct(id, data);
      },
 };

 module.exports = productService;