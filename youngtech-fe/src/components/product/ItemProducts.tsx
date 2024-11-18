

import { Product } from "@/types/productTypes";
import { ItemProduct } from "./ItemProduct";

interface ItemProductProps {
  DataProducts: Product[]; 
}
export const ItemProducts: React.FC<ItemProductProps> = ({DataProducts,loading}) => {
 
  return (

  <>
   <div className="px-5 z-0  grid justify-center items-center grid-cols-2 lg:grid-cols-5 gap-2">
    {DataProducts.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : DataProducts.length === 1 ? (
        <ItemProduct item={DataProducts[0]} />
      ) : (
        DataProducts.map((item) => (
          <ItemProduct key={item.id} item={item} />
        ))
      )}
 </div>
  </>
  );
};
