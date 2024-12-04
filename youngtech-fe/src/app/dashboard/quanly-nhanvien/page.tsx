import React from "react";

import PaginationBtn from "@/components/dashboard/Pagination/Pagination"; 
import LayoutListEmployee from "@/components/dashboard/employee/LayoutListEmployee";
import ColEmployee from "@/components/dashboard/employee/ColEmployee";
import HeaderTable from "@/components/dashboard/employee/Header_table";
import ListEmployee from "@/components/dashboard/employee/ListEmployee";
interface Employee {
  id: number;
  code: string; 
  fullName: string;
  email: string;
  phoneNumber: string;
  position : string;
}
const Page = () => {
  const employees: Employee[] = [
    {
      id: 1,
      code: "8734873",
      fullName: "Tran Van Y",
      email: "tranvany@gmail.com",
      phoneNumber: "092376823",
      position : 'Management Customers'
    },
    {
      id: 2,
      code: "8734873",
      fullName: "Tran Van Y",
      email: "tranvany@gmail.com",
      phoneNumber: "092376823",
      position : 'Management Customers'
    },
    {
      id: 3,
      code: "8734873",
      fullName: "Tran Van Y",
      email: "tranvany@gmail.com",
      phoneNumber: "092376823",
      position : 'Management Customers'
    },
    {
      id: 4,
      code: "8734873",
      fullName: "Tran Van Y",
      email: "tranvany@gmail.com",
      phoneNumber: "092376823",
      position : 'Management Customers'
    },
    {
      id: 5,
      code: "8734873",
      fullName: "Tran Van Y",
      email: "tranvany@gmail.com",
      phoneNumber: "092376823",
      position : 'Management Customers'
    },
    {
      id: 6,
      code: "8734873",
      fullName: "Tran Van Y",
      email: "tranvany@gmail.com",
      phoneNumber: "092376823",
      position : 'Management Customers'
    },
  
  ];

  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH NHÂN VIÊN
        </h2>
      </header>
      <main>
        <LayoutListEmployee>
          <HeaderTable />
          <ColEmployee />
          <div className="list-customer">
            {employees.map((employee, index) => (
              <ListEmployee key={index} employee={employee} />
            ))}
          </div>
        </LayoutListEmployee>
      </main>
      <PaginationBtn />
    </div>
  );
};

export default Page;
