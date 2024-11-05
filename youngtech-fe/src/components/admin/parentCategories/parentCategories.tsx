'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentCategories, createParentCategory, updateParentCategory, ParentCategory } from '../../../slices/parentCategory.slice';
import { RootState, AppDispatch } from "@/store";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ParentCategoryPage() {
    const { data, loading } = useSelector((state: RootState) => state.parentCategory);
    const dispatch = useDispatch<AppDispatch>();

    const [searchQuery, setSearchQuery] = useState('');
    const [isPopupAddOpen, setPopupAddOpen] = useState(false); 
    const [isPopupEditOpen, setPopupEditOpen] = useState(false);
    const [isPopupViewOpen, setPopupViewOpen] = useState(false);
    const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedParentCategory, setSelectedParentCategory] = useState<ParentCategory>({
        flag: true,
        name: '',  
    });
    
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        dispatch(fetchParentCategories());
    }, [dispatch]);

    const openAddPopup = () => {
        setSelectedParentCategory({ flag: true, name: '' });
        setPopupAddOpen(true);
    };
    
    const openEditPopup = (parentCategory: ParentCategory) => {
        setSelectedParentCategory(parentCategory);
        setPopupEditOpen(true);
    };
    
    const openViewPopup = (parentCategory: ParentCategory) => {
        setSelectedParentCategory(parentCategory);
        setPopupViewOpen(true);
    };
    
    const closePopup = () => {
        setPopupAddOpen(false);
        setPopupEditOpen(false);
        setPopupViewOpen(false);
        setConfirmDeleteOpen(false);
    };
    
    const handleAddParentCategory = async () => {
        setIsUploading(true); 
        try {
            await dispatch(createParentCategory(selectedParentCategory)).unwrap();
            toast.success("Thêm danh mục thành công!");
            closePopup();
        } catch {
            toast.error("Thêm danh mục thất bại!");
        } finally {
            setIsUploading(false);
        }
    };
    
    const handleEditParentCategory = async () => {
        try {
            await dispatch(updateParentCategory(selectedParentCategory)).unwrap();
            toast.success("Cập nhật danh mục thành công!");
            closePopup();
        } catch {
            toast.error("Cập nhật danh mục thất bại!");
        }
    };

    const openConfirmDelete = (parentCategory: ParentCategory) => {
        setSelectedParentCategory(parentCategory);
        setConfirmDeleteOpen(true);
    };

    const handleDeleteParentCategory = async () => {
        if (!selectedParentCategory.id) {
            toast.error("ID danh mục cha không hợp lệ!");
            return;
        }
    
        const updatedParentCategory = { ...selectedParentCategory, flag: false }; // Giả định bạn có thuộc tính 'flag'
    
        try {
            await dispatch(updateParentCategory(updatedParentCategory)).unwrap();
            toast.success("Danh mục cha đã được cập nhật trạng thái!");
            closePopup();
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục cha: ", error);
            toast.error("Cập nhật danh mục cha thất bại!");
        }
    };

    const filteredParentCategories = data.filter((parentCategory) => parentCategory.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const actionBodyTemplate = (parentCategory: ParentCategory) => {
        return (
            <>
                <Button
                    icon="pi pi-eye"
                    className="p-button-sm p-button-text"
                    onClick={() => openViewPopup(parentCategory)}
                    tooltip="Xem"
                />
                <Button
                    icon="pi pi-pencil"
                    className="p-button-sm p-button-text"
                    onClick={() => openEditPopup(parentCategory)}
                    tooltip="Sửa"
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-sm p-button-text"
                    onClick={() => openConfirmDelete(parentCategory)}
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
                <InputText
                    className="border border-solid"
                    placeholder="Tìm kiếm danh mục..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    label="Thêm danh mục"
                    icon="pi pi-plus"
                    className="p-button-success"
                    onClick={openAddPopup}
                />
            </div>
    
            <DataTable
                value={filteredParentCategories}
                paginator
                rows={5}
                className="mt-4"
            >
                <Column field="id" header="STT" body={(_, { rowIndex }) => rowIndex + 1} style={{ textAlign: 'center', width: '5rem' }} />
                <Column field="name" header="Tên danh mục" />
                <Column field="flag" header="Trạng thái" body={(rowData) => (rowData.flag ? 'Kích hoạt' : 'Không kích hoạt')} />
                <Column body={actionBodyTemplate} header="Thao tác" style={{ textAlign: 'center', width: '12rem' }} />
            </DataTable>
    
            {/* Add Parent Category Dialog */}
            <Dialog header="Thêm Danh Mục" visible={isPopupAddOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid">
                    <div className="p-field mb-4"> {/* Thêm khoảng cách dưới trường nhập */}
                        <label className="font-semibold">Tên danh mục</label>
                        <InputText
                            className="border border-gray-300 rounded p-2 w-full" // Thêm viền, bo góc và padding
                            value={selectedParentCategory.name}
                            onChange={(e) => setSelectedParentCategory({ ...selectedParentCategory, name: e.target.value })}
                        />
                    </div>
                    <Button
                        label="Lưu"
                        icon="pi pi-check"
                        className="mt-4 w-full p-button-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" // Thêm khoảng cách trên và kiểu cho nút
                        onClick={handleAddParentCategory}
                        disabled={isUploading}
                    />
                </div>
            </Dialog>

    
            {/* Edit Parent Category Dialog */}
            <Dialog header="Chỉnh Sửa Danh Mục" visible={isPopupEditOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid">
                    <div className="p-field mb-4"> {/* Thêm khoảng cách dưới trường nhập */}
                        <label className="font-semibold">Tên danh mục</label>
                        <InputText
                            className="border border-gray-300 rounded p-2 w-full" // Thêm viền, bo góc và padding
                            value={selectedParentCategory.name}
                            onChange={(e) => setSelectedParentCategory({ ...selectedParentCategory, name: e.target.value })}
                        />
                    </div>
                    <Button
                        label="Cập nhật"
                        icon="pi pi-check"
                        className="mt-4 w-full p-button-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" // Thêm khoảng cách trên và kiểu cho nút
                        onClick={handleEditParentCategory}
                    />
                </div>
            </Dialog>

    
            {/* View Parent Category Dialog */}
            <Dialog header="Chi Tiết Danh Mục" visible={isPopupViewOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid">
                    <div className="p-field mb-4"> {/* Thêm khoảng cách dưới trường nhập */}
                        <label className="font-semibold">Tên danh mục</label>
                        <InputText
                            className="border border-gray-300 rounded p-2 w-full" // Thêm viền, bo góc, padding và chiều rộng
                            value={selectedParentCategory.name}
                            readOnly
                        />
                    </div>
                </div>
            </Dialog>

            
            {/* Confirm Delete Dialog */}
            <Dialog header="Xác Nhận Xóa" visible={isConfirmDeleteOpen} onHide={closePopup} style={{ width: "400px" }} className="rounded-lg shadow-lg">
                <div className="p-4">
                    <p className="mb-4 text-center">
                        Bạn có chắc chắn muốn xóa danh mục này không?
                    </p>
                    <div className="flex justify-center">
                        <Button
                            label="Có"
                            icon="pi pi-check"
                            onClick={handleDeleteParentCategory}
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
        </>
    );
}
