import { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Search } from 'lucide-react';
import { leaveRequests } from '../data/mockData';

export default function LeaveManagement() {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = leaveRequests.filter(l => {
    const matchTab = tab === 'all' || (tab === 'pending' && l.trangThai === 'Chờ duyệt') || (tab === 'approved' && l.trangThai === 'Đã duyệt') || (tab === 'rejected' && l.trangThai === 'Từ chối');
    const matchSearch = l.hoTen.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const pending = leaveRequests.filter(l => l.trangThai === 'Chờ duyệt').length;

  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1>Quản lý nghỉ phép</h1><p>Xử lý đơn xin nghỉ phép của nhân viên</p></div>
      </div>

      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
        <div className="kpi-card orange"><div className="kpi-header"><div className="kpi-icon"><Clock size={22} /></div></div><div className="kpi-value">{pending}</div><div className="kpi-label">Chờ duyệt</div></div>
        <div className="kpi-card green"><div className="kpi-header"><div className="kpi-icon"><CheckCircle2 size={22} /></div></div><div className="kpi-value">{leaveRequests.filter(l => l.trangThai === 'Đã duyệt').length}</div><div className="kpi-label">Đã duyệt</div></div>
        <div className="kpi-card blue"><div className="kpi-header"><div className="kpi-icon"><XCircle size={22} /></div></div><div className="kpi-value">{leaveRequests.filter(l => l.trangThai === 'Từ chối').length}</div><div className="kpi-label">Từ chối</div></div>
      </div>

      <div className="card">
        <div style={{ padding: '0 22px' }}>
          <div className="tabs">
            {[{ id: 'all', label: 'Tất cả' }, { id: 'pending', label: `Chờ duyệt (${pending})` }, { id: 'approved', label: 'Đã duyệt' }, { id: 'rejected', label: 'Từ chối' }].map(t => (
              <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>
        </div>
        <div style={{ padding: '0 22px 16px' }}>
          <div className="search-input" style={{ maxWidth: 300 }}><Search size={16} style={{ color: 'var(--text-muted)' }} /><input placeholder="Tìm nhân viên..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        </div>
        <div className="card-body no-padding">
          <table className="data-table">
            <thead><tr><th>Nhân viên</th><th>Phòng ban</th><th>Loại nghỉ</th><th>Từ ngày</th><th>Đến ngày</th><th>Số ngày</th><th>Trạng thái</th><th style={{ textAlign: 'center' }}>Thao tác</th></tr></thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} style={l.trangThai === 'Chờ duyệt' ? { background: 'var(--accent-orange-bg)' } : {}}>
                  <td><div className="employee-info"><div className="avatar sm">{l.hoTen.split(' ').pop()?.charAt(0)}</div><div className="info-text"><div className="name">{l.hoTen}</div><div className="sub">{l.maNV}</div></div></div></td>
                  <td>{l.phongBan}</td>
                  <td><span className="badge neutral">{l.loaiNghi}</span></td>
                  <td>{l.tuNgay}</td>
                  <td>{l.denNgay}</td>
                  <td style={{ fontWeight: 700 }}>{l.soNgay}</td>
                  <td>
                    <span className={`badge ${l.trangThai === 'Chờ duyệt' ? 'warning' : l.trangThai === 'Đã duyệt' ? 'success' : 'danger'}`}>
                      {l.trangThai === 'Chờ duyệt' && <Clock size={10} />}
                      {l.trangThai === 'Đã duyệt' && <CheckCircle2 size={10} />}
                      {l.trangThai === 'Từ chối' && <XCircle size={10} />}
                      {l.trangThai}
                    </span>
                  </td>
                  <td>
                    {l.trangThai === 'Chờ duyệt' ? (
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                        <button className="btn btn-sm btn-success"><CheckCircle2 size={13} /> Duyệt</button>
                        <button className="btn btn-sm btn-danger"><XCircle size={13} /> Từ chối</button>
                      </div>
                    ) : <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', textAlign: 'center' }}>{l.nguoiDuyet || '—'}</span>}
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
