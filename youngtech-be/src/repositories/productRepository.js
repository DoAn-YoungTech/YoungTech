const sequelize = require('../configs/db');

const productRepository = {
    getAllProduct: async () =>{
        const query = `SELECT * FROM product`;
        const [result] = await sequelize.query(query);
        return result;
    },

    getProductById: async () =>{
        const query = `SELECT * FROM product WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result[0];
    },

    createProduct: async () =>{
        const query = `INSERT INTO product (productName, productPrice, description, quantity, brand, childCategory_id,supplier_id ) 
        VALUES (:productName, :productPrice, :description, :quantity, :brand, :childCategory_id, :supplier_id)`;
        const [result] = await sequelize.query(query, { replacements: data });
        return result;
    },
    deleteProduct : async () =>{
        const query = `UPDATE product SET flag = true WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements : { id } });
        return result ;
    },

    updateProduct : async () =>{
        const query = `UPDATE product 
                      SET productName = :productName, productPrice = :productPrice, description = :description, quantity = :quantity, brand = :brand, childCategory_id = :childCategory_id, supplier_id = :supplier_id 
                      WHERE id = :id`
        const [result] = await sequelize.query(query, { replacements : {...data, id}});
        return result  ;
    },

    // Hàm mới để lấy sản phẩm theo danh sách childCategoryIds
    getProductsByChildCategoryIds: async (childCategoryIds) => {
        const query = `SELECT * FROM product WHERE childCategory_id IN (:childCategoryIds) AND flag = false`;
        const [result] = await sequelize.query(query, { replacements: { childCategoryIds } });
        return result;
    }
};

module.exports = productRepository;