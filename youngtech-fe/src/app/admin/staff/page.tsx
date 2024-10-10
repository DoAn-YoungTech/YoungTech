"use client"
import { useRouter } from 'next/navigation';

const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

  const handleAddClick = () => {
    router.push('/admin/staff/add'); // Điều hướng đến /admin/staff/add
  };

  const handleEditClick = () => {
    router.push('/admin/staff/edit'); // Điều hướng đến /admin/staff/edit
  };
  return (
   <h1><div>
   <button onClick={handleAddClick}>Add Staff</button> <br />
   <button onClick={handleEditClick}>Edit Staff</button>
 </div></h1>
  )
}

export default page
