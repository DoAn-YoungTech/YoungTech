
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OrderInfoUser from "./OrderInfoUser";
import PayCart from "./PayCart";

const Page = () => {
 
  return (
   <div className="w-full flex flex-col justify-center items-center">
    <Breadcrumb name={"Thanh toán"}/>
    <section  className="pay w-[95%]">
      <div className="flex gap-5 justify-between">
      <OrderInfoUser/>
        <PayCart/>
      </div>
    </section>
   </div>
  );
};

export default Page;
