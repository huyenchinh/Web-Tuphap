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

  // Smart heuristic legal rephraser when API key is not yet set
  heuristicLegalRewrite(draft, fieldLabel, procedureTitle, context) {
    if (!draft || !draft.trim()) {
      return "Các bên thống nhất cam kết tự nguyện thực hiện đúng các quyền và nghĩa vụ theo quy định của pháp luật, không có tranh chấp hay khiếu kiện phát sinh.";
    }

    const cleaned = draft.trim().replace(/\n+/g, ' ');

    // Template-based legal phrasing enhancement
    if (procedureTitle.toLowerCase().includes('hủy') || fieldLabel.toLowerCase().includes('hủy')) {
      return `Các bên cùng tự nguyện thỏa thuận hủy bỏ giao dịch nêu trên do: ${cleaned}. Kể từ thời điểm văn bản này được cơ quan có thẩm quyền chứng thực, giao dịch trước đây hoàn toàn chấm dứt hiệu lực pháp lý; các bên đã hoàn trả cho nhau toàn bộ tài sản, giấy tờ và không bên nào còn bất kỳ khiếu nại, khiếu kiện hay đòi hỏi bồi thường nào đối với bên kia.`;
    }

    if (procedureTitle.toLowerCase().includes('từ chối') || fieldLabel.toLowerCase().includes('từ chối')) {
      return `Người từ chối nhận di sản tự nguyện tuyên bố từ chối toàn bộ phần di sản thừa kế mà mình được quyền hưởng với lý do: ${cleaned}. Người từ chối cam đoan việc từ chối này hoàn toàn tự nguyện, minh mẫn, không bị ép buộc, và tuyệt đối không nhằm mục đích trốn tránh việc thực hiện bất kỳ nghĩa vụ tài sản nào của mình đối với bên thứ ba theo quy định tại Điều 620 Bộ luật Dân sự 2015.`;
    }

    if (procedureTitle.toLowerCase().includes('di chúc') || fieldLabel.toLowerCase().includes('di chúc')) {
      return `Trong trạng thái tinh thần hoàn toàn minh mẫn, sáng suốt và tự chủ, tôi lập di chúc này để bày tỏ ý chí và nguyện vọng: ${cleaned}. Sau khi tôi qua đời, người được chỉ định thừa kế có toàn quyền làm thủ tục đăng ký quyền sở hữu, sử dụng theo đúng quy định pháp luật và có trách nhiệm thực hiện đầy đủ các nghĩa vụ tâm linh, thờ cúng gắn liền với di sản.`;
    }

    // Default enhanced legal statement
    return `Các bên sau khi xem xét kỹ lưỡng đã thống nhất thỏa thuận: ${cleaned}. Các bên cam đoan nội dung thỏa thuận nêu trên là hoàn toàn tự nguyện, phản ánh đúng ý chí chung của các bên, phù hợp với quy định của Bộ luật Dân sự và các văn bản quy phạm pháp luật hiện hành có liên quan.`;
  }
}

module.exports = new AIService();
