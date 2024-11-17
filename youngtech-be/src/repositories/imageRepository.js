const sequelize = require('../configs/db');
const imageRepository = {
    
    getAllImage: async () => {
        const query = `SELECT * FROM image`;
        const [result] = await sequelize.query(query);

        return {
            data: result
        };
    },

    // getImageByProductId trả về 1 danh sách ảnh product id
    getImageByProductId: async (productId) => {
        const query = `SELECT * FROM image WHERE product_id = :productId`;
        const [result] = await sequelize.query(query, { replacements: { productId } });
        return result; // Trả về danh sách các hình ảnh liên quan đến sản phẩm
    },
    
    getImageById: async (id) => {
        const query = `SELECT*FROM image WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result[0];  // Trả về sản phẩm đầu tiên trong kết quả
    },
    createImage: async (data) => {
        // Gán flag mặc định là false nếu không có giá trị flag trong data
        const flag = data.flag || false;  // Nếu không có flag trong data, gán giá trị mặc định là false
        const query = `INSERT INTO image (flag, imageUrl, product_id) 
                       VALUES (:flag, :imageUrl, :product_id)`;
        
        const [result] = await sequelize.query(query, { replacements: { ...data, flag } });
        return result;
      },
      
    deleteImage: async (id) => {
        const query = `UPDATE image SET flag = true WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result;
    },
    
    restoreImage: async (id) => {
        const query = `UPDATE image SET flag = false WHERE id = :id`; // Khôi phục xóa mềm
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result;
    },
    // 
    updateImage: async (id, data) => {
        const query = `UPDATE image 
                       SET  
                           imageUrl = :imageUrl, 
                       WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements: { ...data, id } });
        return result;
    }
};

module.exports = imageRepository;