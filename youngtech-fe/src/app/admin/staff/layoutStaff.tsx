import StaffHeader from "@/components/staff/header";
import StaffFooter from "@/components/staff/footer";


const StaffLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <StaffHeader />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <StaffFooter />
    </div>
  );
};

export default StaffLayout;