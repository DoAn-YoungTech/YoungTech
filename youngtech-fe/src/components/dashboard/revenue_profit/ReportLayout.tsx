import Sidebar from "./Sidebar";
import FilterForm from "./FilterForm";
// import RevenueStats from "./RevenueStats";
import Chart from "./Chart";
import SummaryTable from "./SummaryTable";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
export default function ReportLayout() {
  return (
    <div className="bg-backgroundAdmin-bg min-h-screen p-6 text-white rounded-xl">
      <h1 className="text-center text-2xl font-bold mb-6">BÁO CÁO DOANH THU VÀ LỢI NHUẬN</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-4">
            <FilterForm />
            <Chart />
          </div>
          <SummaryTable />
        </div>
      </div>
      <div className="text-right mt-4">
        <ShinyRotatingBorderButton>Xuất báo cáo</ShinyRotatingBorderButton>
      </div>
    </div>
  );
}
