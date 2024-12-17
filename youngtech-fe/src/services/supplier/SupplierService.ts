import axios from 'axios';

const Api_url = process.env.NEXT_PUBLIC_API_URL;

// Hàm lấy tất cả nhà cung cấp
export const getAllSupplier = async () => {
    try {
        const response = await axios.get(`${Api_url}/suppliers`);
        return response.data; // Trả về dữ liệu nhà cung cấp từ API
    } catch (error) {
        // Xử lý lỗi, đảm bảo không bị lỗi khi không có response
        console.error("Error fetching data:", error?.response?.data || error.message);
        throw error; // Ném lỗi để tiếp tục xử lý ở nơi gọi hàm
    }
}

// Hàm lấy nhà cung cấp theo ID
export const getSupplierById = async (id) => {
    try {
        const response = await axios.get(`${Api_url}/suppliers/${id}`);
        return response.data; // Trả về thông tin nhà cung cấp cụ thể
    } catch (error) {
        // Xử lý lỗi, đảm bảo không bị lỗi khi không có response
        console.error('Error fetching supplier by ID:', error?.response?.data || error.message);
        throw error; // Ném lỗi để tiếp tục xử lý ở nơi gọi hàm
    }
}

// Hàm thêm dữ liệu nhà cung cấp
export const addSupplier = async (supplierData) => {
    try {
        const response = await axios.post(`${Api_url}/suppliers`, supplierData);
        console.log('Data added:', response.data); // In ra dữ liệu đã thêm
    } catch (error) {
        // Xử lý lỗi khi thêm dữ liệu
        console.error('Error adding data:', error?.response?.data || error.message);
        throw error; // Ném lỗi để tiếp tục xử lý ở nơi gọi hàm
    }
}

// Hàm cập nhật dữ liệu nhà cung cấp
export const updateSupplier = async (id, updatedSupplier) => {
    try {
        const response = await axios.put(`${Api_url}/suppliers/${id}, updatedSupplier`);
        console.log('Supplier updated:', response.data);
    } catch (error) {
        console.error('Error updating supplier data:', error.response ? error.response.data : error.message);
    }
}

// Hàm xóa dữ liệu nhà cung cấp
export const deleteSupplier = async (id) => {
    try {
        const response = await axios.delete(`${Api_url}/suppliers/${id}`);
        console.log('Data deleted:', response.data); // In ra thông tin đã xóa
    } catch (error) {
        // Xử lý lỗi khi xóa dữ liệu
        console.error('Error deleting data:', error?.response?.data || error.message);
        throw error; // Ném lỗi để tiếp tục xử lý ở nơi gọi hàm
    }
}
