import axios from 'axios';

const Api_url = process.env.NEXT_PUBLIC_API_URL;

// Hàm thêm dữ liệu category
export const addCategory = async (name) => {
    try {
        const response = await axios.post(`${Api_url}/parencategories`, name);
        console.log('Data added:', response.data);
    } catch (error) {
        console.error('Error adding data:', error.response ? error.response.data : error.message);
    }
}

// Hàm cập nhật dữ liệu category
export const updateCategory = async (id, updatedCategory) => {
    try {
        const response = await axios.put(`${Api_url}/parencategories/${id}`, updatedCategory);
        console.log('Data updated:', response.data);
    } catch (error) {
        console.error('Error updating data:', error.response ? error.response.data : error.message);
    }
}

// Hàm xóa dữ liệu
export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${Api_url}/parencategories/${id}`);
        console.log('Data deleted:', response.data);
    } catch (error) {
        console.error('Error deleting data:', error.response ? error.response.data : error.message);
    }
}
