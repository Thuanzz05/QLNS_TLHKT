import { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle2, XCircle, AlertCircle, Download, Search } from 'lucide-react';
import { attendanceRecords as mockAttendance, employees as mockEmployees, leaveRequests } from '../data/mockData';
import { getAttendance, saveAttendance, getEmployees, initializeStorage } from '../utils/localStorage';

export default function Attendance() {
  const [loading, setLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState('2024-12-16');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    maNV: '',
    ngay: new Date().toISOString().split('T')[0],
    gioVao: '',
    gioRa: '',
    trangThai: 'Đúng giờ',
    ghiChu: ''
  });

  useEffect(() => {
    // Initialize localStorage
    initializeStorage(mockEmployees, mockAttendance, leaveRequests);
    
    // Load data from localStorage
    setAttendanceRecords(getAttendance());
    setEmployees(getEmployees());
    
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const filteredRecords = attendanceRecords.filter(record => {
    const matchSearch = record.hoTen.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       record.maNV.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || record.trangThai === filterStatus;
    return matchSearch && matchStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const stats = {
    total: attendanceRecords.length,
    dungGio: attendanceRecords.filter(r => r.trangThai === 'Đúng giờ').length,
    diTre: attendanceRecords.filter(r => r.trangThai === 'Đi trễ').length,
    vangMat: attendanceRecords.filter(r => r.trangThai === 'Vắng mặt').length,
    nghiPhep: attendanceRecords.filter(r => r.trangThai === 'Nghỉ phép').length,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.maNV) {
      alert('Vui lòng chọn nhân viên!');
      return;
    }
    if (!formData.gioVao && formData.trangThai !== 'Nghỉ phép' && formData.trangThai !== 'Vắng mặt') {
      alert('Vui lòng nhập giờ vào!');
      return;
    }

    // Get employee info
    const emp = employees.find(e => e.maNV === formData.maNV);
    if (!emp) return;

    // Create new record
    const newRecord = {
      id: `CC${Date.now()}`,
      maNV: formData.maNV,
      hoTen: emp.hoTen,
      phongBan: emp.phongBan,
      ngay: formData.ngay,
      gioVao: formData.gioVao,
      gioRa: formData.gioRa,
      trangThai: formData.trangThai as any,
      ghiChu: formData.ghiChu
    };

    const updatedRecords = [...attendanceRecords, newRecord];
    setAttendanceRecords(updatedRecords);
    saveAttendance(updatedRecords);
    
    alert('Chấm công thành công!');
    setShowModal(false);
    
    // Reset form
    setFormData({
      maNV: '',
      ngay: new Date().toISOString().split('T')[0],
      gioVao: '',
      gioRa: '',
      trangThai: 'Đúng giờ',
      ghiChu: ''
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
          <h1>Chấm công</h1>
          <p>Quản lý và theo dõi chấm công hàng ngày của nhân viên</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <Download size={18} /> Xuất báo cáo
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Clock size={18} /> Chấm công thủ công
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="kpi-grid">
        <div className="kpi-card blue">
          <div className="kpi-header">
            <div className="kpi-icon"><Clock size={22} /></div>
          </div>
          <div className="kpi-value">{stats.total}</div>
          <div className="kpi-label">Tổng bản ghi</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-header">
            <div className="kpi-icon"><CheckCircle2 size={22} /></div>
          </div>
          <div className="kpi-value">{stats.dungGio}</div>
          <div className="kpi-label">Đúng giờ</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-header">
            <div className="kpi-icon"><AlertCircle size={22} /></div>
          </div>
          <div className="kpi-value">{stats.diTre}</div>
          <div className="kpi-label">Đi trễ</div>
        </div>
        <div className="kpi-card purple">
          <div className="kpi-header">
            <div className="kpi-icon"><XCircle size={22} /></div>
          </div>
          <div className="kpi-value">{stats.vangMat}</div>
          <div className="kpi-label">Vắng mặt</div>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={16} color="var(--text-muted)" />
              <input 
                type="date" 
                className="filter-select" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ width: 160 }}
              />
            </div>
            <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Tất cả trạng thái</option>
              <option value="Đúng giờ">Đúng giờ</option>
              <option value="Đi trễ">Đi trễ</option>
              <option value="Về sớm">Về sớm</option>
              <option value="Vắng mặt">Vắng mặt</option>
              <option value="Nghỉ phép">Nghỉ phép</option>
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
                <th>Ngày</th>
                <th>Giờ vào</th>
                <th>Giờ ra</th>
                <th>Tổng giờ</th>
                <th>Trạng thái</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map(record => {
                const gioVao = record.gioVao ? new Date(`2024-01-01 ${record.gioVao}`) : null;
                const gioRa = record.gioRa ? new Date(`2024-01-01 ${record.gioRa}`) : null;
                const tongGio = gioVao && gioRa ? ((gioRa.getTime() - gioVao.getTime()) / (1000 * 60 * 60)).toFixed(1) : '-';

                return (
                  <tr key={record.id}>
                    <td>
                      <div className="employee-info">
                        <div className="avatar sm">{record.hoTen.split(' ').pop()?.charAt(0)}</div>
                        <div className="info-text">
                          <div className="name">{record.hoTen}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge neutral">{record.maNV}</span></td>
                    <td style={{ fontSize: 13 }}>{record.phongBan}</td>
                    <td style={{ fontSize: 13 }}>{record.ngay}</td>
                    <td style={{ fontSize: 13, fontWeight: 600 }}>{record.gioVao || '-'}</td>
                    <td style={{ fontSize: 13, fontWeight: 600 }}>{record.gioRa || '-'}</td>
                    <td style={{ fontSize: 13, fontWeight: 600 }}>{tongGio} giờ</td>
                    <td>
                      <span className={`badge ${
                        record.trangThai === 'Đúng giờ' ? 'success' : 
                        record.trangThai === 'Đi trễ' ? 'warning' : 
                        record.trangThai === 'Nghỉ phép' ? 'info' :
                        record.trangThai === 'Về sớm' ? 'warning' : 'danger'
                      }`}>
                        {record.trangThai === 'Đúng giờ' && <CheckCircle2 size={10} />}
                        {record.trangThai === 'Đi trễ' && <AlertCircle size={10} />}
                        {record.trangThai === 'Vắng mặt' && <XCircle size={10} />}
                        {record.trangThai}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {record.ghiChu || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredRecords.length)} / {filteredRecords.length} bản ghi
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

      {/* Summary Card */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <h3>Thống kê chấm công</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
            <div style={{ textAlign: 'center', padding: 16, borderRadius: 12, background: 'var(--primary-bg)' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>{stats.total}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Tổng số</div>
            </div>
            <div style={{ textAlign: 'center', padding: 16, borderRadius: 12, background: 'var(--accent-green-bg)' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-green)', marginBottom: 4 }}>{stats.dungGio}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Đúng giờ</div>
            </div>
            <div style={{ textAlign: 'center', padding: 16, borderRadius: 12, background: 'var(--accent-orange-bg)' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-orange)', marginBottom: 4 }}>{stats.diTre}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Đi trễ</div>
            </div>
            <div style={{ textAlign: 'center', padding: 16, borderRadius: 12, background: 'var(--accent-red-bg)' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-red)', marginBottom: 4 }}>{stats.vangMat}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Vắng mặt</div>
            </div>
            <div style={{ textAlign: 'center', padding: 16, borderRadius: 12, background: 'var(--secondary)' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{stats.nghiPhep}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Nghỉ phép</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Chấm Công Thủ Công */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chấm công thủ công</h3>
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
                  <label className="form-label">Ngày chấm công *</label>
                  <input 
                    className="form-input" 
                    type="date"
                    value={formData.ngay}
                    onChange={(e) => setFormData({...formData, ngay: e.target.value})}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Giờ vào</label>
                    <input 
                      className="form-input" 
                      type="time"
                      value={formData.gioVao}
                      onChange={(e) => setFormData({...formData, gioVao: e.target.value})}
                      placeholder="08:00"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Giờ ra</label>
                    <input 
                      className="form-input" 
                      type="time"
                      value={formData.gioRa}
                      onChange={(e) => setFormData({...formData, gioRa: e.target.value})}
                      placeholder="17:00"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Trạng thái *</label>
                  <select 
                    className="form-input"
                    value={formData.trangThai}
                    onChange={(e) => setFormData({...formData, trangThai: e.target.value})}
                    required
                  >
                    <option value="Đúng giờ">Đúng giờ</option>
                    <option value="Đi trễ">Đi trễ</option>
                    <option value="Về sớm">Về sớm</option>
                    <option value="Vắng mặt">Vắng mặt</option>
                    <option value="Nghỉ phép">Nghỉ phép</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Ghi chú</label>
                  <textarea 
                    className="form-input" 
                    rows={3}
                    value={formData.ghiChu}
                    onChange={(e) => setFormData({...formData, ghiChu: e.target.value})}
                    placeholder="Nhập ghi chú nếu có..."
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">
                  <Clock size={18} /> Lưu chấm công
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
