import { useState, useEffect } from 'react';
import { Users, Plus, Search, Filter, Edit2, Trash2, Eye, Download, Upload } from 'lucide-react';
import { employees } from '../data/mockData';

export default function Employees() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const filteredEmployees = employees.filter(emp => {
    const matchSearch = emp.hoTen.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       emp.maNV.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = filterDept === 'all' || emp.phongBan === filterDept;
    const matchStatus = filterStatus === 'all' || emp.trangThai === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: 40, width: 300, marginBottom: 16 }} />
        <div className="skeleton skeleton-card" style={{ height: 400 }} />
      </div>
    );
  }

  return (
    <div className="slide-up">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Quản lý nhân viên</h1>
          <p>Quản lý thông tin và hồ sơ nhân viên trong công ty</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <Upload size={16} /> Nhập Excel
          </button>
          <button className="btn btn-secondary">
            <Download size={16} /> Xuất Excel
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Thêm nhân viên
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="kpi-grid">
        <div className="kpi-card blue">
          <div className="kpi-header">
            <div className="kpi-icon"><Users size={22} /></div>
          </div>
          <div className="kpi-value">{employees.length}</div>
          <div className="kpi-label">Tổng nhân viên</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-header">
            <div className="kpi-icon"><Users size={22} /></div>
          </div>
          <div className="kpi-value">{employees.filter(e => e.trangThai === 'Đang làm').length}</div>
          <div className="kpi-label">Đang làm việc</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-header">
            <div className="kpi-icon"><Users size={22} /></div>
          </div>
          <div className="kpi-value">{employees.filter(e => e.trangThai === 'Thử việc').length}</div>
          <div className="kpi-label">Đang thử việc</div>
        </div>
        <div className="kpi-card purple">
          <div className="kpi-header">
            <div className="kpi-icon"><Users size={22} /></div>
          </div>
          <div className="kpi-value">{employees.filter(e => e.trangThai === 'Nghỉ phép').length}</div>
          <div className="kpi-label">Đang nghỉ phép</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="card">
        {/* Toolbar */}
        <div className="toolbar" style={{ padding: '16px 22px', borderBottom: '1px solid var(--border-light)' }}>
          <div className="toolbar-left">
            <div className="search-input">
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Tìm theo tên, mã NV, email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="toolbar-right">
            <select className="filter-select" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
              <option value="all">Tất cả phòng ban</option>
              <option value="Công nghệ thông tin">Công nghệ thông tin</option>
              <option value="Nhân sự">Nhân sự</option>
              <option value="Kinh doanh">Kinh doanh</option>
              <option value="Tài chính - Kế toán">Tài chính - Kế toán</option>
              <option value="Marketing">Marketing</option>
              <option value="Hành chính">Hành chính</option>
            </select>
            <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Tất cả trạng thái</option>
              <option value="Đang làm">Đang làm</option>
              <option value="Thử việc">Thử việc</option>
              <option value="Nghỉ phép">Nghỉ phép</option>
            </select>
            <button 
              className={`btn-icon ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('table')}
              title="Xem dạng bảng"
            >
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="card-body no-padding">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nhân viên</th>
                <th>Mã NV</th>
                <th>Phòng ban</th>
                <th>Chức vụ</th>
                <th>Ngày vào làm</th>
                <th>Lương CB</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
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
                  <td style={{ fontSize: 13 }}>{emp.phongBan}</td>
                  <td style={{ fontSize: 13 }}>{emp.chucVu}</td>
                  <td style={{ fontSize: 13 }}>{emp.ngayVaoLam}</td>
                  <td style={{ fontSize: 13, fontWeight: 600 }}>{emp.luongCoBan.toLocaleString()} đ</td>
                  <td>
                    <span className={`badge ${
                      emp.trangThai === 'Đang làm' ? 'success' : 
                      emp.trangThai === 'Thử việc' ? 'info' : 
                      emp.trangThai === 'Nghỉ phép' ? 'warning' : 'danger'
                    }`}>
                      {emp.trangThai}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                      <button className="btn-icon btn-secondary" title="Xem chi tiết">
                        <Eye size={14} />
                      </button>
                      <button className="btn-icon btn-secondary" title="Chỉnh sửa">
                        <Edit2 size={14} />
                      </button>
                      <button className="btn-icon btn-secondary" title="Xóa">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Hiển thị {filteredEmployees.length} / {employees.length} nhân viên
          </div>
          <div className="pagination-btns">
            <button>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </div>
      </div>

      {/* Modal Add Employee */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Thêm nhân viên mới</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', color: 'var(--text-muted)' }}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Họ và tên *</label>
                  <input className="form-input" placeholder="Nguyễn Văn A" />
                </div>
                <div className="form-group">
                  <label className="form-label">Mã nhân viên *</label>
                  <input className="form-input" placeholder="NV011" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" placeholder="email@tdtgroup.vn" />
                </div>
                <div className="form-group">
                  <label className="form-label">Số điện thoại</label>
                  <input className="form-input" placeholder="0912345678" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phòng ban *</label>
                  <select className="form-input">
                    <option>Công nghệ thông tin</option>
                    <option>Nhân sự</option>
                    <option>Kinh doanh</option>
                    <option>Tài chính - Kế toán</option>
                    <option>Marketing</option>
                    <option>Hành chính</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Chức vụ *</label>
                  <input className="form-input" placeholder="Nhân viên" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Ngày vào làm</label>
                  <input className="form-input" type="date" />
                </div>
                <div className="form-group">
                  <label className="form-label">Lương cơ bản</label>
                  <input className="form-input" type="number" placeholder="15000000" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
              <button className="btn btn-primary">Thêm nhân viên</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
