import React from "react";

import PaginationBtn from "@/components/dashboard/Pagination/Pagination";  
import ListInvoice from "@/components/dashboard/invoice/ListInvoice";
import HeaderTable from "@/components/dashboard/invoice/Header_table";
import ColInvoice from "@/components/dashboard/invoice/ColInvoice";
import LayoutListInvoice from "@/components/dashboard/invoice/LayoutListInvoice";
interface Invoice {
  id: number;
  code: string;
  date: string;
  product: string;
  price: number; 
}
const Page = () => {
  const listInvoice: Invoice[] = [
    {
      id: 1,
      code: '8374',
      date: '12/8/2024',
      product: 'product 1',
      price: 1000000  
    },
    {
      id: 2,
      code: '8374',
      date: '12/8/2024',
      product: 'product 1',
      price: 1000000  
    },
    {
      id: 3,
      code: '8374',
      date: '12/8/2024',
      product: 'product 1',
      price: 1000000  
    },
    {
      id: 4,
      code: '8374',
      date: '12/8/2024',
      product: 'product 1',
      price: 1000000  
    },
    {
      id: 5,
      code: '8374',
      date: '12/8/2024',
      product: 'product 1',
      price: 1000000  
    },
  ];

  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH HÓA ĐƠN
        </h2>
      </header>
      <main>
        <LayoutListInvoice>
          <HeaderTable />
          <ColInvoice />
          <div className="list-customer">
            {listInvoice.map((invoice, index) => (
              <ListInvoice key={index} invoice={invoice} />
            ))}
          </div>
        </LayoutListInvoice>
      </main>
      <PaginationBtn />
    </div>
  );
};

export default Page;
