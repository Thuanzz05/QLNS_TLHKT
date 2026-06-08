import { Building2, Users, Edit2 } from 'lucide-react';
import { departments } from '../data/mockData';

export default function Departments() {
  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1>Quản lý phòng ban</h1><p>Cơ cấu tổ chức doanh nghiệp TDT Group</p></div>
        <button className="btn btn-primary btn-lg"><Building2 size={16} /> Thêm phòng ban</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {departments.map(dept => (
          <div key={dept.id} className="card" style={{ cursor: 'pointer', transition: 'var(--transition)' }}>
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div className="kpi-icon" style={{ background: 'var(--primary-bg)', color: 'var(--primary)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={22} />
                </div>
                <span className={`badge ${dept.trangThai === 'Hoạt động' ? 'success' : 'danger'}`}>{dept.trangThai}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{dept.tenPhongBan}</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{dept.moTa}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--border-light)', fontSize: 13 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                  <Users size={14} /> {dept.soNhanVien} nhân viên
                </div>
                <button className="btn btn-sm btn-secondary"><Edit2 size={12} /> Sửa</button>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                Trưởng phòng: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dept.truongPhong}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
