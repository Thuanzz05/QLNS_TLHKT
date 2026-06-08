import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles: Record<string, { title: string; breadcrumb?: string[] }> = {
  '/': { title: 'Dashboard' },
  '/nhan-vien': { title: 'Quản lý nhân viên', breadcrumb: ['Nhân viên'] },
  '/phong-ban': { title: 'Quản lý phòng ban', breadcrumb: ['Phòng ban'] },
  '/cham-cong': { title: 'Chấm công', breadcrumb: ['Chấm công'] },
  '/nghi-phep': { title: 'Quản lý nghỉ phép', breadcrumb: ['Nghỉ phép'] },
  '/tien-luong': { title: 'Bảng lương', breadcrumb: ['Tiền lương'] },
  '/hop-dong': { title: 'Hợp đồng lao động', breadcrumb: ['Hợp đồng'] },
  '/khen-thuong': { title: 'Khen thưởng - Kỷ luật', breadcrumb: ['Khen thưởng'] },
  '/bao-hiem': { title: 'Quản lý bảo hiểm', breadcrumb: ['Bảo hiểm'] },
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
