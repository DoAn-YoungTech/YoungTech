import React from "react";

import PaginationBtn from "@/components/dashboard/Pagination/Pagination";
import CustomerLayout from "@/components/dashboard/suppliers/CustomerLayout";
import ColSupplier from "@/components/dashboard/suppliers/ColCustomer";
import HeaderTable from "@/components/dashboard/suppliers/Header_table";
import ListSupplier from "@/components/dashboard/suppliers/listSupplier";
interface Supplier {
  id: number;
  MNCC: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}
const Page = () => {
  const suppliers: Supplier[] = [
    {
      id: 1,
      MNCC: "8734873",
      name: "CellPhones",
      address: "Ho Chi Minh",
      phoneNumber: "092376823",
      email: "tranvany@gmail.com"
    },
    {
      id: 2,
      MNCC: "8734873",
      name: "CellPhones",
      address: "Ho Chi Minh",
      phoneNumber: "092376823",
      email: "tranvany@gmail.com"
    },
    {
      id: 3,
      MNCC: "8734873",
      name: "CellPhones",
      address: "Ho Chi Minh",
      phoneNumber: "092376823",
      email: "tranvany@gmail.com"
    },
    {
      id: 4,
      MNCC: "8734873",
      name: "CellPhones",
      address: "Ho Chi Minh",
      phoneNumber: "092376823",
      email: "tranvany@gmail.com"
    },
    {
      id: 5,
      MNCC: "8734873",
      name: "CellPhones",
      address: "Ho Chi Minh",
      phoneNumber: "092376823",
      email: "tranvany@gmail.com"
    },
    {
      id: 6,
      MNCC: "8734873",
      name: "CellPhones",
      address: "Ho Chi Minh",
      phoneNumber: "092376823",
      email: "tranvany@gmail.com"
    }
  ];
  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH NHÀ CUNG CẤP
        </h2>
      </header>
      <main>
        <CustomerLayout>
          <HeaderTable />
          <ColSupplier />
          <div className="list-customer">
            {suppliers.map((supplier, index) => (
              <ListSupplier key={index} supplier={supplier} />
            ))}
          </div>
        </CustomerLayout>
      </main>
      <PaginationBtn />
    </div>
  );
};
export default Page;
