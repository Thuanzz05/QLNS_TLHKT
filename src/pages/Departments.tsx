import { useState, useEffect } from 'react';
import { Building2, Plus, Search, Edit2, Trash2, Eye, Users, TrendingUp, CheckCircle2, XCircle } from 'lucide-react';
import { departments as mockDepartments } from '../data/mockData';
import type { Department } from '../types';

const STORAGE_KEY = 'hrms_departments';

const getDepts = (): Department[] => {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    return d ? JSON.parse(d) : [];
  } catch { return []; }
};
const saveDepts = (d: Department[]) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {}
};

const emptyForm = {
  tenPhongBan: '', moTa: '', truongPhong: '', soNhanVien: 0,
  ngayThanhLap: '', trangThai: 'Hoạt động' as Department['trangThai'],
};

export default function Departments() {
  const [loading, setLoading] = useState(true);
  const [depts, setDepts] = useState<Department[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selected, setSelected] = useState<Department | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  useEffect(() => {
    if (getDepts().length === 0) saveDepts(mockDepartments);
    setDepts(getDepts());
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const filtered = depts.filter(d => {
    const matchSearch = d.tenPhongBan.toLowerCase().includes(search.toLowerCase()) ||
      d.truongPhong.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || d.trangThai === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleAdd = () => {
    const newDept: Department = {
      id: 'PB' + Date.now(),
      ...form,
    };
    const updated = [...depts, newDept];
    setDepts(updated);
    saveDepts(updated);
    setShowAddModal(false);
    setForm({ ...emptyForm });
  };

  const handleEdit = () => {
    if (!selected) return;
    const updated = depts.map(d => d.id === selected.id ? { ...selected, ...form } : d);
    setDepts(updated);
    saveDepts(updated);
    setShowEditModal(false);
  };

  const handleDelete = (dept: Department) => {
    if (!window.confirm(`Xóa phòng ban "${dept.tenPhongBan}"?`)) return;
    const updated = depts.filter(d => d.id !== dept.id);
    setDepts(updated);
    saveDepts(updated);
  };

  const openEdit = (dept: Department) => {
    setSelected(dept);
    setForm({
      tenPhongBan: dept.tenPhongBan, moTa: dept.moTa, truongPhong: dept.truongPhong,
      soNhanVien: dept.soNhanVien, ngayThanhLap: dept.ngayThanhLap, trangThai: dept.trangThai,
    });
    setShowEditModal(true);
  };

  const totalActive = depts.filter(d => d.trangThai === 'Hoạt động').length;
  const totalStaff = depts.reduce((s, d) => s + d.soNhanVien, 0);

  if (loading) return (
    <div>
      <div className="kpi-grid">{[1,2,3].map(i => <div key={i} className="skeleton skeleton-card" />)}</div>
      <div className="skeleton" style={{ height: 400, borderRadius: 14, marginTop: 24 }} />
    </div>
  );

  return (
    <div className="slide-up">
      {/* KPI */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="kpi-card blue">
          <div className="kpi-header"><div className="kpi-icon"><Building2 size={22} /></div></div>
          <div className="kpi-value">{depts.length}</div>
          <div className="kpi-label">Tổng phòng ban</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-header"><div className="kpi-icon"><CheckCircle2 size={22} /></div></div>
          <div className="kpi-value">{totalActive}</div>
          <div className="kpi-label">Đang hoạt động</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-header"><div className="kpi-icon"><Users size={22} /></div></div>
          <div className="kpi-value">{totalStaff}</div>
          <div className="kpi-label">Tổng nhân viên</div>
        </div>
      </div>

      {/* Table card */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">Danh sách phòng ban</h2>
            <p className="card-subtitle">{filtered.length} phòng ban</p>
          </div>
          <div className="card-actions">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input className="search-input" placeholder="Tìm phòng ban..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">Tất cả trạng thái</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Tạm ngưng">Tạm ngưng</option>
            </select>
            <button className="btn btn-primary" onClick={() => { setForm({ ...emptyForm }); setShowAddModal(true); }}>
              <Plus size={16} /> Thêm phòng ban
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Phòng ban</th>
                <th>Mô tả</th>
                <th>Trưởng phòng</th>
                <th>Nhân viên</th>
                <th>Ngày thành lập</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Không tìm thấy phòng ban nào</td></tr>
              ) : filtered.map(dept => (
                <tr key={dept.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="dept-icon"><Building2 size={16} /></div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dept.tenPhongBan}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{dept.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', maxWidth: 200 }}>{dept.moTa}</td>
                  <td>{dept.truongPhong}</td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <TrendingUp size={14} style={{ color: 'var(--accent-green)' }} />{dept.soNhanVien}
                    </span>
                  </td>
                  <td>{new Date(dept.ngayThanhLap).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <span className={`badge badge-${dept.trangThai === 'Hoạt động' ? 'success' : 'danger'}`}>
                      {dept.trangThai === 'Hoạt động' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {dept.trangThai}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-icon-view" title="Xem" onClick={() => { setSelected(dept); setShowViewModal(true); }}><Eye size={15} /></button>
                      <button className="btn-icon btn-icon-edit" title="Sửa" onClick={() => openEdit(dept)}><Edit2 size={15} /></button>
                      <button className="btn-icon btn-icon-delete" title="Xóa" onClick={() => handleDelete(dept)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Thêm phòng ban mới</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <DeptForm form={form} setForm={setForm} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleAdd}>Thêm phòng ban</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selected && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi tiết phòng ban</h3>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Mã phòng ban</span><span className="detail-value">{selected.id}</span></div>
                <div className="detail-item"><span className="detail-label">Tên phòng ban</span><span className="detail-value">{selected.tenPhongBan}</span></div>
                <div className="detail-item"><span className="detail-label">Trưởng phòng</span><span className="detail-value">{selected.truongPhong}</span></div>
                <div className="detail-item"><span className="detail-label">Số nhân viên</span><span className="detail-value">{selected.soNhanVien}</span></div>
                <div className="detail-item"><span className="detail-label">Ngày thành lập</span><span className="detail-value">{new Date(selected.ngayThanhLap).toLocaleDateString('vi-VN')}</span></div>
                <div className="detail-item"><span className="detail-label">Trạng thái</span>
                  <span className={`badge badge-${selected.trangThai === 'Hoạt động' ? 'success' : 'danger'}`}>{selected.trangThai}</span>
                </div>
                <div className="detail-item full-width"><span className="detail-label">Mô tả</span><span className="detail-value">{selected.moTa}</span></div>
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
              <h3>Chỉnh sửa phòng ban</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <DeptForm form={form} setForm={setForm} />
            </div>
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

function DeptForm({ form, setForm }: { form: typeof emptyForm; setForm: (f: typeof emptyForm) => void }) {
  return (
    <div className="form-grid">
      <div className="form-group">
        <label className="form-label">Tên phòng ban <span className="required">*</span></label>
        <input className="form-input" required value={form.tenPhongBan} onChange={e => setForm({ ...form, tenPhongBan: e.target.value })} placeholder="Nhập tên phòng ban" />
      </div>
      <div className="form-group">
        <label className="form-label">Trưởng phòng <span className="required">*</span></label>
        <input className="form-input" required value={form.truongPhong} onChange={e => setForm({ ...form, truongPhong: e.target.value })} placeholder="Họ tên trưởng phòng" />
      </div>
      <div className="form-group">
        <label className="form-label">Số nhân viên</label>
        <input className="form-input" type="number" min={0} value={form.soNhanVien} onChange={e => setForm({ ...form, soNhanVien: Number(e.target.value) })} />
      </div>
      <div className="form-group">
        <label className="form-label">Ngày thành lập</label>
        <input className="form-input" type="date" value={form.ngayThanhLap} onChange={e => setForm({ ...form, ngayThanhLap: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="form-label">Trạng thái</label>
        <select className="form-input" value={form.trangThai} onChange={e => setForm({ ...form, trangThai: e.target.value as Department['trangThai'] })}>
          <option value="Hoạt động">Hoạt động</option>
          <option value="Tạm ngưng">Tạm ngưng</option>
        </select>
      </div>
      <div className="form-group full-width">
        <label className="form-label">Mô tả</label>
        <textarea className="form-input" rows={3} value={form.moTa} onChange={e => setForm({ ...form, moTa: e.target.value })} placeholder="Mô tả chức năng phòng ban" />
      </div>
    </div>
  );
}
