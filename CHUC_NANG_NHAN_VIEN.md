# 👥 Chức Năng Quản Lý Nhân Viên

## ✅ Đã Hoàn Thiện

### 3 Chức Năng Chính:

---

## 1. 👁️ XEM CHI TIẾT (Nút Con Mắt)

**Khi click nút con mắt:**
- ✅ Mở modal hiển thị đầy đủ thông tin nhân viên
- ✅ Design đẹp với avatar gradient
- ✅ Hiển thị badge trạng thái
- ✅ Grid layout 2 cột cho thông tin

**Thông tin hiển thị:**
- Ảnh đại diện (Avatar với chữ cái đầu)
- Họ tên (size lớn, bold)
- Chức vụ - Phòng ban
- Badge trạng thái (màu xanh/cam)
- Mã nhân viên
- Giới tính
- Email
- Số điện thoại
- Ngày sinh
- Ngày vào làm
- Địa chỉ (full width)
- Loại hợp đồng
- Lương cơ bản (màu primary, font lớn)

**Buttons:**
- **Đóng** (secondary) → Đóng modal
- **Chỉnh sửa** (primary) → Chuyển sang modal Edit

---

## 2. ✏️ CHỈNH SỬA (Nút Bút)

**Khi click nút sửa:**
- ✅ Mở modal form chỉnh sửa
- ✅ Pre-fill data của nhân viên đó
- ✅ Mã NV bị disable (không cho sửa)
- ✅ Validation form đầy đủ

**Form fields có thể sửa:**
- ✅ Họ và tên * (required)
- 🔒 Mã nhân viên (disabled - không sửa được)
- ✅ Email * (required, type email)
- ✅ Số điện thoại
- ✅ Phòng ban * (dropdown 6 phòng ban)
- ✅ Chức vụ * (required)
- ✅ Trạng thái * (dropdown: Đang làm, Thử việc, Nghỉ phép, Nghỉ việc)
- ✅ Lương cơ bản (number input)

**Validation:**
- ❗ Phải nhập họ tên
- ❗ Email phải đúng format
- ❗ Phải chọn phòng ban, chức vụ, trạng thái
- ✅ Alert thành công khi lưu
- ✅ Console.log data để debug

**Buttons:**
- **Hủy** (secondary) → Đóng modal, không lưu
- **Lưu thay đổi** (primary với icon Edit2) → Lưu và đóng

---

## 3. 🗑️ XÓA (Nút Thùng Rác)

**Khi click nút xóa:**
- ✅ Hiện confirm dialog
- ✅ Hiển thị tên và mã NV cần xóa
- ✅ Người dùng phải xác nhận

**Confirm message:**
```
Bạn có chắc chắn muốn xóa nhân viên 
[Tên NV] ([Mã NV])?
```

**Nếu OK:**
- ✅ Console.log employee bị xóa
- ✅ Alert thông báo đã xóa
- ✅ Trong app thực sẽ gọi API để xóa

**Nếu Cancel:**
- Không làm gì, modal đóng

---

## 🎨 Design Details

### Modal Xem Chi Tiết:
```
┌─────────────────────────────────────────┐
│  Hồ sơ nhân viên                    ✕  │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │ [Avatar] Phùng Thanh Độ          │  │
│  │          Trưởng phòng - CNTT      │  │
│  │          [Đang làm]               │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Mã NV        │  Giới tính             │
│  NV001        │  Nam                   │
│                                         │
│  Email              │  Số điện thoại    │
│  do.pt@...          │  0901234567       │
│                                         │
│  Ngày sinh          │  Ngày vào làm     │
│  1990-05-15         │  2019-03-01       │
│                                         │
│  Địa chỉ                                │
│  Quận 1, TP.HCM                         │
│                                         │
│  Loại hợp đồng      │  Lương cơ bản     │
│  Không xác định...  │  35,000,000 đ     │
├─────────────────────────────────────────┤
│              [Đóng]  [Chỉnh sửa]       │
└─────────────────────────────────────────┘
```

### Modal Chỉnh Sửa:
```
┌─────────────────────────────────────────┐
│  Chỉnh sửa nhân viên                ✕  │
├─────────────────────────────────────────┤
│  Họ và tên *        │  Mã nhân viên    │
│  [Input]            │  NV001 (disabled)│
│                                         │
│  Email *            │  Số điện thoại   │
│  [Input]            │  [Input]         │
│                                         │
│  Phòng ban *        │  Chức vụ *       │
│  [Dropdown]         │  [Input]         │
│                                         │
│  Trạng thái *       │  Lương cơ bản    │
│  [Dropdown]         │  [Number input]  │
├─────────────────────────────────────────┤
│              [Hủy]  [Lưu thay đổi]     │
└─────────────────────────────────────────┘
```

---

## 🧪 Test Cases

### Test 1: Xem chi tiết nhân viên
```
1. Vào trang Quản lý nhân viên
2. Click nút con mắt ở dòng "Phùng Thanh Độ"
3. Expected: Modal hiện lên với đầy đủ thông tin
4. Check: Avatar có chữ "Độ", badge "Đang làm" màu xanh
5. Click "Đóng" → Modal đóng
```

### Test 2: Chỉnh sửa nhân viên
```
1. Click nút bút ở dòng "Trần Hà Linh"
2. Expected: Modal edit với data pre-filled
3. Đổi email thành "linh.new@tdtgroup.vn"
4. Đổi chức vụ thành "Giám đốc"
5. Click "Lưu thay đổi"
6. Expected: Alert "Đã cập nhật thông tin nhân viên Trần Hà Linh"
7. Check console.log để xem data
```

### Test 3: Xóa nhân viên
```
1. Click nút thùng rác ở dòng "Lê Đức Anh"
2. Expected: Confirm dialog hiện:
   "Bạn có chắc chắn muốn xóa nhân viên 
    Lê Đức Anh (NV007)?"
3. Click "OK"
4. Expected: Alert "Đã xóa nhân viên Lê Đức Anh"
5. Check console.log
```

### Test 4: Hủy chỉnh sửa
```
1. Click nút bút ở bất kỳ nhân viên nào
2. Thay đổi một số thông tin
3. Click "Hủy"
4. Expected: Modal đóng, không lưu thay đổi
```

### Test 5: Validation form edit
```
1. Click nút bút ở nhân viên
2. Xóa trống họ tên
3. Click "Lưu thay đổi"
4. Expected: Browser validation "Please fill out this field"
```

### Test 6: Chuyển từ View sang Edit
```
1. Click nút con mắt
2. Modal view hiện ra
3. Click button "Chỉnh sửa" trong modal
4. Expected: Modal view đóng, modal edit mở với data đúng
```

---

## 🎯 Flow Diagram

```
Quản lý nhân viên (Table)
    │
    ├─ Click [👁️] → Modal View
    │                   │
    │                   ├─ Click [Đóng] → Close
    │                   └─ Click [Chỉnh sửa] → Modal Edit
    │
    ├─ Click [✏️] → Modal Edit
    │                   │
    │                   ├─ Click [Hủy] → Close
    │                   └─ Click [Lưu] → Save & Alert
    │
    └─ Click [🗑️] → Confirm Dialog
                        │
                        ├─ Click [Cancel] → Close
                        └─ Click [OK] → Delete & Alert
```

---

## 💻 Console Logs

Khi thực hiện các action, check console:

**Edit:**
```javascript
Updating employee: NV002 
{hoTen: "Trần Hà Linh", email: "linh.new@...", ...}
```

**Delete:**
```javascript
Deleting employee: 
{id: "7", maNV: "NV007", hoTen: "Lê Đức Anh", ...}
```

---

## 📝 Notes

- ✅ Tất cả 3 chức năng đều hoạt động
- ✅ Modal responsive và đẹp
- ✅ Validation đầy đủ
- ✅ UX/UI nhất quán với design system
- ⚠️ Data chưa lưu thực tế (cần kết nối API)
- ⚠️ Sau khi edit/delete cần reload data hoặc update state
- ✅ Console.log để developer debug

---

## 🚀 Test Ngay!

```bash
npm run dev
```

Vào **Quản lý nhân viên** và thử cả 3 nút! 🎉
