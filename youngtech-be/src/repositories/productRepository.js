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
      
    getProductByName: async (productName) => {
        const query = `SELECT * FROM product WHERE productName = :productName AND flag = true`;
        const [result] = await sequelize.query(query, {
          replacements: { productName }
        });
        return result[0]; 
      },
    
  
      updateProduct: async (id, data) => {
        const query = `UPDATE product SET quantity = :quantity WHERE id = :id`;
        await sequelize.query(query, { replacements: { ...data, id } });
      },
    
      
      createProduct: async (productData) => {
        const query = `INSERT INTO product (productName, quantity, description, productPrice, brand, childCategory_id, supplier_id, flag, createAt) 
          VALUES (:productName, :quantity, :description, :productPrice, :brand, :childCategory_id, :supplier_id, true, :createAt)`;
        
        productData.createAt = new Date();
    
        await sequelize.query(query, { replacements: productData });
    }


    };
    
      




module.exports = productRepository;