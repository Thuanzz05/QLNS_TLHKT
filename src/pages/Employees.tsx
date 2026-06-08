import { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Eye, Download, X } from 'lucide-react';
import { employees, departments } from '../data/mockData';
import type { Employee } from '../types';

export default function Employees() {
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filtered = employees.filter(e => {
    const matchSearch = e.hoTen.toLowerCase().includes(search.toLowerCase()) || e.maNV.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || e.phongBan === filterDept;
    const matchStatus = !filterStatus || e.trangThai === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const fmt = (n: number) => n.toLocaleString('vi-VN') + ' ₫';

  return (
    <div className="slide-up">
      <div className="page-header">
        <div>
          <h1>Quản lý nhân viên</h1>
          <p>Tổng cộng {employees.length} nhân viên trong hệ thống</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><Download size={16} /> Xuất Excel</button>
          <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}><Plus size={18} /> Thêm nhân viên</button>
        </div>
      </div>

      <div className="card">
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border-light)' }}>
          <div className="toolbar">
            <div className="toolbar-left">
              <div className="search-input">
                <Search size={16} style={{ color: 'var(--text-muted)' }} />
                <input placeholder="Tìm theo tên hoặc mã NV..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="filter-select" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                <option value="">Tất cả phòng ban</option>
                {departments.map(d => <option key={d.id} value={d.tenPhongBan}>{d.tenPhongBan}</option>)}
              </select>
              <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="">Tất cả trạng thái</option>
                <option value="Đang làm">Đang làm</option>
                <option value="Thử việc">Thử việc</option>
                <option value="Nghỉ phép">Nghỉ phép</option>
                <option value="Nghỉ việc">Nghỉ việc</option>
              </select>
            </div>
            <div className="toolbar-right">
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{filtered.length} kết quả</span>
            </div>
          </div>
        </div>

        <div className="card-body no-padding">
          <table className="data-table">
            <thead>
              <tr><th>Nhân viên</th><th>Mã NV</th><th>Phòng ban</th><th>Chức vụ</th><th>SĐT</th><th>Ngày vào</th><th>Trạng thái</th><th style={{ textAlign: 'center' }}>Thao tác</th></tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
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
                  <td>{emp.soDienThoai}</td>
                  <td>{emp.ngayVaoLam}</td>
                  <td>
                    <span className={`badge ${emp.trangThai === 'Đang làm' ? 'success' : emp.trangThai === 'Thử việc' ? 'info' : emp.trangThai === 'Nghỉ phép' ? 'warning' : 'danger'}`}>
                      {emp.trangThai}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                      <button className="btn-icon btn-secondary" title="Xem chi tiết" onClick={() => { setSelectedEmp(emp); setShowDetail(true); }}><Eye size={15} /></button>
                      <button className="btn-icon btn-secondary" title="Chỉnh sửa"><Edit2 size={15} /></button>
                      <button className="btn-icon btn-secondary" title="Xóa" style={{ color: 'var(--accent-red)' }}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="pagination-info">Hiển thị 1-{filtered.length} / {filtered.length} nhân viên</div>
          <div className="pagination-btns">
            <button className="active">1</button><button>2</button><button>3</button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && selectedEmp && (
        <div className="modal-overlay" onClick={() => setShowDetail(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 700 }}>
            <div className="modal-header">
              <h3>Thông tin nhân viên</h3>
              <button className="btn-icon btn-secondary" onClick={() => setShowDetail(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--border-light)' }}>
                <div className="avatar xl">{selectedEmp.hoTen.split(' ').pop()?.charAt(0)}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>{selectedEmp.hoTen}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{selectedEmp.chucVu} - {selectedEmp.phongBan}</p>
                  <span className={`badge ${selectedEmp.trangThai === 'Đang làm' ? 'success' : 'info'}`}>{selectedEmp.trangThai}</span>
                </div>
              </div>
              {/* Gestalt: Grouped sections */}
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--primary)' }}>📋 Thông tin cá nhân</h4>
                <div className="form-row">
                  <div><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ngày sinh</span><div style={{ fontWeight: 500 }}>{selectedEmp.ngaySinh}</div></div>
                  <div><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Giới tính</span><div style={{ fontWeight: 500 }}>{selectedEmp.gioiTinh}</div></div>
                  <div><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Email</span><div style={{ fontWeight: 500 }}>{selectedEmp.email}</div></div>
                  <div><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>SĐT</span><div style={{ fontWeight: 500 }}>{selectedEmp.soDienThoai}</div></div>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--primary)' }}>💼 Thông tin công việc</h4>
                <div className="form-row">
                  <div><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Mã NV</span><div style={{ fontWeight: 500 }}>{selectedEmp.maNV}</div></div>
                  <div><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ngày vào làm</span><div style={{ fontWeight: 500 }}>{selectedEmp.ngayVaoLam}</div></div>
                  <div><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Loại HĐ</span><div style={{ fontWeight: 500 }}>{selectedEmp.loaiHopDong}</div></div>
                  <div><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Lương cơ bản</span><div style={{ fontWeight: 500 }}>{fmt(selectedEmp.luongCoBan)}</div></div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDetail(false)}>Đóng</button>
              <button className="btn btn-primary"><Edit2 size={14} /> Chỉnh sửa</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Thêm nhân viên mới</h3>
              <button className="btn-icon btn-secondary" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group"><label className="form-label">Họ và tên *</label><input className="form-input" placeholder="Nguyễn Văn A" /></div>
                <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="email@tdtgroup.vn" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Số điện thoại</label><input className="form-input" placeholder="09xxxxxxxx" /></div>
                <div className="form-group"><label className="form-label">Ngày sinh</label><input className="form-input" type="date" /></div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phòng ban</label>
                  <select className="form-input">{departments.map(d => <option key={d.id}>{d.tenPhongBan}</option>)}</select>
                </div>
                <div className="form-group"><label className="form-label">Chức vụ</label><input className="form-input" placeholder="Nhân viên" /></div>
              </div>
              <div className="form-group"><label className="form-label">Lương cơ bản</label><input className="form-input" type="number" placeholder="15000000" /></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}><Plus size={14} /> Thêm nhân viên</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
