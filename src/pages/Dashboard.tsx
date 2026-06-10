import { useState, useEffect } from 'react';
import { Users, Building2, CalendarOff, Wallet, TrendingUp, TrendingDown, AlertTriangle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts';
import { employees, leaveRequests, monthlyEmployeeData, departmentDistribution, attendanceSummary, payrollSummary } from '../data/mockData';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 350); return () => clearTimeout(t); }, []);

  const pendingLeaves = leaveRequests.filter(l => l.trangThai === 'Chờ duyệt').length;
  const trialEmployees = employees.filter(e => e.trangThai === 'Thử việc').length;

  if (loading) {
    return (
      <div>
        <div className="kpi-grid">
          {[1,2,3,4].map(i => <div key={i} className="skeleton skeleton-card" />)}
        </div>
        <div className="dashboard-grid">
          <div className="skeleton" style={{ height: 300, borderRadius: 14 }} />
          <div className="skeleton" style={{ height: 300, borderRadius: 14 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="slide-up">
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card blue">
          <div className="kpi-header">
            <div className="kpi-icon"><Users size={22} /></div>
            <span className="kpi-change up"><TrendingUp size={12} /> +3.2%</span>
          </div>
          <div className="kpi-value">{employees.length}</div>
          <div className="kpi-label">Tổng nhân viên</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-header">
            <div className="kpi-icon"><Building2 size={22} /></div>
            <span className="kpi-change up"><TrendingUp size={12} /> +1</span>
          </div>
          <div className="kpi-value">6</div>
          <div className="kpi-label">Phòng ban hoạt động</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-header">
            <div className="kpi-icon"><CalendarOff size={22} /></div>
            <span className="kpi-change down"><TrendingDown size={12} /> {pendingLeaves}</span>
          </div>
          <div className="kpi-value">{pendingLeaves}</div>
          <div className="kpi-label">Đơn nghỉ phép chờ duyệt</div>
        </div>
        <div className="kpi-card purple">
          <div className="kpi-header">
            <div className="kpi-icon"><Wallet size={22} /></div>
            <span className="kpi-change up"><TrendingUp size={12} /> +2.3%</span>
          </div>
          <div className="kpi-value">1.35 tỷ</div>
          <div className="kpi-label">Tổng quỹ lương tháng</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Biến động nhân sự theo tháng</h3>
            <span className="badge info">2024</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyEmployeeData}>
                <defs>
                  <linearGradient id="colorNV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0F4C81" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13 }} />
                <Area type="monotone" dataKey="nhanVien" stroke="#0F4C81" strokeWidth={2} fillOpacity={1} fill="url(#colorNV)" name="Nhân viên" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Phân bổ theo phòng ban</h3>
          </div>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ResponsiveContainer width="50%" height={240}>
              <PieChart>
                <Pie data={departmentDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {departmentDistribution.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 13 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{d.name}</span>
                  <span style={{ fontWeight: 600 }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Tổng quan chấm công tuần</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={attendanceSummary} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="dungGio" fill="#059669" name="Đúng giờ" radius={[4,4,0,0]} />
                <Bar dataKey="diTre" fill="#EA580C" name="Đi trễ" radius={[4,4,0,0]} />
                <Bar dataKey="vangMat" fill="#DC2626" name="Vắng mặt" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Chi phí lương (triệu VNĐ)</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={payrollSummary}>
                <defs>
                  <linearGradient id="colorPay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
                <Area type="monotone" dataKey="tongLuong" stroke="#7C3AED" strokeWidth={2} fillOpacity={1} fill="url(#colorPay)" name="Tổng lương" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Alerts + Quick Stats */}
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>⚡ Cảnh báo quan trọng</h3>
            <span className="badge danger">3 mới</span>
          </div>
          <div className="card-body">
            <div className="alert-card danger">
              <AlertTriangle size={18} style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="alert-title">Hợp đồng sắp hết hạn</div>
                <div className="alert-msg">Lâm Đình Khoa (NV003) - Hết hạn trong 30 ngày</div>
                <div className="alert-time">1 giờ trước</div>
              </div>
            </div>
            <div className="alert-card warning">
              <Clock size={18} style={{ color: 'var(--accent-orange)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="alert-title">{pendingLeaves} đơn nghỉ phép chờ duyệt</div>
                <div className="alert-msg">Cần xử lý trước cuối ngày hôm nay</div>
                <div className="alert-time">2 giờ trước</div>
              </div>
            </div>
            <div className="alert-card info">
              <Users size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="alert-title">{trialEmployees} nhân viên đang thử việc</div>
                <div className="alert-msg">Trịnh Công Sơn, Nguyễn Đắc Tú cần đánh giá</div>
                <div className="alert-time">1 ngày trước</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Đơn nghỉ phép gần đây</h3>
            <a href="/nghi-phep" style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600 }}>Xem tất cả →</a>
          </div>
          <div className="card-body no-padding">
            <table className="data-table">
              <thead><tr><th>Nhân viên</th><th>Loại</th><th>Ngày</th><th>Trạng thái</th></tr></thead>
              <tbody>
                {leaveRequests.slice(0, 4).map(l => (
                  <tr key={l.id}>
                    <td>
                      <div className="employee-info">
                        <div className="avatar sm">{l.hoTen.split(' ').pop()?.charAt(0)}</div>
                        <div className="info-text"><div className="name">{l.hoTen}</div></div>
                      </div>
                    </td>
                    <td style={{ fontSize: 12 }}>{l.loaiNghi}</td>
                    <td style={{ fontSize: 12 }}>{l.soNgay} ngày</td>
                    <td>
                      <span className={`badge ${l.trangThai === 'Chờ duyệt' ? 'warning' : l.trangThai === 'Đã duyệt' ? 'success' : 'danger'}`}>
                        {l.trangThai === 'Chờ duyệt' && <Clock size={10} />}
                        {l.trangThai === 'Đã duyệt' && <CheckCircle2 size={10} />}
                        {l.trangThai === 'Từ chối' && <XCircle size={10} />}
                        {l.trangThai}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Active Employees Quick View */}
      <div className="card">
        <div className="card-header">
          <h3>Nhân viên mới nhất</h3>
          <a href="/nhan-vien" style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600 }}>Xem tất cả →</a>
        </div>
        <div className="card-body no-padding">
          <table className="data-table">
            <thead><tr><th>Nhân viên</th><th>Mã NV</th><th>Phòng ban</th><th>Chức vụ</th><th>Ngày vào làm</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {employees.slice(0, 5).map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div className="employee-info">
                      <div className="avatar">{emp.hoTen.split(' ').pop()?.charAt(0)}</div>
                      <div className="info-text">
                        <div className="name">{emp.hoTen}</div>
                        <div className="sub">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge neutral">{emp.maNV}</span></td>
                  <td>{emp.phongBan}</td>
                  <td>{emp.chucVu}</td>
                  <td>{emp.ngayVaoLam}</td>
                  <td>
                    <span className={`badge ${emp.trangThai === 'Đang làm' ? 'success' : emp.trangThai === 'Thử việc' ? 'info' : emp.trangThai === 'Nghỉ phép' ? 'warning' : 'danger'}`}>
                      {emp.trangThai}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
