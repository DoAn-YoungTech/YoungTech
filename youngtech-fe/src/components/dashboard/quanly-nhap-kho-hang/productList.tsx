'use client';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/Store";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeItem } from "@/redux/WareHouseManagement/WareHouseMannagementSlice";
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

    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Danh Sách Sản Phẩm Đã Nhập</h1>
      {wareHouseMannagementItems.length === 0 ? (
        <p className="text-gray-500">Không có sản phẩm nào.</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 border-b">Tên hàng</th>
              <th className="p-4 border-b">Mô tả</th>
              <th className="p-4 border-b">Thương hiệu</th>
              <th className="p-4 border-b">Giá</th>
              <th className="p-4 border-b">Số lượng</th>
              <th className="p-4 border-b">Nhà cung cấp</th>
              <th className="p-4 border-b">Danh mục con</th>
              <th className="p-4 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            { !isLoadingCategories && !isLoadingSuppliers && wareHouseMannagementItems.map((product, index) =>
            {
              const supplier =  suppliers && suppliers.data.find((item: any) => item.id === +product.supplier_id)
              const childCategory =  childCategories && childCategories.data.find((item: any) => item.id === +product.childCategory_id)
              return (
                <tr key={index}>
                  <td className="p-4 border-b">{product.productName}</td>
                  <td className="p-4 border-b">{product.description}</td>
                  <td className="p-4 border-b">{product.brand}</td>
                  <td className="p-4 border-b">{product.productPrice}</td>
                  <td className="p-4 border-b">{product.quantity}</td>
                  <td className="p-4 border-b">{supplier.supplierName}</td>
                  <td className="p-4 border-b">{childCategory.childCateName}</td>
                  <td className="p-4 border-b flex items-center justify-around ">
                    <button onClick={() => handleView(product as Product, index)}>
                      <FaRegEye className="text-[1.1rem] text-slate-500" />
                    </button>
                    <button onClick={() => handleDelete(index)}>
                      <RiDeleteBin6Line className="text-[1.1rem] text-orange-600" />
                    </button>

                  </td>
                </tr>
              )
            }
            )
            }
          </tbody>
        </table>
      )}
        <div className="flex justify-between mt-4">
            <button onClick={() => router.back()} type="submit" className="w-[33%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Huỷ
            </button>
            <button type="submit" className="w-[33%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Thêm
            </button>
          </div>

                {/* Modal */}
      {isModalOpen && selectedProduct && (
        <EditProduct handleCloseModal={handleCloseModal} selectedProduct={selectedProduct} />
      )}
    </div>
    
    // <div className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
    //   <div className="content-product-header p-4">
    //     <div className="flex items-center justify-between">
    //       <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
    //         {product.id}
    //       </div>
    //       <div className="font-bold text-white/80 w-[calc(100%-90%)]">
    //         <span className="text-[0.8rem]">{product.productName}</span>
    //       </div>
    //       <div className="font-bold text-white/80 w-[calc(100%-85%)]">
    //         <span className="text-[0.8rem]">{product.description}</span>
    //       </div>
    //       <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
    //         <span className="text-[0.8rem]">{product.brand}</span>
    //       </div>
    //       <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
    //         <span className="text-[0.8rem]">{product.productPrice}</span>
    //       </div>
    //       <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-85%)]">
    //         <span className="text-[0.8rem]">{product.quantity}</span>
    //       </div>
    //       <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-85%)]">
    //         <span className="text-[0.8rem]">{product.supplier.name}</span>
    //       </div>
    //       <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-85%)]">
    //         <span className="text-[0.8rem]">{product.childCategory.name}</span>
    //       </div>
    //       <div className="font-bold flex items-center gap-2 w-[calc(100%-80%)]">
    //         <View url={`#`} />
    //         <Delete url={`#`} />
    //         {/* <Update url={`/dashboard/quanly-sanpham/sua-sanpham/${product.id}`} /> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ListProduct;
