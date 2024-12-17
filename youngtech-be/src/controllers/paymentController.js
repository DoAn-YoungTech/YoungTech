const paymentService = require('../services/paymentService');
const createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log(orderId);
    // Here ! check valid booking id exist
    const booking = await paymentService.booking(orderId);
    console.log(booking.status);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found !' });
    }


    console.log(booking.totalAmount);
    const transaction = await paymentService.createTransaction(
      booking.id,
      booking.totalAmount
    );
    console.log(transaction);
    if (!transaction) {
      return res.status(400).json({ message: 'Failed to create transaction!' });
    }
    // Kiểm tra trạng thái giao dịch
    if (transaction.return_code === 1) {
      // 1: Success
      // Lưu thông tin thanh toán vào bảng Payment
      const dataPayment = {
        order_id: orderId,
        paymentDate: new Date(),
        status: 'Completed',
        paymentMethod: 'ZaloPay',
        amount: booking.totalAmount,
      };
      const newPayment = await paymentService.createPayment(dataPayment);

      // update method payment 
      const updateBooking = await paymentService.updateMethodPayment(
        orderId,
        'ZaloPay'
      );
      if (!updateBooking) {
        return res
          .status(400)
          .json({ message: 'Failed to update booking status!' });
      }
      return res.status(201).json({
        message: 'Payment successful!',
        transaction: transaction,
        payment: newPayment,
      });
    } else {
      return res.status(400).json({
        message: 'Payment failed!',
        transaction: transaction,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createPayment };
