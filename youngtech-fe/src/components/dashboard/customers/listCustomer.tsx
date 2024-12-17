'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import View from "../Action/view";
import Update from "../Action/update";
import ReactPaginate from "react-paginate";
import { RiDeleteBin6Line } from "react-icons/ri";

type Customer = {
  id: number;
  fullName: string;
  email: string | null;
  phoneNumber: string;
  address: string;
};

const ListCustomer = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentCustomers, setCurrentCustomers] = useState<Customer[]>([]);
  const [modalCustomerId, setModalCustomerId] = useState<number | null>(null); // Customer ID for deletion
  const customersPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/viewListCustomer`);
        const data = await response.json();
        if (data.data) {
          setCustomers(data.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleViewHistory = (id: number) => {
    router.push(`/dashboard/quanly-kinhdoanh/thongtin-khachhang/${id}`);
  };

  const handleDelete = async () => {
    if (modalCustomerId === null) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers/softDelete/${modalCustomerId}`,
        { method: "PATCH" }
      );
      if (response.ok) {
        setCustomers(customers.filter((customer) => customer.id !== modalCustomerId));
        alert("Xoá thành công!");
      } else {
        alert("Xoá thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error during delete:", error);
      alert("Đã xảy ra lỗi!");
    } finally {
      setModalCustomerId(null); // Đóng modal
    }
  };

  useEffect(() => {
    const indexOfLastCustomer = (currentPage + 1) * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    setCurrentCustomers(customers.slice(indexOfFirstCustomer, indexOfLastCustomer));
  }, [currentPage, customers]);

  if (loading) {
    return <div className="text-white">Đang tải dữ liệu khách hàng...</div>;
  }

  return (
    <div className="list-customer">
      {currentCustomers.map((customer) => (
        <div
          key={customer.id}
          className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]"
        >
          <div className="content-product-header p-4 flex items-center justify-between">
            <div className="font-bold text-white/80 w-[20%]">
              <span className="text-[0.9rem]">{customer.fullName}</span>
            </div>

            <div className="font-bold text-white/80 w-[20%]">
              <span className="text-[0.9rem]">{customer.email || "N/A"}</span>
            </div>

            <div className="font-bold text-white/80 w-[15%]">
              <span className="text-[0.9rem]">{customer.phoneNumber}</span>
            </div>

            <div className="font-bold text-white/80 w-[25%]">
              <span className="text-[0.9rem]">{customer.address}</span>
            </div>

            <div
              className="font-bold text-blue-500 underline cursor-pointer w-[10%]"
              onClick={() => handleViewHistory(customer.id)}
            >
              Xem lịch sử
            </div>

            <div className="font-bold flex items-center gap-2 w-[10%]">
              <Update url={`/dashboard/quanly-kinhdoanh/thongtin-khachhang/suathongtin-khachhang/${customer.id}`} />
              <button
                className="hover:bg-orange-300 bg-black/50 rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                onClick={() => setModalCustomerId(customer.id)}
              >
                <RiDeleteBin6Line className="text-[1.1rem] text-orange-600" />

              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="pagination mt-4 flex justify-center gap-4">
        <ReactPaginate
          pageCount={Math.ceil(customers.length / customersPerPage)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="pagination-container flex gap-2"
          pageClassName="page-item"
          pageLinkClassName="page-link px-4 py-2 bg-gray-200 text-white rounded"
          activeClassName="active"
          activeLinkClassName="bg-blue-500 text-white"
          previousClassName="previous"
          previousLinkClassName="px-4 py-2 bg-gray-500 text-white rounded"
          nextClassName="next"
          nextLinkClassName="px-4 py-2 bg-gray-500 text-white rounded"
        />
      </div>

      {modalCustomerId !== null && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="mb-4 text-xl font-bold">Xác nhận xoá</h2>
            <p>Bạn có chắc chắn muốn xoá khách hàng này?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setModalCustomerId(null)}
              >
                Huỷ
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete} // Confirm delete
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCustomer;
