"use client";
import { MainMenusGradientCard } from "./payment";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/app/dashboard/quanly-banhang/ban-hang/page";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const upload = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const nameKey = process.env.CLOUDINARY_CLOUD_NAME;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";
export default function DynamicCardsVariant2() {
  const { customerId, setCustomerId, orderId, setOrderId } =
    useContext(UserContext);
  const [isShow, setIsShow] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState({
    totalAmount: 0,
    dateOrder: null,
    paymentMethod: "",
    phoneNumber: "",
    fullName: "",
    address: ""
  });
  const handleViewOrder = async () => {
    if (
      orderId == null ||
      orderId == undefined ||
      customerId == null ||
      customerId == undefined
    ) {
      return toast.info(
        "Vui lòng mua sản phẩm trước khi thanh toán . Xin Cảm ơn !"
      );
    }
    setIsShow(true);
    const response = await axios.get(`${baseURL}/order/${orderId}`);
    if (response.status === 200) {
      setData({
        totalAmount: response.data.data.totalAmount,
        dateOrder: response.data.data.orderDate,
        paymentMethod: response.data.data.paymentMethod,
        phoneNumber: response.data.data.phoneNumber,
        fullName: response.data.data.fullName,
        address: response.data.data.address
      });
      console.log(data);
      console.log(response.data);
    } else {
      console.log("error");
    }
  };

  // format date
  const date = new Date(data.dateOrder);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);

  const handleCancel = () => {
    setData({
      totalAmount: 0,
      dateOrder: null,
      paymentMethod: "",
      phoneNumber: "",
      fullName: "",
      address: ""
    });
    setIsShow(false);
  };
  const handlePayment = async () => {
    if (
      (!orderId && !customerId && orderId == null) ||
      orderId == undefined ||
      customerId == null ||
      customerId == undefined
    ) {
      return toast.info("Thiếu thông tin đơn hàng hoặc khách hàng!");
    }

    // 1. Tạo file PDF
    const doc = new jsPDF();

    // Thêm nội dung PDF
    doc.setFontSize(16);
    doc.text("Hóa Đơn Thanh Toán", 10, 10);
    doc.setFontSize(12);
    doc.text(`Tên khách hàng: ${data.fullName}`, 10, 20);
    doc.text(`Địa chỉ: ${data.address}`, 10, 30);
    doc.text(`Số điện thoại: ${data.phoneNumber}`, 10, 40);
    doc.text(`Ngày mua: ${formattedDate}`, 10, 50);
    doc.text(`Phương thức thanh toán: ${data.paymentMethod}`, 10, 60);
    doc.text(
      `Tổng tiền: ${data.totalAmount.toLocaleString("vi-VN")} VND`,
      10,
      70
    );

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    console.log("Cloud Name:", nameKey);
    console.log("Upload Preset:", upload);

    //
    // 2. Chuẩn bị upload lên Cloudinary
    const formData = new FormData();
    formData.append("file", pdfBlob, "invoice.pdf"); // Đặt tên file khi upload
    formData.append(
      "upload_preset",
      `${upload}`
    ); // Upload preset

    // 3. Upload file PDF trực tiếp lên Cloudinary
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${nameKey}/auto/upload`,
      formData
    );
    console.log(cloudinaryResponse);

    const cloudinaryUrl = cloudinaryResponse.data.secure_url; // URL file PDF từ Cloudinary
    console.log(cloudinaryUrl);
    //

    try {
      const response = await axios.post(`${baseURL}/outInvoice`, {
        order_id: orderId,
        customer_id: customerId,
        linkPdf: pdfUrl // Gửi link PDF lên backend
      });
      if (response.status === 201) {
        setData({
          totalAmount: 0,
          dateOrder: null,
          paymentMethod: "",
          phoneNumber: "",
          fullName: "",
          address: ""
        });
        setCustomerId(null);
        setOrderId(null);
        setIsShow(false);
        return alert("Thanh toán thành công ! Link hóa đơn đã được gửi.");
      } else {
        return toast.info("Đã xảy ra lỗi trong quá trình thanh toán.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể xử lý thanh toán.");
    }
  };
  // Xuất file PDF dưới dạng Blob URL

  return (
    <>
      <ToastContainer />
      <div className="grid relative p-2 justify-between gap-2  grid-cols-2">
        <div className="cursor-pointer" onClick={handleViewOrder}>
          <MainMenusGradientCard
            className="p-4"
            description="Thanh toán khi nhận hàng"
            title="Trả tiền mặt"
          ></MainMenusGradientCard>
        </div>
        <div className="cursor-pointer" onClick={handleViewOrder}>
          <MainMenusGradientCard
            className="p-4"
            description="ZALO PAY"
            title="Thanh toán qua ZALO"
          ></MainMenusGradientCard>
        </div>
      </div>
      {isShow && (
        <div className="content-payment  mx-3 motion-preset-bounce -motion-translate-y-in-150">
          <div className="border border-white/30 bg-slate-900 rounded-2xl p-4 ">
            <h2 className="text-[1.1rem] text-white font-bold text-center">
              Tổng tiền hóa đơn
            </h2>
            <div className="flex flex-col gap-3 mt-5">
              <h4 className="text-white/50">
                Tên khách hàng:{" "}
                <span className="text-white font-bold"> {data.fullName}</span>{" "}
              </h4>
              <h4 className="text-white/50">
                Địa chỉ khách hàng:
                <span className="text-white font-bold">
                  {" "}
                  {data.address}
                </span>{" "}
              </h4>
              <h4 className="text-white/50">
                Ngày mua:{" "}
                <span className="text-white font-bold"> {formattedDate}</span>{" "}
              </h4>
              <h4 className="text-white/50">
                Số điện thoại:
                <span className="text-white font-bold">
                  {" "}
                  {data.phoneNumber}
                </span>{" "}
              </h4>
              <h4 className="text-white/50">
                Phương thức thanh toán:{" "}
                <span className="text-white font-bold">
                  {data.paymentMethod}
                </span>
              </h4>
              <h4 className="text-white">
                Tổng tiền:{" "}
                <span className="text-white font-bold">
                  {" "}
                  {data.totalAmount.toLocaleString("vi-VN")} vnd
                </span>
              </h4>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <button
                  onClick={handlePayment}
                  className="text-white bg-blue-500 text-sm rounded-2xl  p-2 hover:text-blue-500 hover:bg-white transition-all duration-300 "
                >
                  Thanh toán
                </button>
                <button
                  onClick={handleCancel}
                  className="text-white bg-red-500 text-sm rounded-2xl  p-2 hover:text-red-500 hover:bg-white transition-all duration-300"
                >
                  Hủy thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
