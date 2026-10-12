const storage = require('./storage');

class AIService {
  async rewriteText({ context, userDraft, fieldLabel, procedureTitle }) {
    const settings = storage.getSettings();
    const provider = settings.aiProvider || 'gemini';

    // 1. Try Gemini Provider if chosen
    if (provider === 'gemini' && settings.geminiApiKey) {
      try {
        return await this.callGemini({
          apiKey: settings.geminiApiKey,
          model: settings.geminiModel || 'gemini-2.5-flash',
          systemPrompt: settings.systemPrompt,
          context,
          userDraft,
          fieldLabel,
          procedureTitle
        });
      } catch (err) {
        console.error("Gemini API Error, falling back to heuristic/error msg:", err.message);
        throw new Error(`Lỗi gọi Gemini API: ${err.message}`);
      }
    }

    // 2. Try Claude Provider if chosen
    if (provider === 'claude' && settings.claudeApiKey) {
      try {
        return await this.callClaude({
          apiKey: settings.claudeApiKey,
          model: settings.claudeModel || 'claude-3-7-sonnet-latest',
          systemPrompt: settings.systemPrompt,
          context,
          userDraft,
          fieldLabel,
          procedureTitle
        });
      } catch (err) {
        console.error("Claude API Error:", err.message);
        throw new Error(`Lỗi gọi Claude API: ${err.message}`);
      }
    }

    // 3. Fallback Heuristic Generator (When no API Key is entered yet, for immediate trial/demo)
    return this.heuristicLegalRewrite(userDraft, fieldLabel, procedureTitle, context);
  }

  async callGemini({ apiKey, model, systemPrompt, context, userDraft, fieldLabel, procedureTitle }) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const promptMessage = `
BỐI CẢNH THỦ TỤC TƯ PHÁP: ${procedureTitle}
MỤC ĐIỀU KHOẢN CẦN VIẾT: ${fieldLabel}
THÔNG TIN CÁC BÊN & TÀI SẢN LIÊN QUAN:
${JSON.stringify(context || {}, null, 2)}

Ý KIẾN / BẢN NHÁP CỦA NGƯỜI DÂN (VIẾT TỰ NHIÊN, CẦN CHUỐT LẠI):
"""
${userDraft}
"""

YÊU CẦU:
Hãy đọc toàn bộ ngữ cảnh trên và tái tạo lại nội dung nháp của người dân thành một điều khoản pháp lý hành chính hoàn chỉnh, chuẩn mực, trang trọng theo đúng ngôn ngữ văn bản chứng thực tư pháp Việt Nam.
Chỉ trả về nội dung điều khoản đã được viết lại, không thêm lời chào, không thêm phần mở đầu hay kết luận.
`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: promptMessage }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1024
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const rewritten = candidate?.content?.parts?.[0]?.text;
    if (!rewritten) throw new Error("Gemini không trả về kết quả hợp lệ.");
    return rewritten.trim();
  }

  async callClaude({ apiKey, model, systemPrompt, context, userDraft, fieldLabel, procedureTitle }) {
    const url = 'https://api.anthropic.com/v1/messages';

    const userPrompt = `
BỐI CẢNH THỦ TỤC: ${procedureTitle}
MỤC ĐIỀU KHOẢN: ${fieldLabel}
DỮ LIỆU ĐÃ CUNG CẤP:
${JSON.stringify(context || {}, null, 2)}

BẢN NHÁP CỦA NGƯỜI DÂN CẦN VIẾT LẠI:
"""
${userDraft}
"""

Hãy tái cấu trúc và diễn đạt lại nội dung trên thành điều khoản pháp lý hành chính chuẩn mực Việt Nam. Chỉ trả về nội dung điều khoản.
`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Claude status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const textContent = data.content?.find(c => c.type === 'text');
    if (!textContent) throw new Error("Claude không trả về nội dung.");
    return textContent.text.trim();
  }

  // 4. Legal AI Copilot Chat Endpoint
  async chatLegalCopilot({ messages, question, context }) {
    const settings = storage.getSettings();
    const provider = settings.aiProvider || 'gemini';

    const systemPrompt = `Bạn là Trợ lý AI Pháp chế Tư pháp Việt Nam (Legal Copilot) trực thuộc Hệ thống Dịch vụ công & Tư pháp điện tử.
Nhiệm vụ của bạn là tư vấn, giải thích pháp luật chính xác, dễ hiểu cho người dân và cán bộ cơ sở dựa trên pháp luật Việt Nam hiện hành:
- Bộ luật Dân sự 2015
- Luật Đất đai 2024 & Luật Nhà ở 2023
- Luật Hôn nhân & Gia đình 2014
- Bộ luật Lao động 2019
- Luật Tố tụng Dân sự 2015 & Nghị quyết 326/2016/UBTVQH14 về án phí
- Nghị định 23/2015/NĐ-CP và Nghị định 280/2025/NĐ-CP về chứng thực hợp đồng, giao dịch.

QUY TẮC PHẢN HỒI:
1. Luôn viện dẫn rõ ràng căn cứ pháp lý (Điều... Luật... / Nghị định...).
2. Trình bày rõ ràng: (a) Nhận định tình huống, (b) Các bước cần thực hiện, (c) Cơ quan có thẩm quyền tiếp nhận, (d) Giấy tờ cần chuẩn bị.
3. Nếu tình huống thuộc một trong các thủ tục có sẵn trong hệ thống, hãy kèm theo mã kích hoạt cuối câu:
   - Thuận tình ly hôn: [SUGGEST:thuan-tinh-ly-hon]
   - Thỏa thuận tài sản vợ chồng: [SUGGEST:thoa-thuan-tai-san-vo-chong]
   - Chuyển nhượng đất đai: [SUGGEST:chuyen-nhuong-quyen-su-dung-dat]
   - Giấy nhận nợ & cam kết trả: [SUGGEST:giay-nhan-no-cam-ket]
   - Đơn khởi kiện đòi nợ: [SUGGEST:don-khoi-kien-doi-no]
   - Hòa giải tranh chấp đất đai: [SUGGEST:don-hoa-giai-tranh-chap-dat]
   - Mua bán xe / động sản: [SUGGEST:mua-ban-dong-san]
   - Di chúc: [SUGGEST:chung-thuc-di-chuc]
   - Tính án phí tòa án: [SUGGEST:action-court-fee]
   - Khai nộp thuế đất đai: [SUGGEST:action-tax]
4. Giữ thái độ nhã nhặn, chuẩn mực, khách quan, bảo vệ quyền lợi hợp pháp của công dân.`;

    if (provider === 'gemini' && settings.geminiApiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${settings.geminiModel || 'gemini-2.5-flash'}:generateContent?key=${settings.geminiApiKey}`;
        const contents = [];
        if (messages && messages.length > 0) {
          messages.forEach(m => {
            contents.push({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }]
            });
          });
        }
        contents.push({
          role: 'user',
          parts: [{ text: question + (context ? `\n[Ngữ cảnh hồ sơ: ${JSON.stringify(context)}]` : '') }]
        });

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (answer) return answer.trim();
        }
      } catch (err) {
        console.error("Gemini Chat Error:", err.message);
      }
    }

    return this.heuristicLegalChat(question);
  }

  // 5. Contract Risk Scanner & Audit
  async auditContractRisk({ contractText, contractType }) {
    const settings = storage.getSettings();
    const provider = settings.aiProvider || 'gemini';

    const systemPrompt = `Bạn là Chuyên gia Cao cấp Thẩm định Hợp đồng & Pháp chế Rủi ro Việt Nam.
Nhiệm vụ: Rà soát toàn bộ nội dung hợp đồng do người dùng cung cấp, phát hiện các điểm vi phạm pháp luật, điều khoản vô hiệu, "bẫy pháp lý", và các điều khoản bất lợi nghiêm trọng.
Trả về định dạng JSON thuần túy (không bọc markdown, không thêm text ngoài JSON) với cấu trúc:
{
  "score": 75, // Điểm an toàn từ 0 đến 100 (100 là an toàn tuyệt đối)
  "riskLevel": "high" | "medium" | "low",
  "summary": "Tóm tắt tổng quan đánh giá hợp đồng trong 2-3 câu",
  "issues": [
    {
      "severity": "high" | "medium" | "low",
      "clause": "Trích dẫn hoặc tóm tắt điều khoản rủi ro",
      "legalBasis": "Căn cứ pháp lý vi phạm (ví dụ: Khoản 1 Điều 468 BLDS 2015)",
      "risk": "Giải thích rủi ro có thể gặp phải",
      "recommendation": "Đề xuất sửa đổi hoặc bổ sung điều khoản chuẩn"
    }
  ],
  "strengths": ["Điểm hợp lệ hoặc có lợi thứ nhất", "Điểm hợp lệ thứ hai"],
  "mustCheckDocuments": ["Giấy tờ bắt buộc người dân phải kiểm tra trước khi ký"]
}`;

    if (provider === 'gemini' && settings.geminiApiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${settings.geminiModel || 'gemini-2.5-flash'}:generateContent?key=${settings.geminiApiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [{ text: `LOẠI HỢP ĐỒNG: ${contractType || 'Hợp đồng dân sự / kinh tế'}\n\nNỘI DUNG HỢP ĐỒNG CẦN RÀ SOÁT:\n"""\n${contractText}\n"""` }]
            }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: {
              temperature: 0.1,
              responseMimeType: "application/json"
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (jsonText) {
            return JSON.parse(jsonText);
          }
        }
      } catch (err) {
        console.error("Gemini Contract Audit Error:", err.message);
      }
    }

    return this.heuristicContractAudit(contractText, contractType);
  }

  // 6. OCR Document Vision Extractor
  async ocrExtractDocument({ imageBase64, mimeType, docType }) {
    const settings = storage.getSettings();
    if (settings.aiProvider === 'gemini' && settings.geminiApiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${settings.geminiApiKey}`;
        const prompt = `Trích xuất toàn bộ dữ liệu từ ảnh chụp giấy tờ pháp lý Việt Nam (${docType || 'CCCD / Sổ đỏ / Giấy tờ xe'}).
Chỉ trả về JSON thuần túy (không kèm markdown) theo các trường phù hợp:
Nếu là CCCD:
{ "ho_ten": "", "so_cccd": "", "ngay_sinh": "", "gioi_tinh": "", "que_quan": "", "noi_thuong_tru": "", "ngay_cap": "", "noi_cap": "" }
Nếu là Sổ đỏ (GCN QSDĐ):
{ "chu_su_dung": "", "thua_dat_so": "", "to_ban_do_so": "", "dia_chi_thua_dat": "", "dien_tich": "", "muc_dich_su_dung": "", "so_giay_chung_nhan": "", "ngay_cap": "", "noi_cap": "" }
Nếu là Đăng ký xe:
{ "chu_xe": "", "dia_chi": "", "bien_so_xe": "", "nhan_hieu": "", "so_khung": "", "so_may": "", "ngay_cap": "" }`;

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: mimeType || 'image/jpeg',
                    data: imageBase64
                  }
                }
              ]
            }],
            generationConfig: {
              temperature: 0.1,
              responseMimeType: "application/json"
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (jsonText) return JSON.parse(jsonText);
        }
      } catch (err) {
        console.error("Gemini Vision OCR Error:", err.message);
      }
    }

    return this.heuristicOcrMock(docType);
  }

  // Heuristic Legal Chatbot Knowledge Base
  heuristicLegalChat(question) {
    const q = (question || '').toLowerCase();

    if (q.includes('ly hôn') || q.includes('ly dị') || q.includes('nuôi con') || q.includes('chia tài sản')) {
      return `### 🏛️ Tư Vấn Về Thủ Tục Hôn Nhân & Ly Hôn

**1. Căn cứ pháp lý:**
- Căn cứ **Điều 55 và Điều 81, 82 Luật Hôn nhân và Gia đình 2014**.
- Bộ luật Tố tụng Dân sự 2015.

**2. Hướng dẫn thực hiện:**
- **Thuận tình ly hôn:** Hai vợ chồng cùng tự nguyện ly hôn, đã thỏa thuận được toàn bộ về việc chia tài sản và người trực tiếp nuôi con, mức cấp dưỡng nuôi con. Nộp đơn tại **Tòa án nhân dân cấp huyện** nơi một trong hai bên cư trú hoặc làm việc.
- **Đơn phương ly hôn:** Một bên nộp đơn khi có căn cứ vợ/chồng bạo lực gia đình hoặc vi phạm nghiêm trọng quyền, nghĩa vụ làm cho hôn nhân lâm vào tình trạng trầm trọng. Nộp đơn tại TAND cấp huyện nơi bị đơn cư trú.
- **Quyền nuôi con:** Con dưới 36 tháng tuổi được giao cho mẹ trực tiếp nuôi (trừ khi mẹ không đủ điều kiện hoặc có thỏa thuận khác). Con từ đủ 07 tuổi trở lên Tòa án bắt buộc phải lấy ý kiến nguyện vọng của con.

**3. Hồ sơ cần chuẩn bị:**
1. Đơn yêu cầu công nhận thuận tình ly hôn (hoặc Đơn khởi kiện ly hôn).
2. Bản chính Giấy chứng nhận kết hôn.
3. Bản sao CCCD của vợ và chồng.
4. Bản sao Giấy khai sinh của các con.
5. Giấy tờ chứng minh quyền sở hữu tài sản (nếu có yêu cầu Tòa giải quyết).

👉 **Bạn có thể sử dụng công cụ tạo đơn tự động của hệ thống:**
[SUGGEST:thuan-tinh-ly-hon]`;
    }

    if (q.includes('đòi nợ') || q.includes('vay tiền') || q.includes('quỵt nợ') || q.includes('giấy nợ')) {
      return `### ⚖️ Tư Vấn Đòi Nợ & Khởi Kiện Dân Sự Hợp Pháp

**1. Căn cứ pháp lý:**
- Căn cứ **Điều 463 đến Điều 470 Bộ luật Dân sự 2015** về Hợp đồng vay tài sản.
- **Khoản 1 Điều 468 BLDS 2015:** Lãi suất vay do các bên thỏa thuận nhưng **không được vượt quá 20%/năm** của khoản tiền vay. Phần lãi suất vượt quá 20%/năm sẽ bị vô hiệu.
- Nếu lãi suất vượt gấp 5 lần trần (trên 100%/năm) và thu lợi bất chính từ 30 triệu đồng trở lên có thể cấu thành Tội cho vay lãi nặng theo Điều 201 Bộ luật Hình sự.

**2. Các bước xử lý an toàn, đúng luật:**
- **Bước 1: Lập Giấy xác nhận nợ & Cam kết trả nợ:** Chốt lại chính xác số tiền gốc, thời hạn thanh toán cuối cùng có chữ ký và điểm chỉ của bên vay.
- **Bước 2: Gửi Thông báo nhắc nợ bằng văn bản:** Gửi qua thư bảo đảm bưu điện để làm bằng chứng về việc người vay đã được thông báo nhưng cố tình không thực hiện nghĩa vụ.
- **Bước 3: Nộp Đơn khởi kiện tại Tòa án nhân dân cấp huyện** nơi người vay cư trú:
  - Yêu cầu Tòa án buộc bên vay hoàn trả tiền gốc và tiền lãi theo quy định.
  - Đồng thời yêu cầu áp dụng biện pháp khẩn cấp tạm thời (phong tỏa tài khoản, ngăn chặn chuyển nhượng nhà đất) nếu có dấu hiệu tẩu tán tài sản.

👉 **Mẫu đơn có sẵn trong hệ thống:**
[SUGGEST:giay-nhan-no-cam-ket] [SUGGEST:don-khoi-kien-doi-no] [SUGGEST:action-court-fee]`;
    }

    if (q.includes('tranh chấp đất') || q.includes('lấn ranh') || q.includes('hòa giải đất')) {
      return `### 🌾 Thủ Tục Giải Quyết Tranh Chấp Đất Đai (Mới Nhất Luật Đất Đai 2024)

**1. Căn cứ pháp lý:**
- **Điều 235 và Điều 236 Luật Đất đai 2024** (có hiệu lực từ 01/08/2024).

**2. Quy trình bắt buộc:**
- **Bắt buộc phải qua Hòa giải tại UBND cấp xã:** 
  - Tranh chấp đất đai mà các bên không tự hòa giải được thì phải gửi **Đơn đề nghị hòa giải tranh chấp đất đai** đến UBND cấp xã/phường nơi có đất tranh chấp.
  - Chủ tịch UBND cấp xã có trách nhiệm tổ chức hội đồng hòa giải trong thời hạn không quá **30 ngày** kể từ ngày nhận được đơn.
- **Trường hợp hòa giải thành:** Kết thúc tranh chấp, kết quả được lập thành biên bản.
- **Trường hợp hòa giải không thành:**
  - Nếu thửa đất **ĐÃ CÓ** Giấy chứng nhận (Sổ đỏ): Các bên khởi kiện ra **Tòa án nhân dân** nơi có đất.
  - Nếu thửa đất **CHƯA CÓ** Sổ đỏ: Đương sự được lựa chọn: Nộp đơn yêu cầu giải quyết tranh chấp tại UBND cấp huyện/tỉnh HOẶC khởi kiện tại TAND.

👉 **Tạo Đơn đề nghị hòa giải đất đai ngay:**
[SUGGEST:don-hoa-giai-tranh-chap-dat]`;
    }

    if (q.includes('án phí') || q.includes('tạm ứng án phí') || q.includes('tiền kiện')) {
      return `### 💰 Mức Án Phí & Tạm Ứng Án Phí Tòa Án

Theo **Nghị quyết 326/2016/UBTVQH14**:
1. **Tranh chấp không có giá ngạch** (ví dụ: Ly hôn không yêu cầu chia tài sản, tranh chấp quyền nuôi con): Án phí sơ thẩm là **300.000 VNĐ**.
2. **Tranh chấp có giá ngạch** (đòi nợ, chia tài sản nhà đất):
   - Từ 6.000.000 VNĐ trở xuống: 300.000 VNĐ.
   - Từ trên 6.000.000 VNĐ đến 400.000.000 VNĐ: 5% giá trị tranh chấp.
   - Từ trên 400.000.000 VNĐ đến 2.000.000.000 VNĐ: 20.000.000 VNĐ + 4% của phần vượt quá 400 triệu.
   - Từ trên 2.000.000.000 VNĐ đến 4.000.000.000 VNĐ: 72.000.000 VNĐ + 2% của phần vượt quá 2 tỷ.
   - Trên 4.000.000.000 VNĐ: 112.000.000 VNĐ + 0.1% của phần vượt quá 4 tỷ.
3. **Mức tạm ứng án phí:** Bằng **50%** mức án phí sơ thẩm ước tính.

👉 **Bấm vào công cụ tính án phí tự động chuẩn xác của hệ thống:**
[SUGGEST:action-court-fee]`;
    }

    if (q.includes('sa thải') || q.includes('đuổi việc') || q.includes('nợ lương') || q.includes('bảo hiểm')) {
      return `### 👷 Quyền Lợi Khi Bị Sa Thải Trái Luật & Bị Nợ Lương, BHXH

**1. Căn cứ pháp lý:**
- Căn cứ **Điều 36, Điều 41 Bộ luật Lao động 2019**.
- Luật Bảo hiểm xã hội.

**2. Nếu người sử dụng lao động đơn phương sa thải trái luật:**
- Phải nhận người lao động trở lại làm việc theo HĐLĐ đã giao kết.
- Phải trả tiền lương, đóng BHXH, BHYT trong những ngày người lao động không được làm việc.
- Phải trả thêm cho người lao động một khoản tiền ít nhất bằng **02 tháng tiền lương** theo hợp đồng lao động.

**3. Trình tự khiếu nại:**
- Bước 1: Gửi Đơn khiếu nại trực tiếp đến Giám đốc/Người đại diện theo pháp luật của Công ty.
- Bước 2: Nếu không được giải quyết thỏa đáng, gửi đơn đến Chánh Thanh tra Sở Lao động - Thương binh và Xã hội hoặc Hòa giải viên lao động quận/huyện.
- Bước 3: Khởi kiện ra Tòa án nhân dân cấp huyện nơi công ty đặt trụ sở chính (Người lao động khởi kiện đòi lương, trợ cấp mất việc **được miễn nộp tiền tạm ứng án phí**).

👉 **Mẫu đơn khiếu nại lao động có sẵn:**
[SUGGEST:khieu-nai-sa-thai-trai-luat] [SUGGEST:don-to-cao-no-luong-bhxh]`;
    }

    // Default general response
    return `### 🏛️ Trợ Lý Tư Pháp Trả Lời Về: "${question}"

**1. Nguyên tắc áp dụng pháp luật:**
Mọi giao dịch dân sự, hợp đồng kinh tế và quan hệ nhân thân đều chịu sự điều chỉnh của Bộ luật Dân sự 2015 và các luật chuyên ngành liên quan (Luật Đất đai 2024, Luật Nhà ở 2023, Luật Hôn nhân gia đình 2014, Bộ luật Lao động 2019).

**2. Lời khuyên thiết thực dành cho bạn:**
- Khi lập văn bản hoặc tham gia giao dịch, bắt buộc kiểm tra năng lực hành vi dân sự của các bên và xác minh rõ nguồn gốc tài sản (tài sản riêng hay tài sản chung vợ chồng).
- Đối với giao dịch bất động sản, nhà ở, bắt buộc phải công chứng tại Tổ chức hành nghề công chứng hoặc chứng thực tại UBND cấp xã nơi có bất động sản (theo Nghị định 23/2015/NĐ-CP).
- Các điều khoản thanh toán, giao nhận và phạt vi phạm phải được ghi cụ thể bằng chữ số và bằng chữ, kèm thời hạn thực hiện rõ ràng.

👉 **Gợi ý công cụ tiện ích bạn có thể sử dụng ngay:**
- [SUGGEST:chuyen-nhuong-quyen-su-dung-dat] Hợp đồng chuyển nhượng nhà đất
- [SUGGEST:thuan-tinh-ly-hon] Hồ sơ ly hôn thuận tình
- [SUGGEST:giay-nhan-no-cam-ket] Giấy xác nhận nợ & cam kết trả
- [SUGGEST:action-tax] Khai nộp thuế đất đai trực tuyến
- [SUGGEST:action-court-fee] Tính tiền tạm ứng án phí Tòa án`;
  }

  // Heuristic Contract Risk Audit Scanner
  heuristicContractAudit(text, type) {
    const raw = (text || '').toLowerCase();
    const issues = [];
    let score = 90;

    // Check 1: Interest rate trap
    if (raw.includes('lãi suất') || raw.includes('lãi') || raw.includes('%')) {
      const match = raw.match(/([2-9][0-9]|[1-9][0-9]{2})\s*%/);
      if (match && Number(match[1]) > 20) {
        issues.push({
          severity: "high",
          clause: `Thỏa thuận lãi suất ${match[1]}%/năm hoặc mức lãi suất thỏa thuận quá cao`,
          legalBasis: "Khoản 1 Điều 468 Bộ luật Dân sự 2015",
          risk: "Lãi suất vượt quá 20%/năm là vi phạm điều cấm của luật. Phần lãi suất vượt quá 20%/năm hoàn toàn vô hiệu, Tòa án sẽ không công nhận và có thể bị phạt hành chính hoặc xử lý hình sự tội cho vay nặng lãi.",
          recommendation: "Điều chỉnh mức lãi suất tối đa không vượt quá 20%/năm theo quy định."
        });
        score -= 25;
      }
    }

    // Check 2: Deposit penalty abuse
    if (raw.includes('phạt cọc') || raw.includes('bồi thường') || raw.includes('gấp đôi') || raw.includes('gấp 3') || raw.includes('gấp 5') || raw.includes('gấp 10')) {
      issues.push({
        severity: "medium",
        clause: "Mức phạt cọc hoặc phạt vi phạm quá cao (gấp nhiều lần giá trị đặt cọc)",
        legalBasis: "Điều 328 và Điều 418 Bộ luật Dân sự 2015",
        risk: "Mức phạt vi phạm quá chênh lệch dễ dẫn đến tranh chấp kéo dài tại Tòa án và nguy cơ bị Tòa án tuyên giảm mức bồi thường nếu không chứng minh được thiệt hại thực tế phát sinh.",
        recommendation: "Ghi rõ: Bên vi phạm chịu phạt cọc một khoản tiền tương đương với tiền đặt cọc (theo đúng thông lệ Điều 328 BLDS)."
      });
      score -= 15;
    }

    // Check 3: Missing spouse / co-owner consent
    if (raw.includes('nhà') || raw.includes('đất') || raw.includes('bất động sản')) {
      if (!raw.includes('vợ') && !raw.includes('chồng') && !raw.includes('đồng sở hữu') && !raw.includes('tài sản riêng')) {
        issues.push({
          severity: "high",
          clause: "Hợp đồng chuyển nhượng nhà đất thiếu xác nhận tình trạng hôn nhân / chữ ký của người đồng sở hữu",
          legalBasis: "Điều 33 & Điều 35 Luật Hôn nhân và Gia đình 2014, Luật Đất đai 2024",
          risk: "Nếu quyền sử dụng đất được cấp trong thời kỳ hôn nhân thì đó là tài sản chung vợ chồng. Việc chỉ một người đứng tên ký hợp đồng mà không có văn bản ủy quyền hoặc cam đoan tài sản riêng sẽ khiến hợp đồng đứng trước nguy cơ bị Tòa án tuyên vô hiệu khi người kia khởi kiện.",
          recommendation: "Bắt buộc bổ sung thông tin cả vợ và chồng cùng ký kết hoặc kèm theo Văn bản cam kết tài sản riêng có công chứng/chứng thực."
        });
        score -= 20;
      }
    }

    // Check 4: Unilateral termination clause
    if (raw.includes('đơn phương') || raw.includes('tự ý hủy') || raw.includes('không cần thông báo')) {
      issues.push({
        severity: "medium",
        clause: "Quyền đơn phương chấm dứt hợp đồng không cần thông báo trước",
        legalBasis: "Điều 428 Bộ luật Dân sự 2015",
        risk: "Bên đơn phương chấm dứt hợp đồng nếu không thông báo trước cho bên kia biết trong một thời hạn hợp lý sẽ phải bồi thường toàn bộ thiệt hại phát sinh.",
        recommendation: "Bổ sung điều kiện: 'Phải thông báo bằng văn bản trước ít nhất 15 đến 30 ngày cho bên kia'."
      });
      score -= 10;
    }

    // Check 5: Dispute resolution clause
    if (!raw.includes('tranh chấp') && !raw.includes('tòa án') && !raw.includes('hòa giải')) {
      issues.push({
        severity: "low",
        clause: "Thiếu điều khoản thỏa thuận về phương thức giải quyết tranh chấp",
        legalBasis: "Bộ luật Tố tụng Dân sự 2015",
        risk: "Khi phát sinh bất đồng không xác định được rõ cơ quan giải quyết (UBND cấp xã hòa giải trước hay Tòa án nơi nào có thẩm quyền thụ lý).",
        recommendation: "Bổ sung điều khoản: 'Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết qua thương lượng, hòa giải. Nếu không thành, một trong các bên có quyền khởi kiện tại Tòa án nhân dân có thẩm quyền'."
      });
      score -= 8;
    }

    score = Math.max(20, Math.min(95, score));
    const riskLevel = score >= 80 ? 'low' : score >= 55 ? 'medium' : 'high';

    return {
      score,
      riskLevel,
      summary: `Hợp đồng được rà soát đã phát hiện ${issues.length} vấn đề cần lưu ý. Điểm đánh giá an toàn pháp lý đạt ${score}/100. ${riskLevel === 'high' ? 'Cần khẩn trương sửa đổi các điều khoản bất lợi trước khi tiến hành ký kết!' : 'Hợp đồng cơ bản chấp nhận được, nên hoàn thiện theo các đề xuất bên dưới.'}`,
      issues,
      strengths: [
        "Văn phong hành chính cơ bản đầy đủ chủ thể tham gia giao dịch",
        "Có xác định đối tượng giao dịch và giá trị thanh toán"
      ],
      mustCheckDocuments: [
        "Bản chính CCCD gắn chip của tất cả các bên tham gia ký tên",
        "Bản chính Giấy chứng nhận quyền sử dụng đất / Giấy đăng ký xe (đối chiếu số khung, số máy, số thửa)",
        "Giấy chứng nhận kết hôn hoặc Giấy xác nhận tình trạng độc thân của bên chuyển nhượng",
        "Kiểm tra tình trạng thế chấp ngân hàng hoặc ngăn chặn thi hành án tại Văn phòng Đăng ký Đất đai"
      ]
    };
  }

  // Heuristic OCR Document Mock when camera/upload is used without API Key
  heuristicOcrMock(docType) {
    if (docType === 'cccd') {
      return {
        ho_ten: "NGUYỄN VĂN AN",
        so_cccd: "001095012345",
        ngay_sinh: "12/08/1990",
        gioi_tinh: "Nam",
        que_quan: "Xã Tiền Phong, Huyện Mê Linh, TP. Hà Nội",
        noi_thuong_tru: "Số 26 Ngõ 105 Đường Doãn Kế Thiện, Mai Dịch, Cầu Giấy, Hà Nội",
        ngay_cap: "15/06/2021",
        noi_cap: "Cục Cảnh sát QLHC về TTXH"
      };
    } else if (docType === 'sodo') {
      return {
        chu_su_dung: "NGUYỄN VĂN AN & TRẦN THỊ BÌNH",
        thua_dat_so: "158",
        to_ban_do_so: "24",
        dia_chi_thua_dat: "Thôn Do Hạ, Xã Tiền Phong, Huyện Mê Linh, TP. Hà Nội",
        dien_tich: "135.5 m2",
        muc_dich_su_dung: "Đất ở tại nông thôn (ONT) - Sử dụng lâu dài",
        so_giay_chung_nhan: "DA 789215 / Số vào sổ: CS-01928",
        ngay_cap: "20/11/2022",
        noi_cap: "Sở Tài nguyên và Môi trường TP. Hà Nội"
      };
    } else {
      return {
        chu_xe: "NGUYỄN VĂN AN",
        dia_chi: "Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội",
        bien_so_xe: "30K-889.26",
        nhan_hieu: "Mazda 3 Luxury",
        so_khung: "RL3BM89215A01234",
        so_may: "PE-2089124",
        ngay_cap: "05/03/2023"
      };
    }
  }
}

module.exports = new AIService();
