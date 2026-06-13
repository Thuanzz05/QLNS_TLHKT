import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Search, Filter, Edit2, Trash2, Eye, Download, Upload } from 'lucide-react';
import { employees as mockEmployees } from '../data/mockData';
import { getEmployees, saveEmployees, initializeStorage } from '../utils/localStorage';
import { attendanceRecords, leaveRequests } from '../data/mockData';

export default function Employees() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    hoTen: '',
    maNV: '',
    email: '',
    soDienThoai: '',
    ngaySinh: '',
    gioiTinh: 'Nam',
    diaChi: '',
    phongBan: 'Công nghệ thông tin',
    chucVu: '',
    ngayVaoLam: '',
    trangThai: 'Đang làm',
    loaiHopDong: 'Xác định thời hạn',
    luongCoBan: 0
  });
  const [editFormData, setEditFormData] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    phongBan: '',
    chucVu: '',
    trangThai: '',
    luongCoBan: 0
  });

  useEffect(() => {
    // Initialize localStorage with mock data
    initializeStorage(mockEmployees, attendanceRecords, leaveRequests);
    
    // Load employees from localStorage
    const storedEmployees = getEmployees();
    setEmployees(storedEmployees);
    
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

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterDept, filterStatus]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleViewEmployee = (emp: any) => {
    setSelectedEmployee(emp);
    setShowViewModal(true);
  };

  const handleEditEmployee = (emp: any) => {
    setSelectedEmployee(emp);
    setEditFormData({
      hoTen: emp.hoTen,
      email: emp.email,
      soDienThoai: emp.soDienThoai,
      phongBan: emp.phongBan,
      chucVu: emp.chucVu,
      trangThai: emp.trangThai,
      luongCoBan: emp.luongCoBan
    });
    setShowEditModal(true);
  };

  const handleDeleteEmployee = (emp: any) => {
    const confirm = window.confirm(`Bạn có chắc chắn muốn xóa nhân viên ${emp.hoTen} (${emp.maNV})?`);
    if (confirm) {
      const updatedEmployees = employees.filter(e => e.id !== emp.id);
      setEmployees(updatedEmployees);
      saveEmployees(updatedEmployees);
      alert(`Đã xóa nhân viên ${emp.hoTen}`);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEmployees = employees.map(emp => 
      emp.id === selectedEmployee.id 
        ? { ...emp, ...editFormData }
        : emp
    );
    
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);
    alert(`Đã cập nhật thông tin nhân viên ${editFormData.hoTen}`);
    setShowEditModal(false);
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate new ID
    const newId = (Math.max(...employees.map(e => parseInt(e.id))) + 1).toString();
    
    const newEmployee = {
      id: newId,
      ...formData,
    };
    
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);
    
    alert(`Đã thêm nhân viên ${formData.hoTen}`);
    setShowModal(false);
    
    // Reset form
    setFormData({
      hoTen: '',
      maNV: '',
      email: '',
      soDienThoai: '',
      ngaySinh: '',
      gioiTinh: 'Nam',
      diaChi: '',
      phongBan: 'Công nghệ thông tin',
      chucVu: '',
      ngayVaoLam: '',
      trangThai: 'Đang làm',
      loaiHopDong: 'Xác định thời hạn',
      luongCoBan: 0
    });
  };

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
            <Upload size={18} /> Nhập Excel
          </button>
          <button className="btn btn-secondary">
            <Download size={18} /> Xuất Excel
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Thêm nhân viên
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
              {currentEmployees.map(emp => (
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
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                      <button 
                        className="btn-icon btn-secondary" 
                        title="Xem chi tiết"
                        onClick={() => handleViewEmployee(emp)}
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="btn-icon btn-secondary" 
                        title="Chỉnh sửa"
                        onClick={() => handleEditEmployee(emp)}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="btn-icon btn-secondary" 
                        title="Xóa"
                        onClick={() => handleDeleteEmployee(emp)}
                        style={{ color: 'var(--accent-red)' }}
                      >
                        <Trash2 size={18} />
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
            Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredEmployees.length)} / {filteredEmployees.length} nhân viên
          </div>
          <div className="pagination-btns">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Modal Add Employee */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Thêm nhân viên mới</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', color: 'var(--text-muted)', fontSize: 20 }}>✕</button>
            </div>
            <form onSubmit={handleAddEmployee}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Họ và tên *</label>
                    <input 
                      className="form-input" 
                      placeholder="Nguyễn Văn A"
                      value={formData.hoTen}
                      onChange={(e) => setFormData({...formData, hoTen: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mã nhân viên *</label>
                    <input 
                      className="form-input" 
                      placeholder="NV011"
                      value={formData.maNV}
                      onChange={(e) => setFormData({...formData, maNV: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input 
                      className="form-input" 
                      type="email" 
                      placeholder="email@tdtgroup.vn"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Số điện thoại</label>
                    <input 
                      className="form-input" 
                      placeholder="0912345678"
                      value={formData.soDienThoai}
                      onChange={(e) => setFormData({...formData, soDienThoai: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Ngày sinh</label>
                    <input 
                      className="form-input" 
                      type="date"
                      value={formData.ngaySinh}
                      onChange={(e) => setFormData({...formData, ngaySinh: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Giới tính</label>
                    <select 
                      className="form-input"
                      value={formData.gioiTinh}
                      onChange={(e) => setFormData({...formData, gioiTinh: e.target.value})}
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Địa chỉ</label>
                  <input 
                    className="form-input" 
                    placeholder="Quận 1, TP.HCM"
                    value={formData.diaChi}
                    onChange={(e) => setFormData({...formData, diaChi: e.target.value})}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phòng ban *</label>
                    <select 
                      className="form-input"
                      value={formData.phongBan}
                      onChange={(e) => setFormData({...formData, phongBan: e.target.value})}
                      required
                    >
                      <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                      <option value="Nhân sự">Nhân sự</option>
                      <option value="Kinh doanh">Kinh doanh</option>
                      <option value="Tài chính - Kế toán">Tài chính - Kế toán</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Hành chính">Hành chính</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Chức vụ *</label>
                    <input 
                      className="form-input" 
                      placeholder="Nhân viên"
                      value={formData.chucVu}
                      onChange={(e) => setFormData({...formData, chucVu: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Ngày vào làm</label>
                    <input 
                      className="form-input" 
                      type="date"
                      value={formData.ngayVaoLam}
                      onChange={(e) => setFormData({...formData, ngayVaoLam: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Lương cơ bản</label>
                    <input 
                      className="form-input" 
                      type="number" 
                      placeholder="15000000"
                      value={formData.luongCoBan || ''}
                      onChange={(e) => setFormData({...formData, luongCoBan: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">
                  <Plus size={18} /> Thêm nhân viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal View Employee Detail */}
      {showViewModal && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 700 }}>
            <div className="modal-header">
              <h3>Hồ sơ nhân viên</h3>
              <button onClick={() => setShowViewModal(false)} style={{ background: 'none', color: 'var(--text-muted)', fontSize: 20 }}>✕</button>
            </div>
            <div className="modal-body">
              {/* Profile Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, padding: 20, background: 'var(--primary-bg)', borderRadius: 12 }}>
                <div className="avatar xl" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-lighter))' }}>
                  {selectedEmployee.hoTen.split(' ').pop()?.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{selectedEmployee.hoTen}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <span>{selectedEmployee.chucVu}</span>
                    <span>•</span>
                    <span>{selectedEmployee.phongBan}</span>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <span className={`badge ${selectedEmployee.trangThai === 'Đang làm' ? 'success' : 'info'}`}>
                      {selectedEmployee.trangThai}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Mã nhân viên</label>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedEmployee.maNV}</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Giới tính</label>
                  <div style={{ fontSize: 14 }}>{selectedEmployee.gioiTinh}</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Email</label>
                  <div style={{ fontSize: 14 }}>{selectedEmployee.email}</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Số điện thoại</label>
                  <div style={{ fontSize: 14 }}>{selectedEmployee.soDienThoai}</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Ngày sinh</label>
                  <div style={{ fontSize: 14 }}>{selectedEmployee.ngaySinh}</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Ngày vào làm</label>
                  <div style={{ fontSize: 14 }}>{selectedEmployee.ngayVaoLam}</div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Địa chỉ</label>
                  <div style={{ fontSize: 14 }}>{selectedEmployee.diaChi}</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Loại hợp đồng</label>
                  <div style={{ fontSize: 14 }}>{selectedEmployee.loaiHopDong}</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Lương cơ bản</label>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)' }}>{selectedEmployee.luongCoBan.toLocaleString()} đ</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Đóng</button>
              <button className="btn btn-ghost" onClick={() => { setShowViewModal(false); navigate(`/nhan-vien/${selectedEmployee.id}`); }}>
                <Eye size={16} /> Xem hồ sơ đầy đủ
              </button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEditEmployee(selectedEmployee); }}>
                <Edit2 size={18} /> Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Employee */}
      {showEditModal && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chỉnh sửa nhân viên</h3>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'none', color: 'var(--text-muted)', fontSize: 20 }}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Họ và tên *</label>
                    <input 
                      className="form-input" 
                      value={editFormData.hoTen}
                      onChange={(e) => setEditFormData({...editFormData, hoTen: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mã nhân viên</label>
                    <input className="form-input" value={selectedEmployee.maNV} disabled style={{ background: 'var(--secondary)' }} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input 
                      className="form-input" 
                      type="email"
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Số điện thoại</label>
                    <input 
                      className="form-input"
                      value={editFormData.soDienThoai}
                      onChange={(e) => setEditFormData({...editFormData, soDienThoai: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phòng ban *</label>
                    <select 
                      className="form-input"
                      value={editFormData.phongBan}
                      onChange={(e) => setEditFormData({...editFormData, phongBan: e.target.value})}
                      required
                    >
                      <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                      <option value="Nhân sự">Nhân sự</option>
                      <option value="Kinh doanh">Kinh doanh</option>
                      <option value="Tài chính - Kế toán">Tài chính - Kế toán</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Hành chính">Hành chính</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Chức vụ *</label>
                    <input 
                      className="form-input"
                      value={editFormData.chucVu}
                      onChange={(e) => setEditFormData({...editFormData, chucVu: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Trạng thái *</label>
                    <select 
                      className="form-input"
                      value={editFormData.trangThai}
                      onChange={(e) => setEditFormData({...editFormData, trangThai: e.target.value})}
                      required
                    >
                      <option value="Đang làm">Đang làm</option>
                      <option value="Thử việc">Thử việc</option>
                      <option value="Nghỉ phép">Nghỉ phép</option>
                      <option value="Nghỉ việc">Nghỉ việc</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Lương cơ bản</label>
                    <input 
                      className="form-input" 
                      type="number"
                      value={editFormData.luongCoBan}
                      onChange={(e) => setEditFormData({...editFormData, luongCoBan: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">
                  <Edit2 size={18} /> Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
