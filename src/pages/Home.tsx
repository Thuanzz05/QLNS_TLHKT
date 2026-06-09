import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Shield, Clock, ArrowRight, CheckCircle2, Zap, Globe, Monitor, Headphones } from 'lucide-react';

const IMG = {
  dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  workspace: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80',
  meeting: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
  analytics: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  security: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80',
  techBg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80',
  office: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
};

const features = [
  { icon: Users, title: 'Quản lý Nhân sự', desc: 'Theo dõi thông tin, hồ sơ và hiệu suất của toàn bộ nhân viên trong tổ chức.', img: IMG.team },
  { icon: Clock, title: 'Chấm công & Nghỉ phép', desc: 'Tự động hóa quy trình chấm công, quản lý nghỉ phép chính xác.', img: IMG.meeting },
  { icon: BarChart3, title: 'Báo cáo Thống kê', desc: 'Phân tích dữ liệu nhân sự trực quan với biểu đồ và dashboard.', img: IMG.analytics },
  { icon: Shield, title: 'Bảo mật & Phân quyền', desc: 'Hệ thống phân quyền chi tiết, bảo mật thông tin doanh nghiệp.', img: IMG.security },
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
        </div>
        {/* Hero Dashboard Preview */}
        <div className="hero-image-wrapper">
          <div className="hero-image-glow" />
          <img src={IMG.dashboard} alt="HRM Dashboard Preview" className="hero-image" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        {stats.map((s, i) => (
          <div key={i} className="stats-bar-item">
            <div className="stats-bar-value">{s.value}</div>
            <div className="stats-bar-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* About Preview Section with Image */}
      <section className="home-split-section">
        <div className="split-image">
          <img src={IMG.team} alt="Đội ngũ TDT Group" />
        </div>
        <div className="split-content">
          <span className="section-tag">Về chúng tôi</span>
          <h2>Đội ngũ chuyên nghiệp,<br />giải pháp toàn diện</h2>
          <p>Với hơn 14 năm kinh nghiệm, TDT Group tự hào là đơn vị tiên phong trong lĩnh vực quản trị nhân sự và chuyển đổi số doanh nghiệp tại Việt Nam.</p>
          <div className="split-stats">
            <div><strong>14+</strong><span>Năm kinh nghiệm</span></div>
            <div><strong>500+</strong><span>Nhân viên</span></div>
            <div><strong>50+</strong><span>Đối tác</span></div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/gioi-thieu')}>
            Tìm hiểu thêm <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className="home-features-section" style={{ background: 'var(--bg-page)' }}>
        <div className="section-header">
          <span className="section-tag">Tính năng nổi bật</span>
          <h2>Giải pháp toàn diện cho<br />quản lý nhân sự</h2>
          <p>Tích hợp đầy đủ các module cần thiết để vận hành hiệu quả bộ máy nhân sự doanh nghiệp.</p>
        </div>
        <div className="features-img-grid">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="feature-img-card">
                <div className="feature-img-wrapper">
                  <img src={f.img} alt={f.title} />
                  <div className="feature-img-overlay">
                    <Icon size={28} />
                  </div>
                </div>
                <div className="feature-img-body">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Showcase Section */}
      <section className="home-split-section reverse">
        <div className="split-image">
          <img src={IMG.workspace} alt="HR Workspace" />
        </div>
        <div className="split-content">
          <span className="section-tag">Tại sao chọn chúng tôi?</span>
          <h2>Công nghệ hiện đại,<br />trải nghiệm vượt trội</h2>
          <div className="why-list">
            <div className="why-item">
              <div className="why-icon"><Monitor size={20} /></div>
              <div>
                <strong>Giao diện trực quan</strong>
                <p>Thiết kế hiện đại, dễ sử dụng trên mọi thiết bị</p>
              </div>
            </div>
            <div className="why-item">
              <div className="why-icon"><Shield size={20} /></div>
              <div>
                <strong>Bảo mật tối đa</strong>
                <p>Mã hóa dữ liệu, phân quyền chi tiết theo vai trò</p>
              </div>
            </div>
            <div className="why-item">
              <div className="why-icon"><Headphones size={20} /></div>
              <div>
                <strong>Hỗ trợ 24/7</strong>
                <p>Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ mọi lúc</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with background image */}
      <section className="home-cta-section" style={{ backgroundImage: `url(${IMG.techBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}>
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
