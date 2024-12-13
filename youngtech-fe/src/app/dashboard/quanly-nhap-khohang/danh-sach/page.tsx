// 'use client';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// interface Product {
//   productName: string;
//   productPrice: number;
//   quantity: number;
//   supplier_id: string;
//   childCategory_id: string;
//   description: string;
//   brand: string;
// }

// export default function ProductListPage() {
//   const router = useRouter();
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const queryProducts = router.query.products;
//     if (queryProducts) {
//       setProducts(JSON.parse(queryProducts as string));
//     }
//   }, [router.query.products]);

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <h1 className="text-3xl font-bold mb-6">Danh Sách Sản Phẩm Đã Nhập</h1>
//       {products.length === 0 ? (
//         <p className="text-gray-500">Không có sản phẩm nào.</p>
//       ) : (
//         <table className="w-full bg-white shadow-md rounded border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-4 border-b">Tên hàng</th>
//               <th className="p-4 border-b">Mô tả</th>
//               <th className="p-4 border-b">Thương hiệu</th>
//               <th className="p-4 border-b">Giá</th>
//               <th className="p-4 border-b">Số lượng</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product, index) => (
//               <tr key={index}>
//                 <td className="p-4 border-b">{product.productName}</td>
//                 <td className="p-4 border-b">{product.description}</td>
//                 <td className="p-4 border-b">{product.brand}</td>
//                 <td className="p-4 border-b">{product.productPrice}</td>
//                 <td className="p-4 border-b">{product.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import ListProduct from "@/components/dashboard/quanly-nhap-kho-hang/productList"

const page = () => {
  return (
     <ListProduct />
  )
}

export default page
