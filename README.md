# Hệ Thống Dịch Vụ Công & Tạo Lập Hồ Sơ Chứng Thực Tư Pháp Điện Tử
*(Vietnam Judicial Notary & Civil Contract Generator Platform)*

Ứng dụng web hỗ trợ công dân và cán bộ tư pháp - công chứng tạo lập hồ sơ, tự động điền biểu mẫu chứng thực hợp đồng giao dịch cấp cơ sở, tích hợp **Trợ lý AI Pháp lý (Google Gemini & Claude)** giúp chuốt lại văn phong pháp lý hành chính chuẩn mực theo đúng quy định pháp luật Việt Nam.

---

## 🏛️ Căn Cứ Pháp Lý Áp Dụng
- **Nghị định số 23/2015/NĐ-CP** & **Nghị định số 280/2025/NĐ-CP**: Quy định về cấp bản sao từ sổ gốc, chứng thực bản sao từ bản chính, chứng thực chữ ký và chứng thực hợp đồng, giao dịch.
- **Thông tư số 01/2020/TT-BTP**: Quy định chi tiết và hướng dẫn thi hành Nghị định 23/2015/NĐ-CP (mẫu lời chứng, mẫu sổ chứng thực).
- **Bộ luật Dân sự 2015**: Quy định về hợp đồng, tài sản, di chúc và thừa kế.
- **Luật Đất đai 2024** & **Luật Nhà ở 2023**: Điều kiện có hiệu lực đối với giao dịch bất động sản.
- **Nghị định số 30/2020/NĐ-CP**: Quy định về thể thức và kỹ thuật trình bày văn bản hành chính (font Times New Roman, căn lề 2-2-3-2 cm).

---

## 📋 5 Nhóm Giao Dịch Hỗ Trợ
1. **Giao dịch liên quan đến động sản**: Mua bán, tặng cho, đổi xe cộ, tàu thuyền, máy móc; Hợp đồng vay, mượn tài sản.
2. **Giao dịch thực hiện quyền của người sử dụng đất**: Chuyển nhượng, tặng cho, chuyển đổi đất nông nghiệp, thế chấp quyền sử dụng đất.
3. **Giao dịch về nhà ở**: Mua bán, tặng cho, đổi, góp vốn, thế chấp nhà ở gắn liền với đất hoặc căn hộ chung cư.
4. **Di chúc và giao dịch về thừa kế**: Chứng thực di chúc, văn bản từ chối nhận di sản, thỏa thuận phân chia hoặc khai nhận di sản.
5. **Giao dịch đã được chứng thực cần xử lý tiếp**: Sửa đổi, bổ sung; Hủy bỏ hợp đồng; Chấm dứt giao dịch; Sửa lỗi sai sót kỹ thuật; Cấp bản sao từ sổ gốc.

---

## 🛠️ Công Nghệ Phát Triển
- **Frontend**: React + Vite + Tailwind CSS (Chuẩn thiết kế UI/UX Pro Max, chuyển trang mượt mà 280ms, dải ticker marquee).
- **Backend**: Node.js + Express API.
- **Document Engine**: Docxtemplater, Pizzip, docx (Xuất file Word `.docx` và in PDF trực tiếp).
- **Trí tuệ nhân tạo (AI)**: Google Gemini API & Anthropic Claude API với System Prompt chuyên biệt cho pháp chế Việt Nam.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Khởi động Backend
```bash
cd backend
npm install
npm start
# Server chạy tại http://localhost:5000
```

### 2. Khởi động Frontend
```bash
cd frontend
npm install
npm run dev
# Ứng dụng web mở tại http://localhost:5173
```

---

## 🔐 Phân Quyền Quản Trị (Admin)
Phân hệ **Quản trị biểu mẫu** được bảo vệ bằng hệ thống xác thực:
- Tài khoản quản trị nội bộ được cấu hình an toàn trong file `.ven` / `.env` (không đưa lên kho mã nguồn công khai).
