import ReportLayout from "@/components/dashboard/revenue_profit/ReportLayout";
const page = () => {
  return (
    <>
      <div className="">
        <header className="mb-5">
          <h2 className="text-white/90 font-bold text-[1.2rem]">
            Doanh thu và lợi nhuận
          </h2>
        </header>
        <div className="">
          <ReportLayout />
        </div>
      </div>
    </>
  );
};

export default page;
