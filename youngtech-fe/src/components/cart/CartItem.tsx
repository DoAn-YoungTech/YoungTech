import { MdDeleteOutline } from "react-icons/md";
import Image from 'next/image';

type CartItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    quantity: number;
    shopName: string;
    imageUrl: string;
  };
  onQuantityChange: (itemId: number, quantity: number) => void;
  onRemove: (itemId: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
  <>
    <div className="flex bg-white py-5 px-5 items-center justify-between  border-b border-gray-300">
    <div className=' flex w-[30%]'>
    <input type="checkbox" className="mr-2" />
    <Image
  src={`/designImage/imageProducts/${item.imageUrl}`}
  alt={item.name}
  width={80} // hoặc 16 nếu muốn px nhỏ hơn
  height={100}
  className="w-16 h-16 mr-4 rounded"
/>

      <div className="flex-grow">
        <div>{item.name}</div>
      </div>
    </div>
      <div className="w-[10%] text-center">
       
        <span className=" font-semibold">{item.price.toLocaleString()}₫</span>
      </div>
      <div className="w-[10%] text-center">
        <button
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          className="px-2 py-1 border border-gray-300"
        >
          -
        </button>
        <span className="px-2">{item.quantity}</span>
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="px-2 py-1 border border-gray-300"
        >
          +
        </button>
      </div>
      <div className="w-[10%] text-center text-red-500 font-semibold">
        {(item.price * item.quantity).toLocaleString()}₫
      </div>
      <div className="w-[10%] ps-9 font-bold text-[25px] text-center text-red-500 cursor-pointer" onClick={() => onRemove(item.id)}>
      <MdDeleteOutline />
      </div>
    </div>
    
  </>
    
  );
};

export default CartItem;
