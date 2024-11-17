// src/app/page.tsx hoặc file tương tự
'use client'; // Đảm bảo bạn đang sử dụng Client Component

import { Provider } from "react-redux"; // Nhập Provider từ react-redux
import { store } from "@/store"; // Đường dẫn đến file store của bạn
import ParentCategoryPage from "@/components/admin/parentCategories/parentCategories"; 

export default function Home() {
  return (
    <Provider store={store}> {/* Bọc ParentCategoryPage với Provider */}
      <div>
        <ParentCategoryPage />
      </div>
    </Provider>
  );
}
