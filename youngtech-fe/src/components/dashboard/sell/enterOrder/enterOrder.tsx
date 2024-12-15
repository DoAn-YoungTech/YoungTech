"use client";
import React, { useState } from "react";
import ListProductsChoose from "./listProductsChoose";
import SelectedProductsList from "./SelectedProductsList";
// Dữ liệu giả lập danh sách sản phẩm từ kho
const productsInStock = [
  { id: 1, name: "Laptop Dell", price: 15000000 },
  { id: 2, name: "Chuột Logitech", price: 500000 },
  { id: 3, name: "Bàn phím cơ", price: 1200000 },
  { id: 4, name: "Màn hình LG", price: 7000000 },
  { id: 5, name: "Loa Bluetooth", price: 3000000 },
  { id: 6, name: "Tai nghe Sony", price: 2500000 }
];

interface SelectedProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const EnterOrder = () => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu từ khóa tìm kiếm

  // Cập nhật số lượng trong danh sách sản phẩm
  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(quantity, 1) // Đảm bảo số lượng không nhỏ hơn 1
    }));
  };

  // Thêm sản phẩm vào danh sách đã chọn
  const handleAddProduct = (product: {
    id: number;
    name: string;
    price: number;
  }) => {
    const quantity = quantities[product.id] || 1; // Nếu không nhập số lượng, mặc định là 1
    setSelectedProducts((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        // Nếu sản phẩm đã có, tăng số lượng thêm
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Nếu sản phẩm chưa có, thêm mới
      return [...prev, { ...product, quantity }];
    });
    // Reset số lượng sau khi thêm
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  // Xóa sản phẩm khỏi danh sách đã chọn
  const handleRemoveProduct = (id: number) => {
    setSelectedProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Tính tổng tiền
  const totalPrice = selectedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = productsInStock.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return ( 
       <>
      <div className="flex flex-col gap-4 mt-4">
        {/* Danh sách sản phẩm từ kho */}
        <div className="">
          <h2 className="text-xl font-semibold mb-3 text-white">
            Danh sách sản phẩm:
          </h2>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-3 px-3 py-2 border-white/50 border rounded-xl"
          />

          <ListProductsChoose
            products={filteredProducts}
            quantities={quantities}
            onQuantityChange={handleQuantityChange}
            onAddProduct={handleAddProduct}
          />
        </div>
        {/* Danh sách sản phẩm đã chọn */}
        <div className="">
          <h2 className="text-xl font-semibold mb-3 text-white">
            Sản phẩm đã chọn:
          </h2> 
          {
            <SelectedProductsList
              selectedProducts={selectedProducts}
              onRemoveProduct={handleRemoveProduct}
            />
          }
          <div className="mt-3 text-right text-white font-bold">
            Tổng tiền: {totalPrice.toLocaleString()} đ
          </div>
        </div>
      </div>
      <div className="text-right mt-5">
        <button className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Xác nhận đơn hàng
        </button>
      </div>
       </>
   
  );
};

export default EnterOrder;
