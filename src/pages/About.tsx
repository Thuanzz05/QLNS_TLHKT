import { useNavigate } from 'react-router-dom';
import { Target, Eye, Heart, Award, Users, TrendingUp, Building2, Globe, ArrowRight, CheckCircle2, Star } from 'lucide-react';

const milestones = [
  { year: '2010', title: 'Thành lập công ty', desc: 'TDT Group chính thức được thành lập tại TP.HCM' },
  { year: '2015', title: 'Mở rộng quy mô', desc: 'Phát triển lên 6 phòng ban với 200+ nhân viên' },
  { year: '2020', title: 'Chuyển đổi số', desc: 'Áp dụng công nghệ HRM hiện đại vào quản lý' },
  { year: '2024', title: 'Vươn tầm khu vực', desc: 'Mở rộng hoạt động ra khu vực Đông Nam Á' },
];

const values = [
  { icon: Target, title: 'Chuyên nghiệp', desc: 'Luôn đặt tiêu chuẩn cao trong mọi hoạt động và dịch vụ.' },
  { icon: Heart, title: 'Tận tâm', desc: 'Lấy con người làm trung tâm, chăm lo đời sống nhân viên.' },
  { icon: TrendingUp, title: 'Đổi mới', desc: 'Không ngừng cải tiến, ứng dụng công nghệ tiên tiến.' },
  { icon: Star, title: 'Chất lượng', desc: 'Cam kết chất lượng sản phẩm và dịch vụ hàng đầu.' },
];

const teamMembers = [
  { name: 'Nguyễn Văn Minh', role: 'Giám đốc điều hành (CEO)', initials: 'NM' },
  { name: 'Trần Thị Lan', role: 'Giám đốc Nhân sự (CHRO)', initials: 'TL' },
  { name: 'Phạm Đức Hoàng', role: 'Giám đốc Công nghệ (CTO)', initials: 'PH' },
  { name: 'Lê Thị Mai', role: 'Giám đốc Tài chính (CFO)', initials: 'LM' },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Navigation */}
      <section className="about-hero-section">
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
        </div>
        <nav className="home-nav">
          <div className="home-nav-brand">
            <div className="nav-logo-icon">TDT</div>
            <span className="nav-logo-text">TDT Group</span>
          </div>
          <div className="home-nav-links">
            <a onClick={() => navigate('/')}>Trang chủ</a>
            <a onClick={() => navigate('/gioi-thieu')} className="active">Giới thiệu</a>
            <a onClick={() => navigate('/dashboard')}>Dashboard</a>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Đăng nhập</button>
          </div>
        </nav>
        <div className="hero-content" style={{ paddingBottom: 60 }}>
          <div className="hero-badge"><Building2 size={14} /> Về chúng tôi</div>
          <h1>TDT Group<br /><span className="hero-gradient-text">Kiến tạo giá trị bền vững</span></h1>
          <p className="hero-desc">
            Với hơn 14 năm kinh nghiệm, TDT Group tự hào là đơn vị tiên phong trong lĩnh vực 
            quản trị nhân sự và chuyển đổi số doanh nghiệp tại Việt Nam.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="home-features-section">
        <div className="section-header">
          <span className="section-tag">Tổng quan</span>
          <h2>Sứ mệnh & Tầm nhìn</h2>
        </div>
        <div className="about-mission-grid">
          <div className="about-mission-card">
            <div className="feature-icon-wrap"><Eye size={24} /></div>
            <h3>Tầm nhìn</h3>
            <p>Trở thành tập đoàn hàng đầu Đông Nam Á về giải pháp quản trị nhân sự và phát triển nguồn nhân lực, 
            dẫn đầu xu hướng chuyển đổi số trong lĩnh vực HR.</p>
          </div>
          <div className="about-mission-card">
            <div className="feature-icon-wrap"><Target size={24} /></div>
            <h3>Sứ mệnh</h3>
            <p>Cung cấp giải pháp công nghệ tiên tiến giúp doanh nghiệp tối ưu hóa quản lý nhân sự, 
            nâng cao trải nghiệm nhân viên và thúc đẩy tăng trưởng bền vững.</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="home-features-section" style={{ background: 'var(--bg-page)' }}>
        <div className="section-header">
          <span className="section-tag">Giá trị cốt lõi</span>
          <h2>Nền tảng phát triển của chúng tôi</h2>
          <p>Những giá trị định hướng mọi hoạt động và quyết định của TDT Group.</p>
        </div>
        <div className="features-grid">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="feature-card">
                <div className="feature-icon-wrap"><Icon size={24} /></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="home-features-section">
        <div className="section-header">
          <span className="section-tag">Lịch sử phát triển</span>
          <h2>Hành trình 14 năm</h2>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">{m.year}</div>
              <div className="timeline-content">
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="home-features-section" style={{ background: 'var(--bg-page)' }}>
        <div className="section-header">
          <span className="section-tag">Ban lãnh đạo</span>
          <h2>Đội ngũ điều hành</h2>
          <p>Những người dẫn dắt TDT Group vươn tầm quốc tế.</p>
        </div>
        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <div key={i} className="team-card">
              <div className="team-avatar">{m.initials}</div>
              <h4>{m.name}</h4>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats-section">
        <div className="about-stats-grid">
          {[
            { icon: Users, value: '500+', label: 'Nhân viên' },
            { icon: Building2, value: '12', label: 'Phòng ban' },
            { icon: Globe, value: '3', label: 'Chi nhánh' },
            { icon: Award, value: '15+', label: 'Giải thưởng' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="about-stat-card">
                <Icon size={28} />
                <div className="about-stat-value">{s.value}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta-section">
        <div className="cta-content">
          <h2>Gia nhập TDT Group</h2>
          <p>Khám phá cơ hội nghề nghiệp và trở thành một phần của đội ngũ tài năng.</p>
          <div className="cta-features">
            {['Môi trường năng động', 'Phúc lợi hấp dẫn', 'Cơ hội thăng tiến'].map((t, i) => (
              <div key={i} className="cta-feature-item"><CheckCircle2 size={16} /> {t}</div>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
            Truy cập hệ thống <ArrowRight size={18} />
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
