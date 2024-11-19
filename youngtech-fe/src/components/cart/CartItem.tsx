import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";

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

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div className={`bg-white  py-4 px-4   border-b  border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
      <div className="flex lg:hidden items-center justify-between w-full ">
      <input type="checkbox" className="mr-2 " />
      <button type="button" onClick={()=>handleEditClick()}>Sửa</button>
      </div>
      <div className="flex relative overflow-hidden items-center w-full sm:w-[30%]">
       <div className={`flex   ${!isEditing ? " sm:translate-x-[0]": " transform  duration-300 ease-in-out  translate-x-[-20%]"}`}>
       <input type="checkbox" className="mr-2 hidden sm:block" />
     
     <Image
         src={`/designImage/imageProducts/${item.imageUrl}`}
         alt={item.name}
         width={100}
         height={100}

         className="sm:w-16 sm:h-16 mr-4 rounded"
       />
     
       <div className="flex-grow">
         <div className="font-semibold text-sm sm:text-base">{item.name}</div>
         <div className="text-gray-500 text-xs sm:hidden">
           {item.price.toLocaleString()}₫ x {item.quantity}
         </div>
       </div>
       </div>
        <div className={`absolute  top-0 flex justify-center items-center right-0 w-[20%] lg:hidden ml-auto duration-300 ease-in-out transform ${!isEditing ? "translate-x-[100%] ":"translate-x-0"}  h-full bg-red-500`}>
          <button type="button"  onClick={() => onRemove(item.id)} className=" text-white">Xóa</button>
         </div>
      </div>

      {/* Giá sản phẩm */}
      <div className=" sm:w-[12%] text-left sm:text-center hidden sm:block">
        <span className=" font-semibold">{item.price.toLocaleString()}₫</span>
      </div>

     
      <div className={`" w-[12%]  flex lg:ml-0 ${!isEditing ? " w-[20%] ml-[78%]":"ml-0"} items-center justify-between sm:justify-center sm:text-center"`}>
        <button
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          className="px-2 py-1 border border-gray-300 text-sm sm:text-base"
        >
          -
        </button>
        <span className="px-2">{item.quantity}</span>
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="px-2 py-1 border border-gray-300 text-sm sm:text-base"
        >
          +
        </button>
      </div>
      
     
   

   
      <div className="w-full sm:w-[10%] text-left sm:text-center text-red-500 font-semibold hidden sm:block">
        {(item.price * item.quantity).toLocaleString()}₫
      </div>

     
      <div
        className=" hidden lg:block sm:w-[10%] lg:flex justify-center items-center text-red-500 cursor-pointer"
        onClick={() => onRemove(item.id)}
      >
        <MdDeleteOutline className="text-[25px]" />
      </div>
    </div>
  );
};

export default CartItem;
