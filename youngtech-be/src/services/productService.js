const productRepository = require('../repositories/productRepository');

const productService = {
    getAllProduct: async ({ offset, limit })=>{
        return await productRepository.getAllProduct({ offset, limit });
    },
    
    getProductById: async (id) => {
        return await productRepository.getProductById(id);
    },

    updatePricesProduct: async (id, data) => {
        return await productRepository.updatePricesProduct(id, data);
      },

    // Thêm hàm mới để lấy sản phẩm theo childCategory_id
    getProductByChildCategory: async (childCategoryId,limit, offset) => {
        return await productRepository.getProductByChildCategory(childCategoryId,limit, offset);
    },

    getProductByParentCategory: async (parentCategoryId,limit,offset) => {
        return await productRepository.getProductByParentCategory(parentCategoryId,limit,offset)
       
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