export interface Employee {
    id: number;
    flag: boolean;
    fullName: string;
    profilePicture: string;
    dateOfBirth: string;
    phoneNumber: string;
    position: string;
    account_id: number;
  }
  
  export interface EmployeeState {
    employee: Employee[];
    loading: boolean;
    error: string | null;
  }
  
 
  