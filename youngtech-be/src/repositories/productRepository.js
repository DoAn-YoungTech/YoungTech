const sequelize = require('../configs/db');

const productRepository = {
    getAllProduct: async ({ offset, limit }) => {
        let query = `SELECT * FROM product`; // Lấy tất cả sản phẩm
        let replacements = {};
    
        // Kiểm tra nếu có limit
        if (limit) {
            // Nếu có cả limit và page, tính offset và phân trang
            if (offset) {
                query += ` LIMIT :limit OFFSET :offset`;  // Thêm LIMIT và OFFSET vào query
                replacements = { limit, offset };
            } else {
                // Nếu chỉ có limit mà không có page, lấy limit sản phẩm
                query += ` LIMIT :limit`;
                replacements = { limit };
            }
        }
    
        // Thực thi truy vấn lấy sản phẩm
        const [result] = await sequelize.query(query, {
            replacements: replacements
        });
    
        let totalItems = 0;
    
        // Nếu có limit, tính tổng số sản phẩm để tính tổng số trang
        if (limit) {
            const totalQuery = `SELECT COUNT(*) AS totalItems FROM product`;
            const [totalResult] = await sequelize.query(totalQuery);
            totalItems = totalResult[0].totalItems;
        }
    
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
    getProductByParentCategory: async (parentCategoryId, limit = null, page = 1) => {
        // Tính toán offset dựa trên limit và page
        const offset = limit && page ? (page - 1) * limit : null;
    
        // Khởi tạo câu truy vấn cơ bản
        let query = `
            SELECT p.*
            FROM product p
            JOIN childcategories c ON p.childCategory_id = c.id
            WHERE c.parentCategory_id = :parentCategoryId
        `
        if (limit  && offset ) {
            query += ` LIMIT :limit OFFSET :offset`;
        } else if (limit ) {
            query += ` LIMIT :limit`;
        }
        // Truy vấn để tính tổng số bản ghi
        const totalCountQuery = `
            SELECT COUNT(*) as total
            FROM product p
            JOIN childcategories c ON p.childCategory_id = c.id
            WHERE c.parentCategory_id = :parentCategoryId
        `;
    
        // Thực thi các truy vấn
        const [result] = await sequelize.query(query, {
            replacements: { parentCategoryId, limit, offset },
        });
        const [[totalCount]] = await sequelize.query(totalCountQuery, {
            replacements: { parentCategoryId },
        });
    
        // Trả về kết quả
        return {
            data: result,
            total: totalCount.total,
            currentPage: page,
            totalPages: limit ? Math.ceil(totalCount.total / limit) : 1,
        };
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
        const query = `INSERT INTO product (productName, quantity, description, productPrice, productImage, brand, childCategory_id, supplier_id, flag, createAt) 
          VALUES (:productName, :quantity, :description, :productPrice,: productImage, :brand, :childCategory_id, :supplier_id, true, :createAt)`;
        
        productData.createAt = new Date();
    
        await sequelize.query(query, { replacements: productData });
    }


    };
    
      




module.exports = productRepository;