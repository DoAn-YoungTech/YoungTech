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

    
        // Nhóm các hình ảnh lại theo product_id
        const productsWithImages = result.reduce((acc, product) => {
            // Kiểm tra nếu sản phẩm chưa có trong accumulator
            if (!acc[product.id]) {
                acc[product.id] = { ...product, images: [] };
            }
            // Thêm hình ảnh vào mảng images của sản phẩm
            if (product.image_url) {
                acc[product.id].images.push(product.image_url);
            }
            return acc;
        }, {});
    
        // Chuyển kết quả thành mảng và trả về
        const products = Object.values(productsWithImages);
    
        return {
            data: products,
            totalItems
        };
    },
    
    
    
     
    getProductById: async (id) => {
        const query = `
            SELECT p.*, GROUP_CONCAT(pi.imageUrl) AS imageUrls
            FROM product p
            LEFT JOIN image pi ON p.id = pi.product_id
            WHERE p.id = :id
            GROUP BY p.id
        `;
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result[0];  // Trả về sản phẩm với tất cả các hình ảnh gộp lại trong cột 'imageUrls'
    },
    
    

    // Thêm hàm mới để lấy sản phẩm theo childCategory_id
    getProductByChildCategory: async ({ childCategoryId, limit, offset }) => {
        try {
          // Câu truy vấn chính để lấy danh sách sản phẩm
          const query = `
            SELECT * 
            FROM product 
            WHERE childCategory_id = :childCategoryId
            ${limit ? 'LIMIT :limit OFFSET :offset' : ''}
          `;
      
          // Câu truy vấn phụ để tính tổng số sản phẩm
          const countQuery = `
            SELECT COUNT(*) as totalItems 
            FROM product 
            WHERE childCategory_id = :childCategoryId
          `;
      
          // Thực thi câu truy vấn chính
          const [result] = await sequelize.query(query, {
            replacements: {
              childCategoryId,
              limit,
              offset,
            },
          });
      
          // Thực thi câu truy vấn để lấy tổng số sản phẩm
          const [countResult] = await sequelize.query(countQuery, {
            replacements: { childCategoryId },
          });
      
          // Trả về kết quả
          return {
            data: result, // Danh sách sản phẩm
            totalItems: countResult[0].totalItems, // Tổng số sản phẩm
          };
        } catch (error) {
          console.error('Error in getProductByChildCategory:', error);
          throw error; // Ném lỗi ra ngoài để controller xử lý
        }
      },
      
    getProductByParentCategory: async ({ parentCategoryId, limit = null,offset = null }) => {
        // Khởi tạo câu truy vấn cơ bản để lấy dữ liệu sản phẩm
        let query = `
          SELECT p.*
          FROM product p
          JOIN childcategories c ON p.childCategory_id = c.id
          WHERE c.parentCategory_id = :parentCategoryId
        `;
      
        // Nếu có limit và offset, thêm các điều kiện phân trang
        if (limit) {
          query += offset !== null ? ` LIMIT :limit OFFSET :offset` : ` LIMIT :limit`;
        }
      
        // Khởi tạo truy vấn để tính tổng số sản phẩm
        const totalCountQuery = `
          SELECT COUNT(*) as total
          FROM product p
          JOIN childcategories c ON p.childCategory_id = c.id
          WHERE c.parentCategory_id = :parentCategoryId
        `;
      
        // Thực thi truy vấn lấy danh sách sản phẩm
        const [result] = await sequelize.query(query, {
          replacements: { parentCategoryId, limit, offset },
        });
      
        // Thực thi truy vấn để lấy tổng số sản phẩm
        const [[totalCount]] = await sequelize.query(totalCountQuery, {
          replacements: { parentCategoryId },
        });
      
        // Trả về dữ liệu theo định dạng yêu cầu
        return {
          data: result, // Danh sách sản phẩm
          totalItems: totalCount.total, // Tổng số sản phẩm
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