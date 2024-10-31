'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, fetchEmployees, updateEmployee } from "@/slices/employee.slice";
import { RootState, AppDispatch } from "@/store";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Employee } from "@/slices/employee.slice";
import { storage } from "@/connect";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
    const [isTrashView, setIsTrashView] = useState(false);
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
            flag: true,
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

    const validateEmployee = (employee: Employee, isEdit = false) => {
        if (!employee.fullName) {
            toast.error("Tên nhân viên không được để trống!");
            return false;
        }
        if (employee.fullName.length < 2) {
            toast.error("Tên nhân viên phải có ít nhất 2 ký tự!");
            return false;
        }

        if (!employee.phoneNumber) {
            toast.error("Số điện thoại không được để trống!");
            return false;
        }

        const phonePattern = /^0\d{9}$/;
        if (!phonePattern.test(employee.phoneNumber)) {
            toast.error("Số điện thoại phải đủ 10 chữ số, bắt đầu bằng số 0!");
            return false;
        }
        if (!/^\d+$/.test(employee.phoneNumber)) {
            toast.error("Số điện thoại chỉ được chứa chữ số!");
            return false;
        }

        if (!isEdit || employee.phoneNumber !== data.find(emp => emp.id === employee.id)?.phoneNumber) {
            if (isPhoneNumberExist(employee.phoneNumber)) {
                toast.error("Số điện thoại đã tồn tại!");
                return false;
            }
        }

        if (!employee.dateOfBirth) {
            toast.error("Ngày sinh không được để trống!");
            return false;
        }
        const dateOfBirth = new Date(employee.dateOfBirth);
        const today = new Date();
        if (dateOfBirth >= today) {
            toast.error("Ngày sinh không hợp lệ! Ngày sinh phải là một ngày trong quá khứ.");
            return false;
        }

        if (!employee.position) {
            toast.error("Vai trò không được để trống!");
            return false;
        }
        const validPositions = ["Nhân viên bán hàng", "Nhân viên kinh doanh", "Thủ kho"];
        if (!validPositions.includes(employee.position)) {
            toast.error("Vai trò không hợp lệ! Vui lòng chọn một vai trò từ danh sách.");
            return false;
        }

        if (!isEdit) {
            if (!imageFile) {
                toast.error("Vui lòng chọn hình ảnh cho nhân viên!");
                return false;
            }
            if (imageFile.size > 1 * 1024 * 1024) {
                toast.error("Kích thước hình ảnh phải dưới 1MB!");
                return false;
            }
            const allowedTypes = ["image/jpeg", "image/png"];
            if (!allowedTypes.includes(imageFile.type)) {
                toast.error("Chỉ chấp nhận định dạng JPEG hoặc PNG!");
                return false;
            }
        }

        return true;
    };

    const getEmployeeProfilePicture = async () => {
        if (!imageFile) return null;
        const profilePicture = await handleImageUpload();
        if (!profilePicture) {
            toast.error("Tải lên hình ảnh thất bại!");
            return null;
        }
        return profilePicture;
    };

    const handleSaveEmployee = async (isEdit: boolean) => {
        if (!validateEmployee(selectedEmployee, isEdit)) return;

        const profilePicture = imageFile ? await getEmployeeProfilePicture() : selectedEmployee.profilePicture;
        if (imageFile && !profilePicture) return;

        const employeeData = { ...selectedEmployee, profilePicture: profilePicture || '' };

        try {
            if (isEdit) {
                await dispatch(updateEmployee(employeeData)).unwrap();
                toast.success("Cập nhật nhân viên thành công!");
            } else {
                await dispatch(createEmployee(employeeData)).unwrap();
                toast.success("Thêm nhân viên thành công!");
            }
            closePopup();
        } catch (error) {
            toast.error(isEdit ? "Cập nhật nhân viên thất bại!" : "Thêm nhân viên thất bại!");
        }
    };

    const handleTrashToggle = () => {
        setIsTrashView(!isTrashView);
    };

    const handleAddEmployee = () => handleSaveEmployee(false);
    const handleEditEmployee = () => handleSaveEmployee(true);


    const handleDeleteEmployee = async (employee: Employee) => {
        const confirmed = window.confirm(`Bạn chắc chắn muốn xóa nhân viên ${employee.fullName} chứ?`);
        if (!confirmed) return;

        try {
            await dispatch(updateEmployee({ ...employee, flag: false })).unwrap();
            toast.dark("Xoá nhân viên thành công!");
        } catch (error) {
            toast.error("Xóa nhân viên thất bại!");
        }
    };

    const handleRestoreEmployee = async (employee: Employee) => {
        const confirmed = window.confirm(`Bạn chắc chắn muốn khôi phục nhân viên ${employee.fullName} chứ?`);
        if (!confirmed) return;
        try {
            await dispatch(updateEmployee({ ...employee, flag: true })).unwrap();
            toast.success("Khôi phục nhân viên thành công!");
        } catch (error) {
            toast.error("Khôi phục nhân viên thất bại!");
        }
    };

    const filteredEmployees = data.filter((employee: { fullName: string; phoneNumber: string | string[]; }) =>
        employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.phoneNumber.includes(searchQuery));

    const actionBodyTemplateTrue = (employee: Employee) => {
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
                    onClick={() => handleDeleteEmployee(employee)}
                    tooltip="Xóa"
                />

            </>
        );
    };

    const actionBodyTemplateFalse = (employee: Employee) => {
        return (
            <>
                <Button
                    icon="pi pi-refresh"
                    className="p-button-sm p-button-text text-red-500 hover:text-red-700"
                    onClick={() => handleRestoreEmployee(employee)}
                    tooltip="Khôi phục"
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
            <div className="flex justify-between items-center mb-6 p-4">
                <InputText
                    className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-100 py-2 px-4"
                    placeholder="Tìm kiếm nhân viên..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    label="Thêm nhân viên"
                    icon="pi pi-plus"
                    className="ml-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center justify-center py-2 px-4"
                    onClick={openAddPopup}
                />
            </div>
            {!isTrashView && (
                <DataTable
                    value={filteredEmployees.filter(employee => employee.flag === true)}
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
                        body={(rowData) => actionBodyTemplateTrue(rowData)}
                        header="Thao tác"
                        style={{ textAlign: 'center', width: '12rem' }}
                    />
                </DataTable>
            )}

            {isTrashView && (
                <DataTable
                    value={filteredEmployees.filter(employee => employee.flag === !true)}
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
                        body={(rowData) => actionBodyTemplateFalse(rowData)}
                        header="Thao tác"
                        style={{ textAlign: 'center', width: '12rem' }}
                    />
                </DataTable>
            )}
            <div className="flex justify-between items-center mb-6 p-4">
                <div></div>
                <Button
                    icon={isTrashView ? "pi pi-arrow-left" : "pi pi-trash"}
                    title={isTrashView ? "Quay lại danh sách" : "Xem dữ liệu thùng rác"}
                    className="p-button-rounded p-button-text"
                    onClick={handleTrashToggle}
                />
            </div>

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
