import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles: Record<string, { title: string; breadcrumb?: string[] }> = {
  '/dashboard': { title: 'Dashboard quản trị' },
  '/phong-ban': { title: 'Quản lý phòng ban', breadcrumb: ['Nhân sự', 'Phòng ban'] },
  '/hop-dong': { title: 'Hợp đồng lao động', breadcrumb: ['Hợp đồng'] },
  '/tinh-luong': { title: 'Tính lương nhân viên', breadcrumb: ['Lương & Hợp đồng', 'Tính lương'] },
  '/bao-cao': { title: 'Báo cáo thống kê', breadcrumb: ['Báo cáo'] },
  '/he-thong': { title: 'Cài đặt hệ thống', breadcrumb: ['Hệ thống'] },
};

export default function Layout() {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || { title: 'TDT Group HRM' };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header title={pageInfo.title} breadcrumb={pageInfo.breadcrumb} />
        <main className="main-content fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
