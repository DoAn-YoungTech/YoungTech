'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/Store';
import { fetchCategoriesParent } from '@/redux/Category/categoryParentThunks';
import { Category_Paren } from '@/types/CategoryTypes';

const ListParentCategory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categoriesState = useSelector((state: RootState) => state.categories);

  // Kiểm tra trường hợp categoriesState chưa được khởi tạo
  const { data: categories, loading, error } = categoriesState || { data: [], loading: false, error: null };

  useEffect(() => {
    dispatch(fetchCategoriesParent()); // Fetch danh mục cha khi component mount
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
      dispatch(deleteCategory(id)); // Gọi action xóa category
    }
  };

  if (loading) return <p>Đang tải danh sách danh mục...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      <h1>Danh sách danh mục cha</h1>
      <ul>
        {categories.map((category: Category_Paren) => (
          <li key={category.id} className="flex items-center space-x-4">
            <span>{category.name}</span>
            <button
              className="text-blue-500"
              onClick={() => {
                // Chức năng chỉnh sửa có thể được thêm vào đây
                alert(`Chỉnh sửa danh mục: ${category.name}`);
              }}
            >
              Sửa
            </button>
            <button
              className="text-red-500"
              onClick={() => handleDelete(category.id)}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListParentCategory;
