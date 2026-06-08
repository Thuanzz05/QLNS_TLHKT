import type { Employee, Department, LeaveRequest, AttendanceRecord, PayrollRecord, Notification } from '../types';

export const employees: Employee[] = [
  { id: '1', maNV: 'NV001', hoTen: 'Nguyễn Văn An', email: 'an.nv@tdtgroup.vn', soDienThoai: '0901234567', ngaySinh: '1990-05-15', gioiTinh: 'Nam', diaChi: 'Quận 1, TP.HCM', phongBan: 'Công nghệ thông tin', phongBanId: 'PB001', chucVu: 'Trưởng phòng', ngayVaoLam: '2019-03-01', trangThai: 'Đang làm', loaiHopDong: 'Không xác định thời hạn', luongCoBan: 35000000 },
  { id: '2', maNV: 'NV002', hoTen: 'Trần Thị Bình', email: 'binh.tt@tdtgroup.vn', soDienThoai: '0912345678', ngaySinh: '1992-08-22', gioiTinh: 'Nữ', diaChi: 'Quận 3, TP.HCM', phongBan: 'Nhân sự', phongBanId: 'PB002', chucVu: 'Trưởng phòng', ngayVaoLam: '2018-07-15', trangThai: 'Đang làm', loaiHopDong: 'Không xác định thời hạn', luongCoBan: 32000000 },
  { id: '3', maNV: 'NV003', hoTen: 'Lê Hoàng Cường', email: 'cuong.lh@tdtgroup.vn', soDienThoai: '0923456789', ngaySinh: '1995-01-10', gioiTinh: 'Nam', diaChi: 'Quận 7, TP.HCM', phongBan: 'Kinh doanh', phongBanId: 'PB003', chucVu: 'Nhân viên', ngayVaoLam: '2022-01-10', trangThai: 'Đang làm', loaiHopDong: 'Xác định thời hạn', ngayHetHanHD: '2025-01-10', luongCoBan: 18000000 },
  { id: '4', maNV: 'NV004', hoTen: 'Phạm Minh Đức', email: 'duc.pm@tdtgroup.vn', soDienThoai: '0934567890', ngaySinh: '1988-11-30', gioiTinh: 'Nam', diaChi: 'Quận Bình Thạnh, TP.HCM', phongBan: 'Tài chính - Kế toán', phongBanId: 'PB004', chucVu: 'Phó phòng', ngayVaoLam: '2020-05-20', trangThai: 'Đang làm', loaiHopDong: 'Không xác định thời hạn', luongCoBan: 28000000 },
  { id: '5', maNV: 'NV005', hoTen: 'Võ Thị Hạnh', email: 'hanh.vt@tdtgroup.vn', soDienThoai: '0945678901', ngaySinh: '1993-04-18', gioiTinh: 'Nữ', diaChi: 'Quận 2, TP.HCM', phongBan: 'Marketing', phongBanId: 'PB005', chucVu: 'Nhân viên', ngayVaoLam: '2023-06-01', trangThai: 'Thử việc', loaiHopDong: 'Thử việc', luongCoBan: 14000000 },
  { id: '6', maNV: 'NV006', hoTen: 'Đặng Quốc Bảo', email: 'bao.dq@tdtgroup.vn', soDienThoai: '0956789012', ngaySinh: '1991-07-25', gioiTinh: 'Nam', diaChi: 'Quận 10, TP.HCM', phongBan: 'Công nghệ thông tin', phongBanId: 'PB001', chucVu: 'Nhân viên', ngayVaoLam: '2021-09-15', trangThai: 'Đang làm', loaiHopDong: 'Xác định thời hạn', luongCoBan: 22000000 },
  { id: '7', maNV: 'NV007', hoTen: 'Huỳnh Thanh Mai', email: 'mai.ht@tdtgroup.vn', soDienThoai: '0967890123', ngaySinh: '1994-12-03', gioiTinh: 'Nữ', diaChi: 'Quận Phú Nhuận, TP.HCM', phongBan: 'Nhân sự', phongBanId: 'PB002', chucVu: 'Nhân viên', ngayVaoLam: '2022-03-01', trangThai: 'Đang làm', loaiHopDong: 'Xác định thời hạn', luongCoBan: 16000000 },
  { id: '8', maNV: 'NV008', hoTen: 'Bùi Văn Khoa', email: 'khoa.bv@tdtgroup.vn', soDienThoai: '0978901234', ngaySinh: '1996-09-08', gioiTinh: 'Nam', diaChi: 'Quận Gò Vấp, TP.HCM', phongBan: 'Kinh doanh', phongBanId: 'PB003', chucVu: 'Nhân viên', ngayVaoLam: '2023-08-20', trangThai: 'Nghỉ phép', loaiHopDong: 'Xác định thời hạn', luongCoBan: 15000000 },
  { id: '9', maNV: 'NV009', hoTen: 'Ngô Thị Lan', email: 'lan.nt@tdtgroup.vn', soDienThoai: '0989012345', ngaySinh: '1989-02-14', gioiTinh: 'Nữ', diaChi: 'Quận Tân Bình, TP.HCM', phongBan: 'Hành chính', phongBanId: 'PB006', chucVu: 'Trưởng phòng', ngayVaoLam: '2017-11-01', trangThai: 'Đang làm', loaiHopDong: 'Không xác định thời hạn', luongCoBan: 30000000 },
  { id: '10', maNV: 'NV010', hoTen: 'Trịnh Công Sơn', email: 'son.tc@tdtgroup.vn', soDienThoai: '0990123456', ngaySinh: '1997-06-20', gioiTinh: 'Nam', diaChi: 'Thủ Đức, TP.HCM', phongBan: 'Công nghệ thông tin', phongBanId: 'PB001', chucVu: 'Nhân viên', ngayVaoLam: '2024-01-15', trangThai: 'Thử việc', loaiHopDong: 'Thử việc', luongCoBan: 13000000 },
];

export const departments: Department[] = [
  { id: 'PB001', tenPhongBan: 'Công nghệ thông tin', moTa: 'Phát triển và vận hành hệ thống CNTT', truongPhong: 'Nguyễn Văn An', soNhanVien: 12, ngayThanhLap: '2015-01-01', trangThai: 'Hoạt động' },
  { id: 'PB002', tenPhongBan: 'Nhân sự', moTa: 'Quản lý nhân sự và tuyển dụng', truongPhong: 'Trần Thị Bình', soNhanVien: 8, ngayThanhLap: '2015-01-01', trangThai: 'Hoạt động' },
  { id: 'PB003', tenPhongBan: 'Kinh doanh', moTa: 'Phát triển kinh doanh và bán hàng', truongPhong: 'Lê Văn Hùng', soNhanVien: 15, ngayThanhLap: '2015-03-15', trangThai: 'Hoạt động' },
  { id: 'PB004', tenPhongBan: 'Tài chính - Kế toán', moTa: 'Quản lý tài chính và kế toán', truongPhong: 'Phạm Minh Đức', soNhanVien: 6, ngayThanhLap: '2015-01-01', trangThai: 'Hoạt động' },
  { id: 'PB005', tenPhongBan: 'Marketing', moTa: 'Tiếp thị và truyền thông', truongPhong: 'Nguyễn Thị Hoa', soNhanVien: 10, ngayThanhLap: '2016-06-01', trangThai: 'Hoạt động' },
  { id: 'PB006', tenPhongBan: 'Hành chính', moTa: 'Quản lý hành chính văn phòng', truongPhong: 'Ngô Thị Lan', soNhanVien: 5, ngayThanhLap: '2015-01-01', trangThai: 'Hoạt động' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'NP001', maNV: 'NV003', hoTen: 'Lê Hoàng Cường', phongBan: 'Kinh doanh', loaiNghi: 'Nghỉ phép năm', tuNgay: '2024-12-20', denNgay: '2024-12-22', soNgay: 3, lyDo: 'Về quê thăm gia đình', trangThai: 'Chờ duyệt', ngayTao: '2024-12-15' },
  { id: 'NP002', maNV: 'NV005', hoTen: 'Võ Thị Hạnh', phongBan: 'Marketing', loaiNghi: 'Nghỉ ốm', tuNgay: '2024-12-18', denNgay: '2024-12-19', soNgay: 2, lyDo: 'Bị cảm sốt', trangThai: 'Đã duyệt', nguoiDuyet: 'Nguyễn Thị Hoa', ngayTao: '2024-12-17' },
  { id: 'NP003', maNV: 'NV008', hoTen: 'Bùi Văn Khoa', phongBan: 'Kinh doanh', loaiNghi: 'Nghỉ việc riêng', tuNgay: '2024-12-25', denNgay: '2024-12-27', soNgay: 3, lyDo: 'Đám cưới người thân', trangThai: 'Chờ duyệt', ngayTao: '2024-12-16' },
  { id: 'NP004', maNV: 'NV006', hoTen: 'Đặng Quốc Bảo', phongBan: 'Công nghệ thông tin', loaiNghi: 'Nghỉ phép năm', tuNgay: '2024-12-30', denNgay: '2025-01-03', soNgay: 5, lyDo: 'Nghỉ Tết dương lịch', trangThai: 'Chờ duyệt', ngayTao: '2024-12-14' },
  { id: 'NP005', maNV: 'NV007', hoTen: 'Huỳnh Thanh Mai', phongBan: 'Nhân sự', loaiNghi: 'Nghỉ phép năm', tuNgay: '2024-12-23', denNgay: '2024-12-24', soNgay: 2, lyDo: 'Việc cá nhân', trangThai: 'Từ chối', nguoiDuyet: 'Trần Thị Bình', ngayTao: '2024-12-13' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'CC001', maNV: 'NV001', hoTen: 'Nguyễn Văn An', phongBan: 'CNTT', ngay: '2024-12-16', gioVao: '08:00', gioRa: '17:30', trangThai: 'Đúng giờ' },
  { id: 'CC002', maNV: 'NV002', hoTen: 'Trần Thị Bình', phongBan: 'Nhân sự', ngay: '2024-12-16', gioVao: '08:15', gioRa: '17:30', trangThai: 'Đi trễ', ghiChu: 'Kẹt xe' },
  { id: 'CC003', maNV: 'NV003', hoTen: 'Lê Hoàng Cường', phongBan: 'Kinh doanh', ngay: '2024-12-16', gioVao: '07:55', gioRa: '17:00', trangThai: 'Đúng giờ' },
  { id: 'CC004', maNV: 'NV004', hoTen: 'Phạm Minh Đức', phongBan: 'Tài chính', ngay: '2024-12-16', gioVao: '08:00', gioRa: '16:30', trangThai: 'Về sớm', ghiChu: 'Xin phép' },
  { id: 'CC005', maNV: 'NV005', hoTen: 'Võ Thị Hạnh', phongBan: 'Marketing', ngay: '2024-12-16', gioVao: '', gioRa: '', trangThai: 'Nghỉ phép' },
  { id: 'CC006', maNV: 'NV006', hoTen: 'Đặng Quốc Bảo', phongBan: 'CNTT', ngay: '2024-12-16', gioVao: '08:00', gioRa: '18:00', trangThai: 'Đúng giờ' },
  { id: 'CC007', maNV: 'NV007', hoTen: 'Huỳnh Thanh Mai', phongBan: 'Nhân sự', ngay: '2024-12-16', gioVao: '08:30', gioRa: '17:30', trangThai: 'Đi trễ', ghiChu: 'Đi khám bệnh sáng' },
  { id: 'CC008', maNV: 'NV008', hoTen: 'Bùi Văn Khoa', phongBan: 'Kinh doanh', ngay: '2024-12-16', gioVao: '', gioRa: '', trangThai: 'Vắng mặt', ghiChu: 'Không phép' },
];

export const payrollRecords: PayrollRecord[] = [
  { id: 'TL001', maNV: 'NV001', hoTen: 'Nguyễn Văn An', phongBan: 'CNTT', chucVu: 'Trưởng phòng', thang: 11, nam: 2024, luongCoBan: 35000000, phuCap: 5000000, thuong: 3000000, baoHiem: 3675000, thueTNCN: 4832500, khauTru: 8507500, thucLinh: 34492500, trangThai: 'Đã thanh toán' },
  { id: 'TL002', maNV: 'NV002', hoTen: 'Trần Thị Bình', phongBan: 'Nhân sự', chucVu: 'Trưởng phòng', thang: 11, nam: 2024, luongCoBan: 32000000, phuCap: 4000000, thuong: 2000000, baoHiem: 3360000, thueTNCN: 3864000, khauTru: 7224000, thucLinh: 30776000, trangThai: 'Đã thanh toán' },
  { id: 'TL003', maNV: 'NV003', hoTen: 'Lê Hoàng Cường', phongBan: 'Kinh doanh', chucVu: 'Nhân viên', thang: 11, nam: 2024, luongCoBan: 18000000, phuCap: 2000000, thuong: 1500000, baoHiem: 1890000, thueTNCN: 1461000, khauTru: 3351000, thucLinh: 18149000, trangThai: 'Đã thanh toán' },
  { id: 'TL004', maNV: 'NV004', hoTen: 'Phạm Minh Đức', phongBan: 'Tài chính', chucVu: 'Phó phòng', thang: 11, nam: 2024, luongCoBan: 28000000, phuCap: 3500000, thuong: 2000000, baoHiem: 2940000, thueTNCN: 3019000, khauTru: 5959000, thucLinh: 27541000, trangThai: 'Chờ thanh toán' },
  { id: 'TL005', maNV: 'NV005', hoTen: 'Võ Thị Hạnh', phongBan: 'Marketing', chucVu: 'Nhân viên', thang: 11, nam: 2024, luongCoBan: 14000000, phuCap: 1500000, thuong: 0, baoHiem: 1470000, thueTNCN: 703500, khauTru: 2173500, thucLinh: 13326500, trangThai: 'Đang xử lý' },
];

export const notifications: Notification[] = [
  { id: 'TB001', title: 'Đơn nghỉ phép mới', message: 'Lê Hoàng Cường đã gửi đơn xin nghỉ phép 3 ngày', type: 'warning', time: '5 phút trước', read: false },
  { id: 'TB002', title: 'Hợp đồng sắp hết hạn', message: 'Hợp đồng của NV003 sẽ hết hạn trong 30 ngày', type: 'error', time: '1 giờ trước', read: false },
  { id: 'TB003', title: 'Bảng lương tháng 11', message: 'Bảng lương tháng 11/2024 đã được phê duyệt', type: 'success', time: '3 giờ trước', read: true },
  { id: 'TB004', title: 'Nhân viên mới', message: 'Trịnh Công Sơn đã được thêm vào phòng CNTT', type: 'info', time: '1 ngày trước', read: true },
  { id: 'TB005', title: 'Đơn nghỉ phép chờ duyệt', message: 'Có 3 đơn nghỉ phép đang chờ duyệt', type: 'warning', time: '2 giờ trước', read: false },
];

export const monthlyEmployeeData = [
  { name: 'T1', nhanVien: 52 }, { name: 'T2', nhanVien: 54 }, { name: 'T3', nhanVien: 55 },
  { name: 'T4', nhanVien: 58 }, { name: 'T5', nhanVien: 56 }, { name: 'T6', nhanVien: 60 },
  { name: 'T7', nhanVien: 62 }, { name: 'T8', nhanVien: 63 }, { name: 'T9', nhanVien: 65 },
  { name: 'T10', nhanVien: 64 }, { name: 'T11', nhanVien: 66 }, { name: 'T12', nhanVien: 68 },
];

export const departmentDistribution = [
  { name: 'CNTT', value: 12, color: '#0F4C81' }, { name: 'Nhân sự', value: 8, color: '#1B6BA8' },
  { name: 'Kinh doanh', value: 15, color: '#2E86C1' }, { name: 'Tài chính', value: 6, color: '#5DADE2' },
  { name: 'Marketing', value: 10, color: '#85C1E9' }, { name: 'Hành chính', value: 5, color: '#AED6F1' },
];

export const attendanceSummary = [
  { name: 'T2', dungGio: 85, diTre: 10, vangMat: 5 },
  { name: 'T3', dungGio: 88, diTre: 8, vangMat: 4 },
  { name: 'T4', dungGio: 82, diTre: 12, vangMat: 6 },
  { name: 'T5', dungGio: 90, diTre: 7, vangMat: 3 },
  { name: 'T6', dungGio: 87, diTre: 9, vangMat: 4 },
  { name: 'T7', dungGio: 91, diTre: 6, vangMat: 3 },
];

export const payrollSummary = [
  { name: 'T6', tongLuong: 1200 }, { name: 'T7', tongLuong: 1250 },
  { name: 'T8', tongLuong: 1280 }, { name: 'T9', tongLuong: 1300 },
  { name: 'T10', tongLuong: 1320 }, { name: 'T11', tongLuong: 1350 },
];
