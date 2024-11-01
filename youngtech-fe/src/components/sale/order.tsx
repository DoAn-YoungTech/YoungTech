'use client';
import { fetchOrders, createOrder, updateOrder, Order } from "@/slices/order.slice";
import { AppDispatch, RootState } from "@/store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";

export default function OrderPage() {
    const { data, loading } = useSelector((state: RootState) => state.order);
    const dispatch = useDispatch<AppDispatch>();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('orderDate');
    const [isPopupAddOpen, setPopupAddOpen] = useState(false);
    const [isPopupEditOpen, setPopupEditOpen] = useState(false);
    const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState<Order>({
        id: undefined,
        flag: true,
        orderDate: new Date(),
        succesDate: new Date(),
        totalAmount: 0,
        status: 'Pending',
    });

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const openAddPopup = () => {
        setSelectedOrder({
            id: undefined,
            flag: true,
            orderDate: new Date(),
            succesDate: new Date(),
            totalAmount: 0,
            status: 'Pending',
        });
        setPopupAddOpen(true);
    };

    const openEditPopup = (order: Order) => {
        setSelectedOrder({
            ...order,
            orderDate: order.orderDate ? new Date(order.orderDate) : new Date(),
            succesDate: order.succesDate ? new Date(order.succesDate) : new Date(),
        });
        setPopupEditOpen(true);
    };

    const closePopup = () => {
        setPopupAddOpen(false);
        setPopupEditOpen(false);
        setConfirmDeleteOpen(false);
    };

    const handleSaveOrder = () => {
        if (isNaN(selectedOrder.totalAmount) || selectedOrder.totalAmount <= 0) {
            toast.error("Tổng số tiền phải là một số dương. Vui lòng kiểm tra lại.");
            return;
        }

        if (selectedOrder.status.trim() === '' || !/^[A-Za-z\s]+$/.test(selectedOrder.status)) {
            toast.error("Trạng thái không được để trống và chỉ được nhập chữ. Vui lòng kiểm tra lại.");
            return;
        }

        if (selectedOrder.orderDate > selectedOrder.succesDate || selectedOrder.orderDate == selectedOrder.succesDate) {
            toast.error("Ngày hoàn thành đơn hàng không được sau ngày đặt hàng. Vui lòng kiểm tra lại.");
            return;
        }

        if (selectedOrder.totalAmount % 1000 !== 0) {
            toast.error("Tổng số tiền phải là bội số của 1.000đ. Vui lòng kiểm tra lại.");
            return;
        }
        const orderToSave = { ...selectedOrder, flag: true };

        if (selectedOrder.id) {
            dispatch(updateOrder(orderToSave));
            toast.success("Đơn hàng đã được cập nhật thành công!");
        } else {
            dispatch(createOrder(orderToSave));
            toast.success("Đơn hàng mới đã được thêm thành công!");
        }
        closePopup();
    };

    const openConfirmDelete = (order: Order) => {
        setSelectedOrder(order);
        setConfirmDeleteOpen(true);
    };

    const handleDeleteOrder = () => {
        const updatedOrder = { ...selectedOrder, flag: false };
        dispatch(updateOrder(updatedOrder));
        toast.info("Đơn hàng đã được chuyển trạng thái!");
        closePopup();
    };

    const filteredOrders = data.filter((order) => {
        if (!searchQuery) {
            return order.flag;
        }
        if (searchType === 'status') {
            return order.flag && order.status.toLowerCase().includes(searchQuery.toLowerCase());
        }
        const dateToCompare = searchType === 'orderDate' ? order.orderDate : order.succesDate;
        const formattedDateToCompare = new Date(dateToCompare).toLocaleDateString();

        return formattedDateToCompare.includes(searchQuery) && order.flag;
    });


    const searchOptions = [
        { label: 'Ngày đặt hàng', value: 'orderDate' },
        { label: 'Ngày hoàn thành', value: 'succesDate' },
        { label: 'Trạng thái', value: 'status' },
    ];

    return (
        <div className="order-page p-4">
            <ToastContainer />
            <div className="flex mb-4 space-x-2">
                <Dropdown
    value={searchType}
    options={searchOptions}
    onChange={(e) => setSearchType(e.value)}
    placeholder="Chọn loại tìm kiếm"
    className="min-w-[150px]"
/>

                <InputText
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 border border-gray-300 rounded-md pl-3"
                />
                <Button
                    label="Thêm Đơn Hàng"
                    icon="pi pi-plus"
                    onClick={openAddPopup}
                    className="bg-blue-500 text-white p-3 hover:bg-blue-600 p-button-success"
                />

            </div>


            {loading ? (
                <p>Đang tải đơn hàng...</p>
            ) : (
                <DataTable value={filteredOrders} paginator rows={5} responsiveLayout="scroll">
                    <Column
                        header="STT"
                        body={(rowData, { rowIndex }) => rowIndex + 1}
                    />
                    <Column field="id" header="ID" />
                    <Column field="orderDate" header="Ngày Đặt Hàng" body={(rowData) => new Date(rowData.orderDate).toLocaleDateString()} />
                    <Column field="succesDate" header="Ngày Hoàn Thành" body={(rowData) => new Date(rowData.succesDate).toLocaleDateString()} />
                    <Column
                        field="totalAmount"
                        header="Tổng Số Tiền"
                        body={(rowData) => rowData.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    />
                    <Column field="status" header="Trạng Thái" />
                    <Column
                        header="Hành Động"
                        body={(rowData) => (
                            <>
                                <Button icon="pi pi-pencil" className="p-button-text" onClick={() => openEditPopup(rowData)} />
                                <Button icon="pi pi-trash" className="p-button-text" onClick={() => openConfirmDelete(rowData)} />
                            </>
                        )}
                    />
                </DataTable>
            )}

            <Dialog
                header={selectedOrder.id ? "Chỉnh sửa đơn hàng" : "Thêm đơn hàng"}
                visible={isPopupAddOpen || isPopupEditOpen}
                onHide={closePopup}
                className="rounded-lg shadow-lg"
                style={{ width: 400 }}
            >
                <div className="p-4">
                    <div className="field mb-3">
                        <label htmlFor="orderDate" className="block mb-1">Ngày đặt hàng</label>
                        <InputText
                            id="orderDate"
                            type="date"
                            value={selectedOrder.orderDate instanceof Date ? selectedOrder.orderDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => setSelectedOrder({ ...selectedOrder, orderDate: new Date(e.target.value) })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="succesDate" className="block mb-1">Ngày hoàn thành</label>
                        <InputText
                            id="succesDate"
                            type="date"
                            value={selectedOrder.succesDate instanceof Date ? selectedOrder.succesDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => setSelectedOrder({ ...selectedOrder, succesDate: new Date(e.target.value) })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="totalAmount" className="block mb-1">Tổng số tiền</label>
                        <InputText
                            id="totalAmount"
                            type="number"
                            value={selectedOrder.totalAmount.toString()}
                            onChange={(e) => {
                                const value = e.target.value ? Number(e.target.value) : 0;
                                setSelectedOrder({ ...selectedOrder, totalAmount: value });
                            }}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="status" className="block mb-1">Trạng Thái</label>
                        <InputText
                            id="status"
                            value={selectedOrder.status}
                            onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button
                            label="Lưu"
                            icon="pi pi-check"
                            onClick={handleSaveOrder}
                            className="bg-blue-500 text-white hover:bg-blue-600 rounded px-4 py-2"
                        />
                        <Button
                            label="Hủy"
                            icon="pi pi-times"
                            onClick={closePopup}
                            className="ml-2 bg-gray-300 text-black hover:bg-gray-400 rounded px-4 py-2"
                        />
                    </div>
                </div>
            </Dialog>


            <Dialog
                header="Xác Nhận Xóa"
                visible={isConfirmDeleteOpen}
                onHide={closePopup}
                style={{ width: '400px' }}
                className="rounded-lg shadow-lg"
            >
                <div className="p-4">
                    <p className="mb-4 text-center">Bạn có chắc chắn muốn xóa đơn hàng này không?</p>
                    <div className="flex justify-center">
                        <Button
                            label="Có"
                            icon="pi pi-check"
                            onClick={handleDeleteOrder}
                            className="bg-red-500 text-white hover:bg-red-600 rounded px-4 py-2"
                        />
                        <Button
                            label="Không"
                            icon="pi pi-times"
                            onClick={closePopup}
                            className="ml-2 bg-gray-300 text-black hover:bg-gray-400 rounded px-4 py-2"
                        />
                    </div>
                </div>
            </Dialog>

        </div>
    );
}
