// app/[category]/page.js
import NotFound from '@/app/notPound';
import MainProduct from '@/components/MainProduct';
import React from 'react';

const validCategories = ['dienthoai', 'laptop', 'tablet']; 

const CategoryPage = ({ params }) => {
  const { category } = params;

  if (!validCategories.includes(category)) {
    
    return (
      <NotFound/>
    );
  }

  return (
   <MainProduct/>
  );
};

export default CategoryPage;

// Lưu ý: params được truyền vào từ Next.js, bạn không cần phải định nghĩa nó trong props
