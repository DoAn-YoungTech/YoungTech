<<<<<<< HEAD
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
=======
import Image from "next/image";
import Header from "./admin/header";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <h1>hello word </h1>
    </div>
>>>>>>> 1022410 (test)
  );
}
