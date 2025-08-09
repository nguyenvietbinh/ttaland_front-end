# Mock Data cho Development

Hệ thống mock data đơn giản để tiện cho việc development khi backend server không hoạt động.

## Cách hoạt động

Mock data được tích hợp trực tiếp vào các component và sẽ tự động hiển thị khi không có real data từ API.

### 1. Listing Components

**Vị trí:** `components/listing/show_property/`

- `san_pham_ban_show_property.tsx` - Mock data cho sản phẩm bán
- `san_pham_cho_thue_show_property.tsx` - Mock data cho sản phẩm cho thuê

**Logic:** Khi không có props truyền vào (real data), component sẽ sử dụng mock data có sẵn.

```typescript
// Mock data được định nghĩa trong component
const mockPropertyData = {
  id: 'MOCK001',
  title: 'Nhà phố 3 tầng hiện đại - Khu vực trung tâm',
  // ... các thông tin khác
}

// Fallback logic
const property = villa || townhouse || apartment || land || mockPropertyData
const isUsingRealData = !!(villa || townhouse || apartment || land)
```

### 2. Detail Components

**Vị trí:** `components/detail_page/`

- `san_pham_ban_detail.tsx` - Mock data cho chi tiết sản phẩm bán
- `san_pham_cho_thue_detail.tsx` - Mock data cho chi tiết sản phẩm cho thuê

**Logic:** Dựa vào độ dài của ID để quyết định sử dụng mock hay real data.

```typescript
// Mock data được định nghĩa trong component
const mockDetailInfo = {
  price: '8.5 Tỷ',
  sqr: 120,
  // ... các thông tin khác
}

// Logic quyết định sử dụng data nào
const information_data = (id && id.length > 5) ? realData : mockDetailInfo
```

### 3. Listing Main Component

**Vị trí:** `components/listing/listing.tsx`

Component này tự động hiển thị mock data cho các trang không có API integration:

```typescript
{!hasPropertyType && items.map((item, index) => (
  <div key={index}>
    {(list_path[1] === 'san_pham_ban') ? 
      (<San_pham_ban_property />) : 
      (list_path[1] === 'san_pham_cho_thue') ? 
      (<San_pham_cho_thue_property/>) : 
      (<Du_an_property/>)
    }
  </div>
))}
```

## Mock Data Content

### Sản phẩm bán (Sale Properties)
- **Nhà phố:** 3 tầng, 4 phòng ngủ, 3 phòng tắm, giá 8.5 tỷ
- **Location:** Quận 7, TP.HCM
- **Images:** showcase1.jpg, showcase2.jpg, showcase3.jpg, showcase4.jpg

### Sản phẩm cho thuê (Rental Properties)  
- **Nhà phố:** Full nội thất, 4 phòng ngủ, 3 phòng tắm, giá 25 triệu/tháng
- **Location:** Quận 7, TP.HCM
- **Images:** showcase4.jpg, showcase6.jpg, showcase8.jpg, showcase10.jpg

## Development Workflow

### 1. Develop với Mock Data
- Không cần chạy backend server
- Tất cả component đều có data để hiển thị
- Dễ dàng test UI/UX

### 2. Test với Real API
- Chạy backend server
- Real data sẽ override mock data tự động
- Component logic vẫn giữ nguyên

### 3. Production Deploy
- Chỉ real data được sử dụng
- Mock data chỉ xuất hiện khi API không hoạt động

## Ưu điểm

1. **Đơn giản:** Không cần config phức tạp
2. **Tự động:** Mock data tự động kick in khi cần
3. **Không ảnh hưởng production:** Mock data chỉ hiển thị khi không có real data
4. **Dễ maintain:** Mock data nằm ngay trong component, dễ update

## Thêm Mock Data cho Component mới

```typescript
// 1. Định nghĩa mock data
const mockData = {
  // ... your mock data structure
}

// 2. Fallback logic
const data = realData || mockData
const isUsingRealData = !!realData

// 3. Sử dụng data như bình thường
return (
  <div>
    <h1>{data.title}</h1>
    {/* ... rest of component */}
  </div>
)
```

## Lưu ý

- Mock data sử dụng hình ảnh có sẵn trong `public/img/example/`
- ID của mock data luôn ngắn hơn 5 ký tự để phân biệt với real data
- Mock data được thiết kế để giống với real API response structure
