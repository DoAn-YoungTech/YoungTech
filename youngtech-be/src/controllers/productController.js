const productService = require('../services/productService');
// const validateProductAttributes = require('../validate/productValidator');

const productController = {
  getAllProduct: async (req, res) => {
    try {
      // lấy tham số phân trang
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;
      // Tính toán offset dựa trên page và limit
      const offset = (page - 1) * limit;
      // gọi service lấy tất cả sản phẩm với phân trang
      const result = await productService.getAllProduct({ offset, limit });
      if (!result || result.data.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
      // trả về kết quả phân trang
      res.json({
        message: 'All products',
        data: result.data,
        pagination: {
          page,
          limit,
          totalItems: result.totalItems,
          totalPages: Math.ceil(result.totalItems / limit),
        },
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await productService.getProductById(id);

      if (!result) {
        return res.status(404).json({ message: 'Product by id not found' }); // Thông báo lỗi đã sửa
      }

      return res.status(200).json({ message: 'Success', data: result });
    } catch (err) {
      console.error(err); // Log lỗi khi có sự cố
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  getProductByChildCategory: async (req, res) => {
    try {
      const childCategoryId = req.params.childCategoryId;
      const result = await productService.getProductByChildCategory(
        childCategoryId
      );

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: 'No products found for the given child category ID',
        });
      }

      return res.status(200).json({ message: 'Success', data: result });
    } catch (err) {
      console.error(err); // Log lỗi khi có sự cố
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  getProductByParentCategory: async (req, res) => {
    try {
      const parentCategoryId = req.params.parentCategoryId;
      const result = await productService.getProductByParentCategory(
        parentCategoryId
      );

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: 'No products found for the given parent category ID',
        });
      }

      return res.status(200).json({ message: 'Success', data: result });
    } catch (err) {
      console.error(err); // Log lỗi khi có sự cố
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await productService.updateProduct(id, data);

      if (!result) {
        return res
          .status(404)
          .json({ message: 'Product not found for update' });
      }

      return res
        .status(200)
        .json({ message: 'Update successful', data: result });
    } catch (err) {
      console.error(err); // Log lỗi để dễ dàng debug
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const data = req.body;
      const result = await productService.createProduct(data);
      res
        .status(201)
        .json({ message: 'Product created successfully', data: result });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await productService.deleteProduct(id); // Gọi service để thực hiện xóa mềm

      if (!result) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res
          .status(200)
          .json({ message: 'Product marked as deleted successfully!' });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  restoreProduct: async (req, res) => {
    try {
      const id = req.params.id;

      // Gọi service để khôi phục lại
      const result = await productService.restoreProduct(id);

      if (!result) {
        res
          .status(404)
          .json({ message: 'Product not found or already restored' });
      } else {
        res.status(200).json({ message: 'Product restored successfully!' });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  validateProduct: async (req, res) => {
    const {
      productName,
      productPrice,
      description,
      quantity,
      brand,
      childCategory_id,
      supplier_id,
    } = req.query;

    const errors = validateProductAttributes({
      productName,
      productPrice,
      description,
      quantity,
      brand,
      childCategory_id,
      supplier_id,
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    res.status(200).json({ message: 'Product data is valid.' });
  },
};

module.exports = productController;
