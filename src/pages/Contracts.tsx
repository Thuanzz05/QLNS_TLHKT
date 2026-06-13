import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { employees as mockEmployees } from '../data/mockData';
import type { Contract } from '../types';

const STORAGE_KEY = 'hrms_contracts';

const mockContracts: Contract[] = mockEmployees.map(e => ({
  id: 'HD' + e.id,
  maNV: e.maNV,
  hoTen: e.hoTen,
  loaiHopDong: e.loaiHopDong as Contract['loaiHopDong'],
  ngayBatDau: e.ngayVaoLam,
  ngayKetThuc: e.ngayHetHanHD,
  trangThai: e.ngayHetHanHD
    ? (new Date(e.ngayHetHanHD) < new Date() ? 'Hết hạn'
      : new Date(e.ngayHetHanHD) < new Date(Date.now() + 30 * 86400000) ? 'Sắp hết hạn' : 'Hiệu lực')
    : 'Hiệu lực',
  luongCoBan: e.luongCoBan,
}));

const getContracts = (): Contract[] => {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    return d ? JSON.parse(d) : [];
  } catch { return []; }
};
const saveContracts = (d: Contract[]) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {}
};

const emptyForm = {
  maNV: '', hoTen: '',
  loaiHopDong: 'Xác định thời hạn' as Contract['loaiHopDong'],
  ngayBatDau: '', ngayKetThuc: '', luongCoBan: 0,
};

const statusColor: Record<Contract['trangThai'], string> = {
  'Hiệu lực': 'success',
  'Sắp hết hạn': 'warning',
  'Hết hạn': 'danger',
};
const statusIcon: Record<Contract['trangThai'], ReactNode> = {
  'Hiệu lực': <CheckCircle2 size={12} />,
  'Sắp hết hạn': <AlertTriangle size={12} />,
  'Hết hạn': <Clock size={12} />,
};

export default function Contracts() {
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selected, setSelected] = useState<Contract | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 5;

  useEffect(() => {
    if (getContracts().length === 0) saveContracts(mockContracts);
    setContracts(getContracts());
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const filtered = contracts.filter(c => {
    const matchSearch = c.hoTen.toLowerCase().includes(search.toLowerCase()) || c.maNV.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || c.loaiHopDong === filterType;
    const matchStatus = filterStatus === 'all' || c.trangThai === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleAdd = () => {
    const newC: Contract = { id: 'HD' + Date.now(), ...form, trangThai: 'Hiệu lực' };
    const updated = [...contracts, newC];
    setContracts(updated);
    saveContracts(updated);
    setShowAddModal(false);
    setForm({ ...emptyForm });
  };

  const handleEdit = () => {
    if (!selected) return;
    const updated = contracts.map(c => c.id === selected.id ? { ...selected, ...form } : c);
    setContracts(updated);
    saveContracts(updated);
    setShowEditModal(false);
  };

  const handleDelete = (c: Contract) => {
    if (!window.confirm(`Xóa hợp đồng của "${c.hoTen}"?`)) return;
    const updated = contracts.filter(x => x.id !== c.id);
    setContracts(updated);
    saveContracts(updated);
  };

  const openEdit = (c: Contract) => {
    setSelected(c);
    setForm({ maNV: c.maNV, hoTen: c.hoTen, loaiHopDong: c.loaiHopDong, ngayBatDau: c.ngayBatDau, ngayKetThuc: c.ngayKetThuc || '', luongCoBan: c.luongCoBan });
    setShowEditModal(true);
  };

  const hieuLuc = contracts.filter(c => c.trangThai === 'Hiệu lực').length;
  const sapHetHan = contracts.filter(c => c.trangThai === 'Sắp hết hạn').length;
  const hetHan = contracts.filter(c => c.trangThai === 'Hết hạn').length;

  if (loading) return (
    <div>
      <div className="kpi-grid">{[1,2,3].map(i => <div key={i} className="skeleton skeleton-card" />)}</div>
      <div className="skeleton" style={{ height: 400, borderRadius: 14, marginTop: 24 }} />
    </div>
  );

  return (
    <div className="slide-up">
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="kpi-card green">
          <div className="kpi-header"><div className="kpi-icon"><CheckCircle2 size={22} /></div></div>
          <div className="kpi-value">{hieuLuc}</div>
          <div className="kpi-label">Đang hiệu lực</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-header"><div className="kpi-icon"><AlertTriangle size={22} /></div></div>
          <div className="kpi-value">{sapHetHan}</div>
          <div className="kpi-label">Sắp hết hạn</div>
        </div>
        <div className="kpi-card red">
          <div className="kpi-header"><div className="kpi-icon"><Clock size={22} /></div></div>
          <div className="kpi-value">{hetHan}</div>
          <div className="kpi-label">Đã hết hạn</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">Hợp đồng lao động</h2>
            <p className="card-subtitle">{filtered.length} hợp đồng</p>
          </div>
          <div className="card-actions">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input className="search-input" placeholder="Tìm nhân viên..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
            </div>
            <select className="filter-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="all">Loại hợp đồng</option>
              <option value="Thử việc">Thử việc</option>
              <option value="Xác định thời hạn">Xác định thời hạn</option>
              <option value="Không xác định thời hạn">Không xác định thời hạn</option>
            </select>
            <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">Tất cả trạng thái</option>
              <option value="Hiệu lực">Hiệu lực</option>
              <option value="Sắp hết hạn">Sắp hết hạn</option>
              <option value="Hết hạn">Hết hạn</option>
            </select>
            <button className="btn btn-primary" onClick={() => { setForm({ ...emptyForm }); setShowAddModal(true); }}>
              <Plus size={16} /> Thêm hợp đồng
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nhân viên</th>
                <th>Loại hợp đồng</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Lương cơ bản</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Không tìm thấy hợp đồng</td></tr>
              ) : paginated.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar">{c.hoTen.split(' ').pop()?.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{c.hoTen}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.maNV}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${c.loaiHopDong === 'Thử việc' ? 'warning' : c.loaiHopDong === 'Không xác định thời hạn' ? 'info' : 'primary'}`}>
                      {c.loaiHopDong}
                    </span>
                  </td>
                  <td>{new Date(c.ngayBatDau).toLocaleDateString('vi-VN')}</td>
                  <td>{c.ngayKetThuc ? new Date(c.ngayKetThuc).toLocaleDateString('vi-VN') : <span style={{ color: 'var(--text-muted)' }}>Không xác định</span>}</td>
                  <td style={{ fontWeight: 600, color: 'var(--accent-green)' }}>{c.luongCoBan.toLocaleString()} đ</td>
                  <td>
                    <span className={`badge badge-${statusColor[c.trangThai]}`}>
                      {statusIcon[c.trangThai]}{c.trangThai}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-icon-view" onClick={() => { setSelected(c); setShowViewModal(true); }}><Eye size={15} /></button>
                      <button className="btn-icon btn-icon-edit" onClick={() => openEdit(c)}><Edit2 size={15} /></button>
                      <button className="btn-icon btn-icon-delete" onClick={() => handleDelete(c)}><Trash2 size={15} /></button>
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
              <h3>Thêm hợp đồng mới</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body"><ContractForm form={form} setForm={setForm} /></div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleAdd}>Thêm hợp đồng</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selected && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi tiết hợp đồng</h3>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Mã hợp đồng</span><span className="detail-value">{selected.id}</span></div>
                <div className="detail-item"><span className="detail-label">Nhân viên</span><span className="detail-value">{selected.hoTen}</span></div>
                <div className="detail-item"><span className="detail-label">Mã NV</span><span className="detail-value">{selected.maNV}</span></div>
                <div className="detail-item"><span className="detail-label">Loại hợp đồng</span><span className="detail-value">{selected.loaiHopDong}</span></div>
                <div className="detail-item"><span className="detail-label">Ngày bắt đầu</span><span className="detail-value">{new Date(selected.ngayBatDau).toLocaleDateString('vi-VN')}</span></div>
                <div className="detail-item"><span className="detail-label">Ngày kết thúc</span><span className="detail-value">{selected.ngayKetThuc ? new Date(selected.ngayKetThuc).toLocaleDateString('vi-VN') : 'Không xác định'}</span></div>
                <div className="detail-item"><span className="detail-label">Lương cơ bản</span><span className="detail-value" style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{selected.luongCoBan.toLocaleString()} đ</span></div>
                <div className="detail-item"><span className="detail-label">Trạng thái</span>
                  <span className={`badge badge-${statusColor[selected.trangThai]}`}>{selected.trangThai}</span>
                </div>
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
              <h3>Chỉnh sửa hợp đồng</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-body"><ContractForm form={form} setForm={setForm} /></div>
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

function ContractForm({ form, setForm }: { form: typeof emptyForm; setForm: (f: typeof emptyForm) => void }) {
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
        <label className="form-label">Loại hợp đồng</label>
        <select className="form-input" value={form.loaiHopDong} onChange={e => setForm({ ...form, loaiHopDong: e.target.value as Contract['loaiHopDong'] })}>
          <option value="Thử việc">Thử việc</option>
          <option value="Xác định thời hạn">Xác định thời hạn</option>
          <option value="Không xác định thời hạn">Không xác định thời hạn</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Lương cơ bản (đ)</label>
        <input className="form-input" type="number" min={0} value={form.luongCoBan} onChange={e => setForm({ ...form, luongCoBan: Number(e.target.value) })} />
      </div>
      <div className="form-group">
        <label className="form-label">Ngày bắt đầu</label>
        <input className="form-input" type="date" value={form.ngayBatDau} onChange={e => setForm({ ...form, ngayBatDau: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="form-label">Ngày kết thúc</label>
        <input className="form-input" type="date" value={form.ngayKetThuc} onChange={e => setForm({ ...form, ngayKetThuc: e.target.value })} />
      </div>
    </div>
  );
}
