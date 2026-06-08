import { FileText, Shield, Award, Settings } from 'lucide-react';

function PlaceholderPage({ title, icon: Icon, desc }: { title: string; icon: React.ElementType; desc: string }) {
  return (
    <div className="slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: 20, background: 'var(--primary-bg)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <Icon size={36} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: 400 }}>{desc}</p>
      <button className="btn btn-primary" style={{ marginTop: 20 }}>Đang phát triển</button>
    </div>
  );
}

export function Contracts() { return <PlaceholderPage title="Hợp đồng lao động" icon={FileText} desc="Quản lý hợp đồng, theo dõi thời hạn và gia hạn hợp đồng nhân viên." />; }
export function Insurance() { return <PlaceholderPage title="Quản lý bảo hiểm" icon={Shield} desc="Theo dõi bảo hiểm xã hội, bảo hiểm y tế và bảo hiểm thất nghiệp." />; }
export function Rewards() { return <PlaceholderPage title="Khen thưởng - Kỷ luật" icon={Award} desc="Ghi nhận thành tích, khen thưởng và xử lý kỷ luật nhân viên." />; }
export function SystemSettings() { return <PlaceholderPage title="Cài đặt hệ thống" icon={Settings} desc="Quản lý tài khoản, phân quyền và cấu hình hệ thống." />; }
