'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ParentCategoryTable from "./TableParentCategory";
import { Category_Paren } from '@/types/CategoryTypes'; // Đảm bảo đã định nghĩa Category_Paren
import axios from 'axios';

const ParentCategoryActions = () => {
  const [categories, setCategories] = useState<Category_Paren[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Thêm state loading để xử lý trạng thái tải

  // Tải danh sách danh mục cha từ backend khi component được mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      } finally {
        setLoading(false); // Đảm bảo set loading là false khi đã xong
      }
    };
    fetchCategories();
  }, []); // Chạy 1 lần khi component được mount

  return (
    <div>
      <Button className="bg-orange-600" onClick={() => { /* không có hành động */ }}>
        Thêm Danh Mục
      </Button>

      {/* Hiển thị loading nếu đang tải */}
      {loading ? (
        <div>Đang tải danh mục...</div>
      ) : (
        <ParentCategoryTable
          categories={categories} // Truyền danh mục từ backend vào table
        />
      )}
    </div>
  );
};

export default ParentCategoryActions;
