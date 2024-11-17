const imageRepository = require('../repositories/imageRepository');

const imageService = {
    getAllImage: async () => {
        return await imageRepository.getAllImage();
    },
    
    getImageByProductId: async (productId) => {
        return await imageRepository.getImageByProductId(productId);
    },

    getImageById: async (id) => {
        return await imageRepository.getImageById(id);
    },

    createImage: async (data) => {
        return await imageRepository.createImage(data);
    },

    deleteImage: async (id) => {
        return await imageRepository.deleteImage(id);
    },

    restoreImage: async (id) => {
        return await imageRepository.restoreImage(id);
    },

    updateImage: async (id, data) => {
        return await imageRepository.updateImage(id, data);
    }
};
module.exports = imageService;