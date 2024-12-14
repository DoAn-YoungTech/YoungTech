'use client';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/Store";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeItem, resetWareHouseMannagementItems } from "@/redux/WareHouseManagement/WareHouseMannagementSlice";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import EditProduct from "./components/EditProduct";


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

  const handleView = (product: Product, id: number) => {
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
      const response = await axios.post("http://localhost:3200/api/inputinvoice/addProduct", formattedData, {
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
      const response = await axios.get('http://localhost:3200/api/suppliers?limit=100&offset=0');
      return response.data;
    },

  );


  // Fetch child categories using React Query
  const {
    data: childCategories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery(['childCategories'], async () => {
    const response = await axios.get('http://localhost:3200/api/childcategories?limit=100&page=1');
    return response.data;
  });

  return (

    // <div className="min-h-screen p-8 bg-gray-50">
    //   <h1 className="text-3xl font-bold mb-6">Danh Sách Sản Phẩm Đã Nhập</h1>
    //   {wareHouseMannagementItems.length === 0 ? (
    //     <p className="text-gray-500">Không có sản phẩm nào.</p>
    //   ) : (
    //     <table className="w-full bg-white shadow-md rounded border border-gray-300">
    //       <thead>
    //         <tr className="bg-gray-100">
    //           <th className="p-4 border-b">Tên sản phẩm</th>
    //           <th className="p-4 border-b">Hình ảnh</th>
    //           <th className="p-4 border-b">Mô tả</th>
    //           <th className="p-4 border-b">Thương hiệu</th>
    //           <th className="p-4 border-b">Giá</th>
    //           <th className="p-4 border-b">Số lượng</th>
    //           <th className="p-4 border-b">Nhà cung cấp</th>
    //           <th className="p-4 border-b">Danh mục con</th>
    //           <th className="p-4 border-b">Hành động</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         { !isLoadingCategories && !isLoadingSuppliers && wareHouseMannagementItems.map((product, index) =>
    //         {
    //           const supplier =  suppliers && suppliers.data.find((item: any) => item.id === +product.supplier_id)
    //           const childCategory =  childCategories && childCategories.data.find((item: any) => item.id === +product.childCategory_id)
    //           return (
    //             <tr key={index}>
    //               <td className="p-4 border-b">{product.productName}</td>
    //               <td className="p-4 border-b"><img src={product?.images[0]} alt="album" /></td>
    //               <td className="p-4 border-b">{product.description}</td>
    //               <td className="p-4 border-b">{product.brand}</td>
    //               <td className="p-4 border-b">{product.productPrice}</td>
    //               <td className="p-4 border-b">{product.quantity}</td>
    //               <td className="p-4 border-b">{supplier.supplierName}</td>
    //               <td className="p-4 border-b">{childCategory.childCateName}</td>
    //               <td className="p-4 border-b flex items-center justify-around ">
    //                 <button onClick={() => handleView(product as Product, index)}>
    //                   <FaRegEye className="text-[1.1rem] text-slate-500" />
    //                 </button>
    //                 <button onClick={() => handleDelete(index)}>
    //                   <RiDeleteBin6Line className="text-[1.1rem] text-orange-600" />
    //                 </button>

    //               </td>
    //             </tr>
    //           )
    //         }
    //         )
    //         }
    //       </tbody>
    //     </table>
    //   )}
    //     <div className="flex justify-between mt-4">
    //         <button onClick={() => router.back()} type="submit" className="w-[33%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
    //           Huỷ
    //         </button>
    //         <button
    //           type="button"
    //           onClick={handleAddProducts}
    //           className="w-[33%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
    //           >
    //         Thêm
    //         </button>
    //       </div>

    //             {/* Modal */}
    //   {isModalOpen && selectedProduct && (
    //     <EditProduct handleCloseModal={handleCloseModal} selectedProduct={selectedProduct} />
    //   )}
    // </div>
    <div className="min-h-screen p-8 bg-[#111827]">
    <h1 className="text-3xl font-bold text-white mb-6">Danh Sách Sản Phẩm Đã Nhập</h1>
    {wareHouseMannagementItems.length === 0 ? (
      <p className="text-gray-400">Không có sản phẩm nào.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-[#1F2937] rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#374151] text-white">
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
                    <button onClick={() => handleView(product as Product, index)}>
                        <FaRegEye className="text-[1.1rem] text-slate-400 hover:text-slate-200" />
                      </button>
                      <button onClick={() => handleDelete(index)}>
                        <RiDeleteBin6Line className="text-[1.1rem] text-orange-500 hover:text-orange-300" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    )}
    <div className="flex justify-between mt-4">
      <button
        onClick={() => router.back()}
        type="button"
        className="w-[33%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Huỷ
      </button>
      <button
        type="button"
        onClick={handleAddProducts}
        className="w-[33%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Thêm
      </button>
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
