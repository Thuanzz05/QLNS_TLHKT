import { useState, useEffect } from 'react';
import { CalendarOff, Plus, Search, Clock, CheckCircle2, XCircle, Download, Eye } from 'lucide-react';
import { leaveRequests as mockLeaveRequests, employees as mockEmployees, attendanceRecords } from '../data/mockData';
import { getLeaveRequests, saveLeaveRequests, getEmployees, initializeStorage } from '../utils/localStorage';

export default function Leave() {
  const [loading, setLoading] = useState(true);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    maNV: '',
    loaiNghi: 'Nghỉ phép năm',
    tuNgay: '',
    denNgay: '',
    lyDo: ''
  });

  useEffect(() => {
    // Initialize localStorage
    initializeStorage(mockEmployees, attendanceRecords, mockLeaveRequests);
    
    // Load data from localStorage
    setLeaveRequests(getLeaveRequests());
    setEmployees(getEmployees());
    
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const filteredRequests = leaveRequests.filter(req => {
    const matchSearch = req.hoTen.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       req.maNV.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || req.trangThai === filterStatus;
    return matchSearch && matchStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(r => r.trangThai === 'Chờ duyệt').length,
    approved: leaveRequests.filter(r => r.trangThai === 'Đã duyệt').length,
    rejected: leaveRequests.filter(r => r.trangThai === 'Từ chối').length,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.maNV) {
      alert('Vui lòng chọn nhân viên!');
      return;
    }
    if (!formData.tuNgay || !formData.denNgay) {
      alert('Vui lòng chọn ngày bắt đầu và kết thúc!');
      return;
    }
    if (!formData.lyDo.trim()) {
      alert('Vui lòng nhập lý do nghỉ phép!');
      return;
    }

    // Calculate number of days
    const startDate = new Date(formData.tuNgay);
    const endDate = new Date(formData.denNgay);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays <= 0) {
      alert('Ngày kết thúc phải sau ngày bắt đầu!');
      return;
    }

    // Get employee info
    const emp = employees.find(e => e.maNV === formData.maNV);
    if (!emp) return;

    // Create new leave request
    const newRequest = {
      id: `NP${Date.now()}`,
      maNV: formData.maNV,
      hoTen: emp.hoTen,
      phongBan: emp.phongBan,
      loaiNghi: formData.loaiNghi as any,
      tuNgay: formData.tuNgay,
      denNgay: formData.denNgay,
      soNgay: diffDays,
      lyDo: formData.lyDo,
      trangThai: 'Chờ duyệt' as any,
      ngayTao: new Date().toISOString().split('T')[0]
    };

    const updatedRequests = [...leaveRequests, newRequest];
    setLeaveRequests(updatedRequests);
    saveLeaveRequests(updatedRequests);
    
    alert(`Gửi đơn nghỉ phép thành công!\nSố ngày nghỉ: ${diffDays} ngày`);
    setShowModal(false);
    
    // Reset form
    setFormData({
      maNV: '',
      loaiNghi: 'Nghỉ phép năm',
      tuNgay: '',
      denNgay: '',
      lyDo: ''
    });
  };

  const handleApprove = (reqId: string) => {
    const updatedRequests = leaveRequests.map(req =>
      req.id === reqId ? { ...req, trangThai: 'Đã duyệt', nguoiDuyet: 'Admin' } : req
    );
    setLeaveRequests(updatedRequests);
    saveLeaveRequests(updatedRequests);
    alert('Đã phê duyệt đơn nghỉ phép!');
  };

  const handleReject = (reqId: string) => {
    const updatedRequests = leaveRequests.map(req =>
      req.id === reqId ? { ...req, trangThai: 'Từ chối', nguoiDuyet: 'Admin' } : req
    );
    setLeaveRequests(updatedRequests);
    saveLeaveRequests(updatedRequests);
    alert('Đã từ chối đơn nghỉ phép!');
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
          <h1>Quản lý nghỉ phép</h1>
          <p>Quản lý đơn xin nghỉ phép của nhân viên</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <Download size={18} /> Xuất báo cáo
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Tạo đơn nghỉ phép
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="kpi-grid">
        <div className="kpi-card blue">
          <div className="kpi-header">
            <div className="kpi-icon"><CalendarOff size={22} /></div>
          </div>
          <div className="kpi-value">{stats.total}</div>
          <div className="kpi-label">Tổng đơn</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-header">
            <div className="kpi-icon"><Clock size={22} /></div>
          </div>
          <div className="kpi-value">{stats.pending}</div>
          <div className="kpi-label">Chờ duyệt</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-header">
            <div className="kpi-icon"><CheckCircle2 size={22} /></div>
          </div>
          <div className="kpi-value">{stats.approved}</div>
          <div className="kpi-label">Đã duyệt</div>
        </div>
        <div className="kpi-card purple">
          <div className="kpi-header">
            <div className="kpi-icon"><XCircle size={22} /></div>
          </div>
          <div className="kpi-value">{stats.rejected}</div>
          <div className="kpi-label">Từ chối</div>
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
                placeholder="Tìm theo tên, mã NV..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="toolbar-right">
            <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Tất cả trạng thái</option>
              <option value="Chờ duyệt">Chờ duyệt</option>
              <option value="Đã duyệt">Đã duyệt</option>
              <option value="Từ chối">Từ chối</option>
            </select>
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
                <th>Loại nghỉ</th>
                <th>Từ ngày</th>
                <th>Đến ngày</th>
                <th>Số ngày</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map(req => (
                <tr key={req.id}>
                  <td>
                    <div className="employee-info">
                      <div className="avatar sm">{req.hoTen.split(' ').pop()?.charAt(0)}</div>
                      <div className="info-text">
                        <div className="name">{req.hoTen}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge neutral">{req.maNV}</span></td>
                  <td style={{ fontSize: 13 }}>{req.phongBan}</td>
                  <td style={{ fontSize: 12 }}>{req.loaiNghi}</td>
                  <td style={{ fontSize: 13 }}>{req.tuNgay}</td>
                  <td style={{ fontSize: 13 }}>{req.denNgay}</td>
                  <td style={{ fontSize: 13, fontWeight: 600 }}>{req.soNgay} ngày</td>
                  <td>
                    <span className={`badge ${
                      req.trangThai === 'Chờ duyệt' ? 'warning' : 
                      req.trangThai === 'Đã duyệt' ? 'success' : 'danger'
                    }`}>
                      {req.trangThai === 'Chờ duyệt' && <Clock size={10} />}
                      {req.trangThai === 'Đã duyệt' && <CheckCircle2 size={10} />}
                      {req.trangThai === 'Từ chối' && <XCircle size={10} />}
                      {req.trangThai}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                      <button className="btn-icon btn-secondary" title="Xem chi tiết">
                        <Eye size={18} />
                      </button>
                      {req.trangThai === 'Chờ duyệt' && (
                        <>
                          <button 
                            className="btn-icon btn-success" 
                            title="Phê duyệt"
                            onClick={() => handleApprove(req.id)}
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button 
                            className="btn-icon btn-danger" 
                            title="Từ chối"
                            onClick={() => handleReject(req.id)}
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
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
            Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredRequests.length)} / {filteredRequests.length} đơn
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

      {/* Modal Create Leave Request */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tạo đơn nghỉ phép</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', color: 'var(--text-muted)', fontSize: 20 }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nhân viên *</label>
                  <select 
                    className="form-input"
                    value={formData.maNV}
                    onChange={(e) => setFormData({...formData, maNV: e.target.value})}
                    required
                  >
                    <option value="">Chọn nhân viên...</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.maNV}>
                        {emp.hoTen} ({emp.maNV}) - {emp.phongBan}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Loại nghỉ *</label>
                  <select 
                    className="form-input"
                    value={formData.loaiNghi}
                    onChange={(e) => setFormData({...formData, loaiNghi: e.target.value})}
                    required
                  >
                    <option value="Nghỉ phép năm">Nghỉ phép năm</option>
                    <option value="Nghỉ ốm">Nghỉ ốm</option>
                    <option value="Nghỉ việc riêng">Nghỉ việc riêng</option>
                    <option value="Nghỉ thai sản">Nghỉ thai sản</option>
                    <option value="Nghỉ không lương">Nghỉ không lương</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Từ ngày *</label>
                    <input 
                      className="form-input" 
                      type="date"
                      value={formData.tuNgay}
                      onChange={(e) => setFormData({...formData, tuNgay: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Đến ngày *</label>
                    <input 
                      className="form-input" 
                      type="date"
                      value={formData.denNgay}
                      onChange={(e) => setFormData({...formData, denNgay: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Lý do *</label>
                  <textarea 
                    className="form-input" 
                    rows={4}
                    value={formData.lyDo}
                    onChange={(e) => setFormData({...formData, lyDo: e.target.value})}
                    placeholder="Nhập lý do nghỉ phép..."
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">
                  <CalendarOff size={18} /> Gửi đơn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
