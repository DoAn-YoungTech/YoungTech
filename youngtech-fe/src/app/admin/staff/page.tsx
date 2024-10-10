import { Metadata } from 'next';
import StaffLayout from './layoutStaff';
import PersonalInfo from '@/components/personal-information';

export const metadata:Metadata = {
  title: 'Staff Home',
  description: 'Staff home page',
}
export default function StaffHome() {
  return (
    <StaffLayout>
      <h1>Staff Home</h1>
      <PersonalInfo />
    </StaffLayout>
  );
}
