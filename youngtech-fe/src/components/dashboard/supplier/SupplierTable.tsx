"use client";

import { useSelector, useDispatch } from "react-redux"; // Thêm useSelector, useDispatch
import { Table } from "@/components/ui/table"; // Kiểm tra đường dẫn chính xác
import { Button } from "@/components/ui/button"; // Kiểm tra đường dẫn chính xác
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Supplier } from "@/types/SupplierTypes";
import { RootState, AppDispatch } from "@/redux/Store"; // Import RootState và AppDispatch
import { fetchSuppliers } from "@/redux/Supplier/supplierThunks"; // Giả sử bạn có action này

interface SupplierTableProps {
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

export const SupplierTable: React.FC<SupplierTableProps> = ({ onEdit, onDelete }) => {
  // Lấy danh sách nhà cung cấp từ Redux store
  const dispatch = useDispatch<AppDispatch>(); // Khởi tạo dispatch
  const { suppliers, loading } = useSelector((state: RootState) => state.suppliers); // Lấy dữ liệu từ store

  // Fetch danh sách nhà cung cấp khi component mount
  useEffect(() => {
    dispatch(fetchSuppliers()); // Giả sử bạn có action này để lấy dữ liệu từ BE
  }, [dispatch]);

  return (
    <Table>
      <thead className="text-left">
        <tr>
          <th className="py-5">ID</th>
          <th className="py-5">Tên Nhà Cung Cấp</th>
          <th className="py-5">Liên Hệ</th>
          <th className="py-5">Số Điện Thoại</th>
          <th className="py-5">Email</th>
          <th className="py-5">Địa Chỉ</th>
          <th className="py-5">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        {/* Kiểm tra và render danh sách nhà cung cấp */}
        {loading ? (
          <tr>
            <td colSpan={7} className="text-center py-5">Đang tải...</td>
          </tr>
        ) : Array.isArray(suppliers) && suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.supplierName}</td>
              <td>{supplier.contactName}</td>
              <td>{supplier.phoneNumber}</td>
              <td>{supplier.email}</td>
              <td>{supplier.address}</td>
              <td className="gap-2 flex">
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => onEdit(supplier)}
                >
                  <FaEdit />
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => onDelete(supplier.id)}
                >
                  <MdDeleteOutline />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className="text-center py-5">
              Không có nhà cung cấp nào.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default SupplierTable;
