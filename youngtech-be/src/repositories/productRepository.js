const sequelize = require('../configs/db');

const productRepository = {
    getAllProduct: async ({ offset, limit }) =>{
        const query = `SELECT * FROM product LIMIT :limit OFFSET :offset`;
        const [result] = await sequelize.query(query, {
            replacements: { limit, offset }
        });
    
        // Lấy tổng số sp để tính tổng số trang
        const totalQuery = `SELECT COUNT(*) AS totalItems FROM product`;
        const [totalResult] = await sequelize.query(totalQuery);
        const totalItems = totalResult[0].totalItems;
    
        return {
            data: result,
            totalItems
        };
    },
    getProductById: async (id) => {
        const query = `SELECT * FROM product WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result[0];  // Trả về sản phẩm đầu tiên trong kết quả
    },
    
    // Thêm hàm mới để lấy sản phẩm theo childCategory_id
    getProductByChildCategory: async (childCategoryId) => {
        const query = `SELECT * FROM product WHERE childCategory_id = :childCategoryId`;
        const [result] = await sequelize.query(query, { replacements: { childCategoryId } });
        return result; // Trả về danh sách các sản phẩm tìm thấy
    },

    createProduct: async () =>{
        const query = `INSERT INTO product (productName, productPrice, description, quantity, brand, childCategory_id,supplier_id ) 
        VALUES (:productName, :productPrice, :description, :quantity, :brand, :childCategory_id, :supplier_id)`;
        const [result] = await sequelize.query(query, { replacements: data });
        return result;
    },
    deleteProduct: async (id) => {
        const query = `UPDATE product SET flag = true WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result;
    },
      
    restoreProduct: async (id) => {
        const query = `UPDATE product SET flag = false WHERE id = :id`; // Khôi phục xóa mềm
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result;
    },
      
    updateProduct: async (id, data) => {
        const query = `UPDATE product 
                       SET productName = :productName, 
                           productPrice = :productPrice, 
                           description = :description, 
                           quantity = :quantity, 
                           brand = :brand, 
                           childCategory_id = :childCategory_id, 
                           supplier_id = :supplier_id 
                       WHERE id = :id`;
        
        const [result] = await sequelize.query(query, { replacements: { ...data, id } });
        return result;
      },
      


};

module.exports = productRepository;