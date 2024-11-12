import slugify from "../slugify/Slugify";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import "../HotPromotion.css";
import { IoIosStar } from "react-icons/io";
import { LuHeart } from "react-icons/lu";
import MemoryGb from "../memoryGb/MemoryGb";
export const ItemProduct = ({item}) => {
    const router = useRouter();
    const handlClickDetailsPro = (id:number,name:string,name_category_child:string,name_category_parent:string)=>{
      const slugName = slugify(name);
      const slugNameParen = slugify(name_category_parent);
      const slugNameChil = slugify(name_category_child);
      router.push(`/${slugNameParen}/${slugNameChil}/${slugName}?id=${id}`);
    }
  return (
   
      <div onClick={()=> handlClickDetailsPro(item.id,item.product_name,item.name_category_child,item.name_category_parent)}  key={item.id} className='flex relative group flex-col my-3 hover:shadow-lg border px-3 rounded-lg py-3'>
        <p className='mb-5 overflow-hidden text-[11px] w-[70px] flex justify-center bg-slate-200'>Trả góp 0%</p>
        <div className="image h-[200px]">
          <Image
            src={`/designImage/imageProducts/${item.product_image}`}
            alt={item.product_name}
            className='transform transition-transform duration-500 ease-in-out group-hover:-translate-y-4'
            width={200}
            height={250}
          />
        </div>
        <h3 className='pt-5 font-semibold transition-colors duration-500 group-hover:text-blue-600 w-full'>
          {item.product_name}
        </h3>
        <div className='print-screen pt-1 w-full flex items-center gap-2'>
          <span className='text-[12px] bg-slate-200 px-2 rounded-lg'>6.9</span>
          <span className='text-[12px] bg-slate-200 px-2 rounded-lg'>Super Retina XDR</span>
        </div>
        <MemoryGb />
        <strong className='price w-full text-[16px] text-red-600'>{item.product_price}₫</strong>
        <div className='star flex items-center py-1 text-slate-500'>
          <IoIosStar className="text-yellow-400" />
          <span className=''>{item.rating}</span> ({item.reviewCount})
        </div>
        <div data-tooltip={`-10%`} className="mt-3 button">
          <div className="button-wrapper">
            <div className="text text-[.9rem]">Mua ngay</div>
            <span className="icon">
              <svg
                viewBox="0 0 16 16"
                className="bi bi-cart2"
                fill="currentColor"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
              </svg>
            </span>
          </div>
        </div>
        <LuHeart className="text-[1.6rem] text-gray-500 absolute top-1 hover:text-red-600 cursor-pointer right-1" />
      </div>
    
  )
}