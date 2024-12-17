'use client';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/Store";
import { FaEdit} from "react-icons/fa";
import { removeItem, resetWareHouseMannagementItems } from "@/redux/WareHouseManagement/WareHouseMannagementSlice";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import EditProduct from "./components/EditProduct";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { MdDeleteOutline } from "react-icons/md";
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
    setSelectedProduct({...product, id: id});
    setModalOpen(true);
  };
  

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
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
  
    try {
      const response = await axios.post(`${Api_url}/inputinvoice/addProduct`, formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        alert("Thêm sản phẩm thành công!");
        dispatch(resetWareHouseMannagementItems())
      } else {
        alert(`Thêm sản phẩm thất bại: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding products:", error);
      alert("Đã xảy ra lỗi khi thêm sản phẩm.");
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
    <h2 className="text-3xl font-bold text-center text-white mb-6">Danh sách sản phẩm đã nhập</h2>
    {wareHouseMannagementItems.length === 0 ? (
      <p className="text-white/50">Không có sản phẩm nào.</p>
    ) : (
      <div className="overflow-x-auto bg-[#282F36] rounded-lg text-white/50">
        <table className="w-full table-auto bg-[#282F36] rounded-lg text-white/50">
          <thead>
            <tr className="bg-[#282F36] text-white/80">
            <th className="p-4 border-b border-gray-600">STT</th>
              <th className="p-4 border-b border-gray-600">Tên sản phẩm</th>
              <th className="p-4 border-b border-gray-600">Hình ảnh</th>
              <th className="p-4 border-b border-gray-600">Mô tả</th>
              <th className="p-4 border-b border-gray-600">Thương hiệu</th>
              <th className="p-4 border-b border-gray-600">Giá</th>
              <th className="p-4 border-b border-gray-600">Số lượng</th>
              <th className="p-4 border-b border-gray-600">Nhà cung cấp</th>
              <th className="p-4 border-b border-gray-600">Danh mục con</th>
              <th className="p-4 border-b border-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {!isLoadingCategories && !isLoadingSuppliers &&
              wareHouseMannagementItems.map((product, index) => {
                const supplier = suppliers?.data.find(
                  (item: any) => item.id === +product.supplier_id
                );
                const childCategory = childCategories?.data.find(
                  (item:any) => item.id === +product.childCategory_id
                );

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-600 hover:bg-[#22282E] transition-all duration-300"
                  >
                     <td className="p-4 text-white/80 text-[0.9rem]">
                      {index + 1} {/* Hiển thị số thứ tự */}
                    </td>
                    <td className="p-4 text-white/80 text-[0.9rem]">
                      {product.productName}
                    </td>
                    <td className="p-4 text-white/80 text-[0.9rem]">
                      <img
                        src={product?.images[0]}
                        alt="product"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-4 text-white/80 text-[0.9rem]">
                      {product.description}
                    </td>
                    <td className="p-4 text-white/80 text-[0.9rem]">
                      {product.brand}
                    </td>
                    <td className="p-4 text-white/80 text-[0.9rem]">
                      {product.productPrice}
                    </td>
                    <td className="p-4 text-white/80 text-[0.9rem]">
                      {product.quantity}
                    </td>
                    <td className="p-4 text-white/80 text-[0.9rem]">
                      {supplier?.supplierName || "N/A"}
                    </td>
                    <td className="p-4 text-white/80 text-[0.9rem]">
                      {childCategory?.childCateName || "N/A"}
                    </td>
                    <td className="p-4 text-white/80 text-[0.9rem] flex items-center gap-4 text-center">
                    <button  className="hover:bg-blue-500 bg-[#1E293B] rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center" 
                      onClick={() => handleUpdate(product as Product, index)}>
                      <FaEdit className="text-[1.1rem] text-blue-400"/>
                    </button>
                    <button className="hover:bg-red-500 bg-[#1E293B] rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                      onClick={() => handleDelete(index)}>
                      <MdDeleteOutline className="text-[1.1rem] text-red-400" />
                    </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
  </div>
 
  );
};

export default ListProduct;
