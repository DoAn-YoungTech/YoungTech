"use client"
import  {useState}  from 'react';
import CartHeader from './cart/CartHeader';
import CartItem from './cart/CartItem';
import CartSummary from './cart/CartSummary';
import Breadcrumb from './Breadcrumb/Breadcrumb';

type CartItemType = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  shopName: string;
  imageUrl: string;
};

const listCart = [
    {
        id: 1,
        name: 'Tai Nghe Gaming',
        price: 15900,
        originalPrice: 29900,
        quantity: 1,
        shopName: 'Unico_official_shop',
        imageUrl: 'dh-ap1.jpg',
      },
      {
        id: 2,
        name: 'Tai Nghe Gaming',
        price: 15900,
        originalPrice: 29900,
        quantity: 1,
        shopName: 'Unico_official_shop',
        imageUrl: 'dh-ap1.jpg',
      },
]

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(listCart);

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
   
    <div className="w-full  mb-[100px]">
         <Breadcrumb name="Cart"/>
        <div className="lg:w-[90%] w-full m-auto">
        <CartHeader />
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
          />
        ))}
        <CartSummary totalAmount={totalAmount} itemCount={cartItems.length} />
  
        </div>
           </div>
  
  );
};

export default CartPage;
