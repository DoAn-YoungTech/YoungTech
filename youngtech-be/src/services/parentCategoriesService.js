const parentCategoriesRepository = require("../repositories/parentCategoriesRepository");

const parentCategoriesService = {
  getAllParentCategories: async () => {
    return await parentCategoriesRepository.getAllParentCategories();
  },
  createParentCategories: async (data) => {
    return await parentCategoriesRepository.createParentCategories(data);
  },
  updateParentCategories: async (id, data) => {
    return await parentCategoriesRepository.updateParentCategories(id, data);
  },
  deleteParentCategories: async (id) => {
    const data = { is_deleted: true };  // Dữ liệu xóa mềm
    return await parentCategoriesRepository.updateParentCategories(id, data);
  },
  getParentCategoriesById: async (id) => {
    return await parentCategoriesRepository.getParentCategoriesById(id);
  },
};

module.exports = parentCategoriesService;
