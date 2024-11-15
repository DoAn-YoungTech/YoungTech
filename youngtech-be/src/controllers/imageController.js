const imageService = require('../services/imageService');

const imageController = {
    getAllImage: async (req, res) => {
      try {
        // lấy tham số phân trang 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        // Tính toán offset dựa trên page và limit
        const offset = (page - 1) * limit;  
        // gọi service lấy tất cả hình ảnh với phân trang
        const result = await imageService.getAllImage({ offset, limit });
        if (!result || result.data.length === 0) {
          return res.status(404).json({ message: 'No images found' });
        }
        // trả về kết quả phân trang
        res.json({
          message: 'All images',
          data: result.data,
          pagination: {
            page,
            limit,
            totalItems: result.totalItems,
            totalPages: Math.ceil(result.totalItems / limit),
          },
        });
      } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
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
  