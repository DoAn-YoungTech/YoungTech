import "./order.css";
const TableOrder = ({ orders }) => {
  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
        Danh Sách Đơn Hàng
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left text-[14px]">Order ID</th>
              <th className="py-2 px-4 text-left text-[14px]">Order Date</th>
              <th className="py-2 px-4 text-left text-[14px]">Total Amount</th>
              <th className="py-2 px-4 text-left text-[14px]">Status</th>
              <th className="py-2 px-4 text-left text-[14px]">Payment Method</th>
              <th className="py-2 px-4 text-left text-[14px]">Full Name</th>
              <th className="py-2 px-4 text-left text-[14px]">Phone Number</th>
              <th className="py-2 px-4 text-left text-[14px]">Address</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order.orderId}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition duration-300`}
                >
                  <td className="py-2 px-4 text-[12px]">{order.orderId}</td>
                  <td className="py-2 px-4 text-[12px]">
                    {new Date(order.orderDate).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-[12px]">
                    {order.totalAmount.toLocaleString()} VND
                  </td>
                  <td className="py-2 px-4 text-[12px]">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-[12px] truncate-address">{order.paymentMethod}</td>
                  <td className="py-2 px-4 text-[12px] truncate-address">{order.fullName}</td>
                  <td className="py-2 px-4 text-[12px] truncate-address">{order.phoneNumber}</td>
                  <td className="py-2 px-4 text-[12px] truncate-address">{order.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-4 text-center text-gray-500 font-semibold"
                >
                  Không có dữ liệu đơn hàng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrder;
