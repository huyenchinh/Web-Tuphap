# Hệ Thống Dịch Vụ Công & Tạo Lập Hồ Sơ Chứng Thực Tư Pháp Điện Tử
*(Vietnam Judicial Notary & Civil Contract Generator Platform)*

Ứng dụng web hỗ trợ công dân và cán bộ tư pháp - công chứng tạo lập hồ sơ, tự động điền biểu mẫu chứng thực hợp đồng giao dịch cấp cơ sở, tích hợp **Trợ lý AI Pháp lý (Google Gemini & Claude)** giúp chuốt lại văn phong pháp lý hành chính chuẩn mực theo đúng quy định pháp luật Việt Nam.

---

## 🏛️ Căn Cứ Pháp Lý Áp Dụng
- **Nghị định số 280/2025/NĐ-CP** (Chính phủ ban hành 27/10/2025, có hiệu lực từ 01/11/2025): Sửa đổi bổ sung NĐ 23/2015/NĐ-CP, **thay thế toàn bộ Phụ lục Mẫu lời chứng và Mẫu sổ chứng thực** mới nhất (Mẫu 01 đến Mẫu 18, mã sổ chuẩn `-SCT/GD`, `-SCT/CK,ĐC`).
- **Nghị định số 23/2015/NĐ-CP**: Quy định về cấp bản sao từ sổ gốc, chứng thực bản sao từ bản chính, chứng thực chữ ký và chứng thực hợp đồng, giao dịch.
- **Bộ luật Dân sự 2015**: Quy định về hợp đồng, tài sản, di chúc và thừa kế.
- **Luật Đất đai 2024** & **Luật Nhà ở 2023**: Điều kiện có hiệu lực đối với giao dịch bất động sản.
- **Nghị định số 30/2020/NĐ-CP**: Quy định về thể thức và kỹ thuật trình bày văn bản hành chính (font Times New Roman, căn lề 2-2-3-2 cm).

---

## 📋 9 Nhóm Lĩnh Vực Pháp Lý & Thủ Tục Toàn Diện
1. **Giao dịch liên quan đến động sản**: Mua bán, tặng cho, đổi xe cộ, tàu thuyền, máy móc; Hợp đồng vay, mượn tài sản.
2. **Giao dịch thực hiện quyền của người sử dụng đất**: Chuyển nhượng, tặng cho, chuyển đổi đất nông nghiệp, thế chấp quyền sử dụng đất.
3. **Giao dịch về nhà ở**: Mua bán, tặng cho, đổi, góp vốn, thế chấp nhà ở gắn liền với đất hoặc căn hộ chung cư.
4. **Di chúc và giao dịch về thừa kế**: Chứng thực di chúc, văn bản từ chối nhận di sản, thỏa thuận phân chia hoặc khai nhận di sản.
5. **Giao dịch đã được chứng thực cần xử lý tiếp**: Sửa đổi, bổ sung; Hủy bỏ hợp đồng; Chấm dứt giao dịch; Sửa lỗi sai sót kỹ thuật; Cấp bản sao từ sổ gốc.
6. **Hôn nhân, Gia đình & Trẻ em**: Đơn yêu cầu công nhận thuận tình ly hôn & nuôi con; Văn bản thỏa thuận phân chia tài sản chung trong thời kỳ hôn nhân.
7. **Nghĩa vụ Dân sự & Đòi nợ, Bồi thường**: Giấy xác nhận nợ và cam kết thanh toán (ràng buộc pháp lý cao); Đơn khởi kiện vụ án dân sự đòi tiền nợ theo Mẫu 23-DS.
8. **Lao động, Tiền lương & Bảo hiểm Xã hội**: Đơn khiếu nại chấm dứt hợp đồng lao động trái pháp luật; Đơn tố cáo hành vi nợ lương, chậm đóng BHXH.
9. **Tranh chấp Đất đai & Khiếu nại Hành chính**: Đơn đề nghị hòa giải tranh chấp đất đai tại UBND cấp xã (Điều 235 Luật Đất đai 2024); Đơn khiếu nại phương án bồi thường, hỗ trợ tái định cư.

---

## 🤖 Hệ Thống Tiện Ích Trí Tuệ Nhân Tạo (AI Legal Suite - Chuẩn AK)
- **Legal Copilot (Trợ lý AI Hỏi Đáp Pháp Lý Đa Năng)**: Hỗ trợ công dân hỏi đáp tình huống luật bằng văn bản hoặc giọng nói (Web Speech API), tự động viện dẫn điều luật và đề xuất mở biểu mẫu tương ứng.
- **Contract Risk Scanner (AI Soát Xét Hợp Đồng)**: Quét và chấm điểm an toàn hợp đồng (Safety Score), phát hiện bẫy pháp lý, điều khoản vô hiệu, vượt trần lãi suất >20%/năm và gợi ý điều khoản chuẩn sửa đổi.
- **AI Vision OCR (Quét Giấy Tờ Tự Động)**: Tự động trích xuất thông tin từ CCCD 2 mặt, Sổ đỏ (GCN QSDĐ), Đăng ký xe và tự động điền form Wizard tức thì.
- **Máy Tính Án Phí & Lệ Phí Tòa Án**: Tính toán tự động tiền tạm ứng án phí (50%), án phí sơ thẩm và phúc thẩm theo Nghị quyết 326/2016/UBTVQH14.
- **Cây Quyết Định Chẩn Đoán Thẩm Quyền**: Khảo sát trắc nghiệm 3 bước xác định cơ quan thụ lý (UBND xã hay TAND), thời hạn giải quyết và hồ sơ cần chuẩn bị.
- **Lời Chứng Tư Pháp Tự Động Hóa (Nghị định 280/2025/NĐ-CP Mới Nhất)**: Hỗ trợ đầy đủ các biểu mẫu chuẩn Mẫu số 09 (Chứng thực giao dịch), Mẫu số 10 (Giao dịch tại Trung tâm Hành chính công), Mẫu số 11 (Phân chia di sản), Mẫu số 13 (Từ chối di sản), Mẫu số 17 (Di chúc), Mẫu số 02 (Chữ ký), Mẫu số 06 (Điểm chỉ), kèm tùy chọn người làm chứng (*) và người phiên dịch (**).

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
