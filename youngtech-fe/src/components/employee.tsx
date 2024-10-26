'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, fetchEmployees, updateEmployee, deleteEmployee } from "@/slices/employee.slice";
import { RootState, AppDispatch } from "@/store";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Employee } from "@/slices/employee.slice";
import { storage } from "@/connect";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmployeePage() {
    const { data, loading } = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch<AppDispatch>();

    const [searchQuery, setSearchQuery] = useState('');
    const [isPopupAddOpen, setPopupAddOpen] = useState(false);
    const [isPopupEditOpen, setPopupEditOpen] = useState(false);
    const [isPopupViewOpen, setPopupViewOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>({
        fullName: '',
        profilePicture: '',
        email: '',
        password: '',
        phoneNumber: '',
        dayOfBirth: '',
        position: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const openAddPopup = () => {
        setSelectedEmployee({
            fullName: '',
            profilePicture: '',
            email: '',
            password: '',
            phoneNumber: '',
            dayOfBirth: '',
            position: ''
        });
        setPopupAddOpen(true);
        setImageFile(null);
    };

    const openEditPopup = (employee: Employee) => {
        setSelectedEmployee(employee);
        setPopupEditOpen(true);
        setImageFile(null);
    };

    const openViewPopup = (employee: Employee) => {
        setSelectedEmployee(employee);
        setPopupViewOpen(true);
    };

    const closePopup = () => {
        setPopupAddOpen(false);
        setPopupEditOpen(false);
        setPopupViewOpen(false);
        setImageFile(null);
        setIsUploading(false);
    };

    const handleImageUpload = async () => {
        if (!imageFile) return null;
        const imageRef = ref(storage, `employee/${Date.now()}_${imageFile.name}`);
        setIsUploading(true);
        await uploadBytes(imageRef, imageFile);
        const downloadURL = await getDownloadURL(imageRef);
        setIsUploading(false);
        return downloadURL;
    };

    const handleAddEmployee = async () => {
        try {
            const profilePicture = imageFile ? await handleImageUpload() : "";
            await dispatch(createEmployee({ ...selectedEmployee, profilePicture: profilePicture ?? "" })).unwrap();
            toast.success("Thêm nhân viên thành công!");
            closePopup();
        } catch (error) {
            toast.error("Thêm nhân viên thất bại!");
        }
    };

    const handleEditEmployee = async () => {
        try {
            const profilePicture = imageFile ? await handleImageUpload() : selectedEmployee.profilePicture;
            await dispatch(updateEmployee({ ...selectedEmployee, profilePicture: profilePicture || '' })).unwrap();
            toast.success("Cập nhật nhân viên thành công!");
            closePopup();
        } catch (error) {
            toast.error("Cập nhật nhân viên thất bại!");
        }
    };

    const handleDeleteEmployee = async (id: number) => {
        const confirmDelete = window.confirm("Bạn chắc chắn muốn xoá nhân viên này chứ?");
        if (confirmDelete) {
            try {
                await dispatch(deleteEmployee(id)).unwrap();
                toast.success("Xoá nhân viên thành công!");
            } catch (error) {
                toast.error("Xoá nhân viên thất bại!");
            }
        }
    };

    const filteredEmployees = data.filter((employee) => employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()));

    const actionBodyTemplate = (employee: Employee) => {
        return (
            <>
                <Button
                    icon="pi pi-eye"
                    className="p-button-sm p-button-text"
                    onClick={() => openViewPopup(employee)}
                    tooltip="Xem"
                />
                <Button
                    icon="pi pi-pencil"
                    className="p-button-sm p-button-text"
                    onClick={() => openEditPopup(employee)}
                    tooltip="Sửa"
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-sm p-button-text"
                    onClick={() => handleDeleteEmployee(employee.id!)}
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
                    placeholder="Tìm kiếm nhân viên..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    label="Thêm nhân viên"
                    icon="pi pi-plus"
                    className="p-button-success"
                    onClick={openAddPopup}
                />
            </div>

            <DataTable
                value={filteredEmployees}
                paginator
                rows={10}
                className="mt-4"
            >
                <Column field="id" header="STT" body={(_, { rowIndex }) => rowIndex + 1} style={{ textAlign: 'center', width: '5rem' }} />
                <Column field="fullName" header="Tên nhân viên" />
                <Column field="email" header="Email" />
                <Column field="phoneNumber" header="SĐT" body={(rowData) => rowData.phoneNumber} />
                <Column field="position" header="Vai trò" />
                <Column body={actionBodyTemplate} header="Thao tác" style={{ textAlign: 'center', width: '12rem' }} />
            </DataTable>

            {/* Add Employee Dialog */}
            <Dialog header="Thêm Nhân Viên" visible={isPopupAddOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label>Họ tên</label>
                        <InputText className="border border-solid" value={selectedEmployee.fullName} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, fullName: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label>Hình ảnh</label>
                        <InputText className="border border-solid" type="file" onChange={(e) => {
                            const file = e.target.files?.[0];
                            setImageFile(file ?? null);
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setSelectedEmployee({ ...selectedEmployee, profilePicture: reader.result as string });
                                };
                                reader.readAsDataURL(file);
                            }
                        }} />
                        {selectedEmployee.profilePicture && <img src={selectedEmployee.profilePicture} alt="Preview" className="mt-2 w-full h-auto" />}
                    </div>
                    <div className="p-field">
                        <label>Email</label>
                        <InputText className="border border-solid" value={selectedEmployee.email} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label>Số điện thoại</label>
                        <InputText className="border border-solid"
                            value={selectedEmployee.phoneNumber}
                            onChange={(e) => {
                                const input = e.target as HTMLInputElement;
                                const phoneNumber = input.value.replace(/\D/g, ''); // Loại bỏ các ký tự không phải số
                                if (phoneNumber.length <= 10) {
                                    setSelectedEmployee({ ...selectedEmployee, phoneNumber }); // Cập nhật giá trị là chuỗi số
                                }
                            }}
                            onBlur={() => {
                                // Chuyển đổi sang kiểu số khi cần
                                const numericPhoneNumber = Number(selectedEmployee.phoneNumber);
                                console.log("Số điện thoại dạng số:", numericPhoneNumber);
                            }}
                        />
                    </div>
                    <div className="p-field">
                        <label>Ngày sinh</label>
                        <Calendar value={selectedEmployee.dayOfBirth ? new Date(selectedEmployee.dayOfBirth) : null} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dayOfBirth: (e.value as Date).toISOString().split('T')[0] })} dateFormat="dd/mm/yy" />
                    </div>
                    <div className="p-field">
                        <label>Vai trò</label>
                        <InputText className="border border-solid" value={selectedEmployee.position} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })} />
                    </div>
                    <Button label="Lưu" icon="pi pi-check" className="mt-2" onClick={handleAddEmployee} disabled={isUploading} />
                </div>
            </Dialog>

            {/* Edit Employee Dialog */}
            <Dialog header="Chỉnh Sửa Nhân Viên" visible={isPopupEditOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid">
                    {/* Các trường giống như trên popup thêm */}
                    <div className="p-field">
                        <label>Họ tên</label>
                        <InputText className="border border-solid" value={selectedEmployee.fullName} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, fullName: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label>Hình ảnh</label>
                        <InputText className="border border-solid" type="file" onChange={(e) => {
                            const file = e.target.files?.[0];
                            setImageFile(file ?? null);
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setSelectedEmployee({ ...selectedEmployee, profilePicture: reader.result as string });
                                };
                                reader.readAsDataURL(file);
                            }
                        }} />
                        {selectedEmployee.profilePicture && <img src={selectedEmployee.profilePicture} alt="Preview" className="mt-2 w-full h-auto" />}
                    </div>
                    <div className="p-field">
                        <label>Email</label>
                        <InputText className="border border-solid" value={selectedEmployee.email} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label>Số điện thoại</label>
                        <InputText className="border border-solid"
                            value={selectedEmployee.phoneNumber}
                            onChange={(e) => {
                                const input = e.target as HTMLInputElement;
                                const phoneNumber = input.value.replace(/\D/g, ''); // Loại bỏ các ký tự không phải số
                                if (phoneNumber.length <= 10) {
                                    setSelectedEmployee({ ...selectedEmployee, phoneNumber }); // Cập nhật giá trị là chuỗi số
                                }
                            }}
                            onBlur={() => {
                                // Chuyển đổi sang kiểu số khi cần
                                const numericPhoneNumber = Number(selectedEmployee.phoneNumber);
                                console.log("Số điện thoại dạng số:", numericPhoneNumber);
                            }}
                        />

                    </div>
                    <div className="p-field">
                        <label>Ngày sinh</label>
                        <Calendar value={selectedEmployee.dayOfBirth ? new Date(selectedEmployee.dayOfBirth) : null} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dayOfBirth: (e.value as Date).toISOString().split('T')[0] })} dateFormat="dd/mm/yy" />
                    </div>
                    <div className="p-field">
                        <label>Vai trò</label>
                        <InputText className="border border-solid" value={selectedEmployee.position} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })} />
                    </div>
                    <Button label="Cập nhật" icon="pi pi-check" className="mt-2" onClick={handleEditEmployee} disabled={isUploading} />
                </div>
            </Dialog>

            {/* View Employee Dialog */}
            <Dialog header="Chi Tiết Nhân Viên" visible={isPopupViewOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label>Họ tên</label>
                        <div>{selectedEmployee.fullName}</div>
                    </div>
                    <div className="p-field">
                        <label>Hình ảnh</label>
                        {selectedEmployee.profilePicture && <img src={selectedEmployee.profilePicture} alt="Profile" className="mt-2 w-full h-auto" />}
                    </div>
                    <div className="p-field">
                        <label>Email</label>
                        <div>{selectedEmployee.email}</div>
                    </div>
                    <div className="p-field">
                        <label>Số điện thoại</label>
                        <div>{selectedEmployee.phoneNumber}</div>
                    </div>
                    <div className="p-field">
                        <label>Ngày sinh</label>
                        <div>{selectedEmployee.dayOfBirth}</div>
                    </div>
                    <div className="p-field">
                        <label>Vai trò</label>
                        <div>{selectedEmployee.position}</div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};
