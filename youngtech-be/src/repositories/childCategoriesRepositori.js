const sequelize = require('../configs/db');

const childCategoriesRepository = {
    getAllChildCategories : async () =>{
        const query = `SELECT * FROM childcategories`;
        const [result] = await sequelize.query(query)
        return result;
    },
    getChildCategoriesById : async (id) => {
        const query = `SELECT * FROM childcategories WHERE id = :id`;
        const [result] = await sequelize.query(query, {replacements: {id}});
        return result[0];
    },

    createChildCategories: async (data) => {
        console.log(`Repository ${data}`);
        const query = `INSERT INTO childcategories (childCateName, description, isActive, createAt, parentCategory_id)
                       VALUES (:childCateName, :description, :isActive, :createAt, :parentCategory_id)`;
        const [result] = await sequelize.query(query, { replacements: data });
        return result;
    },

    deleteChildCategories: async (id) =>{
        const query = `UPDATE childcategories 
        SET is_deleted = true WHERE id = :id`; // Đánh dấu xóa mềm
        const [result] = await sequelize.query(query, {replacements : {id}});
        return result;
    },

    updateChildCategories: async (id, data) =>{
        const query = `UPDATE childcategories 
        SET childCateName = :childCateName, description = :description, isActive = :isActive, createAt = :createAt 
        WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements : {...data, id} });
        return result;
    },
};

module.exports = childCategoriesRepository;