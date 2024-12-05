 
export default function Sidebar() {
    return (
      <div className="space-y-4 bg-black/40 rounded-xl p-4">
        <button className="w-full border border-white/30  py-2 bg-transparent  rounded-xl">Lọc theo thời gian</button>
        <button className="w-full border border-white/30  py-2 bg-transparent  rounded-xl">Tổng doanh thu</button>
        <button className="w-full border border-white/30  py-2 bg-transparent  rounded-xl">Tổng chi phí</button>
        <button className="w-full border border-white/30  py-2 bg-transparent  rounded-xl">Tổng lợi nhuận</button>
      </div>
    );
  }
  