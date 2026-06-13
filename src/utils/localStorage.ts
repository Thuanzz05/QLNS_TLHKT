// LocalStorage utility functions

const STORAGE_KEYS = {
  EMPLOYEES: 'hrms_employees',
  ATTENDANCE: 'hrms_attendance',
  LEAVE_REQUESTS: 'hrms_leave_requests',
};

// Generic functions
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Employees
export const getEmployees = () => {
  return getFromStorage(STORAGE_KEYS.EMPLOYEES, []);
};

export const saveEmployees = (employees: any[]) => {
  saveToStorage(STORAGE_KEYS.EMPLOYEES, employees);
};

// Attendance
export const getAttendance = () => {
  return getFromStorage(STORAGE_KEYS.ATTENDANCE, []);
};

export const saveAttendance = (records: any[]) => {
  saveToStorage(STORAGE_KEYS.ATTENDANCE, records);
};

// Leave Requests
export const getLeaveRequests = () => {
  return getFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
};

export const saveLeaveRequests = (requests: any[]) => {
  saveToStorage(STORAGE_KEYS.LEAVE_REQUESTS, requests);
};

// Initialize with mock data if empty
export const initializeStorage = (mockEmployees: any[], mockAttendance: any[], mockLeaveRequests: any[]) => {
  if (getEmployees().length === 0) {
    saveEmployees(mockEmployees);
  }
  if (getAttendance().length === 0) {
    saveAttendance(mockAttendance);
  }
  if (getLeaveRequests().length === 0) {
    saveLeaveRequests(mockLeaveRequests);
  }
};
