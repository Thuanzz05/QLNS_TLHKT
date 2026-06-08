import { Download, Wallet } from 'lucide-react';
import { payrollRecords } from '../data/mockData';

export default function Payroll() {
  const fmt = (n: number) => n.toLocaleString('vi-VN');
  const totalPay = payrollRecords.reduce((s, r) => s + r.thucLinh, 0);

  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1>Bảng lương</h1><p>Quản lý tiền lương nhân viên tháng 11/2024</p></div>
        <div className="page-actions">
          <button className="btn btn-secondary"><Download size={16} /> Xuất bảng lương</button>
          <button className="btn btn-primary btn-lg"><Wallet size={16} /> Tính lương tháng này</button>
        </div>
      </div>

      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
        <div className="kpi-card blue"><div className="kpi-value">{fmt(totalPay)} ₫</div><div className="kpi-label">Tổng thực lĩnh</div></div>
        <div className="kpi-card green"><div className="kpi-value">{payrollRecords.filter(r => r.trangThai === 'Đã thanh toán').length}</div><div className="kpi-label">Đã thanh toán</div></div>
        <div className="kpi-card orange"><div className="kpi-value">{payrollRecords.filter(r => r.trangThai !== 'Đã thanh toán').length}</div><div className="kpi-label">Chờ xử lý</div></div>
      </div>

      <div className="card">
        <div className="card-body no-padding">
          <table className="data-table">
            <thead><tr><th>Nhân viên</th><th>Phòng ban</th><th style={{ textAlign: 'right' }}>Lương CB</th><th style={{ textAlign: 'right' }}>Phụ cấp</th><th style={{ textAlign: 'right' }}>Thưởng</th><th style={{ textAlign: 'right' }}>Khấu trừ</th><th style={{ textAlign: 'right' }}>Thực lĩnh</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {payrollRecords.map(r => (
                <tr key={r.id}>
                  <td><div className="employee-info"><div className="avatar sm">{r.hoTen.split(' ').pop()?.charAt(0)}</div><div className="info-text"><div className="name">{r.hoTen}</div><div className="sub">{r.chucVu}</div></div></div></td>
                  <td>{r.phongBan}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>{fmt(r.luongCoBan)}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--accent-green)' }}>+{fmt(r.phuCap)}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--accent-green)' }}>+{fmt(r.thuong)}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--accent-red)' }}>-{fmt(r.khauTru)}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, fontFamily: 'monospace', fontSize: 14 }}>{fmt(r.thucLinh)}</td>
                  <td><span className={`badge ${r.trangThai === 'Đã thanh toán' ? 'success' : r.trangThai === 'Chờ thanh toán' ? 'warning' : 'info'}`}>{r.trangThai}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
