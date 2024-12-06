"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

function DatePicker({ label, date, setDate }: { label: string; date: Date | undefined; setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) {
  return (
    <div className="mb-4">
      <label className="block text-dark mb-2">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
        <Button
  variant="outline"
  className="w-full justify-start text-left font-normal bg-black-200" // Thêm màu nền tại đây
>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Chọn ngày"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function FilterForm() {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  const handleApply = () => {
    console.log("Từ ngày:", startDate);
    console.log("Đến ngày:", endDate);
    // Xử lý logic áp dụng bộ lọc tại đây
  };

  return (
    <div className="p-4 bg-black/40 rounded-md">
      <h2 className="text-lg font-bold mb-4 text-white ">Lọc theo thời gian</h2>
      <form>
        <DatePicker label="Từ ngày:" date={startDate} setDate={setStartDate} />
        <DatePicker label="Đến ngày:" date={endDate} setDate={setEndDate} />
        <ShinyRotatingBorderButton onClick={handleApply}>
          Áp dụng
        </ShinyRotatingBorderButton>
      </form>
    </div>
  );
}
