import cookies from 'js-cookie';

export const getAuthHeaders = () => {
  const token = cookies.get('token');
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};
