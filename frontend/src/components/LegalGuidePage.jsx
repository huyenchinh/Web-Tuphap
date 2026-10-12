import React, { useState } from 'react';
import { 
  BookOpen, Scale, FileText, CheckCircle2, AlertTriangle, 
  HelpCircle, ChevronDown, ChevronUp, ExternalLink, ShieldAlert, Award
} from 'lucide-react';

export default function LegalGuidePage({ onStartProcedure }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Thẩm quyền chứng thực hợp đồng đất đai thuộc về cơ quan nào?",
      a: "Theo Khoản 2 Điều 5 Nghị định số 23/2015/NĐ-CP và Luật Đất đai 2024, hợp đồng giao dịch liên quan đến quyền sử dụng đất của cá nhân/hộ gia đình bắt buộc phải do UBND cấp xã NƠI CÓ ĐẤT thực hiện chứng thực (hoặc tổ chức hành nghề công chứng trên địa bàn tỉnh/thành phố nơi có đất)."
    },
    {
      q: "Người lập di chúc cần đáp ứng những điều kiện gì để di chúc hợp pháp?",
      a: "Căn cứ Điều 630 Bộ luật Dân sự 2015: Người lập di chúc phải hoàn toàn minh mẫn, sáng suốt trong khi lập di chúc; không bị lừa dối, đe dọa hoặc cưỡng ép. Trường hợp người từ đủ 15 tuổi đến chưa đủ 18 tuổi lập di chúc thì phải được cha, mẹ hoặc người giám hộ đồng ý."
    },
    {
      q: "Văn bản từ chối nhận di sản có thời hạn bao lâu và có được đổi ý không?",
      a: "Theo Điều 620 Bộ luật Dân sự 2015, người thừa kế có quyền từ chối nhận di sản, việc từ chối phải được thể hiện trước thời điểm phân chia di sản và tuyệt đối không nhằm trốn tránh việc thực hiện nghĩa vụ tài sản của mình đối với người khác. Khi đã từ chối hợp pháp và được chứng thực, người từ chối không thể tự ý thay đổi ý chí."
    },
    {
      q: "Sửa đổi, bổ sung hoặc hủy bỏ hợp đồng đã chứng thực thực hiện ở đâu?",
      a: "Theo Điều 38 Nghị định số 23/2015/NĐ-CP, việc sửa đổi, bổ sung, hủy bỏ hợp đồng đã được chứng thực CHỈ ĐƯỢC THỰC HIỆN TẠI CHÍNH CƠ QUAN ĐÃ THỰC HIỆN CHỨNG THỰC TRƯỚC ĐÂY, với sự có mặt và đồng thuận của tất cả các bên tham gia giao dịch ban đầu."
    },
    {
      q: "Hợp đồng vay tài sản có được tính lãi suất trên 20%/năm không?",
      a: "Không được phép. Điều 468 Bộ luật Dân sự 2015 quy định lãi suất vay do các bên thỏa thuận nhưng không được vượt quá 20%/năm của khoản tiền vay. Trường hợp lãi suất thỏa thuận vượt quá 20%/năm thì phần vượt quá không có hiệu lực và có thể bị xử lý pháp luật."
    }
  ];

  const laws = [
    {
      title: "Nghị định số 280/2025/NĐ-CP (Mới nhất 27/10/2025)",
      desc: "Sửa đổi, bổ sung Nghị định 23/2015/NĐ-CP, ban hành Phụ lục Mẫu lời chứng mới nhất (Mẫu 01 đến 18) và chuẩn hóa sổ theo dõi (-SCT/GD, -SCT/CK,ĐC).",
      tag: "Lời chứng mới nhất"
    },
    {
      title: "Nghị định số 23/2015/NĐ-CP của Chính phủ",
      desc: "Quy định căn bản về cấp bản sao từ sổ gốc, chứng thực bản sao từ bản chính, chứng thực chữ ký và chứng thực giao dịch.",
      tag: "Văn bản nền tảng"
    },
    {
      title: "Bộ luật Dân sự 2015",
      desc: "Quy định nguyên tắc giao kết hợp đồng, quyền sở hữu tài sản động sản, bất động sản, di chúc và quyền thừa kế.",
      tag: "Luật cơ bản"
    },
    {
      title: "Luật Đất đai 2024 & Luật Nhà ở 2023",
      desc: "Quy định điều kiện có hiệu lực của hợp đồng chuyển nhượng, tặng cho, thế chấp nhà đất từ ngày 01/08/2024.",
      tag: "Luật chuyên ngành"
    },
    {
      title: "Nghị định số 30/2020/NĐ-CP của Chính phủ",
      desc: "Quy định thể thức và kỹ thuật trình bày văn bản hành chính (cỡ chữ, lề trang, quốc hiệu tiêu ngữ).",
      tag: "Thể thức văn thư"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-page-enter">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 mb-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            Cẩm Nang & Thư Viện Pháp Lý Tư Pháp
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Quy Định Pháp Luật & Hướng Dẫn Chứng Thực
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hệ thống hóa toàn bộ văn bản quy phạm pháp luật, thẩm quyền giải quyết, hồ sơ cần chuẩn bị và giải đáp chi tiết các vướng mắc thường gặp khi chứng thực hợp đồng, giao dịch.
          </p>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Core Laws List (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <span>Hệ Thống Văn Bản Quy Phạm Pháp Luật</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">Đang có hiệu lực thi hành</span>
          </div>

          <div className="space-y-3.5">
            {laws.map((law, idx) => (
              <div 
                key={idx} 
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {law.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">VB #{idx + 1}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">{law.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{law.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Required Documents Checklist (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-4 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Hồ Sơ Cần Chuẩn Bị Khi Đến UBND</span>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">1. Giấy tờ tùy thân:</strong>
                  Căn cước công dân (CCCD gắn chip) hoặc Hộ chiếu còn hạn của tất cả các bên tham gia ký kết.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">2. Giấy tờ chứng minh quyền sở hữu:</strong>
                  Bản gốc Giấy chứng nhận QSDĐ (Sổ đỏ/hồng), Giấy đăng ký xe máy/ô tô, Hóa đơn mua hàng hợp pháp.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">3. Giấy tờ chứng minh tình trạng hôn nhân:</strong>
                  Đăng ký kết hôn (nếu tài sản chung vợ chồng) hoặc Giấy xác nhận tình trạng độc thân (nếu tài sản riêng).
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">4. Bản thảo hợp đồng tạo từ hệ thống:</strong>
                  In sẵn 03 bản chính được tạo tự động từ website này để cán bộ đối soát và ký chứng thực ngay.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onStartProcedure}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all text-center block"
              >
                Bắt đầu tạo văn bản hợp đồng ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-10">
        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
          <HelpCircle className="w-6 h-6 text-amber-500" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Câu Hỏi Thường Gặp Về Chứng Thực Tư Pháp</h2>
            <p className="text-xs text-slate-500">Giải đáp các thắc mắc phổ biến của người dân khi làm thủ tục</p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/70 hover:bg-slate-100 transition-colors"
                >
                  <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs shrink-0">
                      ?
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
