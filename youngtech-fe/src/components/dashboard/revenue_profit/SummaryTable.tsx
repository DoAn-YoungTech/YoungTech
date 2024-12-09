'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SummaryTable() {
  return (
    <div className="mt-4 p-4 bg-black/40 rounded-md">
      <h2 className="text-lg font-bold mb-2">Bảng chi tiết doanh thu và lợi nhuận bán đồ điện tử</h2>
      
      <div className="border border-white/20 rounded-md overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Sản phẩm</TableHead>
              <TableHead className="w-[100px] text-center">Số lượng bán</TableHead>
              <TableHead className="w-[150px] text-right">Doanh thu</TableHead>
              <TableHead className="w-[150px] text-right">Lợi nhuận</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Điện thoại iPhone 14</TableCell>
              <TableCell className="text-center">120</TableCell>
              <TableCell className="text-right">120,000</TableCell>
              <TableCell className="text-right">30,000</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Laptop Dell XPS 15</TableCell>
              <TableCell className="text-center">50</TableCell>
              <TableCell className="text-right">75,000</TableCell>
              <TableCell className="text-right">15,000</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Máy tính bảng iPad Pro 12.9</TableCell>
              <TableCell className="text-center">30</TableCell>
              <TableCell className="text-right">36,000</TableCell>
              <TableCell className="text-right">9,000</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="font-medium">Tivi Samsung 55 inch</TableCell>
              <TableCell className="text-center">20</TableCell>
              <TableCell className="text-right">24,000</TableCell>
              <TableCell className="text-right">6,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
