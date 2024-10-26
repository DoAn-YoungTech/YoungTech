const orderDetailRepository = require("../repositories/orderDetailRepositori");

const orderDetailService = {
    getAllOrderDetail: async () => {  
        return await orderDetailRepository.getAllOrderDetail();
    },

    getOrderDetailById: async (id) => {
        return await orderDetailRepository.getOrderDetailById(id);
    },

    createOrderDetail: async (data) => {
        // Kiểm tra xem dữ liệu có đầy đủ không (ví dụ: order_id, product_id phải tồn tại)
        if (!data.order_id || !data.product_id) {
            throw new Error("Order ID and Product ID are required to create an order detail.");
        }
        return await orderDetailRepository.createOrderDetail(data);
    },

    updateOrderDetail: async (id, data) => {
        return await orderDetailRepository.updateOrderDetail(id, data);
    },

    deleteOrderDetail: async (id) => {
        const data = { is_deleted: true };
        return await orderDetailRepository.deleteOrderDetail(id, data);
    },
};

module.exports = orderDetailService;
