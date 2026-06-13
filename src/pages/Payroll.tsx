import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Wallet, Search, Eye, CheckCircle2, Clock, Loader, TrendingUp, Calculator, Download } from 'lucide-react';
import { payrollRecords as mockPayroll, employees as mockEmployees } from '../data/mockData';
import type { PayrollRecord } from '../types';

const STORAGE_KEY = 'hrms_payroll';
const getPayroll = (): PayrollRecord[] => {
  try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; } catch { return []; }
};
const savePayroll = (d: PayrollRecord[]) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {}
};

// tính lương auto từ danh sách nhân viên
const generatePayroll = (): PayrollRecord[] =>
  mockEmployees.map(e => {
    const existing = mockPayroll.find(p => p.maNV === e.maNV);
    if (existing) return existing;
    const phuCap = Math.round(e.luongCoBan * 0.1);
    const baoHiem = Math.round(e.luongCoBan * 0.105);
    const thuNhap = e.luongCoBan + phuCap;
    const thueTNCN = thuNhap > 11000000 ? Math.round((thuNhap - 11000000) * 0.1) : 0;
    const khauTru = baoHiem + thueTNCN;
    return {
      id: 'TL' + e.id,
      maNV: e.maNV,
      hoTen: e.hoTen,
      phongBan: e.phongBan,
      chucVu: e.chucVu,
      thang: 12,
      nam: 2024,
      luongCoBan: e.luongCoBan,
      phuCap,
      thuong: 0,
      baoHiem,
      thueTNCN,
      khauTru,
      thucLinh: e.luongCoBan + phuCap - khauTru,
      trangThai: 'Chờ thanh toán',
    };
  });

const statusColor: Record<PayrollRecord['trangThai'], string> = {
  'Đã thanh toán': 'success',
  'Chờ thanh toán': 'warning',
  'Đang xử lý': 'info',
};
const statusIcon: Record<PayrollRecord['trangThai'], ReactNode> = {
  'Đã thanh toán': <CheckCircle2 size={12} />,
  'Chờ thanh toán': <Clock size={12} />,
  'Đang xử lý': <Loader size={12} />,
};

export default function Payroll() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<PayrollRecord[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selected, setSelected] = useState<PayrollRecord | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 5;

  useEffect(() => {
    if (getPayroll().length === 0) savePayroll(generatePayroll());
    setRecords(getPayroll());
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const filtered = records.filter(r => {
    const matchSearch = r.hoTen.toLowerCase().includes(search.toLowerCase()) || r.maNV.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || r.trangThai === filterStatus;
    const matchMonth = filterMonth === 'all' || String(r.thang) === filterMonth;
    return matchSearch && matchStatus && matchMonth;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleApprove = (id: string) => {
    const updated = records.map(r => r.id === id ? { ...r, trangThai: 'Đã thanh toán' as PayrollRecord['trangThai'] } : r);
    setRecords(updated);
    savePayroll(updated);
  };

  const tongLuong = records.reduce((s, r) => s + r.thucLinh, 0);
  const daTT = records.filter(r => r.trangThai === 'Đã thanh toán').length;
  const choTT = records.filter(r => r.trangThai === 'Chờ thanh toán').length;

  if (loading) return (
    <div>
      <div className="kpi-grid">{[1,2,3,4].map(i => <div key={i} className="skeleton skeleton-card" />)}</div>
      <div className="skeleton" style={{ height: 400, borderRadius: 14, marginTop: 24 }} />
    </div>
  );

  return (
    <div className="slide-up">
      <div className="kpi-grid">
        <div className="kpi-card blue">
          <div className="kpi-header"><div className="kpi-icon"><Wallet size={22} /></div></div>
          <div className="kpi-value">{(tongLuong / 1000000).toFixed(1)}M</div>
          <div className="kpi-label">Tổng chi lương</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-header"><div className="kpi-icon"><CheckCircle2 size={22} /></div></div>
          <div className="kpi-value">{daTT}</div>
          <div className="kpi-label">Đã thanh toán</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-header"><div className="kpi-icon"><Clock size={22} /></div></div>
          <div className="kpi-value">{choTT}</div>
          <div className="kpi-label">Chờ thanh toán</div>
        </div>
        <div className="kpi-card purple">
          <div className="kpi-header"><div className="kpi-icon"><TrendingUp size={22} /></div></div>
          <div className="kpi-value">{records.length}</div>
          <div className="kpi-label">Tổng nhân viên</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">Bảng tính lương</h2>
            <p className="card-subtitle">{filtered.length} bản ghi</p>
          </div>
          <div className="card-actions">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input className="search-input" placeholder="Tìm nhân viên..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
            </div>
            <select className="filter-select" value={filterMonth} onChange={e => setFilterMonth(e.target.value)}>
              <option value="all">Tháng</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>Tháng {m}</option>
              ))}
            </select>
            <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Chờ thanh toán">Chờ thanh toán</option>
              <option value="Đang xử lý">Đang xử lý</option>
            </select>
            <button className="btn btn-ghost">
              <Download size={16} /> Xuất Excel
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nhân viên</th>
                <th>Phòng ban</th>
                <th>Tháng/Năm</th>
                <th>Lương cơ bản</th>
                <th>Phụ cấp</th>
                <th>Thưởng</th>
                <th>Khấu trừ</th>
                <th>Thực lĩnh</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={10} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Không có dữ liệu</td></tr>
              ) : paginated.map(r => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar">{r.hoTen.split(' ').pop()?.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{r.hoTen}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.maNV}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.phongBan}</td>
                  <td>T{r.thang}/{r.nam}</td>
                  <td>{r.luongCoBan.toLocaleString()}</td>
                  <td style={{ color: 'var(--accent-green)' }}>+{r.phuCap.toLocaleString()}</td>
                  <td style={{ color: 'var(--accent-green)' }}>+{r.thuong.toLocaleString()}</td>
                  <td style={{ color: 'var(--accent-red)' }}>-{r.khauTru.toLocaleString()}</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{r.thucLinh.toLocaleString()} đ</td>
                  <td>
                    <span className={`badge badge-${statusColor[r.trangThai]}`}>
                      {statusIcon[r.trangThai]}{r.trangThai}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-icon-view" title="Xem chi tiết" onClick={() => { setSelected(r); setShowViewModal(true); }}><Eye size={15} /></button>
                      {r.trangThai !== 'Đã thanh toán' && (
                        <button className="btn-icon btn-icon-approve" title="Duyệt thanh toán" onClick={() => handleApprove(r.id)}><CheckCircle2 size={15} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
            ))}
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>›</button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showViewModal && selected && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi tiết bảng lương — {selected.hoTen}</h3>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="payslip">
                <div className="payslip-header">
                  <Calculator size={32} style={{ color: 'var(--primary)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{selected.hoTen} — {selected.maNV}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{selected.chucVu} | {selected.phongBan}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>Tháng {selected.thang}/{selected.nam}</div>
                  </div>
                </div>
                <div className="payslip-rows">
                  <div className="payslip-row income"><span>Lương cơ bản</span><span>{selected.luongCoBan.toLocaleString()} đ</span></div>
                  <div className="payslip-row income"><span>Phụ cấp</span><span>+{selected.phuCap.toLocaleString()} đ</span></div>
                  <div className="payslip-row income"><span>Thưởng</span><span>+{selected.thuong.toLocaleString()} đ</span></div>
                  <div className="payslip-divider" />
                  <div className="payslip-row deduct"><span>Bảo hiểm (10.5%)</span><span>-{selected.baoHiem.toLocaleString()} đ</span></div>
                  <div className="payslip-row deduct"><span>Thuế TNCN</span><span>-{selected.thueTNCN.toLocaleString()} đ</span></div>
                  <div className="payslip-divider" />
                  <div className="payslip-row total"><span>Thực lĩnh</span><span>{selected.thucLinh.toLocaleString()} đ</span></div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowViewModal(false)}>Đóng</button>
              {selected.trangThai !== 'Đã thanh toán' && (
                <button className="btn btn-primary" onClick={() => { handleApprove(selected.id); setShowViewModal(false); }}>
                  <CheckCircle2 size={16} /> Duyệt thanh toán
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
