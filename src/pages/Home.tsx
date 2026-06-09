import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Shield, Clock, ArrowRight, CheckCircle2, Zap, Globe } from 'lucide-react';

const features = [
  { icon: Users, title: 'Quản lý Nhân sự', desc: 'Theo dõi thông tin, hồ sơ và hiệu suất của toàn bộ nhân viên trong tổ chức.' },
  { icon: Clock, title: 'Chấm công & Nghỉ phép', desc: 'Tự động hóa quy trình chấm công, quản lý nghỉ phép chính xác.' },
  { icon: BarChart3, title: 'Báo cáo Thống kê', desc: 'Phân tích dữ liệu nhân sự trực quan với biểu đồ và dashboard.' },
  { icon: Shield, title: 'Bảo mật & Phân quyền', desc: 'Hệ thống phân quyền chi tiết, bảo mật thông tin doanh nghiệp.' },
];

const stats = [
  { value: '500+', label: 'Nhân viên' },
  { value: '12', label: 'Phòng ban' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Hỗ trợ' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
        </div>
        <nav className="home-nav">
          <div className="home-nav-brand">
            <div className="nav-logo-icon">TDT</div>
            <span className="nav-logo-text">TDT Group</span>
          </div>
          <div className="home-nav-links">
            <a onClick={() => navigate('/')}>Trang chủ</a>
            <a onClick={() => navigate('/gioi-thieu')}>Giới thiệu</a>
            <a onClick={() => navigate('/dashboard')}>Dashboard</a>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Đăng nhập</button>
          </div>
        </nav>
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} /> Hệ thống HRM thế hệ mới
          </div>
          <h1>Quản lý Nhân sự<br /><span className="hero-gradient-text">Thông minh & Hiệu quả</span></h1>
          <p className="hero-desc">
            Nền tảng quản lý nhân sự toàn diện cho doanh nghiệp hiện đại. 
            Tối ưu hóa quy trình, nâng cao hiệu suất và xây dựng đội ngũ vững mạnh.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg hero-btn-primary" onClick={() => navigate('/login')}>
              Bắt đầu ngay <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg hero-btn-secondary" onClick={() => navigate('/gioi-thieu')}>
              <Globe size={18} /> Tìm hiểu thêm
            </button>
          </div>
          <div className="hero-stats">
            {stats.map((s, i) => (
              <div key={i} className="hero-stat-item">
                <div className="hero-stat-value">{s.value}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features-section">
        <div className="section-header">
          <span className="section-tag">Tính năng nổi bật</span>
          <h2>Giải pháp toàn diện cho<br />quản lý nhân sự</h2>
          <p>Tích hợp đầy đủ các module cần thiết để vận hành hiệu quả bộ máy nhân sự doanh nghiệp.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="feature-card">
                <div className="feature-icon-wrap">
                  <Icon size={24} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="feature-link">
                  Khám phá <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta-section">
        <div className="cta-content">
          <h2>Sẵn sàng chuyển đổi số?</h2>
          <p>Đăng nhập ngay để trải nghiệm hệ thống quản lý nhân sự hiện đại của TDT Group.</p>
          <div className="cta-features">
            {['Triển khai nhanh chóng', 'Hỗ trợ 24/7', 'Bảo mật tuyệt đối'].map((t, i) => (
              <div key={i} className="cta-feature-item">
                <CheckCircle2 size={16} /> {t}
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
            Đăng nhập hệ thống <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="nav-logo-icon">TDT</div>
            <div>
              <div className="footer-brand-name">TDT Group</div>
              <div className="footer-brand-desc">Hệ thống Quản lý Nhân sự</div>
            </div>
          </div>
          <div className="footer-copy">© 2024 TDT Group. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
