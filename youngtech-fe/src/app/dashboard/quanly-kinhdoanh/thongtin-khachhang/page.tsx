import React from "react";

import PaginationBtn from "@/components/dashboard/Pagination/Pagination";
import CustomerLayout from "@/components/dashboard/customers/CustomerLayout";
import ColCustomer from "@/components/dashboard/customers/ColCustomer";
import HeaderTable from "@/components/dashboard/customers/Header_table";
import ListCustomer from "@/components/dashboard/customers/listCustomer";
interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
  status: string;
  purchaseHistory: string;
}
const Page = () => {
  const customers: Customer[] = [
    {
      id: 1,
      name: "Trần Văn Ý",
      email: "travnavypd09202@gmail.com",
      phoneNumber: "92783273",
      shippingAddress: "Câu nhi - Điện An - Điện Bàn - Quảng Nam",
      status: "Completed" as "Completed",
      purchaseHistory: "2 ngày trước"
    },
    {
      id: 2,
      name: "Nôm",
      email: "Nom@gmail.com",
      phoneNumber: "92783273",
      shippingAddress: "Quang Bình ",
      status: "Pending" as "Pending",
      purchaseHistory: "1 ngày trước"
    },
    {
      id: 3,
      name: "han Han",
      email: "Hanhan@gmail.com",
      phoneNumber: "92783273",
      shippingAddress: "Câu nhi - Điện An - Điện Bàn - Quảng Nam",
      status: "Cancel" as "Cancel",
      purchaseHistory: "1 ngày trước"
    },
    {
      id: 4,
      name: "Thanh",
      email: "Thanh@gmail.com",
      phoneNumber: "92783273",
      shippingAddress: "Câu nhi - Điện An - Điện Bàn - Quảng Nam",
      status: "Completed" as "Completed",
      purchaseHistory: "1 ngày trước"
    },
    {
      id: 5,
      name: "Giang",
      email: "giang@gmail.com",
      phoneNumber: "92783273",
      shippingAddress: "Câu nhi - Điện An - Điện Bàn - Quảng Nam",
      status: "Cancel" as "Cancel",
      purchaseHistory: "1 ngày trước"
    },
    {
      id: 6,
      name: "Quan",
      email: "Quan@gmail.com",
      phoneNumber: "92783273",
      shippingAddress: "Câu nhi - Điện An - Điện Bàn - Quảng Nam",
      status: "Cancel" as "Cancel",
      purchaseHistory: "1 ngày trước"
    }
  ];

  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH TÀI KHOẢN KHÁCH HÀNG
        </h2>
      </header>
      <main> 
        <CustomerLayout>
          <HeaderTable />
          <ColCustomer />
          <div className="list-customer">
            {customers.map((customer, index) => (
              <ListCustomer key={index} customer={customer} />
            ))}
          </div>
        </CustomerLayout>
      </main>
      <PaginationBtn />
    </div>
  );
};

export default Page;
