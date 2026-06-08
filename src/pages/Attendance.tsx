import { useState } from 'react';
import { Search, Calendar, Download, CheckCircle2 } from 'lucide-react';
import { attendanceRecords } from '../data/mockData';

export default function Attendance() {
  const [date, setDate] = useState('2024-12-16');
  const [search, setSearch] = useState('');
  const filtered = attendanceRecords.filter(a => a.hoTen.toLowerCase().includes(search.toLowerCase()));
  const stats = {
    dungGio: filtered.filter(a => a.trangThai === 'Đúng giờ').length,
    diTre: filtered.filter(a => a.trangThai === 'Đi trễ').length,
    vangMat: filtered.filter(a => a.trangThai === 'Vắng mặt').length,
    nghiPhep: filtered.filter(a => a.trangThai === 'Nghỉ phép').length,
  };

  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1>Chấm công</h1><p>Theo dõi giờ làm việc nhân viên</p></div>
        <div className="page-actions">
          <button className="btn btn-secondary"><Download size={16} /> Xuất báo cáo</button>
          <button className="btn btn-primary btn-lg"><CheckCircle2 size={16} /> Chấm công hôm nay</button>
        </div>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card green"><div className="kpi-value">{stats.dungGio}</div><div className="kpi-label">Đúng giờ</div></div>
        <div className="kpi-card orange"><div className="kpi-value">{stats.diTre}</div><div className="kpi-label">Đi trễ</div></div>
        <div className="kpi-card blue"><div className="kpi-value">{stats.vangMat}</div><div className="kpi-label">Vắng mặt</div></div>
        <div className="kpi-card purple"><div className="kpi-value">{stats.nghiPhep}</div><div className="kpi-label">Nghỉ phép</div></div>
      </div>

      <div className="card">
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border-light)' }}>
          <div className="toolbar">
            <div className="toolbar-left">
              <div className="search-input"><Search size={16} style={{ color: 'var(--text-muted)' }} /><input placeholder="Tìm nhân viên..." value={search} onChange={e => setSearch(e.target.value)} /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
                <input type="date" className="filter-select" value={date} onChange={e => setDate(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body no-padding">
          <table className="data-table">
            <thead><tr><th>Nhân viên</th><th>Phòng ban</th><th>Giờ vào</th><th>Giờ ra</th><th>Trạng thái</th><th>Ghi chú</th></tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td><div className="employee-info"><div className="avatar sm">{a.hoTen.split(' ').pop()?.charAt(0)}</div><div className="info-text"><div className="name">{a.hoTen}</div><div className="sub">{a.maNV}</div></div></div></td>
                  <td>{a.phongBan}</td>
                  <td style={{ fontWeight: 600 }}>{a.gioVao || '—'}</td>
                  <td style={{ fontWeight: 600 }}>{a.gioRa || '—'}</td>
                  <td><span className={`badge ${a.trangThai === 'Đúng giờ' ? 'success' : a.trangThai === 'Đi trễ' ? 'warning' : a.trangThai === 'Vắng mặt' ? 'danger' : 'info'}`}>{a.trangThai}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.ghiChu || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
