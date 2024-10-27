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
import { Employee } from "@/slices/employee.slice";
import { storage } from "@/connect";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';
import { format } from 'date-fns';
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
        flag: false,
        fullName: '',
        profilePicture: '',
        dateOfBirth: '',
        phoneNumber: '',
        position: '',
        account_id: null
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const openAddPopup = () => {
        setSelectedEmployee({
            flag: false,
            fullName: '',
            profilePicture: '',
            dateOfBirth: '',
            phoneNumber: '',
            position: '',
            account_id: null
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

    const isPhoneNumberExist = (phoneNumber: string) => {
        return data.some(employee => employee.phoneNumber === phoneNumber);
    };


    const handleImageUpload = async () => {
        if (!imageFile) return null;

        if (imageFile.size > 1 * 1024 * 1024) {
            toast.error("Kích thước hình ảnh phải dưới 1MB!");
            return null;
        }

        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(imageFile.type)) {
            toast.error("Chỉ chấp nhận định dạng JPEG hoặc PNG!");
            return null;
        }

        const imageRef = ref(storage, `employee/${Date.now()}_${imageFile.name}`);
        setIsUploading(true);
        await uploadBytes(imageRef, imageFile);
        const downloadURL = await getDownloadURL(imageRef);
        setIsUploading(false);
        return downloadURL;
    };

    const handleAddEmployee = async () => {
        if (!selectedEmployee.fullName) {
            toast.error("Tên nhân viên không được để trống!");
            return;
        }

        if (selectedEmployee.fullName.length < 2) {
            toast.error("Tên nhân viên phải có ít nhất 2 ký tự!");
            return;
        }

        if (!selectedEmployee.phoneNumber) {
            toast.error("Số điện thoại không được để trống!");
            return;
        }

        if (!selectedEmployee.phoneNumber) {
            toast.error("Số điện thoại không được để trống!");
            return;
        }

        if (isPhoneNumberExist(selectedEmployee.phoneNumber)) {
            toast.error("Số điện thoại đã tồn tại!");
            return;
        }

        const phonePattern = /^0\d{9}$/;
        if (!phonePattern.test(selectedEmployee.phoneNumber)) {
            toast.error("Số điện thoại phải đủ 10 chữ số, bắt đầu bằng số 0!");
            return;
        }
        if (!/^\d+$/.test(selectedEmployee.phoneNumber)) {
            toast.error("Số điện thoại chỉ được chứa chữ số!");
            return;
        }

        if (!imageFile) {
            toast.error("Vui lòng chọn hình ảnh cho nhân viên!");
            return;
        }

        if (!selectedEmployee.dateOfBirth) {
            toast.error("Ngày sinh không được để trống!");
            return;
        }
        const dateOfBirth = new Date(selectedEmployee.dateOfBirth);
        const today = new Date();
        if (dateOfBirth >= today) {
            toast.error("Ngày sinh không hợp lệ! Ngày sinh phải là một ngày trong quá khứ.");
            return;
        }

        if (!selectedEmployee.position) {
            toast.error("Vai trò không được để trống!");
            return;
        }
        const validPositions = ["Nhân viên bán hàng", "Nhân viên kinh doanh", "Thủ kho"];
        if (!validPositions.includes(selectedEmployee.position)) {
            toast.error("Vai trò không hợp lệ! Vui lòng chọn một vai trò từ danh sách.");
            return;
        }

        try {
            const profilePicture = await handleImageUpload();
            if (!profilePicture) {
                toast.error("Tải lên hình ảnh thất bại!");
                return;
            }

            await dispatch(createEmployee({ ...selectedEmployee, profilePicture })).unwrap();
            toast.success("Thêm nhân viên thành công!");
            closePopup();
        } catch (error) {
            toast.error("Thêm nhân viên thất bại!");
        }
    };

    const handleEditEmployee = async () => {
        if (!selectedEmployee.phoneNumber) {
            toast.error("Số điện thoại không được để trống!");
            return;
        }

        if (isPhoneNumberExist(selectedEmployee.phoneNumber) &&
            selectedEmployee.phoneNumber !== data.find(employee => employee.id === selectedEmployee.id)?.phoneNumber) {
            toast.error("Số điện thoại đã tồn tại!");
            return;
        }

        if (!selectedEmployee.fullName) {
            toast.error("Tên nhân viên không được để trống!");
            return;
        }
        if (selectedEmployee.fullName.length < 2) {
            toast.error("Tên nhân viên phải có ít nhất 2 ký tự!");
            return;
        }

        if (!selectedEmployee.phoneNumber) {
            toast.error("Số điện thoại không được để trống!");
            return;
        }
        const phonePattern = /^0\d{9}$/;
        if (!phonePattern.test(selectedEmployee.phoneNumber)) {
            toast.error("Số điện thoại phải đủ 10 chữ số, bắt đầu bằng số 0!");
            return;
        }
        if (!/^\d+$/.test(selectedEmployee.phoneNumber)) {
            toast.error("Số điện thoại chỉ được chứa chữ số!");
            return;
        }

        if (!selectedEmployee.dateOfBirth) {
            toast.error("Ngày sinh không được để trống!");
            return;
        }
        const dateOfBirth = new Date(selectedEmployee.dateOfBirth);
        const today = new Date();
        if (dateOfBirth >= today) {
            toast.error("Ngày sinh không hợp lệ! Ngày sinh phải là một ngày trong quá khứ.");
            return;
        }

        if (!selectedEmployee.position) {
            toast.error("Vai trò không được để trống!");
            return;
        }
        const validPositions = ["Nhân viên bán hàng", "Nhân viên kinh doanh", "Thủ kho"];
        if (!validPositions.includes(selectedEmployee.position)) {
            toast.error("Vai trò không hợp lệ! Vui lòng chọn một vai trò từ danh sách.");
            return;
        }

        try {
            const profilePicture = imageFile ? await handleImageUpload() : selectedEmployee.profilePicture;
            if (!profilePicture && imageFile) {
                toast.error("Tải lên hình ảnh thất bại!");
                return;
            }
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

    const filteredEmployees = data.filter((employee: { fullName: string; phoneNumber: string | string[]; }) =>
        employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.phoneNumber.includes(searchQuery));

    const actionBodyTemplate = (employee: Employee) => {
        return (
            <>
                <Button
                    icon="pi pi-eye"
                    className="p-button-sm p-button-text text-blue-500 hover:text-blue-700"
                    onClick={() => openViewPopup(employee)}
                    tooltip="Xem"
                />
                <Button
                    icon="pi pi-pencil"
                    className="p-button-sm p-button-text text-orange-500 hover:text-orange-700"
                    onClick={() => openEditPopup(employee)}
                    tooltip="Sửa"
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-sm p-button-text text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteEmployee(employee.id!)}
                    tooltip="Xóa"
                />
            </>
        );
    };
    const roleOptions = [
        { label: "Nhân viên bán hàng", value: "Nhân viên bán hàng" },
        { label: "Nhân viên kinh doanh", value: "Nhân viên kinh doanh" },
        { label: "Thủ kho", value: "Thủ kho" }
    ];

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
                <Column field="phoneNumber" header="SĐT" body={(rowData) => rowData.phoneNumber} />
                <Column field="position" header="Vai trò" />
                <Column
                    field="flag"
                    header="Flag"
                    style={{ textAlign: 'center' }}
                    body={(rowData) => (
                        <i
                            className={`pi ${rowData.flag ? 'pi-check-circle text-green-500' : 'pi-times-circle text-red-500'}`}
                            title={rowData.flag ? 'Hoạt động' : 'Không hoạt động'}
                        />
                    )}
                />
                <Column
                    body={(rowData) => actionBodyTemplate(rowData)}
                    header="Thao tác"
                    style={{ textAlign: 'center', width: '12rem' }}
                />
            </DataTable>

            <Dialog header="Thêm Nhân Viên" visible={isPopupAddOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid space-y-4">
                    <div className="p-field">
                        <label className="font-semibold">Họ tên</label>
                        <InputText className="border border-solid rounded-md p-2" value={selectedEmployee.fullName} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, fullName: e.target.value })} />
                    </div>

                    <div className="p-field">
                        <label className="font-semibold">Hình ảnh</label>
                        <InputText
                            type="file"
                            className="border border-solid rounded-md p-2"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    if (file.size > 1 * 1024 * 1024) {
                                        toast.error("Kích thước hình ảnh phải dưới 1MB!");
                                        return;
                                    }
                                    if (!["image/jpeg", "image/png"].includes(file.type)) {
                                        toast.error("Chỉ chấp nhận định dạng JPEG hoặc PNG!");
                                        return;
                                    }
                                    setImageFile(file);
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setSelectedEmployee({ ...selectedEmployee, profilePicture: reader.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        {selectedEmployee.profilePicture && (
                            <img
                                src={selectedEmployee.profilePicture}
                                alt="Preview"
                                className="mt-2 w-36 h-36 rounded-full shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-sparkle object-cover"
                            />
                        )}
                    </div>

                    <div className="p-field">
                        <label className="font-semibold">Số điện thoại</label>
                        <InputText className="border border-solid rounded-md p-2"
                            value={selectedEmployee.phoneNumber}
                            onChange={(e) => {
                                const input = e.target as HTMLInputElement;
                                const phoneNumber = input.value.replace(/\D/g, '');
                                if (phoneNumber.length <= 10) {
                                    setSelectedEmployee({ ...selectedEmployee, phoneNumber });
                                }
                            }}
                            onBlur={() => {
                                const numericPhoneNumber = Number(selectedEmployee.phoneNumber);
                                console.log("Số điện thoại dạng số:", numericPhoneNumber);
                            }}
                        />
                    </div>

                    <div className="p-field">
                        <label className="font-semibold">Ngày sinh</label>
                        <Calendar
                            value={selectedEmployee.dateOfBirth ? new Date(selectedEmployee.dateOfBirth) : null}
                            onChange={(e) => {
                                const selectedDate = e.value;
                                if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
                                    const dateInGMT7 = new Date(selectedDate.getTime() + 7 * 60 * 60 * 1000);
                                    setSelectedEmployee({
                                        ...selectedEmployee,
                                        dateOfBirth: format(dateInGMT7, 'yyyy-MM-dd')
                                    });
                                } else {
                                    setSelectedEmployee({ ...selectedEmployee, dateOfBirth: '' });
                                }
                            }}
                            dateFormat="dd/mm/yy"
                            className="w-full rounded-md p-2 border border-solid"
                            showIcon
                        />
                    </div>



                    <div className="p-field">
                        <label className="font-semibold">Vai trò</label>
                        <Dropdown
                            options={roleOptions}
                            value={selectedEmployee.position}
                            onChange={(e) => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })}
                            placeholder="Chọn vai trò"
                            className="border border-solid w-full rounded-md"
                        />
                    </div>

                    <div className="p-field flex items-center space-x-2">
                        <label className="font-semibold">Trạng thái</label>
                        <InputSwitch checked={selectedEmployee.flag} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, flag: e.value })} />
                    </div>

                    <Button label="Lưu" icon="pi pi-check" className="mt-2 p-button-success rounded-md" onClick={handleAddEmployee} disabled={isUploading} />
                </div>
            </Dialog>

            <Dialog header="Chỉnh Sửa Nhân Viên" visible={isPopupEditOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid space-y-4">
                    <div className="p-field">
                        <label className="font-semibold">Họ tên</label>
                        <InputText className="border border-solid rounded-md p-2" value={selectedEmployee.fullName} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, fullName: e.target.value })} />
                    </div>

                    <div className="p-field">
                        <label className="font-semibold">Hình ảnh</label>
                        <InputText className="border border-solid rounded-md p-2" type="file" onChange={(e) => {
                            const file = e.target.files?.[0];
                            setImageFile(file ?? null);

                            if (file) {
                                if (file.size > 1 * 1024 * 1024) {
                                    toast.error("Kích thước hình ảnh phải dưới 1MB!");
                                    return;
                                }
                                if (!["image/jpeg", "image/png"].includes(file.type)) {
                                    toast.error("Chỉ chấp nhận định dạng JPEG hoặc PNG!");
                                    return;
                                }
                                setImageFile(file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setSelectedEmployee({ ...selectedEmployee, profilePicture: reader.result as string });
                                };
                                reader.readAsDataURL(file);
                            }
                        }} />
                        {selectedEmployee.profilePicture && (
                            <img
                                src={selectedEmployee.profilePicture}
                                alt="Preview"
                                className="mt-2 w-36 h-36 rounded-full shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-sparkle object-cover"
                            />
                        )}
                    </div>

                    <div className="p-field">
                        <label className="font-semibold">Số điện thoại</label>
                        <InputText className="border border-solid rounded-md p-2"
                            value={selectedEmployee.phoneNumber}
                            onChange={(e) => {
                                const input = e.target as HTMLInputElement;
                                const phoneNumber = input.value.replace(/\D/g, '');
                                if (phoneNumber.length <= 10) {
                                    setSelectedEmployee({ ...selectedEmployee, phoneNumber });
                                }
                            }}
                            onBlur={() => {
                                const numericPhoneNumber = Number(selectedEmployee.phoneNumber);
                                console.log("Số điện thoại dạng số:", numericPhoneNumber);
                            }}
                        />
                    </div>

                    <div className="p-field">
                        <label className="font-semibold">Ngày sinh</label>
                        <Calendar
                            value={selectedEmployee.dateOfBirth ? new Date(selectedEmployee.dateOfBirth) : null}
                            onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dateOfBirth: (e.value as Date).toISOString().split('T')[0] })}
                            dateFormat="dd/mm/yy"
                            placeholder="dd/mm/yy"
                            className="w-full rounded-md p-2 border border-solid"
                        />
                    </div>

                    <div className="p-field">
                        <label className="font-semibold">Vai trò</label>
                        <Dropdown
                            options={roleOptions}
                            value={selectedEmployee.position}
                            onChange={(e) => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })}
                            placeholder="Chọn vai trò"
                            className="border border-solid w-full rounded-md"
                        />
                    </div>

                    <div className="p-field flex items-center space-x-2">
                        <label className="font-semibold">Trạng thái</label>
                        <InputSwitch checked={selectedEmployee.flag} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, flag: e.value })} />
                    </div>

                    <Button label="Cập nhật" icon="pi pi-check" className="mt-2 p-button-success rounded-md" onClick={handleEditEmployee} disabled={isUploading} />
                </div>
            </Dialog>

            <Dialog header="Chi Tiết Nhân Viên" visible={isPopupViewOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        {selectedEmployee.profilePicture && (
                            <img
                                src={selectedEmployee.profilePicture}
                                alt="Profile"
                                className="w-36 h-36 rounded-full shadow-lg border-4 border-gradient-to-r from-blue-400 to-purple-400 transform transition-transform duration-500 hover:scale-105 object-cover"
                            />
                        )}
                        <div className="text-center mt-2 font-semibold">{selectedEmployee.fullName}</div>
                    </div>

                    <div className="flex-grow">
                        <div className="p-field">
                            <label className="font-semibold">Số điện thoại</label>
                            <div className="text-lg font-medium">{selectedEmployee.phoneNumber}</div>
                        </div>

                        <div className="p-field">
                            <label className="font-semibold">Ngày sinh</label>
                            <div className="text-lg font-medium">{selectedEmployee.dateOfBirth}</div>
                        </div>

                        <div className="p-field">
                            <label className="font-semibold">Vai trò</label>
                            <div className="text-lg font-medium">{selectedEmployee.position}</div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};
