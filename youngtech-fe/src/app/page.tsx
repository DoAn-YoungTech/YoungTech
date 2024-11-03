import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="pl-10 pr-10 pt-10 pb-10">
        <Link
          href="/admin"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Vào trang quản trị
        </Link>
      </div>
    </>
  );
}
