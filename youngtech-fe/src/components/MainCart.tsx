"use client"
import  {useEffect, useState}  from 'react';
import CartHeader from './cart/CartHeader';
import CartItem from './cart/CartItem';
import CartSummary from './cart/CartSummary';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import { useDispatch, useSelector} from 'react-redux';
import { fetchCartItems } from '@/redux/Cart/cartThunks';
import EmptyCart from './cart/EmptyCart/EmptyCart';
import Loadingcss from './loadingcss/Loadingcss';
type CartItemType = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  shopName: string;
  imageUrl: string;
};


const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const {cartItems,loading} = useSelector(state=>state.cart);
  
  useEffect(()=>{
    dispatch(fetchCartItems())
  },[dispatch])
  
  
  if(loading){
    return (
      <Loadingcss/>
    )
  }

 

  return (

   
    <div className="w-full  mb-[100px]">
         <Breadcrumb name="Cart"/>
        <div className="lg:w-[90%] w-full m-auto">
        <CartHeader />
        {cartItems?.length > 0 ? cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
          />
        )) 
        : <EmptyCart/> }
  
        {cartItems?.length > 0  ?  <CartSummary dataCart={cartItems} /> : ""}
       

        </div>
           </div>
  
  );
};

export default CartPage;
