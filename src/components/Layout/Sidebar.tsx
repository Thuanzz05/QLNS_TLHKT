import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Clock, CalendarOff, BarChart3, Settings, LogOut, Home, Building2, FileText, Wallet } from 'lucide-react';
import tdtLogo from '../../assets/tdt-logo.svg';

const menuItems = [
  { section: 'QUẢN LÝ NHÂN SỰ', items: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'employees', label: 'Quản lý nhân viên', icon: Users, path: '/nhan-vien' },
    { id: 'departments', label: 'Quản lý phòng ban', icon: Building2, path: '/phong-ban' },
    { id: 'attendance', label: 'Chấm công', icon: Clock, path: '/cham-cong' },
    { id: 'leave', label: 'Quản lý nghỉ phép', icon: CalendarOff, path: '/nghi-phep' },
  ]},
  { section: 'LƯƠNG & HỢP ĐỒNG', items: [
    { id: 'contracts', label: 'Hợp đồng lao động', icon: FileText, path: '/hop-dong' },
    { id: 'payroll', label: 'Tính lương', icon: Wallet, path: '/tinh-luong' },
  ]},
  { section: 'HỆ THỐNG', items: [
    { id: 'reports', label: 'Báo cáo thống kê', icon: BarChart3, path: '/bao-cao' },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: Settings, path: '/he-thong' },
  ]},
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={tdtLogo} alt="TDT Group" className="sidebar-logo-img" />
        <div>
          <h1>TDT Group</h1>
          <span>Quản lý nhân sự</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((section) => (
          <div key={section.section}>
            <div className="nav-section-title">{section.section}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <a
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="nav-icon" size={20} />
                  {item.label}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: '0 10px 10px' }}>
        <a className="nav-item" onClick={() => navigate('/')}>
          <Home className="nav-icon" size={20} />
          Về trang chủ
        </a>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <div className="user-name">Admin HR</div>
            <div className="user-role">Quản trị viên</div>
          </div>
          <LogOut size={16} style={{ opacity: 0.5, cursor: 'pointer' }} onClick={() => navigate('/login')} />
        </div>
      </div>
    </aside>
  );
}
