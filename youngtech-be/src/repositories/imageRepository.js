const sequelize = require('../configs/db');
const imageRepository = {
    getAllImage: async ({ offset, limit }) =>{
        const query = `SELECT flag, imageUrl, product_id FROM image LIMIT :limit OFFSET :offset`;
        const [result] = await sequelize.query(query, {
            replacements: { limit, offset }
        });
    
        // Lấy tổng số sp để tính tổng số trang
        const totalQuery = `SELECT COUNT(*) AS totalItems FROM image`;
        const [totalResult] = await sequelize.query(totalQuery);
        const totalItems = totalResult[0].totalItems;
    
        return {
            data: result,
            totalItems
        };
    },
    getImageById: async (id) => {
        const query = `SELECT flag, imageUrl, product_id FROM image WHERE id = :id`;
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
    
    updateImage: async (id, data) => {
        const query = `UPDATE image 
                       SET  
                           imageUrl = :imageUrl, 
                           product_id = :product_id 
                       WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements: { ...data, id } });
        return result;
    }
};

module.exports = imageRepository;