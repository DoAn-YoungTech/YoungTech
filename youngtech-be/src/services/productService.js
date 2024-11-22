const productRepository = require('../repositories/productRepository');

const productService = {
    getAllProduct: async ({ offset, limit })=>{
        return await productRepository.getAllProduct({ offset, limit });
    },
    
    getProductById: async (id) => {
        return await productRepository.getProductById(id);
    },

    // Thêm hàm mới để lấy sản phẩm theo childCategory_id
    getProductByChildCategory: async (childCategoryId) => {
        return await productRepository.getProductByChildCategory(childCategoryId);
    },

    getProductByParentCategory: async (parentCategoryId,limit,page) => {
        return await productRepository.getProductByParentCategory(parentCategoryId,limit,page)
       
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