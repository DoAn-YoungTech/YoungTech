import axios from 'axios';
import { getAuthHeaders } from '@/utils/session';

const Api_url = process.env.NEXT_PUBLIC_API_URL;

export const getRoles = async () => {
  const headers = await getAuthHeaders();
  try {
    const response = await axios.get(`${Api_url}/roles/getAllRole`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
