import { useState, useEffect } from 'react';
import { CalendarOff, Plus, Search, Clock, CheckCircle2, XCircle, Download, Eye } from 'lucide-react';
import { leaveRequests } from '../data/mockData';

export default function Leave() {
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const filteredRequests = leaveRequests.filter(req => {
    const matchSearch = req.hoTen.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       req.maNV.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || req.trangThai === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(r => r.trangThai === 'Chờ duyệt').length,
    approved: leaveRequests.filter(r => r.trangThai === 'Đã duyệt').length,
    rejected: leaveRequests.filter(r => r.trangThai === 'Từ chối').length,
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
            <Download size={16} /> Xuất báo cáo
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Tạo đơn nghỉ phép
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
              {filteredRequests.map(req => (
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
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                      <button className="btn-icon btn-secondary" title="Xem chi tiết">
                        <Eye size={14} />
                      </button>
                      {req.trangThai === 'Chờ duyệt' && (
                        <>
                          <button className="btn-icon btn-success" title="Phê duyệt">
                            <CheckCircle2 size={14} />
                          </button>
                          <button className="btn-icon btn-danger" title="Từ chối">
                            <XCircle size={14} />
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
            Hiển thị {filteredRequests.length} / {leaveRequests.length} đơn
          </div>
          <div className="pagination-btns">
            <button>‹</button>
            <button className="active">1</button>
            <button>›</button>
          </div>
        </div>
      </div>

      {/* Modal Create Leave Request */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tạo đơn nghỉ phép</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', color: 'var(--text-muted)' }}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Nhân viên *</label>
                <select className="form-input">
                  <option>Chọn nhân viên...</option>
                  <option>Phùng Thanh Độ (NV001)</option>
                  <option>Trần Hà Linh (NV002)</option>
                  <option>Lâm Đình Khoa (NV003)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Loại nghỉ *</label>
                <select className="form-input">
                  <option>Nghỉ phép năm</option>
                  <option>Nghỉ ốm</option>
                  <option>Nghỉ việc riêng</option>
                  <option>Nghỉ thai sản</option>
                  <option>Nghỉ không lương</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Từ ngày *</label>
                  <input className="form-input" type="date" />
                </div>
                <div className="form-group">
                  <label className="form-label">Đến ngày *</label>
                  <input className="form-input" type="date" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Lý do *</label>
                <textarea 
                  className="form-input" 
                  rows={4} 
                  placeholder="Nhập lý do nghỉ phép..."
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
              <button className="btn btn-primary">Gửi đơn</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
