import React from "react";

interface Category {
  id: number;        // Đảm bảo id được khai báo ở đây
  categoryName: string;
  quantity: number;
}

interface AddCategoryProps {
  onAdd: (newCategory: Category) => void; // Hàm callback để thêm danh mục mới
  onCancel: () => void; // Hàm callback để hủy
}

const AddCategory: React.FC<AddCategoryProps> = ({ onAdd, onCancel }) => {
  const [categoryName, setCategoryName] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(0);

  const handleAdd = () => {
    const newCategory: Category = {
      id: Date.now(), // Sử dụng thời gian hiện tại làm id, hoặc có thể dùng cách khác
      categoryName,
      quantity,
    };
    onAdd(newCategory);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Thêm danh mục</h2>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Tên danh mục</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Số lượng</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
            Hủy
          </button>
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
