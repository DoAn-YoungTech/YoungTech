// app/products/[category]/[subcategory]/page.js

export default function ProductDetail({ params }) {
    const { category, subcategory } = params;
  
    return (
      <div>
        <h1>Danh mục: {category}</h1>
        <h2>Chi tiết sản phẩm: {subcategory}</h2>
      </div>
    );
  }
  