const productService = require('../services/productService');

const childCategoriesService = require('../services/childCategoriesService');

const supplierService = require('../services/supplierService');

const productController = {
    getAllProduct: async (req, res) => {
        try {
            // Lấy tất cả các sản phẩm từ productService
            const products = await productService.getAllProduct();

            if (!products || products.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }

            // Lấy danh mục con và nhà cung cấp cho từng sản phẩm
            const enrichedProducts = await Promise.all(products.map(async (product) => {
                const childCategory = await childCategoriesService.getChildCategoryById(product.childCategoryId);  // Lấy danh mục con
                const supplier = await supplierService.getSupplierById(product.supplierId);  // Lấy nhà cung cấp

                return {
                    ...product._doc,  // Sao chép các thuộc tính của sản phẩm (phụ thuộc vào cách bạn lấy dữ liệu từ DB)
                    childCategory,
                    supplier
                };
            }));

            // Trả về danh sách sản phẩm đã được làm phong phú với thông tin danh mục con và nhà cung cấp
            res.status(200).json(enrichedProducts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const productId = req.params.id;
            
            // Lấy thông tin sản phẩm từ productService
            const product = await productService.getProductById(productId);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            // Lấy thông tin danh mục con liên quan đến sản phẩm này
            const childCategory = await childCategoriesService.getChildCategoryById(product.childCategoryId);

            // Lấy thông tin nhà cung cấp liên quan đến sản phẩm này
            const supplier = await supplierService.getSupplierById(product.supplierId);

            // Trả về dữ liệu sản phẩm cùng với thông tin danh mục con và nhà cung cấp
            res.status(200).json({
                message: "Product retrieved successfully",
                data: {
                    product,
                    childCategory,
                    supplier
                }
            });
        } catch (error) {
            // Bắt lỗi và trả về mã trạng thái 500 với thông báo lỗi
            res.status(500).json({
                message: "Error retrieving product",
                error: error.message
            });
        }
    },
    // Tạo mới sản phẩm (Product)
  createProduct: async (req, res) => {
    try {
      const data = req.body;  // Lấy dữ liệu từ yêu cầu
      const result = await productService.createProduct(data);  // Gọi service để tạo Product mới
      res.status(201).json({
        message: "Product created successfully", 
        data: result
      });
    } catch (err) {
      // Nếu có lỗi, trả về lỗi với mã 500 và thông báo lỗi
      res.status(500).json({
        message: "Error creating product", 
        error: err.message
      });
    }
  },

  // Xóa mềm (soft delete) sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;  // Lấy ID sản phẩm từ tham số URL
      const result = await productService.updateProduct(id, { flag: true });  // Gọi service để thực hiện xóa mềm sản phẩm
      
      if (!result) {
        // Nếu không tìm thấy sản phẩm với ID, trả về 404
        res.status(404).json({ message: "Product not found" });
      } else {
        // Nếu xóa mềm thành công, trả về 200 với thông báo thành công
        res.status(200).json({ message: "Product marked as deleted successfully!" });
      }
    } catch (err) {
      // Xử lý lỗi và trả về lỗi 500
      res.status(500).json({
        message: "Internal Server Error", 
        error: err.message
      });
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;  // Lấy ID sản phẩm từ tham số URL
      const data = req.body;  // Lấy dữ liệu từ body của yêu cầu
      const result = await productService.updateProduct(id, data);  // Gọi service để cập nhật sản phẩm
      
      // Trả về kết quả thành công với mã 200
      res.status(200).json({
        message: "Product updated successfully", 
        data: result
      });
    } catch (err) {
      // Xử lý lỗi và trả về lỗi 500
      res.status(500).json({
        message: "Error updating product", 
        error: err.message
      });
    }
  },

   // Lấy danh sách sản phẩm theo danh mục cha
   getProductsByParentCategory: async (req, res) => {
    try {
        const parentCategoryId = req.params.parentCategoryId;

        // Lấy danh sách danh mục con thuộc danh mục cha
        const childCategories = await childCategoriesService.getChildCategoriesByParentId(parentCategoryId);

        if (!childCategories || childCategories.length === 0) {
            return res.status(404).json({ message: "No child categories found for this parent category" });
        }

        // Lấy ID của các danh mục con để tìm sản phẩm
        const childCategoryIds = childCategories.map(cat => cat._id);

        // Lấy các sản phẩm có childCategoryId thuộc danh sách childCategoryIds
        const products = await productService.getProductsByChildCategoryIds(childCategoryIds);

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found for this parent category" });
        }

        // Bổ sung thông tin danh mục con và nhà cung cấp cho từng sản phẩm
        const enrichedProducts = await Promise.all(products.map(async (product) => {
            const childCategory = await childCategoriesService.getChildCategoryById(product.childCategoryId);
            const supplier = await supplierService.getSupplierById(product.supplierId);

            return {
                ...product._doc,
                childCategory,
                supplier
            };
        }));

        res.status(200).json(enrichedProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

};

module.exports = productController;