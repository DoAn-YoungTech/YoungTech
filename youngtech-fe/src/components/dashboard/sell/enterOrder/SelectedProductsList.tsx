import React from "react";
 
interface SelectedProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
}
interface SelectedProductsListProps  {
    selectedProducts: SelectedProduct[];
    onRemoveProduct: (id: number) => void;
}
const SelectedProductsList :  React.FC<SelectedProductsListProps> = ({  
    selectedProducts,
    onRemoveProduct,
}) => { 
  return (
    <div> 
       {selectedProducts.map((product) => (
        <div className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
        <div className="content-product-header p-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
              {product.id}
            </div>
            <div className="font-bold  text-white/80 w-[calc(100%-70%)]">
              <span className=" text-[0.8rem]">{product.name}</span>
            </div>
            <div className="font-bold mr-1 text-white/80 w-[calc(100%-85%)]">
            <span className=" text-[0.8rem]">{product.quantity}</span>
            </div>
            <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
              <span className=" text-[0.8rem]">{product.price.toLocaleString()}</span>
            </div>
  
            <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
              <span className=" text-[0.8rem]">
                { product.quantity * product.price   }
              </span>
            </div>
            <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
              <button onClick={() => onRemoveProduct(product.id)} className=" text-[0.8rem] bg-red-300 text-red-500 p-2 rounded-xl">
                 Xóa
              </button>
            </div>
          </div>
        </div>
           </div>
       ))}
    </div>
  );
};

export default SelectedProductsList;
