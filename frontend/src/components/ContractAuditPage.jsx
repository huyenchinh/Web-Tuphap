import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, FileText, CheckCircle2, 
  Sparkles, ArrowRight, Printer, RefreshCw, FileSearch, HelpCircle, 
  Scale, BookOpen, AlertOctagon, Check, Copy, ExternalLink
} from 'lucide-react';
import { api } from '../services/api';

export default function ContractAuditPage({ onSelectProcedure }) {
  const [contractText, setContractText] = useState('');
  const [contractType, setContractType] = useState('bds_chuyen_nhuong');
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  // Sample risky contracts for 1-click test
  const sampleContracts = [
    {
      title: "Mẫu 1: Hợp đồng vay tiền có lãi suất 36%/năm & chế tài xiết nhà",
      type: "vay_tai_san",
      content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc

HỢP ĐỒNG CHO VAY TIỀN
Bên A (Bên cho vay): Trần Văn Hưng, CCCD số 001089001122
Bên B (Bên vay): Lê Thị Mai, CCCD số 036195003344

Hai bên thống nhất các điều khoản sau:
Điều 1: Bên A cho Bên B vay số tiền là 500.000.000 VNĐ (Năm trăm triệu đồng).
Điều 2: Thời hạn vay là 06 tháng kể từ ngày 01/01/2026 đến ngày 01/07/2026.
Điều 3: Lãi suất vay là 3% / tháng (tương đương 36% / năm), tiền lãi trả vào ngày mùng 5 hàng tháng.
Điều 4: Nếu Bên B chậm trả lãi từ 10 ngày trở lên, Bên A có toàn quyền đến niêm phong và tiếp quản căn nhà của Bên B tại ngõ 20 Cầu Giấy để khấu trừ nợ mà không cần thông qua Tòa án hay cơ quan thi hành án.
Điều 5: Hợp đồng này có hiệu lực kể từ thời điểm ký kết.`
    },
    {
      title: "Mẫu 2: Hợp đồng đặt cọc mua bán nhà đất phạt cọc gấp 5 lần & thiếu chữ ký vợ",
      type: "bds_chuyen_nhuong",
      content: `HỢP ĐỒNG ĐẶT CỌC CHUYỂN NHƯỢNG QUYỀN SỬ DỤNG ĐẤT
Bên A (Bên nhận cọc): Nguyễn Văn Mạnh (Độc thân / Không ghi tình trạng hôn nhân), CCCD 001090001234
Bên B (Bên đặt cọc): Hoàng Thu Hà, CCCD 025198005678

Điều 1: Bên B đặt cọc cho Bên A số tiền 200.000.000 VNĐ để mua thửa đất số 88, tờ bản đồ số 5 tại huyện Mê Linh, Hà Nội với giá thỏa thuận 2.000.000.000 VNĐ.
Điều 2: Thời hạn đặt cọc là 30 ngày để hai bên hoàn thiện thủ tục công chứng chuyển nhượng.
Điều 3: Nếu Bên B không mua nữa thì mất toàn bộ tiền đặt cọc. Nếu Bên A không bán cho Bên B thì Bên A phải trả lại tiền cọc và bị phạt cọc gấp 5 lần tiền đặt cọc (tức phạt 1.000.000.000 VNĐ).
Điều 4: Bên A cam kết đất không tranh chấp, mọi rủi ro về quy hoạch sau ngày ký Bên B tự chịu.`
    },
    {
      title: "Mẫu 3: Hợp đồng thuê mặt bằng kinh doanh đơn phương trục xuất không báo trước",
      type: "thue_tai_san",
      content: `HỢP ĐỒNG THUÊ MẶT BẰNG KINH DOANH
Bên cho thuê (Bên A): Công ty Bất động sản Thành Đạt
Bên thuê (Bên B): Hộ kinh doanh Nguyễn Mai Anh

Nội dung thỏa thuận:
1. Bên A cho Bên B thuê diện tích 80m2 tại tầng 1 để mở quán cà phê với giá 35.000.000 VNĐ/tháng, thanh toán 6 tháng/lần, cọc 3 tháng.
2. Bên B tự bỏ chi phí cải tạo sửa chữa mặt bằng (khoảng 300 triệu đồng).
3. Trong trường hợp Bên A có nhu cầu sử dụng mặt bằng hoặc bán tài sản cho đối tác khác, Bên A có quyền đơn phương chấm dứt hợp đồng ngay lập tức mà không cần báo trước, Bên A chỉ cần hoàn trả số tiền thuê của các tháng chưa sử dụng và không có nghĩa vụ bồi hoàn chi phí sửa chữa cải tạo của Bên B.
4. Mọi tranh chấp nếu có sẽ do Bên A toàn quyền quyết định.`
    }
  ];

  const handleLoadSample = (sample) => {
    setContractText(sample.content);
    setContractType(sample.type);
    setAuditResult(null);
  };

  const handleStartAudit = async () => {
    if (!contractText.trim()) {
      alert("Vui lòng nhập hoặc dán nội dung hợp đồng cần rà soát.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.auditContract({
        contractText,
        contractType
      });
      setAuditResult(res);
    } catch (err) {
      alert("Lỗi thẩm định: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-page-enter">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden mb-8">
        <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 text-rose-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>AI Contract Risk Scanner • Soát Xét Rủi Ro & Chống Bẫy Pháp Lý</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Thẩm Định & Rà Soát Hợp Đồng Toàn Diện
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Dán nội dung bất kỳ hợp đồng nào bạn sắp ký (mua bán đất, vay tiền, thuê nhà, đặt cọc...). Trí tuệ nhân tạo sẽ quét tìm các điều khoản vi phạm pháp luật, trần lãi suất, bẫy phạt tiền và đề xuất phương án sửa đổi an toàn.
          </p>
        </div>
      </div>

      {/* Grid: Input Left & Results Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-rose-600" />
                <span>Nội dung hợp đồng cần rà soát</span>
              </label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                className="text-xs bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="bds_chuyen_nhuong">Nhà đất / Bất động sản</option>
                <option value="vay_tai_san">Vay tiền / Mượn tài sản</option>
                <option value="thue_tai_san">Thuê nhà / Thuê mặt bằng</option>
                <option value="dat_coc">Hợp đồng đặt cọc</option>
                <option value="lao_dong">Hợp đồng lao động</option>
              </select>
            </div>

            <textarea
              rows={12}
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              placeholder="Dán toàn bộ hoặc các điều khoản quan trọng của hợp đồng vào đây..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white font-mono leading-relaxed"
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => { setContractText(''); setAuditResult(null); }}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Xóa trắng
              </button>
              <button
                type="button"
                onClick={handleStartAudit}
                disabled={loading || !contractText.trim()}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 ${
                  loading || !contractText.trim()
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI đang phân tích điều khoản...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Bắt đầu rà soát rủi ro</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Sample Selector */}
          <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <FileSearch className="w-3.5 h-3.5 text-blue-600" />
              <span>Hoặc thử nghiệm nhanh với hợp đồng mẫu có bẫy:</span>
            </div>
            <div className="space-y-2">
              {sampleContracts.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoadSample(s)}
                  className="w-full text-left p-2.5 bg-white hover:bg-rose-50/60 border border-slate-200 hover:border-rose-300 rounded-xl text-xs text-slate-700 hover:text-rose-800 transition-all font-medium flex items-center justify-between gap-2 shadow-2xs"
                >
                  <span className="line-clamp-1">{s.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Audit Results (7 Cols) */}
        <div className="lg:col-span-7">
          {!auditResult ? (
            <div className="h-full min-h-[380px] bg-white rounded-2xl border border-slate-200 border-dashed p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 shadow-inner">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                Chưa có kết quả thẩm định
              </h3>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-6">
                Nhập văn bản hợp đồng hoặc chọn một trong các mẫu có sẵn bên trái, sau đó nhấn "Bắt đầu rà soát rủi ro" để xem phân tích chi tiết từ AI.
              </p>
              <div className="grid grid-cols-3 gap-3 w-full max-w-md text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-rose-600">Trần Lãi Suất</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Tối đa 20%/năm</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-amber-600">Phạt Vi Phạm</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Không quá mức cọc</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-blue-600">Đồng Sở Hữu</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Đủ chữ ký vợ chồng</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 animate-page-enter">
              {/* Score & Summary Card */}
              <div className={`p-6 rounded-2xl border text-white shadow-lg ${
                auditResult.riskLevel === 'high'
                  ? 'bg-gradient-to-br from-rose-900 via-rose-800 to-slate-900 border-rose-700'
                  : auditResult.riskLevel === 'medium'
                  ? 'bg-gradient-to-br from-amber-900 via-amber-800 to-slate-900 border-amber-700'
                  : 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 border-emerald-700'
              }`}>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                      Đánh giá mức độ rủi ro: {auditResult.riskLevel === 'high' ? 'NGUY HIỂM CAO' : auditResult.riskLevel === 'medium' ? 'CẦN LƯU Ý' : 'AN TOÀN'}
                    </span>
                    <h2 className="text-xl font-bold mt-2">Báo Cáo Thẩm Định Pháp Lý Hợp Đồng</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold tracking-tight">
                      {auditResult.score}<span className="text-lg opacity-75">/100</span>
                    </div>
                    <span className="text-[11px] opacity-80">Điểm an toàn</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-white/10 pt-3">
                  {auditResult.summary}
                </p>
              </div>

              {/* Detected Issues List */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Chi Tiết Các Điều Khoản Bất Lợi & Vi Phạm ({auditResult.issues?.length || 0})</span>
                  </h3>
                  <button
                    onClick={() => window.print()}
                    className="text-xs text-slate-600 hover:text-blue-600 font-semibold flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In báo cáo</span>
                  </button>
                </div>

                <div className="space-y-3.5">
                  {auditResult.issues?.map((iss, i) => (
                    <div 
                      key={i}
                      className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                        iss.severity === 'high'
                          ? 'bg-rose-50/50 border-rose-200 text-rose-950'
                          : iss.severity === 'medium'
                          ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                          : 'bg-blue-50/50 border-blue-200 text-blue-950'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5 font-bold">
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold text-white ${
                          iss.severity === 'high' ? 'bg-rose-600' : iss.severity === 'medium' ? 'bg-amber-600' : 'bg-blue-600'
                        }`}>
                          {iss.severity === 'high' ? 'Rủi ro nghiêm trọng' : iss.severity === 'medium' ? 'Rủi ro trung bình' : 'Lưu ý nhỏ'}
                        </span>
                        <span className="font-semibold text-slate-900 line-clamp-1">{iss.clause}</span>
                      </div>
                      <div className="text-xs text-slate-600 mb-2 font-mono">
                        🏛️ Căn cứ: <strong>{iss.legalBasis}</strong>
                      </div>
                      <p className="text-xs text-slate-700 mb-2">
                        ⚠️ <strong>Rủi ro:</strong> {iss.risk}
                      </p>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 text-emerald-800 text-xs font-sans">
                        💡 <strong>Đề xuất sửa đổi:</strong> {iss.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist & Safety Guide */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Giấy tờ bắt buộc đối chiếu trước khi đặt bút ký:</span>
                </h4>
                <ul className="space-y-1.5">
                  {auditResult.mustCheckDocuments?.map((doc, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
