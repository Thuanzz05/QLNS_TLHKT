import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Settings, LogOut, Home } from 'lucide-react';

const menuItems = [
  { section: 'QUẢN TRỊ', items: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
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
