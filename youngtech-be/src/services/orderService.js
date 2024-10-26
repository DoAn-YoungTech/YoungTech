const orderRepository = require('../repositories/orderRepositori');
const invoiceService = require('../services/invoiceService');
const orderService = {
    getAllOrder: async () =>{
        return await orderRepository.getAllOrder();
    },
    getOrderById: async (id) => {
        return await orderRepository.getOrderById(id);
    },
    createOrder: async (data) => {
        return await orderRepository.createOrder(data);
    },
    updateOrder: async (id,data) => {
        return await orderRepository.updateOrder(id, data);
    },
    deleteOrder: async (id) => {
        const data = {is_deleted: true};
        return await orderRepository.deleteOrder(id, data);
    },

    completeOrder: async (id) => {
        // Lấy thông tin đơn hàng
        const order = await orderRepository.getOrderById(id);
        if (!order) {
            throw new Error("Order not found");
        }

        // Chuyển đơn hàng thành hóa đơn
        const invoiceData = {
            orderId: order.id,
            customer_id: order.customer_id,
            totalAmount: order.totalAmount,
        };
        
        // Tạo hóa đơn mới
        await invoiceService.createInvoice(invoiceData); // Gọi đến Invoice Service để tạo hóa đơn

        // Cập nhật trạng thái đơn hàng thành hoàn thành
        await orderRepository.updateOrder(id, { status: 'completed' }); // Chỉ cập nhật trạng thái thay vì xóa
    }
};

module.exports = orderService;