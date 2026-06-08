import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Attendance from './pages/Attendance';
import LeaveManagement from './pages/LeaveManagement';
import Payroll from './pages/Payroll';
import Reports from './pages/Reports';
import { Contracts, Insurance, Rewards, SystemSettings } from './pages/PlaceholderPages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nhan-vien" element={<Employees />} />
          <Route path="/phong-ban" element={<Departments />} />
          <Route path="/cham-cong" element={<Attendance />} />
          <Route path="/nghi-phep" element={<LeaveManagement />} />
          <Route path="/tien-luong" element={<Payroll />} />
          <Route path="/hop-dong" element={<Contracts />} />
          <Route path="/khen-thuong" element={<Rewards />} />
          <Route path="/bao-hiem" element={<Insurance />} />
          <Route path="/bao-cao" element={<Reports />} />
          <Route path="/he-thong" element={<SystemSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
