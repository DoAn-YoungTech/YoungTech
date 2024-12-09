import React from "react";

import PaginationBtn from "@/components/dashboard/Pagination/Pagination";
import LayoutListOrderPending from "@/components/dashboard/PendingOrders/LayoutListOrderPending";
import ColPendingOrder from "@/components/dashboard/PendingOrders/ColPendingOrder";
import HeaderTable from "@/components/dashboard/PendingOrders/Header_table";
import ListOrderPending from "@/components/dashboard/PendingOrders/ListOrderPending";
interface Order {
  id: number;
  fullName: string;
  code: string;
  date: string;
}
const Page = () => {
  const listOderPending: Order[] = [
    {
      id: 1,
      fullName: "trần văn ý",
      code: "94739473",
      date: "2022-01-01"
    },
    {
      id: 2,
      fullName: "trần văn ý",
      code: "94739473",
      date: "2022-01-01"
    },
    {
      id: 3,
      fullName: "trần văn ý",
      code: "94739473",
      date: "2022-01-01"
    },
    {
      id: 4,
      fullName: "trần văn ý",
      code: "94739473",
      date: "2022-01-01"
    },
    {
      id: 5,
      fullName: "trần văn ý",
      code: "94739473",
      date: "2022-01-01"
    },
    {
      id: 6,
      fullName: "trần văn ý",
      code: "94739473",
      date: "2022-01-01"
    }
  ];

  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH ĐƠN HÀNG CHƯA SỬ LÝ
        </h2>
      </header>
      <main>
        <LayoutListOrderPending>
          <HeaderTable />
          <ColPendingOrder />
          <div className="list-customer">
            {listOderPending.map((orderPending, index) => (
              <ListOrderPending key={index} orderPending={orderPending} />
            ))}
          </div>
        </LayoutListOrderPending>
      </main>
      <PaginationBtn />
    </div>
  );
};

export default Page;
