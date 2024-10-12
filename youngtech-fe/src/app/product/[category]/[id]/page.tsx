import AppItemProduct from "@/components/product/itemProduct";

export default function ProductDetail({ params }) {
    const { category, id } = params;
  
    return (
      <>
     <AppItemProduct namehh={category} id={id} />
      </>
    );
  }
  