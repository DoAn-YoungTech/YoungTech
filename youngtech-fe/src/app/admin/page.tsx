"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const AdminPage = () => {
  const router = useRouter();

  
  const handleStaffClick = () => {
    router.push('/admin/staff'); // Điều hướng đến /admin/staff/edit
  };


  return (
     <button onClick={handleStaffClick}>Staff</button>
  );
};

export default AdminPage;
