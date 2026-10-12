import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Send, Mic, MicOff, Bot, User, ArrowRight, BookOpen, 
  Scale, FileText, CheckCircle2, AlertCircle, Copy, Check, RotateCcw,
  ShieldCheck, HelpCircle, Flame, ExternalLink, Compass
} from 'lucide-react';
import { api } from '../services/api';

export default function LegalCopilotPage({ onSelectProcedure, onNavigateToTax, onNavigateToFee }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Xin chào Quý công dân! Tôi là **Trợ lý AI Pháp Lý Tư Pháp**, được đồng bộ kiến thức với hệ thống văn bản quy phạm pháp luật Việt Nam (Bộ luật Dân sự 2015, Luật Đất đai 2024, Luật Nhà ở 2023, Luật Hôn nhân & Gia đình, Bộ luật Lao động và Nghị định số 23/2015/NĐ-CP).

Bạn đang gặp vướng mắc gì về thủ tục giấy tờ, tranh chấp, hoặc cần soạn thảo hồ sơ pháp lý? Hãy hỏi tôi ngay bên dưới hoặc chọn các câu hỏi gợi ý!`,
      time: 'Vừa xong'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Voice Recognition Handler (Web Speech API)
  const handleToggleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn chưa hỗ trợ nhận dạng giọng nói trực tiếp. Hãy sử dụng Chrome hoặc Edge để dùng tính năng này.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputQuestion(prev => (prev ? prev + ' ' : '') + transcript);
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputQuestion.trim() || loading) return;

    const userText = inputQuestion.trim();
    setInputQuestion('');

    const newMessages = [
      ...messages,
      {
        role: 'user',
        content: userText,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await api.chatWithLegalCopilot({
        messages: newMessages.slice(-6),
        question: userText
      });

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: response,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Xin lỗi, hiện tại tôi gặp sự cố kết nối. ' + err.message,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const quickPrompts = [
    { label: "Bố mẹ mất không để lại di chúc thì chia thế nào?", q: "Bố mẹ tôi mất không để lại di chúc, có mảnh đất ở quê, các anh em muốn chia đều thì thủ tục như thế nào theo Luật Đất đai 2024?" },
    { label: "Vợ chồng muốn ly hôn thuận tình cần chuẩn bị gì?", q: "Vợ chồng tôi đồng thuận ly hôn và đã thỏa thuận xong quyền nuôi con, cần nộp những giấy tờ gì và nộp tại Tòa án nào?" },
    { label: "Người khác nợ tiền quá hạn không trả kiện ở đâu?", q: "Bạn tôi vay 200 triệu đồng có giấy viết tay hẹn 6 tháng trả nhưng nay quá hạn 1 năm trốn tránh, tôi cần làm gì để đòi lại tiền?" },
    { label: "Tranh chấp ranh giới đất với hàng xóm giải quyết sao?", q: "Nhà hàng xóm xây tường rào lấn sang đất nhà tôi 20cm, tôi phải gửi đơn đến cơ quan nào trước khi kiện ra Tòa?" },
    { label: "Mức tạm ứng án phí Tòa án tính thế nào?", q: "Tôi muốn kiện đòi khoản nợ 500 triệu đồng thì phải nộp tiền tạm ứng án phí cho Tòa án là bao nhiêu tiền?" }
  ];

  // Procedure suggestions mapper
  const renderActionTriggers = (content) => {
    const triggers = [];
    if (content.includes('[SUGGEST:thuan-tinh-ly-hon]')) {
      triggers.push({
        label: "Tạo Đơn thuận tình ly hôn ngay",
        action: () => onSelectProcedure('thuan-tinh-ly-hon')
      });
    }
    if (content.includes('[SUGGEST:chuyen-nhuong-quyen-su-dung-dat]')) {
      triggers.push({
        label: "Lập Hợp đồng chuyển nhượng đất",
        action: () => onSelectProcedure('chuyen-nhuong-quyen-su-dung-dat')
      });
    }
    if (content.includes('[SUGGEST:giay-nhan-no-cam-ket]')) {
      triggers.push({
        label: "Lập Giấy xác nhận nợ & Cam kết trả",
        action: () => onSelectProcedure('giay-nhan-no-cam-ket')
      });
    }
    if (content.includes('[SUGGEST:don-khoi-kien-doi-no]')) {
      triggers.push({
        label: "Soạn Đơn khởi kiện đòi nợ dân sự",
        action: () => onSelectProcedure('don-khoi-kien-doi-no')
      });
    }
    if (content.includes('[SUGGEST:don-hoa-giai-tranh-chap-dat]')) {
      triggers.push({
        label: "Lập Đơn hòa giải đất đai tại UBND xã",
        action: () => onSelectProcedure('don-hoa-giai-tranh-chap-dat')
      });
    }
    if (content.includes('[SUGGEST:khieu-nai-sa-thai-trai-luat]')) {
      triggers.push({
        label: "Lập Đơn khiếu nại sa thải trái luật",
        action: () => onSelectProcedure('khieu-nai-sa-thai-trai-luat')
      });
    }
    if (content.includes('[SUGGEST:action-court-fee]') && onNavigateToFee) {
      triggers.push({
        label: "Mở Máy tính Án phí Tòa án",
        action: () => onNavigateToFee()
      });
    }
    if (content.includes('[SUGGEST:action-tax]') && onNavigateToTax) {
      triggers.push({
        label: "Mở Cổng kê khai thuế đất đai",
        action: () => onNavigateToTax()
      });
    }

    if (triggers.length === 0) return null;

    return (
      <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap gap-2">
        {triggers.map((trig, i) => (
          <button
            key={i}
            onClick={trig.action}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all active:scale-95"
          >
            <span>{trig.label}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    );
  };

  // Clean raw content by removing action codes
  const cleanContent = (txt) => {
    return txt.replace(/\[SUGGEST:[^\]]+\]/g, '').trim();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-page-enter">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden mb-6">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Trợ Lý Pháp Lý AI Tương Tác • Đồng Bộ Luật Đất Đai 2024</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Legal Copilot - Tư Vấn & Giải Đáp Pháp Luật
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Đặt câu hỏi tình huống thực tế của bạn bằng văn bản hoặc giọng nói. AI sẽ phân tích điều luật, viện dẫn căn cứ pháp lý và đề xuất biểu mẫu xử lý ngay lập tức.
            </p>
          </div>
          <button
            onClick={() => setMessages([messages[0]])}
            className="self-start md:self-center flex items-center gap-1.5 px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-all active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm mới hội thoại</span>
          </button>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2 px-1">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span>Tình huống pháp lý phổ biến được quan tâm nhiều:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuestion(p.q);
              }}
              className="flex-shrink-0 text-left px-3 py-1.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-medium transition-all shadow-2xs hover:shadow-xs active:scale-95"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col h-[560px] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div 
                key={idx}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isUser 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gradient-to-tr from-indigo-700 to-blue-600 text-white shadow-md'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isUser 
                    ? 'bg-blue-600 text-white rounded-tr-xs' 
                    : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-xs'
                }`}>
                  <div className="whitespace-pre-wrap font-sans">
                    {cleanContent(msg.content)}
                  </div>

                  {/* Render Suggested Action Buttons */}
                  {!isUser && renderActionTriggers(msg.content)}

                  {/* Bubble Footer */}
                  <div className={`mt-2 flex items-center justify-between gap-3 text-[11px] ${
                    isUser ? 'text-blue-200' : 'text-slate-400'
                  }`}>
                    <span>{msg.time}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopyMessage(cleanContent(msg.content), idx)}
                        className="hover:text-slate-600 p-1 transition-colors flex items-center gap-1"
                        title="Sao chép câu trả lời"
                      >
                        {copiedIdx === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 text-slate-600 text-xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-slate-500 font-medium ml-1">AI đang tra cứu văn bản pháp luật...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              title={isRecording ? "Đang lắng nghe... bấm để dừng" : "Nhập câu hỏi bằng giọng nói (Micro)"}
              className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
                isRecording 
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse shadow-md shadow-rose-500/30' 
                  : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-300 shadow-2xs hover:text-blue-600'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Input Box */}
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder={isRecording ? "Đang lắng nghe giọng nói của bạn..." : "Nhập câu hỏi pháp lý của bạn (ví dụ: 'Thủ tục sang tên sổ đỏ mất bao lâu?')..."}
              className="flex-1 py-3 px-4 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-inner"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputQuestion.trim() || loading}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                !inputQuestion.trim() || loading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
              }`}
            >
              <span>Gửi</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-center text-[11px] text-slate-400">
            Trợ lý AI hỗ trợ giải đáp thông tin quy định pháp luật. Đối với các vụ việc tố tụng phức tạp, khuyến nghị tham khảo thêm ý kiến Luật sư hoặc cơ quan có thẩm quyền.
          </div>
        </div>
      </div>
    </div>
  );
}
