import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Award, ShieldAlert, Plus, Search, Eye, Edit2, Trash2, CheckCircle2, XCircle, TrendingUp, Wallet } from 'lucide-react';
import { rewardDisciplineRecords as mockData, employees as mockEmployees } from '../data/mockData';
import type { RewardDiscipline } from '../types';

const STORAGE_KEY = 'hrms_reward_discipline';

const getData = (): RewardDiscipline[] => {
  try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; } catch { return []; }
};
const saveData = (d: RewardDiscipline[]) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {}
};

const emptyForm = {
  maNV: '', hoTen: '',
  phongBan: '',
  loai: 'Khen thưởng' as RewardDiscipline['loai'],
  hinhThuc: '',
  lyDo: '',
  soTien: 0,
  ngayQuyetDinh: '',
  nguoiQuyetDinh: '',
  trangThai: 'Hiệu lực' as RewardDiscipline['trangThai'],
};

const loaiColor: Record<RewardDiscipline['loai'], string> = {
  'Khen thưởng': 'success',
  'Kỷ luật': 'danger',
};
const loaiIcon: Record<RewardDiscipline['loai'], ReactNode> = {
  'Khen thưởng': <Award size={12} />,
  'Kỷ luật': <ShieldAlert size={12} />,
};

export default function RewardDiscipline() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<RewardDiscipline[]>([]);
  const [search, setSearch] = useState('');
  const [filterLoai, setFilterLoai] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selected, setSelected] = useState<RewardDiscipline | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    if (getData().length === 0) saveData(mockData);
    setRecords(getData());
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const filtered = records.filter(r => {
    const matchSearch = r.hoTen.toLowerCase().includes(search.toLowerCase()) || r.maNV.toLowerCase().includes(search.toLowerCase());
    const matchLoai = filterLoai === 'all' || r.loai === filterLoai;
    const matchStatus = filterStatus === 'all' || r.trangThai === filterStatus;
    return matchSearch && matchLoai && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleAdd = () => {
    const emp = mockEmployees.find(e => e.maNV === form.maNV);
    const newRecord: RewardDiscipline = {
      id: (form.loai === 'Khen thưởng' ? 'KT' : 'KL') + Date.now(),
      ...form,
      phongBan: emp?.phongBan || form.phongBan,
      hoTen: emp?.hoTen || form.hoTen,
    };
    const updated = [...records, newRecord];
    setRecords(updated);
    saveData(updated);
    setShowAddModal(false);
    setForm({ ...emptyForm });
  };

  const handleEdit = () => {
    if (!selected) return;
    const updated = records.map(r => r.id === selected.id ? { ...selected, ...form } : r);
    setRecords(updated);
    saveData(updated);
    setShowEditModal(false);
  };

  const handleDelete = (r: RewardDiscipline) => {
    if (!window.confirm(`Xóa bản ghi "${r.hinhThuc}" của "${r.hoTen}"?`)) return;
    const updated = records.filter(x => x.id !== r.id);
    setRecords(updated);
    saveData(updated);
  };

  const openEdit = (r: RewardDiscipline) => {
    setSelected(r);
    setForm({ maNV: r.maNV, hoTen: r.hoTen, phongBan: r.phongBan, loai: r.loai, hinhThuc: r.hinhThuc, lyDo: r.lyDo, soTien: r.soTien || 0, ngayQuyetDinh: r.ngayQuyetDinh, nguoiQuyetDinh: r.nguoiQuyetDinh, trangThai: r.trangThai });
    setShowEditModal(true);
  };

  const tongKhenThuong = records.filter(r => r.loai === 'Khen thưởng' && r.trangThai === 'Hiệu lực').length;
  const tongKyLuat = records.filter(r => r.loai === 'Kỷ luật' && r.trangThai === 'Hiệu lực').length;
  const tongThuong = records.filter(r => r.loai === 'Khen thưởng').reduce((s, r) => s + (r.soTien || 0), 0);

  if (loading) return (
    <div>
      <div className="kpi-grid">{[1,2,3,4].map(i => <div key={i} className="skeleton skeleton-card" />)}</div>
      <div className="skeleton" style={{ height: 400, borderRadius: 14, marginTop: 24 }} />
    </div>
  );

  return (
    <div className="slide-up">
      <div className="kpi-grid">
        <div className="kpi-card green">
          <div className="kpi-header"><div className="kpi-icon"><Award size={22} /></div></div>
          <div className="kpi-value">{tongKhenThuong}</div>
          <div className="kpi-label">Khen thưởng hiệu lực</div>
        </div>
        <div className="kpi-card red">
          <div className="kpi-header"><div className="kpi-icon"><ShieldAlert size={22} /></div></div>
          <div className="kpi-value">{tongKyLuat}</div>
          <div className="kpi-label">Kỷ luật hiệu lực</div>
        </div>
        <div className="kpi-card blue">
          <div className="kpi-header"><div className="kpi-icon"><Wallet size={22} /></div></div>
          <div className="kpi-value">{(tongThuong / 1000000).toFixed(1)}M</div>
          <div className="kpi-label">Tổng tiền thưởng</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-header"><div className="kpi-icon"><TrendingUp size={22} /></div></div>
          <div className="kpi-value">{records.length}</div>
          <div className="kpi-label">Tổng quyết định</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">Khen thưởng & Kỷ luật</h2>
            <p className="card-subtitle">{filtered.length} bản ghi</p>
          </div>
          <div className="card-actions">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input className="search-input" placeholder="Tìm nhân viên..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
            </div>
            <select className="filter-select" value={filterLoai} onChange={e => { setFilterLoai(e.target.value); setCurrentPage(1); }}>
              <option value="all">Loại</option>
              <option value="Khen thưởng">Khen thưởng</option>
              <option value="Kỷ luật">Kỷ luật</option>
            </select>
            <select className="filter-select" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
              <option value="all">Trạng thái</option>
              <option value="Hiệu lực">Hiệu lực</option>
              <option value="Hủy bỏ">Hủy bỏ</option>
            </select>
            <button className="btn btn-primary" onClick={() => { setForm({ ...emptyForm }); setShowAddModal(true); }}>
              <Plus size={16} /> Thêm mới
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nhân viên</th>
                <th>Loại</th>
                <th>Hình thức</th>
                <th>Lý do</th>
                <th>Số tiền</th>
                <th>Ngày QĐ</th>
                <th>Người QĐ</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Không có dữ liệu</td></tr>
              ) : paginated.map(r => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar">{r.hoTen.split(' ').pop()?.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{r.hoTen}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.maNV} · {r.phongBan}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${loaiColor[r.loai]}`}>
                      {loaiIcon[r.loai]}{r.loai}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{r.hinhThuc}</td>
                  <td style={{ color: 'var(--text-secondary)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.lyDo}</td>
                  <td>
                    {r.soTien && r.soTien > 0
                      ? <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>+{r.soTien.toLocaleString()} đ</span>
                      : <span style={{ color: 'var(--text-muted)' }}>—</span>
                    }
                  </td>
                  <td>{new Date(r.ngayQuyetDinh).toLocaleDateString('vi-VN')}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.nguoiQuyetDinh}</td>
                  <td>
                    <span className={`badge badge-${r.trangThai === 'Hiệu lực' ? 'success' : 'warning'}`}>
                      {r.trangThai === 'Hiệu lực' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {r.trangThai}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-icon-view" title="Xem" onClick={() => { setSelected(r); setShowViewModal(true); }}><Eye size={15} /></button>
                      <button className="btn-icon btn-icon-edit" title="Sửa" onClick={() => openEdit(r)}><Edit2 size={15} /></button>
                      <button className="btn-icon btn-icon-delete" title="Xóa" onClick={() => handleDelete(r)}><Trash2 size={15} /></button>
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Thêm quyết định mới</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body"><RDForm form={form} setForm={setForm} /></div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleAdd}>Thêm quyết định</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selected && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi tiết quyết định</h3>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Mã QĐ</span><span className="detail-value">{selected.id}</span></div>
                <div className="detail-item"><span className="detail-label">Nhân viên</span><span className="detail-value">{selected.hoTen} ({selected.maNV})</span></div>
                <div className="detail-item"><span className="detail-label">Phòng ban</span><span className="detail-value">{selected.phongBan}</span></div>
                <div className="detail-item"><span className="detail-label">Loại</span>
                  <span className={`badge badge-${loaiColor[selected.loai]}`}>{loaiIcon[selected.loai]}{selected.loai}</span>
                </div>
                <div className="detail-item"><span className="detail-label">Hình thức</span><span className="detail-value" style={{ fontWeight: 600 }}>{selected.hinhThuc}</span></div>
                <div className="detail-item"><span className="detail-label">Số tiền thưởng</span>
                  <span className="detail-value" style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
                    {selected.soTien && selected.soTien > 0 ? selected.soTien.toLocaleString() + ' đ' : '—'}
                  </span>
                </div>
                <div className="detail-item"><span className="detail-label">Ngày quyết định</span><span className="detail-value">{new Date(selected.ngayQuyetDinh).toLocaleDateString('vi-VN')}</span></div>
                <div className="detail-item"><span className="detail-label">Người quyết định</span><span className="detail-value">{selected.nguoiQuyetDinh}</span></div>
                <div className="detail-item"><span className="detail-label">Trạng thái</span>
                  <span className={`badge badge-${selected.trangThai === 'Hiệu lực' ? 'success' : 'warning'}`}>{selected.trangThai}</span>
                </div>
                <div className="detail-item full-width"><span className="detail-label">Lý do</span><span className="detail-value">{selected.lyDo}</span></div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowViewModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selected && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chỉnh sửa quyết định</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-body"><RDForm form={form} setForm={setForm} /></div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowEditModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleEdit}>Lưu thay đổi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RDForm({ form, setForm }: { form: typeof emptyForm; setForm: (f: typeof emptyForm) => void }) {
  return (
    <div className="form-grid">
      <div className="form-group">
        <label className="form-label">Mã nhân viên <span className="required">*</span></label>
        <input className="form-input" value={form.maNV} onChange={e => setForm({ ...form, maNV: e.target.value })} placeholder="VD: NV001" />
      </div>
      <div className="form-group">
        <label className="form-label">Họ tên <span className="required">*</span></label>
        <input className="form-input" value={form.hoTen} onChange={e => setForm({ ...form, hoTen: e.target.value })} placeholder="Họ và tên nhân viên" />
      </div>
      <div className="form-group">
        <label className="form-label">Loại <span className="required">*</span></label>
        <select className="form-input" value={form.loai} onChange={e => setForm({ ...form, loai: e.target.value as RewardDiscipline['loai'] })}>
          <option value="Khen thưởng">Khen thưởng</option>
          <option value="Kỷ luật">Kỷ luật</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Hình thức <span className="required">*</span></label>
        <input className="form-input" value={form.hinhThuc} onChange={e => setForm({ ...form, hinhThuc: e.target.value })} placeholder="VD: Thưởng tháng, Khiển trách..." />
      </div>
      <div className="form-group">
        <label className="form-label">Số tiền thưởng (đ)</label>
        <input className="form-input" type="number" min={0} value={form.soTien} onChange={e => setForm({ ...form, soTien: Number(e.target.value) })} />
      </div>
      <div className="form-group">
        <label className="form-label">Ngày quyết định</label>
        <input className="form-input" type="date" value={form.ngayQuyetDinh} onChange={e => setForm({ ...form, ngayQuyetDinh: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="form-label">Người quyết định</label>
        <input className="form-input" value={form.nguoiQuyetDinh} onChange={e => setForm({ ...form, nguoiQuyetDinh: e.target.value })} placeholder="VD: Ban Giám đốc" />
      </div>
      <div className="form-group">
        <label className="form-label">Trạng thái</label>
        <select className="form-input" value={form.trangThai} onChange={e => setForm({ ...form, trangThai: e.target.value as RewardDiscipline['trangThai'] })}>
          <option value="Hiệu lực">Hiệu lực</option>
          <option value="Hủy bỏ">Hủy bỏ</option>
        </select>
      </div>
      <div className="form-group full-width">
        <label className="form-label">Lý do <span className="required">*</span></label>
        <textarea className="form-input" rows={3} value={form.lyDo} onChange={e => setForm({ ...form, lyDo: e.target.value })} placeholder="Mô tả lý do khen thưởng / kỷ luật" />
      </div>
    </div>
  );
}
