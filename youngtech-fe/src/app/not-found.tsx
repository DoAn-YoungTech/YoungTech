import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-800">Không tìm thấy trang</h2>
      <p className="mt-2 text-gray-600">Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      <Link
        href="/admin"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Quay lại trang quản trị
      </Link>
    </div>
  );
}
