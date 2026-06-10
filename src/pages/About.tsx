import { useNavigate } from 'react-router-dom';
import { Target, Eye, Heart, Award, Users, TrendingUp, Building2, Globe, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import tdtLogo from '../assets/tdt-logo.svg';

const IMG = {
  office: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  meeting: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
  workspace: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80',
  techBg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80',
  cityView: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
  handshake: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
};

const milestones = [
  { year: '2010', title: 'Thành lập công ty', desc: 'TDT Group chính thức được thành lập tại TP.HCM', img: IMG.office },
  { year: '2015', title: 'Mở rộng quy mô', desc: 'Phát triển lên 6 phòng ban với 200+ nhân viên', img: IMG.team },
  { year: '2020', title: 'Chuyển đổi số', desc: 'Áp dụng công nghệ HRM hiện đại vào quản lý', img: IMG.dashboard },
  { year: '2024', title: 'Vươn tầm khu vực', desc: 'Mở rộng hoạt động ra khu vực Đông Nam Á', img: IMG.cityView },
];

const values = [
  { icon: Target, title: 'Chuyên nghiệp', desc: 'Luôn đặt tiêu chuẩn cao trong mọi hoạt động và dịch vụ.' },
  { icon: Heart, title: 'Tận tâm', desc: 'Lấy con người làm trung tâm, chăm lo đời sống nhân viên.' },
  { icon: TrendingUp, title: 'Đổi mới', desc: 'Không ngừng cải tiến, ứng dụng công nghệ tiên tiến.' },
  { icon: Star, title: 'Chất lượng', desc: 'Cam kết chất lượng sản phẩm và dịch vụ hàng đầu.' },
];

const teamMembers = [
  { name: 'Nguyễn Duy Thuấn', role: 'Giám đốc điều hành (CEO)', initials: 'DT' },
  { name: 'Nguyễn Văn Trường', role: 'Giám đốc Nhân sự (CHRO)', initials: 'VT' },
  { name: 'Trần Bình Dương', role: 'Giám đốc Công nghệ (CTO)', initials: 'BD' },
  { name: 'Nguyễn Văn Thắng', role: 'Giám đốc Tài chính (CFO)', initials: 'VT' },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero with background image */}
      <section className="about-hero-section" style={{ backgroundImage: `linear-gradient(135deg, rgba(7, 30, 61, 0.85) 0%, rgba(15, 76, 129, 0.7) 100%), url(${IMG.office})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
        </div>
        <nav className="home-nav">
          <div className="home-nav-brand">
            <img src={tdtLogo} alt="TDT Group" className="nav-logo-img" />
            <span className="nav-logo-text">TDT Group</span>
          </div>
          <div className="home-nav-links">
            <a onClick={() => navigate('/')}>Trang chủ</a>
            <a onClick={() => navigate('/gioi-thieu')} className="active">Giới thiệu</a>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Đăng nhập</button>
          </div>
        </nav>
        <div className="hero-content" style={{ paddingBottom: 60 }}>
          <div className="hero-badge"><Building2 size={14} /> Về chúng tôi</div>
          <h1>TDT Group<br />Kiến tạo giá trị bền vững</h1>
          <p className="hero-desc">
            Với hơn 14 năm kinh nghiệm, TDT Group tự hào là đơn vị tiên phong trong lĩnh vực 
            quản trị nhân sự và chuyển đổi số doanh nghiệp tại Việt Nam.
          </p>
        </div>
      </section>

      {/* Mission with image */}
      <section className="home-split-section">
        <div className="split-image">
          <img src={IMG.team} alt="Đội ngũ TDT Group" />
        </div>
        <div className="split-content">
          <span className="section-tag">Tổng quan</span>
          <h2>Câu chuyện<br />của chúng tôi</h2>
          <p>TDT Group được thành lập với sứ mệnh mang đến giải pháp quản trị nhân sự toàn diện cho doanh nghiệp Việt Nam. 
          Chúng tôi tin rằng con người là tài sản quý giá nhất của mọi tổ chức.</p>
          <p style={{ marginTop: 12 }}>Từ một startup nhỏ, chúng tôi đã phát triển thành tập đoàn với hơn 500 nhân viên, 
          12 phòng ban và 3 chi nhánh trên khắp cả nước.</p>
        </div>
      </section>

      {/* Vision & Mission Cards with images */}
      <section className="home-features-section" style={{ background: 'var(--bg-page)' }}>
        <div className="section-header">
          <span className="section-tag">Sứ mệnh & Tầm nhìn</span>
          <h2>Định hướng phát triển</h2>
        </div>
        <div className="about-vision-grid">
          <div className="about-vision-card">
            <div className="about-vision-img">
              <img src={IMG.office} alt="Tầm nhìn" />
              <div className="about-vision-icon"><Eye size={28} /></div>
            </div>
            <div className="about-vision-body">
              <h3>Tầm nhìn</h3>
              <p>Trở thành tập đoàn hàng đầu Đông Nam Á về giải pháp quản trị nhân sự và phát triển nguồn nhân lực, 
              dẫn đầu xu hướng chuyển đổi số trong lĩnh vực HR.</p>
            </div>
          </div>
          <div className="about-vision-card">
            <div className="about-vision-img">
              <img src={IMG.handshake} alt="Sứ mệnh" />
              <div className="about-vision-icon"><Target size={28} /></div>
            </div>
            <div className="about-vision-body">
              <h3>Sứ mệnh</h3>
              <p>Cung cấp giải pháp công nghệ tiên tiến giúp doanh nghiệp tối ưu hóa quản lý nhân sự, 
              nâng cao trải nghiệm nhân viên và thúc đẩy tăng trưởng bền vững.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="home-features-section">
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

      {/* Timeline with images */}
      <section className="home-features-section" style={{ background: 'var(--bg-page)' }}>
        <div className="section-header">
          <span className="section-tag">Lịch sử phát triển</span>
          <h2>Hành trình 14 năm</h2>
        </div>
        <div className="timeline-img-grid">
          {milestones.map((m, i) => (
            <div key={i} className="timeline-img-card">
              <div className="timeline-img-wrapper">
                <img src={m.img} alt={m.title} />
                <div className="timeline-img-year">{m.year}</div>
              </div>
              <div className="timeline-img-body">
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workspace showcase */}
      <section className="home-split-section reverse">
        <div className="split-image">
          <img src={IMG.workspace} alt="Môi trường làm việc" />
        </div>
        <div className="split-content">
          <span className="section-tag">Môi trường làm việc</span>
          <h2>Nơi làm việc<br />lý tưởng</h2>
          <p>TDT Group cam kết tạo dựng một môi trường làm việc chuyên nghiệp, sáng tạo và thân thiện, 
          nơi mỗi nhân viên đều có cơ hội phát triển bản thân và đóng góp cho sự thành công chung.</p>
          <div className="split-stats">
            <div><strong>95%</strong><span>Hài lòng</span></div>
            <div><strong>90%</strong><span>Gắn bó</span></div>
            <div><strong>4.8★</strong><span>Đánh giá</span></div>
          </div>
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
      <section className="about-stats-section" style={{ backgroundImage: `url(${IMG.techBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="about-stats-overlay">
          <div className="about-stats-grid-dark">
            {[
              { icon: Users, value: '500+', label: 'Nhân viên' },
              { icon: Building2, value: '12', label: 'Phòng ban' },
              { icon: Globe, value: '3', label: 'Chi nhánh' },
              { icon: Award, value: '15+', label: 'Giải thưởng' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="about-stat-card-dark">
                  <Icon size={28} />
                  <div className="about-stat-value-dark">{s.value}</div>
                  <div className="about-stat-label-dark">{s.label}</div>
                </div>
              );
            })}
          </div>
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
            <img src={tdtLogo} alt="TDT Group" className="nav-logo-img footer-logo-img" />
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
