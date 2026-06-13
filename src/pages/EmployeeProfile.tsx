import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, DollarSign, FileText, Clock, Edit2, Save } from 'lucide-react';
import { employees } from '../data/mockData';

export default function EmployeeProfile() {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'contract' | 'salary' | 'history'>('info');
  
  // Mock data - In real app, get from URL params or context
  const employee = employees[0];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: 200, marginBottom: 24, borderRadius: 14 }} />
        <div className="skeleton" style={{ height: 400, borderRadius: 14 }} />
      </div>
    );
  }

  return (
    <div className="slide-up">
      {/* Profile Header Card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-body" style={{ padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28 }}>
            <div className="avatar xl" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-lighter))' }}>
              {employee.hoTen.split(' ').pop()?.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{employee.hoTen}</h2>
                <span className={`badge ${employee.trangThai === 'Đang làm' ? 'success' : 'info'}`}>
                  {employee.trangThai}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, fontSize: 14, color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Briefcase size={16} />
                  <span>{employee.chucVu} - {employee.phongBan}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={16} />
                  <span>Vào làm: {employee.ngayVaoLam}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-bg)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Email</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{employee.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-green-bg)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Số điện thoại</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{employee.soDienThoai}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-purple-bg)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Lương cơ bản</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{employee.luongCoBan.toLocaleString()} đ</div>
                  </div>
                </div>
              </div>
            </div>
            <button 
              className={`btn ${editMode ? 'btn-success' : 'btn-primary'}`}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? <><Save size={16} /> Lưu</> : <><Edit2 size={16} /> Chỉnh sửa</>}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
          <User size={14} style={{ marginRight: 6 }} /> Thông tin cá nhân
        </button>
        <button className={`tab ${activeTab === 'contract' ? 'active' : ''}`} onClick={() => setActiveTab('contract')}>
          <FileText size={14} style={{ marginRight: 6 }} /> Hợp đồng
        </button>
        <button className={`tab ${activeTab === 'salary' ? 'active' : ''}`} onClick={() => setActiveTab('salary')}>
          <DollarSign size={14} style={{ marginRight: 6 }} /> Lương & Phúc lợi
        </button>
        <button className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          <Clock size={14} style={{ marginRight: 6 }} /> Lịch sử
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <div className="card">
          <div className="card-body">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Thông tin cá nhân</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Mã nhân viên</label>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{employee.maNV}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Giới tính</label>
                <div style={{ fontSize: 14 }}>{employee.gioiTinh}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Ngày sinh</label>
                <div style={{ fontSize: 14 }}>{employee.ngaySinh}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Số điện thoại</label>
                <div style={{ fontSize: 14 }}>{employee.soDienThoai}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                  <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} /> Địa chỉ
                </label>
                <div style={{ fontSize: 14 }}>{employee.diaChi}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Phòng ban</label>
                <div style={{ fontSize: 14 }}>{employee.phongBan}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Chức vụ</label>
                <div style={{ fontSize: 14 }}>{employee.chucVu}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contract' && (
        <div className="card">
          <div className="card-body">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Thông tin hợp đồng</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Loại hợp đồng</label>
                <div style={{ fontSize: 14 }}>
                  <span className="badge info">{employee.loaiHopDong}</span>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Ngày vào làm</label>
                <div style={{ fontSize: 14 }}>{employee.ngayVaoLam}</div>
              </div>
              {employee.ngayHetHanHD && (
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Ngày hết hạn</label>
                  <div style={{ fontSize: 14 }}>{employee.ngayHetHanHD}</div>
                </div>
              )}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Trạng thái</label>
                <div style={{ fontSize: 14 }}>
                  <span className={`badge ${employee.trangThai === 'Đang làm' ? 'success' : 'warning'}`}>
                    {employee.trangThai}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'salary' && (
        <div className="card">
          <div className="card-body">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Thông tin lương & phúc lợi</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Lương cơ bản</label>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>{employee.luongCoBan.toLocaleString()} đ</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Phụ cấp</label>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-green)' }}>2,000,000 đ</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Bảo hiểm XH</label>
                <div style={{ fontSize: 14 }}>{employee.soBHXH || 'Chưa cập nhật'}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Mã số thuế</label>
                <div style={{ fontSize: 14 }}>{employee.maSoThue || 'Chưa cập nhật'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card">
          <div className="card-body">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Lịch sử làm việc</h3>
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              <div style={{ position: 'absolute', left: 12, top: 0, bottom: 0, width: 2, background: 'var(--border)' }} />
              
              <div style={{ position: 'relative', marginBottom: 24 }}>
                <div style={{ position: 'absolute', left: -26, top: 4, width: 12, height: 12, borderRadius: '50%', background: 'var(--primary)', border: '3px solid var(--primary-bg)' }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{employee.ngayVaoLam}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Vào làm tại vị trí {employee.chucVu} - {employee.phongBan}</div>
                </div>
              </div>

              <div style={{ position: 'relative', marginBottom: 24 }}>
                <div style={{ position: 'absolute', left: -26, top: 4, width: 12, height: 12, borderRadius: '50%', background: 'var(--accent-green)', border: '3px solid var(--accent-green-bg)' }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>2020-05-01</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ký hợp đồng chính thức</div>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: -26, top: 4, width: 12, height: 12, borderRadius: '50%', background: 'var(--accent-purple)', border: '3px solid var(--accent-purple-bg)' }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>2022-01-01</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Thăng chức {employee.chucVu}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
