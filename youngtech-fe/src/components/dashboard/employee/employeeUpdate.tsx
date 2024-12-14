'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UpdateUserForm() {
  const router = useRouter();
  const [id, setId] = useState(null); // Lưu accountId
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    position: '',
    profilePicture: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id); // Lấy accountId từ URL
    }
  }, [router.isReady, router.query.id]);

  // Hàm xử lý khi thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      setMessage('Account ID is not available!');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/employees/updateInformationEmployee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee information');
      }

      const data = await response.json();
      setMessage('Employee information updated successfully!');
      console.log(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Lấy dữ liệu ban đầu của nhân viên
  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:8080/api/employees/viewOnlyEmployee/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch employee data');
          }
          const data = await response.json();
          setFormData(data); // Điền dữ liệu vào form
        } catch (error) {
          setMessage(`Error: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">Update Employee Information</h1>
      {loading ? (
        <p className="text-center text-blue-500">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Profile Picture (URL)</label>
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      )}
      {message && (
        <p className={`text-center mt-4 ${message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
