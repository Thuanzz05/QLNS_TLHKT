# 🧪 Test Các Tính Năng Mới

## ✅ Đã Hoàn Thiện

### 1. Chấm Công Thủ Công (`/cham-cong`)

**Cách test:**
1. Đăng nhập vào hệ thống
2. Vào menu **Chấm công** 
3. Click nút **"Chấm công thủ công"**
4. Điền form với các thông tin:

**Form fields:**
- ✅ **Nhân viên** (dropdown): Hiển thị tất cả 10 nhân viên từ database
  - Format: `Họ tên (Mã NV) - Phòng ban`
  - VD: `Phùng Thanh Độ (NV001) - Công nghệ thông tin`
  
- ✅ **Ngày chấm công**: Date picker (mặc định hôm nay)
  
- ✅ **Giờ vào**: Time picker (VD: 08:00)
  
- ✅ **Giờ ra**: Time picker (VD: 17:00)
  
- ✅ **Trạng thái** (dropdown):
  - Đúng giờ
  - Đi trễ
  - Về sớm
  - Vắng mặt
  - Nghỉ phép
  
- ✅ **Ghi chú**: Textarea (optional)

**Validation:**
- ❗ Phải chọn nhân viên
- ❗ Phải nhập giờ vào (trừ khi trạng thái là Nghỉ phép hoặc Vắng mặt)
- ✅ Alert thông báo khi thiếu thông tin
- ✅ Alert thành công khi lưu
- ✅ Form reset sau khi lưu thành công

---

### 2. Tạo Đơn Nghỉ Phép (`/nghi-phep`)

**Cách test:**
1. Đăng nhập vào hệ thống
2. Vào menu **Quản lý nghỉ phép**
3. Click nút **"Tạo đơn nghỉ phép"**
4. Điền form với các thông tin:

**Form fields:**
- ✅ **Nhân viên** (dropdown): Hiển thị đầy đủ 10 nhân viên
  - Format: `Họ tên (Mã NV) - Phòng ban`
  - Danh sách:
    1. Phùng Thanh Độ (NV001) - Công nghệ thông tin
    2. Trần Hà Linh (NV002) - Nhân sự
    3. Lâm Đình Khoa (NV003) - Kinh doanh
    4. Trần Thái Linh (NV004) - Tài chính - Kế toán
    5. Nguyễn Đắc Tú (NV005) - Marketing
    6. Nguyễn Văn Thuận (NV006) - Công nghệ thông tin
    7. Lê Đức Anh (NV007) - Nhân sự
    8. Trần Mạnh Quang (NV008) - Kinh doanh
    9. Nguyễn Minh Hoàng (NV009) - Hành chính
    10. Trịnh Công Sơn (NV010) - Công nghệ thông tin

- ✅ **Loại nghỉ** (dropdown):
  - Nghỉ phép năm
  - Nghỉ ốm
  - Nghỉ việc riêng
  - Nghỉ thai sản
  - Nghỉ không lương

- ✅ **Từ ngày**: Date picker
  
- ✅ **Đến ngày**: Date picker
  
- ✅ **Lý do**: Textarea (bắt buộc)

**Validation:**
- ❗ Phải chọn nhân viên
- ❗ Phải chọn cả từ ngày và đến ngày
- ❗ Phải nhập lý do
- ❗ Ngày kết thúc phải sau ngày bắt đầu
- ✅ Tự động tính số ngày nghỉ
- ✅ Alert hiển thị số ngày nghỉ
- ✅ Form reset sau khi gửi thành công

---

## 🎯 Test Cases

### Test Case 1: Chấm công thủ công thành công
```
1. Click "Chấm công thủ công"
2. Chọn NV: "Phùng Thanh Độ (NV001) - Công nghệ thông tin"
3. Chọn ngày: Hôm nay
4. Nhập giờ vào: 08:00
5. Nhập giờ ra: 17:00
6. Chọn trạng thái: Đúng giờ
7. Ghi chú: "Chấm công bổ sung"
8. Click "Lưu chấm công"
Expected: Alert "Chấm công thành công!", modal đóng, form reset
```

### Test Case 2: Chấm công thiếu thông tin
```
1. Click "Chấm công thủ công"
2. Không chọn nhân viên
3. Click "Lưu chấm công"
Expected: Alert "Vui lòng chọn nhân viên!"
```

### Test Case 3: Tạo đơn nghỉ phép thành công
```
1. Click "Tạo đơn nghỉ phép"
2. Chọn NV: "Lâm Đình Khoa (NV003) - Kinh doanh"
3. Loại nghỉ: Nghỉ phép năm
4. Từ ngày: 2024-12-20
5. Đến ngày: 2024-12-22
6. Lý do: "Về quê thăm gia đình"
7. Click "Gửi đơn"
Expected: Alert "Gửi đơn nghỉ phép thành công! Số ngày nghỉ: 3 ngày"
```

### Test Case 4: Nghỉ phép thiếu lý do
```
1. Click "Tạo đơn nghỉ phép"
2. Chọn nhân viên, chọn ngày
3. Để trống lý do
4. Click "Gửi đơn"
Expected: Alert "Vui lòng nhập lý do nghỉ phép!"
```

### Test Case 5: Ngày không hợp lệ
```
1. Click "Tạo đơn nghỉ phép"
2. Chọn nhân viên
3. Từ ngày: 2024-12-25
4. Đến ngày: 2024-12-20 (trước ngày bắt đầu)
5. Click "Gửi đơn"
Expected: Alert "Ngày kết thúc phải sau ngày bắt đầu!"
```

---

## 🔍 Kiểm Tra Visual

### Chấm Công Modal:
- ✅ Modal có header "Chấm công thủ công"
- ✅ Dropdown nhân viên có 10 options
- ✅ Time input cho giờ vào/ra
- ✅ 2 buttons: Hủy (secondary) và Lưu chấm công (primary với icon Clock)

### Nghỉ Phép Modal:
- ✅ Modal có header "Tạo đơn nghỉ phép"
- ✅ Dropdown nhân viên có 10 options với đầy đủ thông tin
- ✅ Dropdown loại nghỉ có 5 options
- ✅ Date inputs ở cùng 1 hàng (form-row)
- ✅ Textarea cho lý do
- ✅ 2 buttons: Hủy (secondary) và Gửi đơn (primary với icon CalendarOff)

---

## 📊 Console Log

Khi submit form thành công, check console để xem data:
- Chấm công: `New attendance record: {...}`
- Nghỉ phép: `New leave request: {...}`

---

## 🚀 Chạy Test

```bash
# Start dev server
npm run dev

# Open browser
http://localhost:5173

# Login with
Email: admin@tdtgroup.vn
Password: 123456

# Test các tính năng ở trên
```

---

## ✨ Tính Năng Đã Implement

### Chấm Công:
- [x] Modal form đầy đủ
- [x] Dropdown tất cả nhân viên
- [x] Date/Time pickers
- [x] Dropdown trạng thái
- [x] Validation form
- [x] Alert thông báo
- [x] Form reset sau submit
- [x] Console log data

### Nghỉ Phép:
- [x] Modal form đầy đủ
- [x] Dropdown tất cả 10 nhân viên
- [x] Dropdown loại nghỉ
- [x] Date pickers
- [x] Validation form
- [x] Tính số ngày tự động
- [x] Alert hiển thị số ngày
- [x] Form reset sau submit
- [x] Console log data

---

**Note:** Hiện tại data chỉ được log ra console, chưa lưu vào database thực. 
Để lưu thực sự cần kết nối với Backend API.
