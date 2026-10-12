import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Download, Printer, Copy, Sparkles, Check, RefreshCw, 
  Eye, FileText, AlertCircle, ShieldAlert, CheckCircle2, ChevronRight, ChevronLeft, 
  Loader2, ZoomIn, ZoomOut, Maximize2, Minimize2, Wand2
} from 'lucide-react';
import { api } from '../services/api';

export default function DocumentWizard({ procedureId, onBack, onShowSuccessToast }) {
  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [previewHtml, setPreviewHtml] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [aiDraft, setAiDraft] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiTone, setAiTone] = useState('trang_trong'); // 'trang_trong' | 'suc_tich' | 'chat_che'
  const [exportLoading, setExportLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  const previewDebounceRef = useRef(null);

  // Fetch procedure details on mount
  useEffect(() => {
    async function loadProcedure() {
      try {
        setLoading(true);
        const data = await api.getProcedure(procedureId);
        setProcedure(data);

        // Pre-fill initial form values
        const initial = {
          procedureTitle: data.title,
          so_hop_dong: `TP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          co_quan_chung_thuc: 'xã Tiền Phong, huyện Mê Linh, thành phố Hà Nội'
        };
        (data.fields || []).forEach(f => {
          initial[f.key] = '';
        });
        setFormData(initial);

        // Load initial preview
        const html = await api.getPreview(procedureId, initial);
        setPreviewHtml(html);
      } catch (err) {
        console.error(err);
        alert('Lỗi tải thông tin thủ tục: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProcedure();
  }, [procedureId]);

  // Handle form field change & live preview update
  const handleFieldChange = (key, value) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);

    // Debounce preview API call
    if (previewDebounceRef.current) clearTimeout(previewDebounceRef.current);
    previewDebounceRef.current = setTimeout(async () => {
      try {
        const html = await api.getPreview(procedureId, updated);
        setPreviewHtml(html);
      } catch (err) {
        console.error('Preview update error:', err);
      }
    }, 300);
  };

  // Group fields into 4 Wizard steps
  const allFields = procedure?.fields || [];
  const steps = [
    { id: 'bena', title: '1. Bên thứ nhất (Bên A)', subtitle: 'Thông tin nhân thân, CCCD & Nơi cư trú', fields: allFields.filter(f => f.group === 'bena') },
    { id: 'benb', title: '2. Bên thứ hai (Bên B)', subtitle: 'Thông tin bên nhận chuyển nhượng/thừa kế', fields: allFields.filter(f => f.group === 'benb') },
    { id: 'taisan', title: '3. Tài sản & Giấy tờ', subtitle: 'Thông tin Giấy chứng nhận, Thửa đất, Xe...', fields: allFields.filter(f => f.group === 'taisan') },
    { id: 'dieuphap', title: '4. Thỏa thuận & AI', subtitle: 'Điều khoản đặc biệt & Trợ lý AI pháp lý', fields: allFields.filter(f => f.group === 'dieuphap') }
  ].filter(s => s.fields.length > 0);

  // Trigger AI Rewrite with Tone
  const handleAIRewrite = async (fieldKey, fieldLabel) => {
    const currentText = formData[fieldKey] || aiDraft;
    if (!currentText || !currentText.trim()) {
      alert('Vui lòng nhập vài câu mô tả hoặc ý kiến nháp để AI có dữ liệu chuốt lại.');
      return;
    }

    try {
      setAiLoading(true);
      setAiResult(null);
      const tonePromptModifier = aiTone === 'suc_tich' 
        ? ' (yêu cầu súc tích, ngắn gọn)' 
        : aiTone === 'chat_che' 
        ? ' (yêu cầu các điều khoản bảo vệ quyền lợi tối đa, triệt tiêu tranh chấp)' 
        : ' (văn phong trang trọng, chuẩn mực công văn tư pháp)';

      const rewritten = await api.rewriteWithAI({
        context: formData,
        userDraft: currentText + tonePromptModifier,
        fieldLabel: fieldLabel,
        procedureTitle: procedure.title
      });
      setAiResult({ key: fieldKey, text: rewritten });
    } catch (err) {
      alert('Lỗi AI: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  // Apply AI rewritten text into formData
  const applyAIRewrite = () => {
    if (aiResult) {
      handleFieldChange(aiResult.key, aiResult.text);
      setAiResult(null);
      setAiDraft('');
    }
  };

  // Download Word .docx file
  const handleExportDocx = async () => {
    try {
      setExportLoading(true);
      const blob = await api.exportDocx(procedureId, formData);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${procedure.code || 'hop-dong'}-${Date.now()}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      if (onShowSuccessToast) onShowSuccessToast('Đã xuất thành công file Word (.docx) chuẩn thể thức!');
    } catch (err) {
      alert('Lỗi xuất file: ' + err.message);
    } finally {
      setExportLoading(false);
    }
  };

  // Copy Plain Text
  const handleCopy = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = previewHtml;
    const text = tempDiv.innerText || tempDiv.textContent;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-page-enter">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-700 font-bold text-sm">Đang tải biểu mẫu chuẩn hóa...</p>
          <p className="text-slate-400 text-xs mt-1">Đồng bộ các trường dữ liệu và lời chứng tư pháp</p>
        </div>
      </div>
    );
  }

  const currentStepData = steps[activeStep] || steps[0];
  const progressPercent = Math.round(((activeStep + 1) / steps.length) * 100);

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-page-enter">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all active:scale-95 border border-slate-200"
            title="Quay lại danh mục thủ tục"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md border border-blue-200">
                {procedure.code || 'FORM'}
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">Mã thủ tục: {procedure.id}</span>
              {procedure.hasCustomDocx && (
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md font-semibold">
                  Mẫu file .docx riêng
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              {procedure.title}
            </h1>
          </div>
        </div>

        {/* Action Buttons for Document */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95"
            title="Sao chép toàn bộ văn bản thô"
          >
            {copySuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copySuccess ? 'Đã chép' : 'Sao chép'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95"
            title="In trực tiếp hoặc Lưu file PDF"
          >
            <Printer className="w-4 h-4" />
            <span>In / PDF</span>
          </button>

          <button
            onClick={handleExportDocx}
            disabled={exportLoading}
            className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-95"
          >
            {exportLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Tải file Word (.docx)</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Wizard (5 Cols) */}
        <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 flex flex-col transition-all duration-300 ${
          isFullscreenPreview ? 'hidden lg:hidden' : 'lg:col-span-5'
        }`}>
          {/* Progress Header */}
          <div className="border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
              <span>Tiến độ hoàn thành</span>
              <span className="text-blue-600 font-mono">{progressPercent}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Stepper buttons */}
            <div className="flex items-center justify-between gap-1.5">
              {steps.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex-1 py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                    activeStep === idx
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                      : idx < activeStep
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <span>B{idx + 1}</span>
                </button>
              ))}
            </div>

            <div className="mt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {currentStepData?.title}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {currentStepData?.subtitle}
              </div>
            </div>
          </div>

          {/* Form Fields for current step */}
          <div className="space-y-4 flex-1">
            {currentStepData?.fields.map(field => {
              const isAiField = field.group === 'dieuphap' || field.type === 'textarea';

              return (
                <div key={field.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {isAiField && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        AI viết lại
                      </span>
                    )}
                  </div>

                  {field.type === 'textarea' ? (
                    <div className="space-y-2">
                      <textarea
                        rows={4}
                        value={formData[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={field.placeholder || `Nhập ${field.label.toLowerCase()}...`}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner leading-relaxed"
                      />

                      {/* AI Assistance Box with Tone Selection */}
                      <div className="bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-amber-50/80 border border-amber-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span>Trợ lý AI Tái Tạo Câu Chữ Pháp Lý</span>
                          </div>

                          {/* Tone Selector */}
                          <div className="flex items-center gap-1 text-[11px]">
                            <span className="text-amber-800 font-medium">Giọng điệu:</span>
                            <select
                              value={aiTone}
                              onChange={(e) => setAiTone(e.target.value)}
                              className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-amber-950 font-bold focus:outline-none text-[11px]"
                            >
                              <option value="trang_trong">Trang trọng</option>
                              <option value="suc_tich">Súc tích</option>
                              <option value="chat_che">Chặt chẽ</option>
                            </select>
                          </div>
                        </div>

                        <p className="text-[11px] text-amber-800/90 leading-relaxed mb-3">
                          Nhập ngôn từ đời thường hoặc ý tưởng nháp ở trên. AI sẽ tự động đọc toàn bộ bối cảnh hợp đồng và tái tạo thành văn phong hành chính chuẩn mực.
                        </p>

                        <button
                          type="button"
                          onClick={() => handleAIRewrite(field.key, field.label)}
                          disabled={aiLoading}
                          className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                        >
                          {aiLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                              <span>AI đang phân tích ngữ cảnh và tái tạo...</span>
                            </>
                          ) : (
                            <>
                              <Wand2 className="w-4 h-4 text-slate-950" />
                              <span>AI Chuốt Lại Văn Phong Pháp Lý</span>
                            </>
                          )}
                        </button>

                        {/* AI Rewritten Result Dialog */}
                        {aiResult && aiResult.key === field.key && (
                          <div className="mt-3.5 pt-3.5 border-t border-amber-200/80 space-y-2.5 animate-page-enter">
                            <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Đề xuất điều khoản từ Trợ lý AI:</span>
                            </div>
                            <div className="p-3.5 bg-white rounded-xl border border-emerald-300 text-xs text-slate-800 leading-relaxed shadow-sm font-serif">
                              {aiResult.text}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={applyAIRewrite}
                                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Chấp nhận & Đưa vào văn bản</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setAiResult(null)}
                                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                              >
                                Đóng
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={formData[field.key] || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder || `Nhập ${field.label.toLowerCase()}...`}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Wizard Step Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
            <button
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl transition-all active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>

            {activeStep < steps.length - 1 ? (
              <button
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-95"
              >
                <span>Bước tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleExportDocx}
                disabled={exportLoading}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Hoàn tất & Xuất Word</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Live Real-Time Document Preview (7 Cols or 12 Cols if Fullscreen) */}
        <div className={`transition-all duration-300 bg-slate-200/80 p-4 sm:p-6 rounded-3xl border border-slate-300 shadow-inner ${
          isFullscreenPreview ? 'lg:col-span-12' : 'lg:col-span-7'
        }`}>
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-white/90 p-3 rounded-2xl border border-slate-300/80 backdrop-blur-sm shadow-xs">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-700" />
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Xem trước văn bản (Khổ giấy A4)
              </span>
            </div>

            {/* Zoom & Fullscreen Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))}
                className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-700 w-10 text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                title="Phóng to"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-slate-300 mx-1"></div>

              <button
                onClick={() => setIsFullscreenPreview(!isFullscreenPreview)}
                className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                title={isFullscreenPreview ? "Thu gọn màn hình" : "Mở rộng toàn màn hình"}
              >
                {isFullscreenPreview ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Paper Simulated Canvas with Zoom Transform */}
          <div className="overflow-auto max-h-[920px] rounded-2xl flex justify-center p-2">
            <div
              id="printable-document"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="bg-white rounded-xl shadow-2xl border border-slate-300/90 p-8 sm:p-14 font-serif text-slate-900 leading-relaxed text-sm sm:text-base min-h-[950px] w-full max-w-[850px] transition-transform duration-150"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
