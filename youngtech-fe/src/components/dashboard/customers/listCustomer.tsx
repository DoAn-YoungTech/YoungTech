'use client';
import React, { useEffect, useState } from "react";
import View from "../Action/view";
import Update from "../Action/update";
import Delete from "../Action/delete";
import ReactPaginate from "react-paginate";  // Import thư viện phân trang

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
  

  const [currentPage, setCurrentPage] = useState<number>(0);  // Trang hiện tại (index bắt đầu từ 0)
  const [currentCustomers, setCurrentCustomers] = useState<Customer[]>([]);  // Trang hiện tại (index bắt đầu từ 0)
  // const [customersPerPage] = useState<number>(5);  // Số khách hàng trên mỗi trang
  const customersPerPage = 5

  // Fetch data from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:3200/api/customers/viewListCustomer");
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
    console.log(selectedPage.selected)
    
    setCurrentPage(selectedPage.selected);
  };

  const handleViewHistory = (id: number) => {
    console.log("View history for customer ID:", id);
    // Redirect or handle history logic
  };

  useEffect(() => {
  // Xác định các khách hàng cần hiển thị cho trang hiện tại
  const indexOfLastCustomer = (currentPage + 1) * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  console.log(customers.slice(indexOfFirstCustomer, indexOfLastCustomer))
  setCurrentCustomers(customers.slice(indexOfFirstCustomer, indexOfLastCustomer))
  // const currentCustomers = ;
  }, [currentPage])

  useEffect(() => {
    // Xác định các khách hàng cần hiển thị cho trang hiện tại
    const indexOfLastCustomer = (currentPage + 1) * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    console.log(customers.slice(indexOfFirstCustomer, indexOfLastCustomer))
    setCurrentCustomers(customers.slice(indexOfFirstCustomer, indexOfLastCustomer))
    // const currentCustomers = ;
    }, [customers])



  if (loading) {
    return <div className="text-white">Đang tải dữ liệu khách hàng...</div>;
  }
  console.log('as', currentCustomers)

  return (
    <div className="list-customer">
      {currentCustomers.map((customer) => (
        <div
          key={customer.id}
          className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]"
        >
          <div className="content-product-header p-4 flex items-center justify-between">
            {/* Tên khách hàng */}
            <div className="font-bold text-white/80 w-[20%]">
              <span className="text-[0.9rem]">{customer.fullName}</span>
            </div>

            {/* Email */}
            <div className="font-bold text-white/80 w-[20%]">
              <span className="text-[0.9rem]">{customer.email || "N/A"}</span>
            </div>

            {/* Số điện thoại */}
            <div className="font-bold text-white/80 w-[15%]">
              <span className="text-[0.9rem]">{customer.phoneNumber}</span>
            </div>

            {/* Địa chỉ giao hàng */}
            <div className="font-bold text-white/80 w-[25%]">
              <span className="text-[0.9rem]">{customer.address}</span>
            </div>

            {/* Lịch sử mua hàng */}
            <div
              className="font-bold text-blue-500 underline cursor-pointer w-[10%]"
              onClick={() => handleViewHistory(customer.id)}
            >
              Xem lịch sử
            </div>

            {/* Hành động */}
            <div className="font-bold flex items-center gap-2 w-[10%]">
              <View url={`/customer/${customer.id}/view`} />
              <Update url={`/customer/${customer.id}/update`} />
              <Delete url={`/customer/${customer.id}/delete`} />
            </div>
          </div>
        </div>
      ))}
      
      {/* Pagination with react-paginate */}
      <div className="pagination mt-4 flex justify-center gap-4">
        <ReactPaginate
          pageCount={Math.ceil(customers.length / customersPerPage)}  // Tính tổng số trang
          pageRangeDisplayed={3}  // Hiển thị 3 trang xung quanh trang hiện tại
          marginPagesDisplayed={2}  // Hiển thị 2 trang đầu và cuối
          onPageChange={handlePageChange}
          containerClassName="pagination-container flex gap-2"
          pageClassName="page-item"
          pageLinkClassName="page-link px-4 py-2 bg-gray-200 text-white rounded"
          activeClassName="active"
          activeLinkClassName="bg-blue-500 text-white"
          disabledClassName="disabled"
          previousClassName="previous"
          previousLinkClassName="px-4 py-2 bg-gray-500 text-white rounded"
          nextClassName="next"
          nextLinkClassName="px-4 py-2 bg-gray-500 text-white rounded"
        />
      </div>
    </div>
  );
};

export default ListCustomer;
