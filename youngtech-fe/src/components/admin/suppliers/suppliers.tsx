'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuppliers, createSupplier, updateSupplier, Supplier  } from '@/slices/supplier.slice';
import { RootState, AppDispatch } from "@/store";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SupplierPage() {
    const { data, loading } = useSelector((state: RootState) => state.supplier);
    const dispatch = useDispatch<AppDispatch>();

    const [searchQuery, setSearchQuery] = useState('');
    const [isPopupAddOpen, setPopupAddOpen] = useState(false); 
    const [isPopupEditOpen, setPopupEditOpen] = useState(false);
    const [isPopupViewOpen, setPopupViewOpen] = useState(false);
    const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier> ({
        flag: true,           // Mặc định là true, có thể điều chỉnh theo nhu cầu
        supplierName: '',  
        contactName: '',
        phoneNumber: '',
        email: '',
        address: ''
    });

    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        dispatch(fetchSuppliers());
    }, [dispatch]);
    
    const openAddPopup = () => {
        setSelectedSupplier({
            flag: true,  
            supplierName: '',
            contactName: '',
            phoneNumber: '',
            email: '',
            address: ''
        });
        setPopupAddOpen(true);
    };

    const openEditPopup = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setPopupEditOpen(true);
    };
    
    const openViewPopup = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setPopupViewOpen(true);
    };
    
    const closePopup = () => {
        setPopupAddOpen(false);
        setPopupEditOpen(false);
        setPopupViewOpen(false);
        setConfirmDeleteOpen(false);
    };

    const handleAddSupplier = async () => {
        setIsUploading(true); 
        try {
            // Gọi hàm dispatch để tạo mới Supplier
            await dispatch(createSupplier(selectedSupplier)).unwrap();
            toast.success("Thêm nhà cung cấp thành công!");
            closePopup();
        } catch {
            toast.error("Thêm nhà cung cấp thất bại!");
        }
    };
    
    const handleEditSupplier = async () => {
        try {
            // Gọi hàm dispatch để cập nhật Supplier
            await dispatch(updateSupplier(selectedSupplier)).unwrap();
            toast.success("Cập nhật nhà cung cấp thành công!");
            closePopup();
        } catch {
            toast.error("Cập nhật nhà cung cấp thất bại!");
        }
    };
    
    const openConfirmDelete = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setConfirmDeleteOpen(true);
    }; 
    
    

    const handleDeleteSupplier = async () => {
        if (!selectedSupplier.id) {
            toast.error("ID nhà cung cấp không hợp lệ!");
            return;
        }
        
        const updatedSupplier = { ...selectedSupplier, flag: false };
    
        try {
            await dispatch(updateSupplier(updatedSupplier)).unwrap();
            toast.success("Nhà cung cấp đã được chuyển trạng thái!");
            closePopup();
        } catch (error) {
            console.error("Lỗi khi cập nhật nhà cung cấp: ", error);
            toast.error("Cập nhật nhà cung cấp thất bại!");
        }
    };
    
    
    
    const filteredSuppliers = data.filter((supplier) => supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const actionBodyTemplate = (supplier: Supplier) => {
        return (
            <>
                <Button
                    icon="pi pi-eye"
                    className="p-button-sm p-button-text"
                    onClick={() => openViewPopup(supplier)}
                    tooltip="Xem"
                />
                <Button
                    icon="pi pi-pencil"
                    className="p-button-sm p-button-text"
                    onClick={() => openEditPopup(supplier)}
                    tooltip="Sửa"
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-sm p-button-text"
                    onClick={() => openConfirmDelete(supplier)} // Mở popup xác nhận với nhà cung cấp đã chọn
                    tooltip="Xóa"
                />

            </>
        );
    };
    
    if (loading) {
        return <div className="text-center">Vui lòng chờ giây lát...</div>;
    }

    return (
        <>
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <InputText className="border border-solid"
                    placeholder="Tìm kiếm nhà cung cấp..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    label="Thêm nhà cung cấp"
                    icon="pi pi-plus"
                    className="p-button-success"
                    onClick={openAddPopup}
                />
            </div>
    
            <DataTable
                value={filteredSuppliers}
                paginator
                rows={5}
                className="mt-4"
            >
               <Column field="id" header="STT" body={(_, { rowIndex }) => rowIndex + 1} style={{ textAlign: 'center', width: '5rem' }} />
                <Column field="supplierName" header="Tên nhà cung cấp" />
                <Column field="contactName" header="Tên liên hệ" />
                <Column field="phoneNumber" header="Số điện thoại" />
                <Column field="email" header="Email" />
                <Column field="address" header="Địa chỉ" />
                <Column field="flag" header="Trạng thái" body={(rowData) => (rowData.flag ? 'Kích hoạt' : 'Không kích hoạt')} />
                <Column body={actionBodyTemplate} header="Thao tác" style={{ textAlign: 'center', width: '12rem' }} />

            </DataTable>
    
            {/* Add Supplier Dialog */}
            <Dialog header="Thêm Nhà Cung Cấp" visible={isPopupAddOpen} style={{ width: '500px' }} onHide={closePopup}>
                <div className="p-fluid">
                    <div className="p-field mb-4"> {/* Thêm khoảng cách dưới mỗi trường */}
                        <label htmlFor="supplierName" className="font-semibold">Tên nhà cung cấp</label>
                        <InputText
                            id="supplierName"
                            value={selectedSupplier.supplierName}
                            onChange={(e) => setSelectedSupplier({ ...selectedSupplier, supplierName: e.target.value })}
                            className="p-inputtext-sm w-full border border-gray-300 rounded p-2" // Thêm padding và đường viền
                        />
                    </div>
                    
                    <div className="p-field mb-4">
                        <label htmlFor="contactName" className="font-semibold">Tên liên hệ</label>
                        <InputText
                            id="contactName"
                            value={selectedSupplier.contactName}
                            onChange={(e) => setSelectedSupplier({ ...selectedSupplier, contactName: e.target.value })}
                            className="p-inputtext-sm w-full border border-gray-300 rounded p-2"
                        />
                    </div>

                    <div className="p-field mb-4">
                        <label htmlFor="phoneNumber" className="font-semibold">Số điện thoại</label>
                        <InputText
                            id="phoneNumber"
                            value={selectedSupplier.phoneNumber}
                            onChange={(e) => setSelectedSupplier({ ...selectedSupplier, phoneNumber: e.target.value })}
                            className="p-inputtext-sm w-full border border-gray-300 rounded p-2"
                        />
                    </div>

                    <div className="p-field mb-4">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <InputText
                            id="email"
                            value={selectedSupplier.email}
                            onChange={(e) => setSelectedSupplier({ ...selectedSupplier, email: e.target.value })}
                            className="p-inputtext-sm w-full border border-gray-300 rounded p-2"
                        />
                    </div>

                    <div className="p-field mb-4">
                        <label htmlFor="address" className="font-semibold">Địa chỉ</label>
                        <InputText
                            id="address"
                            value={selectedSupplier.address}
                            onChange={(e) => setSelectedSupplier({ ...selectedSupplier, address: e.target.value })}
                            className="p-inputtext-sm w-full border border-gray-300 rounded p-2"
                        />
                    </div>

                    <div className="p-field mb-4">
                        <label className="font-semibold">Trạng thái</label>
                        <InputText
                            className="border border-gray-300 rounded p-2"
                            value={selectedSupplier.flag ? 'Kích hoạt' : 'Không kích hoạt'}
                            readOnly
                        />
                    </div>

                    <Button
                        label="Lưu"
                        icon="pi pi-check"
                        className="mt-4 w-full p-button-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleAddSupplier}
                        disabled={isUploading}
                    />
                </div>
            </Dialog>


    
            {/* Edit Supplier Dialog */}
        <Dialog header="Chỉnh Sửa Nhà Cung Cấp" visible={isPopupEditOpen} style={{ width: '450px' }} onHide={closePopup}>
            <div className="p-fluid p-4">
                <div className="p-field mb-4">
                    <label className="font-semibold">Tên nhà cung cấp</label>
                    <InputText
                        className="border border-gray-300 rounded p-3" // Tăng padding từ p-2 lên p-3
                        value={selectedSupplier.supplierName}
                        onChange={(e) => setSelectedSupplier({ ...selectedSupplier, supplierName: e.target.value })}
                    />
                </div>

                
                <div className="p-field mb-4">
                    <label className="font-semibold">Tên liên hệ</label>
                    <InputText
                        className="border border-gray-300 rounded p-3" // Tăng padding từ p-2 lên p-3
                        value={selectedSupplier.contactName}
                        onChange={(e) => setSelectedSupplier({ ...selectedSupplier, contactName: e.target.value })}
                    />
                </div>


                <div className="p-field mb-4">
                    <label className="font-semibold">Số điện thoại</label>
                    <InputText
                        className="border border-gray-300 rounded p-3" // Tăng padding từ p-2 lên p-3
                        value={selectedSupplier.phoneNumber}
                        onChange={(e) => setSelectedSupplier({ ...selectedSupplier, phoneNumber: e.target.value })}
                    />
                </div>

                <div className="p-field mb-4">
                    <label className="font-semibold">Email</label>
                    <InputText
                        className="border border-gray-300 rounded p-3" // Tăng padding từ p-2 lên p-3
                        value={selectedSupplier.email}
                        onChange={(e) => setSelectedSupplier({ ...selectedSupplier, email: e.target.value })}
                    />
                </div>

                <div className="p-field mb-4">
                    <label className="font-semibold">Địa chỉ</label>
                    <InputText
                        className="border border-gray-300 rounded p-3" // Tăng padding từ p-2 lên p-3
                        value={selectedSupplier.address}
                        onChange={(e) => setSelectedSupplier({ ...selectedSupplier, address: e.target.value })}
                    />
                </div>
                <div className="p-field mb-4">
                    <label className="font-semibold">Trạng thái</label>
                    <InputText
                        className="border border-gray-300 rounded p-3" // Tăng padding từ p-2 lên p-3
                        value={selectedSupplier.flag ? 'Kích hoạt' : 'Không kích hoạt'}
                        readOnly
                    />
                </div>

                <Button label="Cập nhật" icon="pi pi-check" className="mt-4 w-full p-button-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleEditSupplier} />
            </div>
        </Dialog>


    
            {/* View Supplier Dialog */}
            <Dialog header="Chi Tiết Nhà Cung Cấp" visible={isPopupViewOpen} style={{ width: '500px' }} onHide={closePopup}>
                <div className="p-fluid p-4">
                    <div className="p-field mb-4">
                        <label className="font-semibold">Tên nhà cung cấp</label>
                        <div className="border border-gray-300 rounded p-2">{selectedSupplier.supplierName}</div>
                    </div>
                    
                    <div className="p-field mb-4">
                        <label className="font-semibold">Tên liên hệ</label>
                        <div className="border border-gray-300 rounded p-2">{selectedSupplier.contactName}</div>
                    </div>

                    <div className="p-field mb-4">
                        <label className="font-semibold">Số điện thoại</label>
                        <div className="border border-gray-300 rounded p-2">{selectedSupplier.phoneNumber}</div>
                    </div>

                    <div className="p-field mb-4">
                        <label className="font-semibold">Email</label>
                        <div className="border border-gray-300 rounded p-2">{selectedSupplier.email}</div>
                    </div>

                    <div className="p-field mb-4">
                        <label className="font-semibold">Địa chỉ</label>
                        <div className="border border-gray-300 rounded p-2">{selectedSupplier.address}</div>
                    </div>

                    <div className="p-field mb-4">
                        <label className="font-semibold">Trạng thái</label>
                        <div className="border border-gray-300 rounded p-2">{selectedSupplier.flag ? 'Kích hoạt' : 'Không kích hoạt'}</div>
                    </div>
                </div>
            </Dialog>


            {/* Confirm Delete Dialog */}
            <Dialog 
                header="Xác Nhận Xóa" 
                visible={isConfirmDeleteOpen} 
                onHide={closePopup} // Sử dụng hàm này để đóng dialog
                style={{ width: "400px" }} 
                className="rounded-lg shadow-lg"
            >
                <div className="p-4">
                    <p className="mb-4 text-center">
                        Bạn có chắc chắn muốn xóa nhà cung cấp không?
                    </p>
                    <div className="flex justify-center">
                        <Button
                            label="Có"
                            icon="pi pi-check"
                            onClick={handleDeleteSupplier} // Gọi hàm xóa nhà cung cấp
                            className="bg-red-500 text-white hover:bg-red-600 rounded px-4 py-2"
                        />
                        <Button
                            label="Không"
                            icon="pi pi-times"
                            onClick={closePopup} // Đóng dialog
                            className="ml-2 bg-gray-300 text-black hover:bg-gray-400 rounded px-4 py-2"
                        />
                    </div>
                </div>
            </Dialog>

        </>
    );    

}