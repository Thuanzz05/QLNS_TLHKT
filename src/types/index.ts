// ==========================================
// HRM System Type Definitions - TDT Group
// ==========================================

export interface Employee {
  id: string;
  maNV: string;
  hoTen: string;
  avatar?: string;
  email: string;
  soDienThoai: string;
  ngaySinh: string;
  gioiTinh: 'Nam' | 'Nữ';
  diaChi: string;
  phongBan: string;
  phongBanId: string;
  chucVu: string;
  ngayVaoLam: string;
  trangThai: 'Đang làm' | 'Nghỉ việc' | 'Thử việc' | 'Nghỉ phép';
  loaiHopDong: string;
  ngayHetHanHD?: string;
  luongCoBan: number;
  maSoThue?: string;
  soBHXH?: string;
}

export interface Department {
  id: string;
  tenPhongBan: string;
  moTa: string;
  truongPhong: string;
  soNhanVien: number;
  ngayThanhLap: string;
  trangThai: 'Hoạt động' | 'Tạm ngưng';
}

export interface Position {
  id: string;
  tenChucVu: string;
  moTa: string;
  phongBan: string;
  capBac: number;
}

export interface AttendanceRecord {
  id: string;
  maNV: string;
  hoTen: string;
  phongBan: string;
  ngay: string;
  gioVao: string;
  gioRa: string;
  trangThai: 'Đúng giờ' | 'Đi trễ' | 'Về sớm' | 'Vắng mặt' | 'Nghỉ phép';
  ghiChu?: string;
}

export interface LeaveRequest {
  id: string;
  maNV: string;
  hoTen: string;
  phongBan: string;
  loaiNghi: 'Nghỉ phép năm' | 'Nghỉ ốm' | 'Nghỉ việc riêng' | 'Nghỉ thai sản' | 'Nghỉ không lương';
  tuNgay: string;
  denNgay: string;
  soNgay: number;
  lyDo: string;
  trangThai: 'Chờ duyệt' | 'Đã duyệt' | 'Từ chối';
  nguoiDuyet?: string;
  ngayTao: string;
}

export interface PayrollRecord {
  id: string;
  maNV: string;
  hoTen: string;
  phongBan: string;
  chucVu: string;
  thang: number;
  nam: number;
  luongCoBan: number;
  phuCap: number;
  thuong: number;
  baoHiem: number;
  thueTNCN: number;
  khauTru: number;
  thucLinh: number;
  trangThai: 'Đã thanh toán' | 'Chờ thanh toán' | 'Đang xử lý';
}

export interface Contract {
  id: string;
  maNV: string;
  hoTen: string;
  loaiHopDong: 'Thử việc' | 'Xác định thời hạn' | 'Không xác định thời hạn';
  ngayBatDau: string;
  ngayKetThuc?: string;
  trangThai: 'Hiệu lực' | 'Hết hạn' | 'Sắp hết hạn';
  luongCoBan: number;
}

export interface RewardDiscipline {
  id: string;
  maNV: string;
  hoTen: string;
  phongBan: string;
  loai: 'Khen thưởng' | 'Kỷ luật';
  hinhThuc: string;
  lyDo: string;
  soTien?: number;
  ngayQuyetDinh: string;
  nguoiQuyetDinh: string;
  trangThai: 'Hiệu lực' | 'Hủy bỏ';
}

export interface KPIData {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  time: string;
  read: boolean;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
  badge?: number;
}
