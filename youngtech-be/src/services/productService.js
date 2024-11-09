const productRepository = require('../repositories/productRepository');

const productService = {
    getAllProduct: async ()=>{
        return await productRepository.getAllProduct();
    },
    
    getProductById: async (id) => {
        return await productRepository.getAllProductById(id);
    },

    createProduct: async (data) => {
        return await productRepository.createProduct(data);
    },

    deleteProduct: async (id) => {
        const data = { flag: true }
        return await productRepository.deleteProduct(id, data); // Xóa mềm
    },

    updateProduct: async (id, data) => {
        return await productRepository.updateProduct(id, data);
    },

     // Hàm mới để lấy sản phẩm dựa trên danh sách childCategoryIds
     getProductsByChildCategoryIds: async (childCategoryIds) => {
        return await productRepository.getProductsByChildCategoryIds(childCategoryIds);
    }
 };

 module.exports = productService;