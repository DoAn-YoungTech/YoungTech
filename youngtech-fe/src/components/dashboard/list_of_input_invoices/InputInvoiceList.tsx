'use client';
import React, { useState } from "react";
import PopupViewPDF from "./PopupViewPDF";

interface Product {
  id: number;
  productName: string;
  date: string;
  supplier: string;
  price: number;
  quantity: number;
  total: number;
}

interface InputInvoice {
  id: string;
  invoiceDate: string;
  employeeCode: string;
  totalAmount: number;
  products: Product[];
}

const InputInvoiceList: React.FC = () => {
  const [invoices] = useState<InputInvoice[]>([
    {
      id: "MHD01",
      invoiceDate: "2024-12-01",
      employeeCode: "ANV01",
      totalAmount: 30000000,
      products: [
        {
          id: 1,
          productName: "Laptop Dell Inspiron",
          date: "2024-12-01",
          supplier: "Nhà cung cấp ABC",
          price: 15000000,
          quantity: 2,
          total: 30000000,
        },
      ],
    },
    {
      id: "MHD02",
      invoiceDate: "2024-12-02",
      employeeCode: "ANV02",
      totalAmount: 4000000,
      products: [
        {
          id: 1,
          productName: "Chuột Logitech MX Master 3",
          date: "2024-12-02",
          supplier: "Nhà cung cấp XYZ",
          price: 2000000,
          quantity: 2,
          total: 4000000,
        },
      ],
    },
    {
      id: "MHD03",
      invoiceDate: "2024-12-03",
      employeeCode: "ANV03",
      totalAmount: 7500000,
      products: [
        {
          id: 1,
          productName: "Bàn phím cơ Keychron K8",
          date: "2024-12-03",
          supplier: "Nhà cung cấp DEF",
          price: 2500000,
          quantity: 2,
          total: 5000000,
        },
        {
          id: 2,
          productName: "Tai nghe Sony WH-1000XM4",
          date: "2024-12-03",
          supplier: "Nhà cung cấp DEF",
          price: 2500000,
          quantity: 1,
          total: 2500000,
        },
      ],
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<InputInvoice | null>(null);

  const handleViewPdf = (invoice: InputInvoice) => {
    setSelectedInvoice(invoice);
  };

  const handleClosePopup = () => {
    setSelectedInvoice(null);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-white">Danh sách hóa đơn</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Ngày hóa đơn</th>
            <th className="border border-gray-300 px-4 py-2">Tổng tiền</th>
            <th className="border border-gray-300 px-4 py-2">Chi tiết hóa đơn</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="border border-gray-300 px-4 py-2 text-center">{invoice.id}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{invoice.invoiceDate}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {invoice.totalAmount.toLocaleString()} đ
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleViewPdf(invoice)}
                  className="text-blue-500 underline"
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup hiển thị chi tiết hóa đơn */}
      {selectedInvoice && (
        <PopupViewPDF
          invoiceId={selectedInvoice.id}
          employeeCode={selectedInvoice.employeeCode}
          data={selectedInvoice.products}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default InputInvoiceList;
