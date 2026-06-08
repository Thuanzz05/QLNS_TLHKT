import { useState } from 'react';
import { Bell, Search, MessageSquare, ChevronRight, X } from 'lucide-react';
import { notifications } from '../../data/mockData';

interface HeaderProps {
  title: string;
  breadcrumb?: string[];
}

export default function Header({ title, breadcrumb }: HeaderProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [search, setSearch] = useState('');
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="header">
      <div className="header-left">
        <div>
          <h2>{title}</h2>
          {breadcrumb && (
            <div className="header-breadcrumb">
              <span>Trang chủ</span>
              {breadcrumb.map((item, i) => (
                <span key={i}><ChevronRight size={12} /> {item}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Tìm kiếm nhân viên, phòng ban..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="header-btn" title="Tin nhắn">
          <MessageSquare size={20} />
        </button>

        <div style={{ position: 'relative' }}>
          <button className="header-btn" onClick={() => setShowNotif(!showNotif)} title="Thông báo">
            <Bell size={20} />
            {unreadCount > 0 && <span className="badge-dot" />}
          </button>

          {showNotif && (
            <div style={{
              position: 'absolute', right: 0, top: '100%', marginTop: 8,
              width: 360, background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', zIndex: 100,
              animation: 'slideUp 0.2s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>Thông báo ({unreadCount})</span>
                <button onClick={() => setShowNotif(false)} style={{ background: 'none', color: 'var(--text-muted)' }}><X size={16} /></button>
              </div>
              <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '12px 18px', borderBottom: '1px solid var(--border-light)',
                    background: n.read ? 'transparent' : 'var(--primary-bg)',
                    cursor: 'pointer', transition: 'var(--transition)'
                  }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{n.message}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
