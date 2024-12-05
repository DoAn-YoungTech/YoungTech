import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
export default function FilterForm() {
    return (
      <div className="p-4 bg-black/40 rounded-md">
        <h2 className="text-lg font-bold mb-2">Lọc theo thời gian</h2>
        <form>
          <label className="block mb-2">
            Từ ngày:
            <input
              type="date"
              className="w-full border border-white/20 outline-none  mt-1 p-2 bg-transparent  text-white rounded-md"
            />
          </label>
          <label className="block mb-2">
            Đến ngày:
            <input
              type="date"
              className="w-full border border-white/20 outline-none  mt-1 p-2 bg-transparent  text-white rounded-md"
            />
          </label>
           <ShinyRotatingBorderButton>Áp dụng</ShinyRotatingBorderButton>
        </form>
      </div>
    );
  }
  