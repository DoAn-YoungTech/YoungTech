'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers } from '@/redux/Supplier/supplierThunks';
import { RootState, AppDispatch } from '@/redux/Store';
import { Supplier } from '@/types/SupplierTypes';

const SupplierList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: suppliers, loading, error } = useSelector((state: RootState) => state.supplier);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  // Đảm bảo suppliers luôn là mảng rỗng nếu không có dữ liệu
  const safeSuppliers = Array.isArray(suppliers) ? suppliers : [];

  // Hiển thị trạng thái tải và lỗi
  if (loading) return <p>Đang tải danh sách nhà cung cấp...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      <h1>Danh sách nhà cung cấp</h1>
      <ul>
        {safeSuppliers.map((supplier: Supplier) => (
          <li key={supplier.id} className="flex items-center space-x-4">
            <h2>{supplier.supplierName}</h2>
            <p>{supplier.contactName}</p>
            <p>{supplier.phoneNumber}</p>
            <p>{supplier.email}</p>
            <p>{supplier.address}</p>
            <button className="text-blue-500">Sửa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;
