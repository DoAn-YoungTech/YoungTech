const sequelize = require('../configs/db');

const parentCategoriesRepository = {
    getAllParentCategories : async () => {
        const query = `SELECT * FROM parentcategories`;
        const [result] = await sequelize.query(query)
        return result;
    },
    getParentCategoriesById: async (id) => {
        const query = `SELECT * FROM parentcategories WHERE id = :id`;
        const [result] = await sequelize.query(query, {replacements : {id}});
        return result[0];
    },
    createParentCategories : async (data) => {
        console.log(`Repository ${data}`);
        const query =  `INSERT INTO parentcategories (name, description, status, createAt)
        VALUES (:name, :description, :status, :createAt)`
        const [result] = await sequelize.query(query ,{ replacements: data } );
        return result ;
    },
    deleteParentCategories : async (id) => {
        const query = `UPDATE parentcategories SET is_deleted = true WHERE id = :id`; // Đánh dấu xóa mềm
        const [result] = await sequelize.query(query, {replacements : {id}});
        return result;
    },
    updateParentCategories : async (id, data) => {
        const query = `UPDATE parentcategories 
        SET name = :name, description = :description, status = :status, createAt = :createAt
        WHERE id = :id`;
        const [result] = await sequelize.query(query, {replacements : {...data, id}});
        return result  ;
    },
};
module.exports = parentCategoriesRepository;