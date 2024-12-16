import slugify from "../slugify/Slugify";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import "../HotPromotion.css";
import { IoIosStar } from "react-icons/io";
import { LuHeart } from "react-icons/lu";
import { useDispatch,useSelector } from "react-redux";
import { RootState,AppDispatch } from "@/redux/Store";
import MemoryGb from "../memoryGb/MemoryGb";
import { fetchNameParentCategoriesByChildId } from "@/redux/Category/categoryChildThunks";

export const ItemProduct = ({item}) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {parentName,childName} = useSelector((state:RootState) => state.categories_child.nameCategory);
      const handlClickDetailsPro =  async (id:number,name:string,childCategory_id:number)=>{
        await  dispatch(fetchNameParentCategoriesByChildId(childCategory_id))
        if(parentName && childName && name){
          const nameProduct = slugify(name);
          const parentCategoryName = slugify(parentName);
          const childCategoryName = slugify(childName);
          router.push(`/${parentCategoryName}/${childCategoryName}/${nameProduct}/?id=${id}`);
        }
      
      }
      const formattedPrice = new Intl.NumberFormat('de-DE').format(item.productRetailPrice);
   
}