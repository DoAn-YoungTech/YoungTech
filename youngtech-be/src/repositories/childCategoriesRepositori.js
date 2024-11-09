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
        console.log(`Repository ${JSON.stringify(data)}`);
        
        // Kiểm tra nếu flag không có trong data thì mặc định flag là false
        const { childCateName, parentCategory_id } = data;
        const flag = data.flag !== undefined ? data.flag : false; // Mặc định flag là false
    
        const query = `INSERT INTO childcategories (childCateName, flag, parentCategory_id)
                       VALUES (:childCateName, :flag, :parentCategory_id)`;
        const [result] = await sequelize.query(query, { replacements: { childCateName, flag, parentCategory_id } });
        return result;
    },
    

    deleteChildCategories: async (id) =>{
        const query = `UPDATE childcategories 
        SET flag = true WHERE id = :id`; // Đánh dấu xóa mềm
        const [result] = await sequelize.query(query, {replacements : {id}});
        return result;
    },
    restoreChildCategories: async (id) => {
        const query = `UPDATE childcategories SET flag = false WHERE id = :id`; // Khôi phục xóa mềm
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result;
      },

    updateChildCategories: async (id, data) =>{
        const query = `UPDATE childcategories 
        SET childCateName = :childCateName, parentCategory_id = :parentCategory_id 
        WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements : {...data, id} });
        return result;
    },
};

module.exports = childCategoriesRepository;
