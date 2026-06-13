# 📄 Tính Năng Phân Trang (Pagination)

## ✅ Đã Hoàn Thiện

Phân trang thực sự đã được implement cho 3 trang:

### 1. **Chấm Công** (`/cham-cong`)
- ✅ Hiển thị **5 bản ghi/trang**
- ✅ Tự động tính tổng số trang
- ✅ Nút Previous/Next có disable khi ở trang đầu/cuối
- ✅ Hiển thị số trang động
- ✅ Tự động reset về trang 1 khi thay đổi filter/search

### 2. **Quản Lý Nhân Viên** (`/nhan-vien`)
- ✅ Hiển thị **5 nhân viên/trang**
- ✅ Phân trang tự động với data đầy đủ
- ✅ Nút Previous/Next responsive
- ✅ Reset về trang 1 khi filter phòng ban/trạng thái/tìm kiếm

### 3. **Quản Lý Nghỉ Phép** (`/nghi-phep`)
- ✅ Hiển thị **5 đơn/trang**
- ✅ Pagination buttons động
- ✅ Reset về trang 1 khi thay đổi trạng thái/tìm kiếm

---

## 🎯 Cách Hoạt Động

### Logic Phân Trang:

```typescript
// State
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(5);

// Tính toán
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

// Reset về trang 1 khi filter thay đổi
useEffect(() => {
  setCurrentPage(1);
}, [searchQuery, filterStatus]);

// Chuyển trang
const handlePageChange = (pageNumber: number) => {
  setCurrentPage(pageNumber);
};
```

---

## 📊 Ví Dụ Cụ Thể

### Chấm Công (8 records total):
```
Page 1: Records 1-5
Page 2: Records 6-8

Pagination info: "Hiển thị 1-5 / 8 bản ghi"
Buttons: [‹ disabled] [1 active] [2] [›]
```

### Nhân Viên (10 employees total):
```
Page 1: Employees 1-5
Page 2: Employees 6-10

Pagination info: "Hiển thị 1-5 / 10 nhân viên"
Buttons: [‹ disabled] [1 active] [2] [›]
```

### Nghỉ Phép (5 requests total):
```
Page 1: Requests 1-5

Pagination info: "Hiển thị 1-5 / 5 đơn"
Buttons: [‹ disabled] [1 active] [› disabled]
```

---

## 🎨 UI Features

### Pagination Bar:
- **Left side:** Hiển thị thông tin `"Hiển thị X-Y / Z items"`
- **Right side:** Buttons điều hướng

### Buttons:
- **Previous (‹):**
  - Disabled (opacity: 0.5) khi ở trang 1
  - Cursor: not-allowed khi disabled
  
- **Page numbers:**
  - Dynamic: Tự động tạo theo số trang
  - Active state: Background primary, màu trắng
  - Hover effect
  
- **Next (›):**
  - Disabled (opacity: 0.5) khi ở trang cuối
  - Cursor: not-allowed khi disabled

---

## 🧪 Test Pagination

### Test Case 1: Chấm Công
1. Vào trang Chấm Công
2. Kiểm tra: Hiển thị 5 records đầu tiên
3. Click nút **2** → Chuyển sang records 6-8
4. Click **‹** → Về trang 1
5. Thay đổi filter → Tự động reset về trang 1

### Test Case 2: Nhân Viên
1. Vào trang Quản lý nhân viên
2. Hiển thị 5 nhân viên đầu
3. Click **2** → Hiển thị 5 nhân viên tiếp theo
4. Tìm kiếm "Linh" → Reset về trang 1, hiển thị kết quả
5. Clear search → Về trang 1 với full data

### Test Case 3: Nghỉ Phép
1. Vào trang Quản lý nghỉ phép
2. Có 5 đơn → Chỉ có 1 trang
3. Nút Previous/Next đều disabled
4. Filter "Chờ duyệt" → Reset trang 1

---

## 🚀 Cải Tiến So Với Trước

| Trước | Sau |
|-------|-----|
| ❌ Pagination tĩnh, không click được | ✅ Pagination động, click được |
| ❌ Hiển thị tất cả records | ✅ Hiển thị 5 items/trang |
| ❌ Không có logic phân trang | ✅ Full logic với slice() |
| ❌ Buttons không có disabled state | ✅ Disabled khi cần |
| ❌ Không reset khi filter | ✅ Auto reset về page 1 |
| ❌ Info text tĩnh | ✅ Info text động theo data |

---

## 📝 Config Có Thể Thay Đổi

Muốn thay đổi số items per page? Sửa giá trị này:

```typescript
// Hiện tại: 5 items/trang
const [itemsPerPage] = useState(5);

// Muốn 10 items/trang:
const [itemsPerPage] = useState(10);

// Muốn 20 items/trang:
const [itemsPerPage] = useState(20);
```

---

## 🎯 Kết Quả

- ✅ Pagination hoạt động 100%
- ✅ Click chuyển trang mượt mà
- ✅ Disabled states đúng logic
- ✅ Auto reset khi filter
- ✅ Info text chính xác
- ✅ Responsive và UX tốt

---

**Test ngay:** `npm run dev` và thử click các nút phân trang! 🎉
