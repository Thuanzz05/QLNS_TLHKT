import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts';
import { monthlyEmployeeData, departmentDistribution, attendanceSummary, payrollSummary } from '../data/mockData';
import { Download } from 'lucide-react';

export default function Reports() {
  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1>Báo cáo thống kê</h1><p>Tổng hợp dữ liệu nhân sự doanh nghiệp</p></div>
        <button className="btn btn-primary"><Download size={16} /> Xuất báo cáo PDF</button>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header"><h3>Biến động nhân sự 2024</h3></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyEmployeeData}>
                <defs><linearGradient id="cNV" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0F4C81" stopOpacity={0.15}/><stop offset="95%" stopColor="#0F4C81" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" /><XAxis dataKey="name" fontSize={12} tickLine={false} /><YAxis fontSize={12} tickLine={false} /><Tooltip />
                <Area type="monotone" dataKey="nhanVien" stroke="#0F4C81" strokeWidth={2} fill="url(#cNV)" name="Nhân viên" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Cơ cấu phòng ban</h3></div>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="55%" height={260}>
              <PieChart><Pie data={departmentDistribution} innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value">{departmentDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
            <div>{departmentDistribution.map((d, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 13 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} /><span style={{ flex: 1 }}>{d.name}</span><strong>{d.value}</strong></div>))}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Chấm công theo tuần</h3></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={attendanceSummary}><CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" /><XAxis dataKey="name" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="dungGio" fill="#059669" name="Đúng giờ" radius={[4,4,0,0]} /><Bar dataKey="diTre" fill="#EA580C" name="Đi trễ" radius={[4,4,0,0]} /><Bar dataKey="vangMat" fill="#DC2626" name="Vắng" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Chi phí lương 6 tháng (triệu VNĐ)</h3></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={payrollSummary}>
                <defs><linearGradient id="cPay" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15}/><stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" /><XAxis dataKey="name" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                <Area type="monotone" dataKey="tongLuong" stroke="#7C3AED" strokeWidth={2} fill="url(#cPay)" name="Tổng lương" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
