import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Clock, CalendarOff, Wallet, Award, Shield, BarChart3, Settings, FileText, LogOut } from 'lucide-react';

const menuItems = [
  { section: 'CHÍNH', items: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'employees', label: 'Nhân viên', icon: Users, path: '/nhan-vien' },
    { id: 'departments', label: 'Phòng ban', icon: Building2, path: '/phong-ban' },
  ]},
  { section: 'NGHIỆP VỤ', items: [
    { id: 'attendance', label: 'Chấm công', icon: Clock, path: '/cham-cong' },
    { id: 'leave', label: 'Nghỉ phép', icon: CalendarOff, path: '/nghi-phep', badge: 3 },
    { id: 'payroll', label: 'Tiền lương', icon: Wallet, path: '/tien-luong' },
    { id: 'contracts', label: 'Hợp đồng', icon: FileText, path: '/hop-dong' },
  ]},
  { section: 'KHÁC', items: [
    { id: 'rewards', label: 'Khen thưởng - Kỷ luật', icon: Award, path: '/khen-thuong' },
    { id: 'insurance', label: 'Bảo hiểm', icon: Shield, path: '/bao-hiem' },
    { id: 'reports', label: 'Báo cáo thống kê', icon: BarChart3, path: '/bao-cao' },
    { id: 'settings', label: 'Hệ thống', icon: Settings, path: '/he-thong' },
  ]},
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">TDT</div>
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
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

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
