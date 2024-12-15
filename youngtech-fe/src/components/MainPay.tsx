"use client"
import OrderInfoUser from "@/components/pay/OrderInfoUser";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PayCart from "@/components/pay/PayCart";
import FormAccount from "@/components/pay/FormAccount";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCustomersById } from "@/redux/Customers/customerThunks";
import { useSearchParams } from 'next/navigation';
const MainPay = () => {
  const dispatch = useDispatch();
    const { customers } = useSelector((state) => state.customers);
     const [isOpen, setIsOpen] = useState(false); 
    const [userInfo, setUserInfo] = useState({
      fullName: "",
      phoneNumber: "",
      address: "",
    });
    const searchParams = useSearchParams();
    const orderDetailParam = searchParams.get('orderDetail');
  
    // Giải mã danh sách sản phẩm từ URL
    const CartProduct = orderDetailParam ? JSON.parse(decodeURIComponent(orderDetailParam)) : [];
    const totalOrder =  CartProduct.reduce(
      (total, item) => total + Number(item.unitPrice * item.quantity ),
      0
    );


    const handleClose = () => {
      setIsOpen(false);
    };
    const handleOpen = () => {
      setIsOpen(true);
    };
    useEffect(() => {
      dispatch(fetchCustomersById());
    }, [dispatch]);

    useEffect(() => {
      if (customers?.customers && customers?.customers.fullName !=="" && customers?.customers.phoneNumber !==""  ) {
        setUserInfo({
          fullName: customers.customers.fullName || "",
          phoneNumber: customers.customers.phoneNumber || "",
          address: customers.customers.address || "",
        });
      }else{
        setIsOpen(true)
      }
    }, [customers]);
 
  return (
   <div className="w-full mb-10 flex flex-col justify-center items-center">
    <Breadcrumb name={"Thanh toán"}/>
    <FormAccount isOpen={isOpen} handleClose={handleClose}/>
    <section  className="pay w-[95%]">
      <div className="flex gap-5 justify-between">
      <OrderInfoUser userInfo={userInfo}/>
        <PayCart userInfo={userInfo}  handleOpen={handleOpen} totalOrder={totalOrder} CartProduct={CartProduct}/>
      </div>
    </section>
   </div>
  );
};

export default MainPay;
