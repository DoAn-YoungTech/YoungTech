"use client";
import { useState, useEffect } from "react";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineSort } from "react-icons/md";
import { PiDotsThreeCircleLight, PiSeatFill } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaCommentsDollar } from "react-icons/fa";
import NameProduct from "../../components/InfoDetailProduct/name-product/NameProduct";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import EmptyCart from "../../components/cart/EmptyCart/EmptyCart";
const listCart = [
  {
    id: 1,
    image: "dh-ap1.jpg",
    name: "panasonic",
    stock: "20 san pham con trong kho",
    color: ["red", "blue", "green"],
    discount: 10,
    price: "10000",
    quantity: 1,
    date: "2024-6-01",
  },
  {
    id: 2,
    image: "dh-ap2.jpg",
    name: "Máy giặc Inverter",
    stock: "20 san pham con trong kho",
    color: ["red", "blue", "green"],
    discount: 10,
    price: "10000",
    quantity: 1,
    date: "2024-5-01",
  }
]

const Confirm = ({ title, content, functional, nameDelete, nameCancel }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-[500px] p-4 rounded">
          <h2 className="text-[16px] font-bold mb-2"> {title}</h2>
          <p className="mb-4 text-[14px]">{content}</p>
          <div className="flex justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={nameDelete}
            >
              {functional}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={nameCancel}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const Page = () => {
  const [cart, setCart] = useState(listCart);
  const [selectAll, setSelectAll] = useState(false);
  const [selectProduct, setSelectProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  console.log(selectAll);
  console.log(selectProduct);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectProduct(cart.map((product) => product.id));
    } else {
      setSelectProduct([]);
    }
  };

  const handleSelectProduct = (id) => {
    if (selectProduct.includes(id)) {
      setSelectProduct(selectProduct.filter((productId) => productId !== id));
    } else {
      setSelectProduct([...selectProduct, id]);
    }
  };
  const handleDeleteProduct = (id) => {
    // setCart(cart.filter((product) => product.id !== id));
    // setSelectProduct(selectProduct.filter((product) => product.id !== id));
    setConfirmDelete(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      setCart(cart.filter((product) => product.id !== deleteId));
      setSelectProduct(
        selectProduct.filter((product) => product.id !== deleteId)
      );
      setConfirmDelete(false);
      setDeleteId(null);
    }
  };
  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setDeleteId(null);
  };
  const handleDeleteAll = () => {
    setConfirmDeleteAll(true);
    // setCart([]);
    // setSelectProduct([]);
  };
  const handleConfirmDeleteAll = () => {
    setCart([]);
    setSelectProduct([]);
    setConfirmDeleteAll(false);
  };
  const handleCancelDeleteAll = () => {
    setConfirmDeleteAll(false);
  };

  const filterCart = cart.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleChangeQuantity = (id, quantity) => {
    setCart(
      cart.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const total = cart.reduce((initialValue, currentValue) => {
    return (
      initialValue +
      parseInt(currentValue.price.toLocaleString("vi-VN")) *
        parseInt(currentValue.quantity)
    );
  }, 0);

  const totalDiscount = cart.reduce((initialValue, product) => {
    return (
      initialValue +
      parseInt(product.price.toLocaleString("vi-VN")) * (product.discount / 100)
    );
  }, 0);

  const totalPayment = (total - totalDiscount).toLocaleString("vi-VN");
  const sortFilter = filterCart.sort((a, b) => {
    switch (filter) {
      case "price-increment":
        return a.price - b.price;
      case "price-decrement":
        return b.price - a.price;
      case "quantity-increment":
        return a.quantity - b.quantity;
      case "quantity-decrement":
        return b.quantity - a.quantity;
      case "date-increment":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "date-decrement":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      default:
        return 0;
    }
  });

  return (
    <>
      
      <div className="w-full flex flex-col  justify-center items-center">
       <Breadcrumb name={"Cart"}/>
      <section className="  w-[95%] p-5  bg-white " >
        <div className="navigation flex justify-between items-center">

          <div className="search group/search  cursor-pointer relative w-[400px]">
            <div className="flex items-center border rounded-2xl hover:border-pink-500 width-full border-gray-300">
              <CiSearch className="text-[1.4rem] mx-4" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="outline-none border-none capitalize text-[14px] p-2"
                placeholder="Nhap ten san pham"
              />
              <button className="rounded-2xl text-[14px] text-gray-700  p-3 bg-gray-300  ml-auto   hover:text-white hover:bg-gray-600 duration-200 transition-all">
                Search
              </button>
            </div>
          
          </div>
          <div className="sort flex items-center  bg-gray-300 rounded-xl relative py-2 px-4 group duration-200 transition-all">
            <MdOutlineSort className="mr-2 text-[1.5rem] cursor-pointer" />
            <select
              value={filter}
              onChange={handleFilter}
              className="text-[14px] text-gray-700 rounded-xl  px-2 py-2  outline-none bg-transparent  transition ease-in-out duration-150 "
            >
              <option value="" className="text-[14px] my-3 text-gray-500 ">
                Lọc sản phẩm
              </option>
              <option
                className="text-[14px] my-3 text-gray-500 "
                value="price-increment"
              >
                Giá tăng dần
              </option>
              <option
                className="text-[14px] my-3 text-gray-500 "
                value="price-decrement"
              >
                Giá giảm dần
              </option>
              <option
                className="text-[14px] my-3 text-gray-500 "
                value="quantity-increment"
              >
                Số lượng tăng dần
              </option>
              <option
                className="text-[14px] my-3 text-gray-500 "
                value="quantity-decrement"
              >
                Số lượng giảm dần
              </option>
              <option
                className="text-[14px] my-3 text-gray-500 "
                value="date-increment"
              >
                Ngày thêm gần đây
              </option>
              <option
                className="text-[14px] my-3 text-gray-500 "
                value="date-decrement"
              >
                Ngày thêm xa nhất
              </option>
            </select>
          </div>
          <div className="option bg-gray-300 rounded-xl group py-2 px-4 relative  duration-500 transition-all">
            <PiDotsThreeCircleLight className="text-[1.5rem] cursor-pointer " />
            <div className="meu absolute group-hover:visible invisible duration-200 transition-all w-[150px] bg-gray-300 top-[43px] left-0 rounded-[10px]">
              <ul className="block text-gray-900">
                <li className="my-2">
                  <Link
                    href="#"
                    className="p-2 text-[14px] cursor-pointer text-gray-500 hover:text-gray-900 font-semibold"
                  >
                    Hiện có {filterCart.length} sản phẩm
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    onClick={handleDeleteAll}
                    href="#"
                    className="p-2 text-[14px] cursor-pointer text-red-800 hover:text-red-900 font-semibold"
                  >
                    Xóa tất cả
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
        <div className="listCart mt-[20px]">
          <div className="boxRow">
            <div className="header">
              <div className="wrapList flex items-center justify-between">
                <div className="w-[30%] flex items-center item">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="mr-4"
                  />
                  <span className="text-[14px] mr-3 font-semibold">
                    Danh sách sản phẩm
                  </span>
                  <button
                    onClick={handleDeleteAll}
                    className="text-[14px] text-white  p-2 border border-gray-300 rounded-xl hover:bg-red-600 bg-red-500 hover:text-white duration-200 transition-all "
                  >
                    Xóa tất cả
                  </button>
                </div>
                <div className=" w-[15%] text-[14px] font-semibold capitalize  color_size">
                  Màu sắc
                </div>
                <div className="  w-[15%] text-[14px] font-semibold capitalize quantity">
                  Số lượng
                </div>
                <div className=" w-[15%] text-[14px] font-semibold capitalize shipping">
                Vận chuyển
                </div>
                <div className=" w-[15%] text-[14px] font-semibold capitalize price">
                  Tiền
                </div>
                <div className=" w-[10%] text-[14px] font-semibold  adjust">
                 Xóa
                </div>
              </div>
            </div>
            {filterCart.map((item) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="main mt-[30px]  border-b pb-4 border-b-gray-300"
                  >
                    <div className="wrapList flex items-start justify-between">
                      <div className="w-[30%]  flex items-start ">
                        <input
                          type="checkbox"
                          checked={selectProduct.includes(item.id)}
                          onChange={() => handleSelectProduct(item.id)}
                          className="mr-4"
                        />
                        <div className="img relative">
                          <Image
                            src={`/designImage/imageProducts/${item.image}`}
                            fill
                            alt="img"
                            className="w-[100px] absolute h-[100px] rounded-md"
                          />
                        </div>
                        <div className="info">
                          <h3 className="text-[15px] font-semibold">
                            {item.name}
                          </h3>
                          <span className="text-[13] text-gray-500 text-[13px]">
                            {item.stock}
                          </span>
                          <div className="discount text-green-600 text-[13px] flex items-center">
                            <MdOutlineLocalShipping className="mr-5" />
                            <span>{item.discount}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-[15%] text-[14px] font-semibold capitalize  color_size">
                        <div className="text-center flex items-center">
                          <span className="text-[14px] text-gray-500 mr-2">
                            Màu sắc:
                          </span>
                          <select className="text-[14px] font-semibold">
                            {item.color.map((color) => {
                              return (
                                <>
                                  <option className="text-[14px] my-3 text-gray-500 rounded-lg">
                                    {color}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="  w-[15%] text-[14px] font-semibold capitalize quantity">
                        <div className="addPro flex items-center ">
                          <button
                            onClick={() =>
                              handleChangeQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                            className="text-[1.5rem] mr-[10px] border cursor-pointer hover:bg-gray-700 hover:text-white border-gray-500  rounded-3xl text-center  w-[30px] h-[30px] flex items-center justify-center "
                          >
                            -
                          </button>
                          <span className="text-[1.3rem] mr-[10px] px-4">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleChangeQuantity(item.id, item.quantity + 1)
                            }
                            className="text-[1.5rem] mr-[10px] border cursor-pointer hover:bg-gray-700 hover:text-white border-gray-500   rounded-3xl text-center  w-[30px] h-[30px] flex items-center justify-center "
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* <div className="w-[15%] text-[14px] font-semibold capitalize shipping">
                        <div className="text-center flex items-center">
                          <span className="text-[14px] text-gray-500 mr-2">
                            Vận chuyển:
                          </span>
                          <select className="text-[14px] font-semibold">
                            <option className="text-[14px] my-3 text-gray-500 rounded-lg">
                              Delivery
                            </option>
                            <option className="text-[14px] my-3 text-gray-500 rounded-lg">
                              Pick up
                            </option>
                            <option className="text-[14px] my-3 text-gray-500 rounded-lg">
                              Online
                            </option>
                          </select>
                        </div>
                      </div> */}
                      <div className="text-center w-[15%] text-[14px] font-semibold capitalize price">
                        <div className="flex items-center">
                          <span className="text-[14px] text-gray-500 mr-2">
                            Tiền:
                          </span>
                          <span className="text-red-800 text-[14px]">
                            {(
                              parseInt(item.price) * parseInt(item.quantity)
                            ).toLocaleString("vi-VN")}
                            <sup>₫</sup>
                          </span>
                        </div>
                      </div>
                      <div className="text-center w-[10%] text-[14px] font-semibold  adjust">
                        <MdDeleteOutline
                          onClick={() => handleDeleteProduct(item.id)}
                          className="text-[25px] text-red-800 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            {cart.length === 0 ? <EmptyCart/> : ""}
           
          </div>
        </div>
        {confirmDelete && (
          <Confirm
            title="Xác nhận xóa"
            content="Bạn có chắc chắn muốn xóa sản phẩm này?"
            functional="Xoá"
            nameDelete={handleConfirmDelete}
            nameCancel={handleCancelDelete}
          />
        )}
        {confirmDeleteAll && (
          <Confirm
            title="Xác nhận xóa tất cả"
            content="Bạn có chắc chắn muốn xóa tất cả sản phẩm không?"
            functional="Xoá"
            nameDelete={handleConfirmDeleteAll}
            nameCancel={handleCancelDeleteAll}
          />
        )}
<div className="w-full py-10">
<div className="w-full  flex items-center  justify-end ">
          <div className="flex w-[35%] mb-5 justify-between items-center gap-5">
            <h3 className="text-[18px] font-semibold">Tổng tiền :</h3><span  className="text-[18px] font-semibold">{totalPayment}₫</span>
          </div>
     
        </div>
        <div className="w-full flex items-center  justify-end">
        <div className=" pt-5 flex w-[35%] justify-between items-center">
      <div className=" pay">
            <Link
              href="/pay"
              className=" bg-red-500 text-[18px] font-semibold rounded-xl py-3 px-4 text-white hover:text-white hover:bg-red-600 duration-200 transition-all"
            >
             Tiếp tục mua hàng
            </Link>
          </div>
          <div className=" tatal">
            <Link
              href="/pay"
              className="bg-slate-800 text-[18px] font-semibold rounded-xl py-3 px-4 text-white hover:text-white hover:bg-slate-900 duration-200 transition-all"
            >
             Tiến hành thanh toán
            </Link>
          </div>
         
      </div>
        </div>
</div>
      </section>
      </div>
    </>
  );
};


export default Page;