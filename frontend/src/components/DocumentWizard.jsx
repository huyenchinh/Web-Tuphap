import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Download, Printer, Copy, Sparkles, Check, RefreshCw, 
  Eye, FileText, AlertCircle, ShieldAlert, CheckCircle2, ChevronRight, ChevronLeft, 
  Loader2, ZoomIn, ZoomOut, Maximize2, Minimize2, Wand2, Receipt,
  Camera, UploadCloud, X, FileCheck, Scale
} from 'lucide-react';
import { api } from '../services/api';

export default function DocumentWizard({ procedureId, onBack, onShowSuccessToast, onNavigateToTax }) {
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

  // AI OCR States
  const [isOcrOpen, setIsOcrOpen] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrDocType, setOcrDocType] = useState('cccd'); // 'cccd' | 'sodo' | 'xe'
  const [ocrTargetGroup, setOcrTargetGroup] = useState('bena'); // 'bena' | 'benb' | 'taisan'
  const [ocrExtractedData, setOcrExtractedData] = useState(null);

  // Certification Type according to Government Decree 280/2025/NĐ-CP (effective from Nov 1, 2025)
  const [certificationType, setCertificationType] = useState('mau_09'); 
  const [hinhThucKy, setHinhThucKy] = useState('ký'); // 'ký' | 'điểm chỉ' | 'ký và điểm chỉ'
  const [coNguoiLamChung, setCoNguoiLamChung] = useState(false);
  const [coNguoiPhienDich, setCoNguoiPhienDich] = useState(false);

  const previewDebounceRef = useRef(null);

  // Fetch procedure details on mount
  useEffect(() => {
    async function loadProcedure() {
      try {
        setLoading(true);
        const data = await api.getProcedure(procedureId);
        setProcedure(data);

        // Pre-fill initial form values with Decree 280/2025/NĐ-CP standards
        const defaultCert = data.category === 'thua-ke' 
          ? (data.id.includes('di-chuc') ? 'mau_17' : (data.id.includes('tu-choi') ? 'mau_13' : 'mau_11'))
          : 'mau_09';
        setCertificationType(defaultCert);

        const initial = {
          procedureTitle: data.title,
          so_hop_dong: `TP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          co_quan_chung_thuc: 'Ủy ban nhân dân cấp xã',
          dia_diem_chung_thuc: 'trụ sở Ủy ban nhân dân cấp xã',
          loi_chung_loai: defaultCert,
          hinh_thuc_ky: 'ký',
          so_ban_goc: '03',
          so_to: '02',
          so_trang: '03'
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

  // Run AI OCR Vision
  const handleRunOcr = async (demo = false, file = null) => {
    try {
      setOcrLoading(true);
      let imageBase64 = '';
      let mimeType = 'image/jpeg';

      if (file) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        mimeType = file.type || 'image/jpeg';
      }

      const extracted = await api.extractDocumentOCR({
        imageBase64,
        mimeType,
        docType: ocrDocType
      });

      setOcrExtractedData(extracted);
    } catch (err) {
      alert("Lỗi nhận diện OCR: " + err.message);
    } finally {
      setOcrLoading(false);
    }
  };

  // Apply OCR extracted data to form
  const handleApplyOcrToForm = () => {
    if (!ocrExtractedData) return;
    const updated = { ...formData };

    if (ocrDocType === 'cccd') {
      if (ocrTargetGroup === 'bena') {
        Object.keys(updated).forEach(k => {
          if (k.includes('ben_a_ho_ten') || k.includes('nguoi_nop_chong') || k.includes('chong_ho_ten') || k.includes('ben_cho_vay_ten') || k.includes('nguoi_khoi_kien_ten') || k.includes('nguoi_yeu_cau_ten') || k.includes('nguoi_lao_dong_ten') || k.includes('nguoi_yeu_cau')) {
            updated[k] = ocrExtractedData.ho_ten;
          }
          if (k.includes('ben_a_cccd') || k.includes('chong_cccd') || k.includes('ben_cho_vay_cccd') || k.includes('nguoi_khoi_kien_cccd') || k.includes('nguoi_yeu_cau_cccd') || k.includes('nguoi_lao_dong_cccd') || k.includes('cccd')) {
            updated[k] = ocrExtractedData.so_cccd;
          }
          if (k.includes('ben_a_ngay_cap') || k.includes('chong_ngay_cap')) {
            updated[k] = ocrExtractedData.ngay_cap;
          }
          if (k.includes('ben_a_noi_cap')) {
            updated[k] = ocrExtractedData.noi_cap;
          }
          if (k.includes('ben_a_dia_chi') || k.includes('chong_dia_chi') || k.includes('nguoi_khoi_kien_dia_chi') || k.includes('nguoi_yeu_cau_dia_chi')) {
            updated[k] = ocrExtractedData.noi_thuong_tru;
          }
        });
      } else {
        Object.keys(updated).forEach(k => {
          if (k.includes('ben_b_ho_ten') || k.includes('nguoi_nop_vo') || k.includes('vo_ho_ten') || k.includes('ben_vay_ten') || k.includes('nguoi_bi_kien_ten') || k.includes('ben_tranh_chap_ten')) {
            updated[k] = ocrExtractedData.ho_ten;
          }
          if (k.includes('ben_b_cccd') || k.includes('vo_cccd') || k.includes('ben_vay_cccd') || k.includes('nguoi_bi_kien_cccd')) {
            updated[k] = ocrExtractedData.so_cccd;
          }
          if (k.includes('ben_b_ngay_cap') || k.includes('vo_ngay_cap')) {
            updated[k] = ocrExtractedData.ngay_cap;
          }
          if (k.includes('ben_b_noi_cap')) {
            updated[k] = ocrExtractedData.noi_cap;
          }
          if (k.includes('ben_b_dia_chi') || k.includes('vo_dia_chi') || k.includes('nguoi_bi_kien_dia_chi') || k.includes('ben_tranh_chap_dia_chi')) {
            updated[k] = ocrExtractedData.noi_thuong_tru;
          }
        });
      }
    } else if (ocrDocType === 'sodo') {
      Object.keys(updated).forEach(k => {
        if (k.includes('thua_dat_so') || k.includes('thua_dat')) {
          updated[k] = ocrExtractedData.thua_dat_so;
        }
        if (k.includes('to_ban_do_so') || k.includes('to_ban_do')) {
          updated[k] = ocrExtractedData.to_ban_do_so;
        }
        if (k.includes('dia_chi_thua_dat') || k.includes('dia_chi_dat')) {
          updated[k] = ocrExtractedData.dia_chi_thua_dat;
        }
        if (k.includes('dien_tich')) {
          updated[k] = ocrExtractedData.dien_tich;
        }
        if (k.includes('so_giay_chung_nhan') || k.includes('giay_to_so_huu')) {
          updated[k] = ocrExtractedData.so_giay_chung_nhan;
        }
      });
    } else if (ocrDocType === 'xe') {
      Object.keys(updated).forEach(k => {
        if (k.includes('bien_so_xe')) updated[k] = ocrExtractedData.bien_so_xe;
        if (k.includes('so_khung')) updated[k] = ocrExtractedData.so_khung;
        if (k.includes('so_may')) updated[k] = ocrExtractedData.so_may;
        if (k.includes('tai_san_ten')) updated[k] = ocrExtractedData.nhan_hieu;
      });
    }

    setFormData(updated);
    setIsOcrOpen(false);
    setOcrExtractedData(null);
    if (onShowSuccessToast) onShowSuccessToast('Đã trích xuất & tự động điền dữ liệu thành công!');

    // Refresh live preview
    api.getPreview(procedureId, updated).then(html => setPreviewHtml(html)).catch(console.error);
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

          {/* Quick AI OCR Scan Launcher */}
          {['bena', 'benb', 'taisan'].includes(currentStepData?.id) && (
            <div className="mb-4 p-3.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/90 rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {currentStepData.id === 'taisan' ? 'Quét Sổ đỏ / Giấy tờ xe tự động' : 'Quét CCCD tự động điền form'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    AI Vision trích xuất thông tin tức thì, không cần gõ tay
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOcrDocType(currentStepData.id === 'taisan' ? (procedureId.includes('xe') || procedureId.includes('dong-san') ? 'xe' : 'sodo') : 'cccd');
                  setOcrTargetGroup(currentStepData.id);
                  setOcrExtractedData(null);
                  setIsOcrOpen(true);
                }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5 flex-shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Quét ngay</span>
              </button>
            </div>
          )}

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

            {/* Decree 280/2025/NĐ-CP Certification Configurator */}
            {currentStepData?.id === 'dieuphap' && (
              <div className="mt-6 p-5 bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-slate-50 border border-blue-200 rounded-2xl space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-blue-200/80">
                  <label className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-2">
                    <Scale className="w-4 h-4 text-blue-600" />
                    <span>Mẫu Lời Chứng Tư Pháp Mới Nhất (Nghị định số 280/2025/NĐ-CP)</span>
                  </label>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                    Áp dụng từ 01/11/2025
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Select certification model */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Mẫu Lời Chứng (Phụ lục Nghị định 280/2025)
                    </label>
                    <select
                      value={formData.loi_chung_loai || certificationType}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCertificationType(val);
                        handleFieldChange('loi_chung_loai', val);
                      }}
                      className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    >
                      <option value="mau_09">Mẫu 09: Chứng thực giao dịch (UBND xã / VP Công chứng)</option>
                      <option value="mau_10">Mẫu 10: Chứng thực giao dịch tại Trung tâm Hành chính công</option>
                      <option value="mau_11">Mẫu 11: Chứng thực văn bản phân chia di sản</option>
                      <option value="mau_13">Mẫu 13: Chứng thực văn bản từ chối nhận di sản</option>
                      <option value="mau_17">Mẫu 17: Chứng thực di chúc</option>
                      <option value="mau_02">Mẫu 02: Chứng thực chữ ký của một người</option>
                      <option value="mau_06">Mẫu 06: Chứng thực điểm chỉ</option>
                    </select>
                  </div>

                  {/* Signing Method */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Phương thức thực hiện (Ghi chú khoản 8)
                    </label>
                    <select
                      value={formData.hinh_thuc_ky || hinhThucKy}
                      onChange={(e) => {
                        const val = e.target.value;
                        setHinhThucKy(val);
                        handleFieldChange('hinh_thuc_ky', val);
                      }}
                      className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    >
                      <option value="ký">Ký tên</option>
                      <option value="điểm chỉ">Điểm chỉ (lăn tay)</option>
                      <option value="ký và điểm chỉ">Cả ký và điểm chỉ</option>
                    </select>
                  </div>
                </div>

                {/* Authority & Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Cơ quan thực hiện chứng thực
                    </label>
                    <input
                      type="text"
                      value={formData.co_quan_chung_thuc || 'Ủy ban nhân dân cấp xã'}
                      onChange={(e) => handleFieldChange('co_quan_chung_thuc', e.target.value)}
                      placeholder="VD: Ủy ban nhân dân xã Tiền Phong..."
                      className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Địa điểm chứng thực (Ghi chú 2)
                    </label>
                    <input
                      type="text"
                      value={formData.dia_diem_chung_thuc || 'trụ sở Ủy ban nhân dân cấp xã'}
                      onChange={(e) => handleFieldChange('dia_diem_chung_thuc', e.target.value)}
                      placeholder="VD: trụ sở UBND xã Tiền Phong..."
                      className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                  </div>
                </div>

                {/* Copies count & Book Code Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/80 border border-blue-100 rounded-xl">
                  <div className="flex items-center gap-4 text-xs text-slate-700 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span>Lập thành:</span>
                      <input
                        type="text"
                        value={formData.so_ban_goc || '03'}
                        onChange={(e) => handleFieldChange('so_ban_goc', e.target.value)}
                        className="w-12 text-center py-0.5 border border-slate-300 rounded font-bold"
                      />
                      <span>bản gốc</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span>Gồm:</span>
                      <input
                        type="text"
                        value={formData.so_to || '02'}
                        onChange={(e) => handleFieldChange('so_to', e.target.value)}
                        className="w-10 text-center py-0.5 border border-slate-300 rounded font-bold"
                      />
                      <span>tờ,</span>
                      <input
                        type="text"
                        value={formData.so_trang || '03'}
                        onChange={(e) => handleFieldChange('so_trang', e.target.value)}
                        className="w-10 text-center py-0.5 border border-slate-300 rounded font-bold"
                      />
                      <span>trang</span>
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-blue-900 bg-blue-100/80 px-2.5 py-1 rounded-md">
                    Sổ theo dõi chuẩn: <span className="font-mono text-red-600">-SCT/GD</span>
                  </div>
                </div>

                {/* Conditional Toggle: Người làm chứng (*) */}
                <div className="pt-2 border-t border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={coNguoiLamChung || formData.co_nguoi_lam_chung || false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setCoNguoiLamChung(checked);
                        handleFieldChange('co_nguoi_lam_chung', checked);
                      }}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span>Trường hợp có người làm chứng (*) theo Nghị định 280/2025</span>
                  </label>

                  {(coNguoiLamChung || formData.co_nguoi_lam_chung) && (
                    <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-amber-900 uppercase">Họ và tên người làm chứng</label>
                          <input
                            type="text"
                            value={formData.nguoi_lam_chung_ten || ''}
                            onChange={(e) => handleFieldChange('nguoi_lam_chung_ten', e.target.value)}
                            placeholder="Nguyễn Văn A..."
                            className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-amber-900 uppercase">Số Căn cước / Giấy tờ tùy thân</label>
                          <input
                            type="text"
                            value={formData.nguoi_lam_chung_cccd || ''}
                            onChange={(e) => handleFieldChange('nguoi_lam_chung_cccd', e.target.value)}
                            placeholder="001095000000"
                            className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-amber-900 uppercase">Ngày cấp & Nơi cấp</label>
                          <input
                            type="text"
                            value={formData.nguoi_lam_chung_ngay_cap || ''}
                            onChange={(e) => handleFieldChange('nguoi_lam_chung_ngay_cap', e.target.value)}
                            placeholder="01/01/2024 - Cục CSQLHC về TTXH"
                            className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-amber-900 uppercase">Lý do phải có người làm chứng</label>
                          <input
                            type="text"
                            value={formData.nguoi_lam_chung_ly_do || ''}
                            onChange={(e) => handleFieldChange('nguoi_lam_chung_ly_do', e.target.value)}
                            placeholder="Người yêu cầu không tự đọc/ký được..."
                            className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Conditional Toggle: Người phiên dịch (**) */}
                <div className="pt-2 border-t border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={coNguoiPhienDich || formData.co_nguoi_phien_dich || false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setCoNguoiPhienDich(checked);
                        handleFieldChange('co_nguoi_phien_dich', checked);
                      }}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span>Trường hợp có người phiên dịch (**) theo Nghị định 280/2025</span>
                  </label>

                  {(coNguoiPhienDich || formData.co_nguoi_phien_dich) && (
                    <div className="mt-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-emerald-900 uppercase">Họ và tên người phiên dịch</label>
                          <input
                            type="text"
                            value={formData.nguoi_phien_dich_ten || ''}
                            onChange={(e) => handleFieldChange('nguoi_phien_dich_ten', e.target.value)}
                            placeholder="Trần Thị B..."
                            className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-emerald-900 uppercase">Số Căn cước / Giấy tờ tùy thân</label>
                          <input
                            type="text"
                            value={formData.nguoi_phien_dich_cccd || ''}
                            onChange={(e) => handleFieldChange('nguoi_phien_dich_cccd', e.target.value)}
                            placeholder="001096000000"
                            className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-emerald-900 uppercase">Ngày cấp & Nơi cấp</label>
                          <input
                            type="text"
                            value={formData.nguoi_phien_dich_ngay_cap || ''}
                            onChange={(e) => handleFieldChange('nguoi_phien_dich_ngay_cap', e.target.value)}
                            placeholder="01/01/2024 - Cục CSQLHC về TTXH"
                            className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-emerald-900 uppercase">Lý do phải có người phiên dịch</label>
                          <input
                            type="text"
                            value={formData.nguoi_phien_dich_ly_do || ''}
                            onChange={(e) => handleFieldChange('nguoi_phien_dich_ly_do', e.target.value)}
                            placeholder="Người yêu cầu không thạo tiếng Việt..."
                            className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed italic pt-1">
                  Đã đồng bộ tự động chuẩn Phụ lục Nghị định số 280/2025/NĐ-CP (có hiệu lực từ 01/11/2025) vào văn bản Word (.docx) và bản xem trước thời gian thực.
                </p>
              </div>
            )}
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
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportDocx}
                  disabled={exportLoading}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Xuất Word (.docx)</span>
                </button>
                {onNavigateToTax && (
                  <button
                    onClick={() => onNavigateToTax(formData)}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                    title="Chuyển dữ liệu hợp đồng này sang Tờ khai thuế TNCN và Lệ phí trước bạ"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>Khai thuế ngay</span>
                  </button>
                )}
              </div>
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

      {/* AI Vision OCR Modal */}
      {isOcrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-page-enter">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Trợ Lý AI Vision Quét Giấy Tờ
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Tự động nhận dạng và điền vào: <strong className="text-blue-600">{ocrTargetGroup === 'bena' ? 'Bên A' : ocrTargetGroup === 'benb' ? 'Bên B' : 'Tài sản & Giấy tờ'}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setIsOcrOpen(false); setOcrExtractedData(null); }}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Doc Type Selector */}
            <div className="my-4">
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Chọn loại giấy tờ cần quét:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cccd', label: 'CCCD Gắn Chip' },
                  { id: 'sodo', label: 'Sổ Đỏ (QSDĐ)' },
                  { id: 'xe', label: 'Đăng Ký Xe' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => { setOcrDocType(t.id); setOcrExtractedData(null); }}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      ocrDocType === t.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Zone */}
            <div className="my-4 p-5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50/70 text-center transition-all">
              <UploadCloud className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-700 mb-1">
                Tải lên ảnh chụp {ocrDocType === 'cccd' ? 'CCCD 2 mặt' : ocrDocType === 'sodo' ? 'Trang 2-3 Sổ đỏ' : 'Cà-vẹt xe'}
              </div>
              <p className="text-[11px] text-slate-400 mb-3">Hỗ trợ JPG, PNG, WEBP (Tối đa 5MB)</p>
              
              <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer active:scale-95 transition-all">
                <span>Chọn file ảnh từ thiết bị</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleRunOcr(false, f);
                  }}
                />
              </label>

              <div className="my-2.5 flex items-center gap-2 justify-center text-[11px] text-slate-400">
                <span className="w-12 h-px bg-slate-200"></span>
                <span>HOẶC</span>
                <span className="w-12 h-px bg-slate-200"></span>
              </div>

              <button
                type="button"
                onClick={() => handleRunOcr(true, null)}
                disabled={ocrLoading}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline inline-flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dùng mẫu giấy tờ thử nghiệm (1-Click)</span>
              </button>
            </div>

            {/* OCR Extracted Preview */}
            {ocrLoading && (
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-center gap-2.5 text-xs text-blue-800 font-semibold my-3 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>AI Vision đang quét và trích xuất dữ liệu thực thể...</span>
              </div>
            )}

            {ocrExtractedData && !ocrLoading && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2.5 my-3 animate-page-enter">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dữ liệu AI đã trích xuất thành công:</span>
                </div>
                <div className="text-xs text-slate-700 font-mono space-y-1 bg-white p-3 rounded-xl border border-emerald-100 max-h-36 overflow-y-auto">
                  {Object.entries(ocrExtractedData).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-slate-100 pb-0.5 last:border-0">
                      <span className="text-slate-400 font-sans">{k}:</span>
                      <strong className="text-slate-800 text-right">{String(v)}</strong>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleApplyOcrToForm}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Áp dụng & Tự động điền vào Form ngay</span>
                </button>
              </div>
            )}

            {/* Footer Notice */}
            <div className="mt-3 text-center text-[10px] text-slate-400">
              Công nghệ bảo mật cục bộ: Hình ảnh giấy tờ chỉ phục vụ trích xuất tức thời và không bị lưu trữ trên hệ thống.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
