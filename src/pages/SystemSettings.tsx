import { useState } from 'react';
import { Settings, User, Bell, Shield, Palette, Database, Save, ChevronRight, Moon, Sun, Globe, Lock, Mail, ToggleLeft, ToggleRight } from 'lucide-react';

const tabs = [
  { id: 'general', label: 'Tổng quát', icon: Settings },
  { id: 'account', label: 'Tài khoản', icon: User },
  { id: 'notifications', label: 'Thông báo', icon: Bell },
  { id: 'security', label: 'Bảo mật', icon: Shield },
  { id: 'appearance', label: 'Giao diện', icon: Palette },
  { id: 'data', label: 'Dữ liệu', icon: Database },
];

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'TDT Group',
    email: 'admin@tdtgroup.vn',
    phone: '028-1234-5678',
    address: 'Quận 1, TP. Hồ Chí Minh',
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    darkMode: false,
    emailNotif: true,
    pushNotif: true,
    reportNotif: false,
    twoFactor: false,
    sessionTimeout: '30',
    autoBackup: true,
    backupFreq: 'daily',
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const ToggleSwitch = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className={`toggle-switch ${active ? 'active' : ''}`}>
      {active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
    </button>
  );

  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1>Cài đặt hệ thống</h1><p>Quản lý cấu hình và tùy chỉnh hệ thống</p></div>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={16} /> {saved ? '✓ Đã lưu!' : 'Lưu thay đổi'}
        </button>
      </div>

      <div className="settings-layout">
        {/* Sidebar Tabs */}
        <div className="settings-sidebar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                <ChevronRight size={14} className="tab-arrow" />
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-panel fade-in">
              <h3 className="settings-panel-title">Thông tin tổ chức</h3>
              <p className="settings-panel-desc">Cấu hình thông tin cơ bản của doanh nghiệp</p>
              <div className="settings-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Tên công ty</label>
                    <input className="form-input" value={settings.companyName} onChange={e => setSettings({...settings, companyName: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email liên hệ</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input className="form-input" style={{ paddingLeft: 40 }} value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Số điện thoại</label>
                    <input className="form-input" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Địa chỉ</label>
                    <input className="form-input" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label"><Globe size={14} style={{ marginRight: 6 }} />Ngôn ngữ</label>
                    <select className="form-input" value={settings.language} onChange={e => setSettings({...settings, language: e.target.value})}>
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Múi giờ</label>
                    <select className="form-input" value={settings.timezone} onChange={e => setSettings({...settings, timezone: e.target.value})}>
                      <option value="Asia/Ho_Chi_Minh">GMT+7 (Hồ Chí Minh)</option>
                      <option value="Asia/Bangkok">GMT+7 (Bangkok)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="settings-panel fade-in">
              <h3 className="settings-panel-title">Thông tin tài khoản</h3>
              <p className="settings-panel-desc">Quản lý thông tin cá nhân và tài khoản đăng nhập</p>
              <div className="account-profile-card">
                <div className="avatar xl">AD</div>
                <div>
                  <h4>Admin HR</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Quản trị viên hệ thống</p>
                  <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }}>Thay đổi ảnh đại diện</button>
                </div>
              </div>
              <div className="settings-form">
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Họ và tên</label><input className="form-input" defaultValue="Admin HR" /></div>
                  <div className="form-group"><label className="form-label">Email</label><input className="form-input" defaultValue="admin@tdtgroup.vn" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Số điện thoại</label><input className="form-input" defaultValue="0901234567" /></div>
                  <div className="form-group"><label className="form-label">Chức vụ</label><input className="form-input" defaultValue="Quản trị viên" disabled /></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-panel fade-in">
              <h3 className="settings-panel-title">Cài đặt thông báo</h3>
              <p className="settings-panel-desc">Quản lý cách nhận thông báo từ hệ thống</p>
              <div className="settings-toggle-list">
                <div className="settings-toggle-item">
                  <div><div className="toggle-label">Thông báo Email</div><div className="toggle-desc">Nhận thông báo qua email khi có sự kiện quan trọng</div></div>
                  <ToggleSwitch active={settings.emailNotif as boolean} onToggle={() => toggle('emailNotif')} />
                </div>
                <div className="settings-toggle-item">
                  <div><div className="toggle-label">Thông báo đẩy</div><div className="toggle-desc">Hiển thị thông báo trên trình duyệt</div></div>
                  <ToggleSwitch active={settings.pushNotif as boolean} onToggle={() => toggle('pushNotif')} />
                </div>
                <div className="settings-toggle-item">
                  <div><div className="toggle-label">Báo cáo định kỳ</div><div className="toggle-desc">Nhận báo cáo tổng hợp hàng tuần qua email</div></div>
                  <ToggleSwitch active={settings.reportNotif as boolean} onToggle={() => toggle('reportNotif')} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-panel fade-in">
              <h3 className="settings-panel-title">Bảo mật</h3>
              <p className="settings-panel-desc">Cấu hình bảo mật và quyền truy cập</p>
              <div className="settings-toggle-list">
                <div className="settings-toggle-item">
                  <div><div className="toggle-label"><Lock size={16} style={{ marginRight: 6 }} />Xác thực 2 yếu tố (2FA)</div><div className="toggle-desc">Bảo vệ tài khoản bằng mã xác thực bổ sung</div></div>
                  <ToggleSwitch active={settings.twoFactor as boolean} onToggle={() => toggle('twoFactor')} />
                </div>
              </div>
              <div className="settings-form" style={{ marginTop: 20 }}>
                <div className="form-group">
                  <label className="form-label">Thời gian hết phiên (phút)</label>
                  <select className="form-input" style={{ maxWidth: 200 }} value={settings.sessionTimeout} onChange={e => setSettings({...settings, sessionTimeout: e.target.value})}>
                    <option value="15">15 phút</option>
                    <option value="30">30 phút</option>
                    <option value="60">60 phút</option>
                    <option value="120">120 phút</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <button className="btn btn-danger btn-sm">Đổi mật khẩu</button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-panel fade-in">
              <h3 className="settings-panel-title">Giao diện</h3>
              <p className="settings-panel-desc">Tùy chỉnh giao diện hiển thị</p>
              <div className="settings-toggle-list">
                <div className="settings-toggle-item">
                  <div>
                    <div className="toggle-label">{settings.darkMode ? <Moon size={16} style={{ marginRight: 6 }} /> : <Sun size={16} style={{ marginRight: 6 }} />}Chế độ tối</div>
                    <div className="toggle-desc">Chuyển đổi giữa giao diện sáng và tối</div>
                  </div>
                  <ToggleSwitch active={settings.darkMode as boolean} onToggle={() => toggle('darkMode')} />
                </div>
              </div>
              <div style={{ marginTop: 24 }}>
                <label className="form-label">Màu chủ đạo</label>
                <div className="color-palette">
                  {['#0F4C81', '#059669', '#7C3AED', '#EA580C', '#DC2626', '#0891B2'].map(c => (
                    <div key={c} className={`color-swatch ${c === '#0F4C81' ? 'active' : ''}`} style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="settings-panel fade-in">
              <h3 className="settings-panel-title">Quản lý dữ liệu</h3>
              <p className="settings-panel-desc">Sao lưu, phục hồi và quản lý dữ liệu hệ thống</p>
              <div className="settings-toggle-list">
                <div className="settings-toggle-item">
                  <div><div className="toggle-label"><Database size={16} style={{ marginRight: 6 }} />Tự động sao lưu</div><div className="toggle-desc">Sao lưu dữ liệu tự động theo lịch trình</div></div>
                  <ToggleSwitch active={settings.autoBackup as boolean} onToggle={() => toggle('autoBackup')} />
                </div>
              </div>
              {settings.autoBackup && (
                <div className="settings-form" style={{ marginTop: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Tần suất sao lưu</label>
                    <select className="form-input" style={{ maxWidth: 200 }} value={settings.backupFreq} onChange={e => setSettings({...settings, backupFreq: e.target.value})}>
                      <option value="daily">Hàng ngày</option>
                      <option value="weekly">Hàng tuần</option>
                      <option value="monthly">Hàng tháng</option>
                    </select>
                  </div>
                </div>
              )}
              <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                <button className="btn btn-secondary">Sao lưu ngay</button>
                <button className="btn btn-secondary">Phục hồi dữ liệu</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
