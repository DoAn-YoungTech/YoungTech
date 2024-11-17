const imageService = require('../services/imageService');

const imageController = {
  getAllImage: async (req, res) => {
    try {
      const result = await imageService.getAllImage();
      if (!result || result.data.length === 0) {
        return res.status(404).json({ message: 'No images found' });
      }
      // trả về kết quả
      res.json({
        message: 'All images',
        data: result.data
      });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  },

  // getImagebyProductId trả về danh sách ảnh
  getImageByProductId: async (req, res) => {
    try {
        const productId = req.params.productId; // Lấy productId từ URL params
        const result = await imageService.getImageByProductId(productId); // Gọi phương thức từ service

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No images found for the given product ID' });
        }

        return res.status(200).json({ message: 'Success', data: result });
    } catch (err) {
        console.error(err); // Log lỗi khi có sự cố
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
},
    getImageById: async (req, res) => {
      try {
        const id = req.params.id;
        const result = await imageService.getImageById(id);
    
        if (!result) {
          return res.status(404).json({ message: 'Image by id not found' }); // Thông báo lỗi đã sửa
        }
    
        return res.status(200).json({ message: 'Success', data: result });
      } catch (err) {
        console.error(err); // Log lỗi khi có sự cố
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }
    },
 
    updateImage: async (req, res) => {
        try {
          const id = req.params.id;
          const data = req.body;
          const result = await imageService.updateImage(id, data);
          
          if (!result) {
            return res.status(404).json({ message: 'Image not found for update' });
          }
      
          return res.status(200).json({ message: 'Update successful', data: result });
        } catch (err) {
          console.error(err); // Log lỗi để dễ dàng debug
          return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
      },
 
      createImage: async (req, res) => {
        try {
          const data = req.body;
          const result = await imageService.createImage(data);
          res.status(201).json({ message: "Image created successfully", data: result });
        } catch (err) {
          res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
      },
    
      deleteImage: async (req, res) => {
        try {
          const id = req.params.id;
          const result = await imageService.deleteImage(id); // Gọi service để thực hiện xóa mềm
      
          if (!result) {
            res.status(404).json({ message: "Image not found" });
          } else {
            res.status(200).json({ message: "Image marked as deleted successfully!" });
          }
        } catch (err) {
          res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
      },
    
      restoreImage: async (req, res) => {
        try {
          const id = req.params.id;
      
          // Gọi service để khôi phục lại
          const result = await imageService.restoreImage(id);
      
          if (!result) {
            res.status(404).json({ message: "Image not found or already restored" });
          } else {
            res.status(200).json({ message: "Image restored successfully!" });
          }
        } catch (err) {
          res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
      }
  };
  
  module.exports = imageController;
  