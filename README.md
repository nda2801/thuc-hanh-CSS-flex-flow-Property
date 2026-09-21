# [Thực hành] Thuộc tính CSS flex-flow Property

Dự án thực hành tìm hiểu, áp dụng và trực quan hóa thuộc tính **`flex-flow`** trong CSS Flexbox.

---

## 📖 1. Giới thiệu thuộc tính `flex-flow`

Trong mô hình dàn trang Flexbox, **`flex-flow`** là một **thuộc tính viết tắt (shorthand property)** kết hợp cả hai thuộc tính quan trọng:
1. **`flex-direction`**: Xác định hướng của trục chính (main axis), tức là hướng sắp xếp các flex items (theo hàng ngang hay cột dọc, xuôi hay ngược).
2. **`flex-wrap`**: Xác định liệu các flex items có được phép bọc (xuống dòng hoặc sang cột mới) khi không đủ khoảng trống hay không.

### ⚠️ Lưu ý quan trọng
- Thuộc tính `flex-flow` **được khai báo trên phần tử cha (Flex Container)** có `display: flex` hoặc `display: inline-flex`.
- Các thuộc tính flex chỉ có hiệu lực với các phần tử con trực tiếp (**Flex Items**). Nếu một phần tử không nằm trong một flex context (không phải flex container hoặc flex item), các thuộc tính flex sẽ hoàn toàn vô hiệu.

---

## ⚙️ 2. Cú pháp chuẩn

```css
.container {
  display: flex;
  flex-flow: <flex-direction> <flex-wrap>;
}
```

- **Giá trị mặc định**: `row nowrap`
- Có thể chỉ định 1 giá trị hoặc cả 2 giá trị. Nếu bỏ sót một giá trị, giá trị còn lại sẽ tự động nhận giá trị mặc định của thuộc tính đó.

---

## 📑 3. Các giá trị tiêu biểu của `flex-flow`

| Giá trị `flex-flow` | `flex-direction` | `flex-wrap` | Mô tả chi tiết & Hành vi |
| :--- | :--- | :--- | :--- |
| **`row nowrap`** *(Mặc định)* | `row` | `nowrap` | Sắp xếp hàng theo hướng văn bản thông thường (trái ➔ phải). Không bọc dòng, tất cả item nằm trên một hàng duy nhất. |
| **`row-reverse nowrap`** | `row-reverse` | `nowrap` | Sắp xếp hàng ngược lại với hướng văn bản (phải ➔ trái). Item 1 nằm ở góc phải ngoài cùng và các item tiếp theo dịch sang trái, không bọc. |
| **`row wrap`** | `row` | `wrap` | Sắp xếp ngang (trái ➔ phải). Tự động ngắt xuống dòng mới bên dưới khi vượt quá chiều rộng container. |
| **`row-reverse wrap`** | `row-reverse` | `wrap` | Sắp xếp ngang đảo ngược (phải ➔ trái). Tự động ngắt xuống dòng mới bên dưới khi hết chiều rộng. |
| **`column nowrap`** | `column` | `nowrap` | Sắp xếp dọc từ trên xuống dưới trên một cột duy nhất, không ngắt sang cột mới. |
| **`column wrap`** | `column` | `wrap` | Sắp xếp dọc từ trên xuống dưới. Khi chạm giới hạn chiều cao container, tự động bọc sang cột mới bên phải. |
| **`column-reverse wrap`** | `column-reverse` | `wrap` | Sắp xếp dọc từ dưới lên trên. Khi vượt quá chiều cao container, bọc sang cột mới. |
| **`row wrap-reverse`** | `row` | `wrap-reverse` | Sắp xếp ngang (trái ➔ phải), nhưng bọc ngược lên hàng phía trên thay vì xuống dưới. |

---

## 📂 4. Cấu trúc mã nguồn trong thư mục

```
thuc-hanh-CSS-flex-flow-Property/
├── index.html        # Giao diện Interactive Playground & Trung tâm tra cứu
├── style.css         # Bộ stylesheet hiện đại (Dark Theme, CSS Variables, Responsive)
├── script.js         # Logic tương tác trực quan thời gian thực (Live CSS, Presets, Sliders)
├── example1.html     # Trang ví dụ độc lập 1: flex-flow: row nowrap
├── example2.html     # Trang ví dụ độc lập 2: flex-flow: row-reverse nowrap
├── example3.html     # Trang ví dụ độc lập 3: Bọc dòng (row wrap & column wrap)
└── README.md         # Tài liệu lý thuyết và hướng dẫn thực hành chi tiết
```

---

## 💻 5. Các ví dụ mã nguồn chi tiết

### Ví dụ 1: `flex-flow: row nowrap`
```html
<div class="container-1">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>

<style>
.container-1 {
  display: flex;
  flex-flow: row nowrap; /* Hướng ngang LTR, không xuống dòng */
  gap: 16px;
}
</style>
```

### Ví dụ 2: `flex-flow: row-reverse nowrap`
```html
<div class="container-2">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>

<style>
.container-2 {
  display: flex;
  flex-flow: row-reverse nowrap; /* Hướng ngang RTL (phải qua trái), không xuống dòng */
  gap: 16px;
}
</style>
```

---

## 🚀 6. Hướng dẫn chạy thử dự án

1. Mở trực tiếp các tệp HTML bằng bất kỳ trình duyệt nào:
   - **`index.html`**: Trải nghiệm bảng điều khiển tương tác (thay đổi hướng, chế độ wrap, kích thước khung, số lượng item, sao chép code 1-click).
   - **`example1.html`**: Xem minh họa trực quan cho `row nowrap`.
   - **`example2.html`**: Xem minh họa trực quan cho `row-reverse nowrap`.
   - **`example3.html`**: Xem minh họa trực quan cho `row wrap` và `column wrap`.
2. Hoặc sử dụng extension **Live Server** trong VS Code để xem với hot-reload.

