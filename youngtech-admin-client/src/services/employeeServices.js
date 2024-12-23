import { getAuthHeaders } from '@/utils/session';

const Api_url = process.env.NEXT_PUBLIC_API_URL;

// Lấy danh sách nhân viên
export const getEmployees = async () => {
  const headers = await getAuthHeaders();
  try {
    const response = await fetch(`${Api_url}/employees/viewingListEmployee`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      console.log('Máy chủ đang trong chế độ bảo trì');
      return { message: [] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Máy chủ đang trong chế độ bảo trì');
    return { message: [] };
  }
};
