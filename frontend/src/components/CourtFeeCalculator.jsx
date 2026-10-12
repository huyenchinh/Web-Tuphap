import React, { useState } from 'react';
import { 
  Calculator, Scale, Compass, CheckCircle2, AlertCircle, ArrowRight, 
  BookOpen, HelpCircle, ShieldCheck, DollarSign, Landmark, ChevronRight,
  RotateCcw, Info
} from 'lucide-react';

export default function CourtFeeCalculator({ onSelectProcedure, onNavigateToCopilot }) {
  const [activeSubTab, setActiveSubTab] = useState('fee'); // 'fee' | 'diagnosis'

  // Court Fee Calculator State
  const [caseType, setCaseType] = useState('dan_su'); // 'dan_su' | 'hon_nhan' | 'kinh_doanh' | 'lao_dong'
  const [hasPrice, setHasPrice] = useState(true);
  const [disputeAmount, setDisputeAmount] = useState('500000000'); // 500 million
  const [isExempt, setIsExempt] = useState(false);

  // Decision Tree State
  const [step, setStep] = useState(1);
  const [diagDomain, setDiagDomain] = useState('dat_dai');
  const [diagDispute, setDiagDispute] = useState('co_tranh_chap');
  const [diagPaper, setDiagPaper] = useState('co_so_do');

  // Calculation logic based on Resolution 326/2016/UBTVQH14
  const calculateFees = () => {
    if (isExempt) {
      return {
        anPhiSoTham: 0,
        tamUngAnPhi: 0,
        anPhiPhucTham: 0,
        details: "Thuộc diện miễn nộp án phí theo Điều 12 Nghị quyết 326/2016/UBTVQH14 (Người có công, người nghèo, người khuyết tật, người cao tuổi hoặc người lao động đòi tiền lương/BHXH)."
      };
    }

    if (!hasPrice) {
      const fixedFee = caseType === 'kinh_doanh' ? 3000000 : 300000;
      return {
        anPhiSoTham: fixedFee,
        tamUngAnPhi: fixedFee * 0.5,
        anPhiPhucTham: caseType === 'kinh_doanh' ? 2000000 : 300000,
        details: `Vụ án không có giá ngạch. Án phí sơ thẩm cố định theo quy định: ${fixedFee.toLocaleString('vi-VN')} VNĐ.`
      };
    }

    const val = Number(disputeAmount) || 0;
    let fee = 0;
    let formula = '';

    if (caseType === 'lao_dong') {
      // Lao động có giá ngạch
      if (val <= 4000000) {
        fee = 300000;
      } else if (val <= 400000000) {
        fee = val * 0.03;
      } else {
        fee = 12000000 + (val - 400000000) * 0.02;
      }
      formula = 'Biểu phí vụ án lao động theo Danh mục ban hành kèm Nghị quyết 326/2016';
    } else if (caseType === 'kinh_doanh') {
      // Kinh doanh thương mại có giá ngạch
      if (val <= 60000000) {
        fee = 3000000;
      } else if (val <= 400000000) {
        fee = val * 0.05;
      } else if (val <= 2000000000) {
        fee = 20000000 + (val - 400000000) * 0.04;
      } else if (val <= 4000000000) {
        fee = 84000000 + (val - 2000000000) * 0.02;
      } else {
        fee = 124000000 + (val - 4000000000) * 0.001;
      }
      formula = 'Biểu phí vụ án kinh doanh thương mại';
    } else {
      // Dân sự, Hôn nhân gia đình có giá ngạch
      if (val <= 6000000) {
        fee = 300000;
        formula = 'Từ 6 triệu trở xuống: 300.000 VNĐ';
      } else if (val <= 400000000) {
        fee = val * 0.05;
        formula = `5% của ${val.toLocaleString('vi-VN')} VNĐ`;
      } else if (val <= 2000000000) {
        fee = 20000000 + (val - 400000000) * 0.04;
        formula = `20.000.000 VNĐ + 4% của phần vượt 400 triệu`;
      } else if (val <= 4000000000) {
        fee = 84000000 + (val - 2000000000) * 0.02;
        formula = `84.000.000 VNĐ + 2% của phần vượt 2 tỷ`;
      } else {
        fee = 124000000 + (val - 4000000000) * 0.001;
        formula = `124.000.000 VNĐ + 0.1% của phần vượt 4 tỷ`;
      }
    }

    return {
      anPhiSoTham: Math.round(fee),
      tamUngAnPhi: Math.round(fee * 0.5),
      anPhiPhucTham: caseType === 'kinh_doanh' ? 2000000 : 300000,
      details: formula
    };
  };

  const feeResult = calculateFees();

  // Decision Tree Logic
  const getDiagnosisResult = () => {
    if (diagDomain === 'dat_dai') {
      if (diagDispute === 'tu_thoa_thuan') {
        return {
          authority: "Ủy ban nhân dân cấp xã nơi có đất HOẶC Văn phòng công chứng",
          timeLimit: "Trong ngày làm việc (khoảng 1 - 3 ngày)",
          documents: [
            "Bản chính Giấy chứng nhận quyền sử dụng đất (Sổ đỏ)",
            "CCCD gắn chip của tất cả các bên liên quan",
            "Giấy chứng nhận kết hôn hoặc Giấy xác nhận độc thân",
            "Dự thảo Hợp đồng chuyển nhượng / tặng cho"
          ],
          actionProcedure: 'chuyen-nhuong-quyen-su-dung-dat',
          actionText: "Tạo Hợp đồng chuyển nhượng đất đai ngay"
        };
      } else {
        if (diagPaper === 'co_so_do') {
          return {
            authority: "BẮT BUỘC hòa giải tại UBND cấp xã trước, nếu không thành thì khởi kiện tại TÒA ÁN NHÂN DÂN cấp huyện nơi có đất",
            timeLimit: "Hòa giải tại xã: tối đa 30 ngày. Giải quyết tại Tòa: 4 - 6 tháng.",
            documents: [
              "Đơn đề nghị hòa giải tranh chấp đất đai gửi UBND cấp xã (Điều 235 Luật Đất đai 2024)",
              "Bản sao Sổ đỏ, trích lục bản đồ địa chính",
              "Biên bản hòa giải không thành tại UBND cấp xã (bắt buộc để Tòa thụ lý)",
              "CCCD của người khởi kiện"
            ],
            actionProcedure: 'don-hoa-giai-tranh-chap-dat',
            actionText: "Tạo Đơn đề nghị hòa giải đất đai tại UBND cấp xã"
          };
        } else {
          return {
            authority: "Hòa giải tại UBND cấp xã, sau đó đương sự được chọn: Khởi kiện tại TAND HOẶC nộp đơn yêu cầu UBND cấp huyện/tỉnh giải quyết (Điều 236 Luật Đất đai 2024)",
            timeLimit: "Theo quy định giải quyết tranh chấp đất đai chưa có giấy tờ",
            documents: [
              "Đơn đề nghị giải quyết tranh chấp đất đai",
              "Các giấy tờ về quyền sử dụng đất cũ theo Điều 137 Luật Đất đai 2024",
              "Biên bản xác minh nguồn gốc đất của UBND cấp xã"
            ],
            actionProcedure: 'don-hoa-giai-tranh-chap-dat',
            actionText: "Tạo Đơn đề nghị hòa giải đất đai"
          };
        }
      }
    } else if (diagDomain === 'hon_nhan') {
      if (diagDispute === 'tu_thoa_thuan') {
        return {
          authority: "Tòa án nhân dân cấp huyện nơi vợ hoặc chồng cư trú, làm việc",
          timeLimit: "Khoảng 1 - 2 tháng kể từ ngày Tòa thụ lý đơn yêu cầu",
          documents: [
            "Đơn yêu cầu công nhận thuận tình ly hôn, nuôi con và tài sản",
            "Bản chính Giấy chứng nhận kết hôn",
            "Bản sao CCCD của vợ và chồng",
            "Bản sao Giấy khai sinh của các con chung",
            "Giấy tờ tài sản chung (nếu có yêu cầu Tòa công nhận)"
          ],
          actionProcedure: 'thuan-tinh-ly-hon',
          actionText: "Tạo Đơn thuận tình ly hôn chuẩn Tòa án"
        };
      } else {
        return {
          authority: "Tòa án nhân dân cấp huyện nơi BỊ ĐƠN (người không đồng ý ly hôn) cư trú",
          timeLimit: "Từ 4 đến 6 tháng theo thủ tục giải quyết vụ án khởi kiện đơn phương ly hôn",
          documents: [
            "Đơn khởi kiện ly hôn đơn phương",
            "Bản chính Giấy chứng nhận kết hôn",
            "Bản sao CCCD, giấy khai sinh các con",
            "Chứng cứ chứng minh bạo lực gia đình hoặc vi phạm hôn nhân nghiêm trọng"
          ],
          actionProcedure: 'thuan-tinh-ly-hon',
          actionText: "Tạo biểu mẫu ly hôn"
        };
      }
    } else if (diagDomain === 'tien_bac') {
      return {
        authority: "Tòa án nhân dân cấp huyện nơi BÊN VAY NỢ cư trú hoặc làm việc",
        timeLimit: "Khoảng 2 - 4 tháng theo thủ tục tố tụng dân sự",
        documents: [
          "Đơn khởi kiện đòi nợ dân sự theo Mẫu số 23-DS",
          "Giấy xác nhận nợ, Hợp đồng vay hoặc Giấy ủy nhiệm chi / tin nhắn chuyển khoản",
          "Bản sao CCCD người khởi kiện",
          "Biên lai nộp tiền tạm ứng án phí tại Chi cục Thi hành án dân sự"
        ],
        actionProcedure: 'don-khoi-kien-doi-no',
        actionText: "Tạo Đơn khởi kiện đòi nợ dân sự ngay"
      };
    } else {
      return {
        authority: "Ban Giám đốc Công ty -> Hòa giải viên lao động quận/huyện -> Tòa án nhân dân cấp huyện",
        timeLimit: "Khởi kiện lao động trong thời hiệu 01 năm kể từ ngày bị xâm phạm quyền lợi",
        documents: [
          "Đơn khiếu nại hoặc Đơn khởi kiện tranh chấp lao động",
          "Bản sao Hợp đồng lao động",
          "Quyết định chấm dứt HĐLĐ / Phiếu lương / Bảng chấm công",
          "Sao kê tài khoản nhận lương"
        ],
        actionProcedure: 'khieu-nai-sa-thai-trai-luat',
        actionText: "Tạo Đơn khiếu nại sa thải trái luật"
      };
    }
  };

  const diagResult = getDiagnosisResult();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-page-enter">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden mb-6">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tiện Ích Số • Nghị Quyết 326/2016/UBTVQH14 & Luật Đất Đai 2024</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Máy Tính Án Phí & Chẩn Đoán Thẩm Quyền Thủ Tục
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Công cụ hỗ trợ công dân tính toán chính xác tiền tạm ứng án phí phải nộp khi khởi kiện Tòa án, đồng thời hướng dẫn tự động xác định cơ quan thẩm quyền tiếp nhận hồ sơ.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('fee')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSubTab === 'fee'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Máy Tính Án Phí Tòa Án</span>
        </button>
        <button
          onClick={() => setActiveSubTab('diagnosis')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSubTab === 'diagnosis'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Cây Quyết Định Chẩn Đoán Thẩm Quyền</span>
        </button>
      </div>

      {/* SUBTAB 1: COURT FEE CALCULATOR */}
      {activeSubTab === 'fee' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-page-enter">
          {/* Input Left (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  1. Loại vụ án / Tranh chấp
                </label>
                <select
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="dan_su">Dân sự thông thường (Đòi nợ, Đất đai, Hợp đồng)</option>
                  <option value="hon_nhan">Hôn nhân & Gia đình (Ly hôn, Chia tài sản)</option>
                  <option value="kinh_doanh">Kinh doanh, Thương mại (Hợp đồng kinh tế)</option>
                  <option value="lao_dong">Lao động (Tranh chấp tiền lương, Bồi thường sa thải)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  2. Có yêu cầu giải quyết giá ngạch tài sản?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHasPrice(true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      hasPrice 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Có giá ngạch (Có số tiền)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasPrice(false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      !hasPrice 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Không có giá ngạch
                  </button>
                </div>
              </div>

              {hasPrice && (
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    3. Giá trị tranh chấp / Số tiền đòi (VNĐ)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={disputeAmount}
                      onChange={(e) => setDisputeAmount(e.target.value)}
                      placeholder="Nhập số tiền tranh chấp..."
                      className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">
                      VNĐ
                    </span>
                  </div>
                  <div className="mt-1 text-right text-[11px] text-slate-500 font-medium">
                    = {(Number(disputeAmount) || 0).toLocaleString('vi-VN')} VNĐ
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isExempt}
                    onChange={(e) => setIsExempt(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    Thuộc diện được miễn nộp án phí (Người có công, hộ nghèo, người khuyết tật, người cao tuổi)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Right (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Kết Quả Tính Án Phí Tòa Án
              </span>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur-xs">
                  <span className="text-xs text-slate-300">Tiền tạm ứng án phí phải nộp (50%):</span>
                  <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">
                    {feeResult.tamUngAnPhi.toLocaleString('vi-VN')} <span className="text-xs text-white">VNĐ</span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1">Nộp tại Chi cục Thi hành án dân sự khi Tòa thụ lý</p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
                  <span className="text-xs text-slate-300">Án phí dân sự sơ thẩm (100%):</span>
                  <div className="text-2xl font-extrabold text-white mt-1 font-mono">
                    {feeResult.anPhiSoTham.toLocaleString('vi-VN')} <span className="text-xs text-slate-400">VNĐ</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Do bên thua kiện chịu khi có bản án</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 flex items-center justify-between">
                <span>Án phí phúc thẩm (nếu có kháng cáo):</span>
                <span className="font-bold text-white font-mono">{feeResult.anPhiPhucTham.toLocaleString('vi-VN')} VNĐ</span>
              </div>
            </div>

            {/* Legal Explanation */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Căn cứ pháp lý & Công thức tính</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {feeResult.details}
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <strong>💡 Lưu ý quan trọng:</strong> Nếu hai bên thỏa thuận được với nhau về việc giải quyết vụ án tại phiên hòa giải trước khi mở phiên tòa thì mức án phí chỉ bằng <strong>50%</strong> mức án phí sơ thẩm nêu trên.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: DECISION TREE */}
      {activeSubTab === 'diagnosis' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm animate-page-enter">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Cây Quyết Định Chẩn Đoán Cơ Quan Thẩm Quyền
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Trả lời 3 câu hỏi trắc nghiệm để hệ thống chỉ dẫn chính xác bạn cần đến đâu và nộp hồ sơ gì.
              </p>
            </div>

            {/* Question 1 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Câu 1: Vụ việc của bạn thuộc lĩnh vực nào?
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                {[
                  { id: 'dat_dai', label: 'Đất đai & Nhà ở' },
                  { id: 'hon_nhan', label: 'Hôn nhân & Ly hôn' },
                  { id: 'tien_bac', label: 'Tiền bạc & Đòi nợ' },
                  { id: 'lao_dong', label: 'Lao động & Việc làm' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDiagDomain(item.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      diagDomain === item.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Câu 2: Tình trạng quan hệ giữa các bên hiện tại?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                {[
                  { id: 'tu_thoa_thuan', label: 'Tự nguyện thỏa thuận, đồng thuận (Không tranh chấp)' },
                  { id: 'co_tranh_chap', label: 'Bất đồng quan điểm / Đang tranh chấp / Cố tình chây ì' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDiagDispute(item.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-left ${
                      diagDispute === item.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 (Conditional for Land) */}
            {diagDomain === 'dat_dai' && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Câu 3: Thửa đất đã được cấp Sổ đỏ (Giấy chứng nhận QSDĐ) chưa?
                </span>
                <div className="grid grid-cols-2 gap-2.5 mt-3">
                  {[
                    { id: 'co_so_do', label: 'ĐÃ CÓ Sổ đỏ / Giấy tờ hợp lệ' },
                    { id: 'chua_co_so_do', label: 'CHƯA CÓ Sổ đỏ (Đất khai hoang, giấy tờ tay)' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setDiagPaper(item.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                        diagPaper === item.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Diagnostic Conclusion Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-blue-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Kết Luận Thẩm Quyền Xử Lý Vụ Việc Của Bạn
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-300 block mb-1">Cơ quan có thẩm quyền giải quyết:</span>
                <div className="text-lg font-bold text-white leading-snug">
                  {diagResult.authority}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Thời hạn luật định:</span>
                  <span className="font-semibold text-slate-200">{diagResult.timeLimit}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Thủ tục sẵn có trong hệ thống:</span>
                  <button
                    onClick={() => onSelectProcedure(diagResult.actionProcedure)}
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
                  >
                    <span>{diagResult.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3">
                <span className="text-xs text-slate-400 block mb-2">Hồ sơ giấy tờ bắt buộc chuẩn bị:</span>
                <ul className="space-y-1 text-xs text-slate-200">
                  {diagResult.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
