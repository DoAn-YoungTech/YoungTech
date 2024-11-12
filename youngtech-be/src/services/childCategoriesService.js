const childCategoriesRepository = require ("../repositories/childCategoriesRepositori");

const childCategoriesService = {
getAllChildCategories: async ({ offset, limit }) => {
    return await childCategoriesRepository.getAllChildCategories({ offset, limit });
},


        getChildCategoriesById: async (id, data) => {
        return await childCategoriesRepository.getChildCategoriesById(id, data);
    },

    createChildCategories: async (data) => {
        return await childCategoriesRepository.createChildCategories(data);
    },

    updateChildCategories: async (id, data) => {
        return await childCategoriesRepository.updateChildCategories(id, data);
    },

    deleteChildCategories: async (id) => {
        const data = { flag: true };  // Dữ liệu xóa mềm
    return await childCategoriesRepository.deleteChildCategories(id, data);
    },
    restoreChildCategories: async (id) => {
        return await childCategoriesRepository.restoreChildCategories(id);
    },
};

module.exports = childCategoriesService;