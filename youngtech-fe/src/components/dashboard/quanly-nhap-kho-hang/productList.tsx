'use client';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/Store";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeItem, resetWareHouseMannagementItems } from "@/redux/WareHouseManagement/WareHouseMannagementSlice";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import EditProduct from "./components/EditProduct";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MdDeleteOutline } from "react-icons/md";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { toast, ToastContainer } from "react-toastify";
const Api_url = process.env.NEXT_PUBLIC_API_URL;

type Product = {
  id: number;
  productName: string;
  description: string;
  brand: string;
  productPrice: number;
  quantity: number;
  supplier_id: string
  childCategory_id: string
  images: string[]
};

type TableRowProps = {
  product: Product;
};

const ListProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  const { wareHouseMannagementItems } = useSelector((state: RootState) => state.wareHouseMannagement);

  const handleDelete = (index: number) => {
    dispatch(removeItem(index))
  }

  const handleUpdate = (product: Product, id: number) => {
    setSelectedProduct({ ...product, id: id });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const blobToBase64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);  // Đọc Blob và chuyển thành Base64
    });
  };

  const handleAddProducts = async () => {
    const formattedData = wareHouseMannagementItems.map((item) => ({
      productName: item.productName,
      quantity: item.quantity,
      description: item.description,
      productPrice: item.productPrice,
      brand: item.brand,
      childCategory_id: item.childCategory_id,
      supplier_id: item.supplier_id,
      images: item.images || [],
    }));

    // Xuất dữ liệu ra PDF
    const doc = new jsPDF();
    doc.setFont('courier', 'italic');
    doc.getFontList();
    doc.text("Danh sách sản phẩm đã nhập", 14, 10);

    // Cấu hình bảng
    autoTable(doc, {
      head: [["STT", "Tên sản phẩm", "Số lượng", "Mô tả", "Giá", "Thương hiệu", "Danh mục con", "Nhà cung cấp"]],
      body: formattedData.map((product, index) => {
        const supplier = suppliers?.data.find(
(item) => item.id === +product.supplier_id
        );
        const childCategory = childCategories?.data.find(
          (item) => item.id === +product.childCategory_id
        );
        return [
          index,
          product.productName,
          product.quantity,
          product.description,
          product.productPrice,
          product.brand,
          childCategory?.childCateName, // Có thể thay bằng tên danh mục nếu cần
          supplier?.supplierName,      // Có thể thay bằng tên nhà cung cấp nếu cần
        ]
      }),
      styles: {
        fontSize: 10, font: 'Amiri',
        fontStyle: 'normal',
      }, // Tùy chỉnh kích thước font
      startY: 20, // Vị trí bắt đầu bảng
    });
    // Xuất PDF dưới dạng Blob
    const pdfBlob = doc.output('blob');
    // chuyển blob thành base64
    const base64 = await blobToBase64(pdfBlob);
    console.log("Base64 từ Blob:", base64);

    // Lưu URL để sử dụng hoặc hiển thị
    // console.log("URL của file PDF: ", `${pdfUrl}`);
    // Send base64 files to the API
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files: [base64] }),
    });
    const data = await response.json();
    if (response.ok) {
      const imageUrls = data.urls.map((item: { url: string }) => item.url);
      console.log('k', imageUrls[0].replace('pdf', 'jpg'))

      // Append new uploaded images to the existing ones
      // setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);

      // handleGetArrayImage(imageUrls); // Update parent component with uploaded image URLs
      // setImagePreviews([]); // Clear the previews after upload
      // setImages([]); // Clear selected images

    } else {
      console.error("Upload failed:", data.message);
    }

    try {
      const response = await axios.post(`${Api_url}/inputinvoice/addProduct`, formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Thêm sản phẩm thành công!"); // Hiển thị thông báo toast thành công
        doc.save("DanhSachSanPham.pdf");
        dispatch(resetWareHouseMannagementItems())
      } else {
        toast.error(`Thêm sản phẩm thất bại: ${response.statusText}`); // Hiển thị thông báo toast lỗi
      }
    } catch (error) {
      console.error("Error adding products:", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm."); // Hiển thị thông báo toast lỗi
    }
  };

  // Fetch suppliers using React Query
  const { data: suppliers, isLoading: isLoadingSuppliers, isError: isErrorSuppliers } = useQuery(
    ['suppliers'],
    async () => {
      const response = await axios.get(`${Api_url}/suppliers?limit=100&offset=0`);
      return response.data;
    },

  );

  // Fetch child categories using React Query
  const {
data: childCategories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery(['childCategories'], async () => {
    const response = await axios.get(`${Api_url}/childcategories?limit=100&page=1`);
    return response.data;
  });

  return (
    <div className="min-h-screen p-8 bg-[#282F36] rounded-lg border-md border-[#374151]">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Danh sách sản phẩm đã nhập
      </h2>
      {wareHouseMannagementItems.length === 0 ? (
        <p className="text-gray-400 p-4">Không có sản phẩm nào.</p>
      ) : (
        <div className="divide-y divide-gray-700">
          {wareHouseMannagementItems.map((product, index) => {
            const supplier = suppliers?.data.find(
              (item) => item.id === +product.supplier_id
            );
            const childCategory = childCategories?.data.find(
              (item) => item.id === +product.childCategory_id
            );

            return (
              <div
                key={index}
                className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]"
              >
                <div className="content-product-header p-4">
                  <div className="flex items-center justify-between">
                    <div className=" text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
                      {product.productName}
                    </div>
                    <div className=" text-white/80 w-[calc(100%-90%)]">
                      <img
                        src={product?.images[0]}
                        alt="product"
                        className="w-10 h-10 object-cover rounded"
                      />
                    </div>
                    <div className="text-white/80 w-[calc(100%-85%)]">
                      <span className="text-[0.8rem]">{product.description}</span>
                    </div>
                    <div className="text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
                      <span className="text-[0.8rem]">{product.brand}</span>
                    </div>
                    <div className="text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
                      <span className="text-[0.8rem]">{product.productPrice}</span>
                    </div>
                    <div className="text-[0.9rem] text-white/80 w-[calc(100%-85%)]">
                      <span className="text-[0.8rem]">{product.quantity}</span>
                    </div>
                    <div className="text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
                      <span className="text-[0.8rem]">{supplier?.supplierName || "N/A"}</span>
                    </div>
                    <div className="text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
                      <span className="text-[0.8rem]">{childCategory?.childCateName || "N/A"}</span>
</div>
                    <div className="flex items-center gap-2 w-[calc(100%-80%)]">
                      <button className="hover:bg-blue-500 bg-[#1E293B] rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                        onClick={() => handleUpdate(product as Product, index)}>
                        <FaEdit className="text-[1.1rem] text-blue-400" />
                      </button>
                      <button className="hover:bg-red-500 bg-[#1E293B] rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                        onClick={() => handleDelete(index)}>
                        <MdDeleteOutline className="text-[1.1rem] text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-end gap-4 p-4">
        <ShinyRotatingBorderButton type="button" onClick={() => router.back()}>Hủy</ShinyRotatingBorderButton>
        <ShinyRotatingBorderButton type="button" onClick={handleAddProducts}>Thêm</ShinyRotatingBorderButton>
      </div>
      {isModalOpen && selectedProduct && (
        <EditProduct
          handleCloseModal={handleCloseModal}
          selectedProduct={selectedProduct}
        />
      )}
      <ToastContainer /> {/* Đưa ToastContainer vào cuối component để hiển thị toast */}
    </div>
  );
};

export default ListProduct;