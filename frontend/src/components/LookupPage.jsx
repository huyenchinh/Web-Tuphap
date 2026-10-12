import React, { useState } from 'react';
import { 
  Search, ShieldCheck, QrCode, FileText, CheckCircle2, Clock, 
  AlertCircle, ArrowRight, Download, Printer, User, Calendar, MapPin
} from 'lucide-react';

export default function LookupPage({ onSelectProcedure }) {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searched, setSearched] = useState(false);

  // Demo lookup database
  const sampleRecords = [
    {
      code: 'TP-2026-8892',
      procedureTitle: 'Hợp đồng chuyển nhượng quyền sử dụng đất',
      parties: 'Nguyễn Văn An & Trần Thị Bình',
      date: '10/02/2026',
      authority: 'UBND xã Tiền Phong, huyện Mê Linh, TP Hà Nội',
      status: 'ĐÃ CHỨNG THỰC',
      statusColor: 'emerald',
      notaryNumber: '158/2026/SCT/HĐGD',
      bookNumber: '01-TP/CC-SCT',
      property: 'Thửa đất số 105, Tờ bản đồ số 12, diện tích 120.5 m2 tại xã Tiền Phong',
      signatories: ['Bên chuyển nhượng: Nguyễn Văn An', 'Bên nhận chuyển nhượng: Trần Thị Bình', 'Người thực hiện chứng thực: Phó Chủ tịch UBND xã']
    },
    {
      code: 'TP-2026-3419',
      procedureTitle: 'Hủy bỏ giao dịch đã được chứng thực',
      parties: 'Lê Hoàng Long & Phạm Thu Trang',
      date: '28/01/2026',
      authority: 'UBND phường Dịch Vọng Hậu, quận Cầu Giấy, TP Hà Nội',
      status: 'ĐÃ CHỨNG THỰC',
      statusColor: 'emerald',
      notaryNumber: '42/2026/SCT/HĐGD',
      bookNumber: '01-TP/CC-SCT',
      property: 'Hợp đồng mua bán xe ô tô Mazda 3 số 89/2025 trước đây',
      signatories: ['Bên A: Lê Hoàng Long', 'Bên B: Phạm Thu Trang', 'Người tiếp nhận: Cán bộ Tư pháp - Hộ tịch']
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    const q = query.trim().toLowerCase();
    const found = sampleRecords.find(r => 
      r.code.toLowerCase().includes(q) || 
      r.notaryNumber.toLowerCase().includes(q) ||
      r.parties.toLowerCase().includes(q)
    );
    setSearchResult(found || null);
  };

  const loadExample = (exCode) => {
    setQuery(exCode);
    setSearched(true);
    const found = sampleRecords.find(r => r.code === exCode);
    setSearchResult(found || null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-page-enter">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-slate-800 relative overflow-hidden mb-10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Cổng Xác Thực Tính Hợp Pháp • Chống Giả Mạo Hồ Sơ
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Tra Cứu & Kiểm Tra Hồ Sơ Chứng Thực
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Nhập mã tra cứu, số chứng thực trên văn bản hoặc số định danh để kiểm tra tính xác thực, trạng thái lưu sổ và thẩm quyền của hợp đồng/giao dịch.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nhập mã hồ sơ (vd: TP-2026-8892), số chứng thực hoặc họ tên..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/90 text-white placeholder-slate-400 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Tra cứu ngay</span>
            </button>
          </form>

          {/* Quick Examples */}
          <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
            <span>Mã mẫu thử nghiệm:</span>
            <button
              type="button"
              onClick={() => loadExample('TP-2026-8892')}
              className="text-amber-400 hover:underline font-mono bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700"
            >
              TP-2026-8892
            </button>
            <button
              type="button"
              onClick={() => loadExample('TP-2026-3419')}
              className="text-amber-400 hover:underline font-mono bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700"
            >
              TP-2026-3419
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {searched && searchResult && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12 animate-page-enter">
          {/* Status Header */}
          <div className="bg-emerald-50 border-b border-emerald-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Văn bản hợp pháp & Đã vào sổ chứng thực
                  </span>
                  <span className="text-xs font-mono bg-white text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                    {searchResult.code}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {searchResult.procedureTitle}
                </h2>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold tracking-wide shadow-sm">
                ● {searchResult.status}
              </span>
              <div className="text-xs text-slate-500 mt-1">Cơ quan: {searchResult.authority}</div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left 2 Cols: Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Thông tin chứng thực chính thức
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-xs text-slate-500 block mb-1">Số chứng thực chính thức:</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">{searchResult.notaryNumber}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-xs text-slate-500 block mb-1">Quyển số lưu sổ:</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">{searchResult.bookNumber}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-xs text-slate-500 block mb-1">Ngày lập & Ký duyệt:</span>
                    <span className="text-sm font-bold text-slate-900">{searchResult.date}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-xs text-slate-500 block mb-1">Chủ thể tham gia:</span>
                    <span className="text-sm font-bold text-slate-900">{searchResult.parties}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Tài sản & Phạm vi giao dịch
                </h3>
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 text-sm text-slate-800 leading-relaxed font-medium">
                  {searchResult.property}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Các bên đã ký kết và đóng dấu
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {searchResult.signatories.map((sig, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 1 Col: QR Code & Verification Badge */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-between text-center">
              <div>
                <div className="w-36 h-36 bg-white p-3 rounded-2xl border border-slate-300 shadow-sm mx-auto mb-4 flex items-center justify-center">
                  {/* Simulated QR Code SVG */}
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="5" y="5" width="25" height="25" rx="3" />
                    <rect x="10" y="10" width="15" height="15" fill="white" />
                    <rect x="13" y="13" width="9" height="9" />
                    
                    <rect x="70" y="5" width="25" height="25" rx="3" />
                    <rect x="75" y="10" width="15" height="15" fill="white" />
                    <rect x="78" y="13" width="9" height="9" />

                    <rect x="5" y="70" width="25" height="25" rx="3" />
                    <rect x="10" y="75" width="15" height="15" fill="white" />
                    <rect x="13" y="78" width="9" height="9" />

                    <rect x="35" y="10" width="8" height="8" />
                    <rect x="48" y="10" width="8" height="8" />
                    <rect x="35" y="25" width="15" height="6" />
                    <rect x="40" y="40" width="20" height="20" rx="2" />
                    <rect x="70" y="40" width="10" height="10" />
                    <rect x="70" y="60" width="20" height="8" />
                    <rect x="35" y="70" width="10" height="15" />
                    <rect x="55" y="75" width="25" height="10" />
                  </svg>
                </div>
                <div className="text-xs font-bold text-slate-900">Mã QR Định Danh Văn Bản</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Quét để xác thực nguồn gốc văn bản trên điện thoại</p>
              </div>

              <div className="w-full mt-6 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In phiếu xác nhận</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Not Found State */}
      {searched && !searchResult && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm mb-12 animate-page-enter">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Không tìm thấy bản ghi tương ứng</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Mã hồ sơ <span className="font-mono font-bold text-slate-800">"{query}"</span> không tồn tại trên hệ thống hoặc chưa được cán bộ tư pháp duyệt vào sổ chứng thực.
          </p>
          <div className="text-xs text-slate-400">
            Vui lòng kiểm tra lại chính xác chữ hoa, chữ thường và dấu gạch nối (Ví dụ: <code className="font-mono text-blue-600">TP-2026-8892</code>).
          </div>
        </div>
      )}

      {/* Informative Guidance Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
            1
          </div>
          <h4 className="font-bold text-sm text-slate-900 mb-1">Bảo Mật & Toàn Vẹn</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mỗi văn bản được cấp một mã băm mã hóa duy nhất kết hợp số chứng thực theo niên độ năm để ngăn ngừa hoàn toàn việc làm giả văn bản.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
            2
          </div>
          <h4 className="font-bold text-sm text-slate-900 mb-1">Liên Thông Dữ Liệu</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Sẵn sàng kết nối với cơ sở dữ liệu công chứng, đăng ký đất đai và cơ quan thuế để đối chiếu quyền sở hữu trước khi giao dịch.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
            3
          </div>
          <h4 className="font-bold text-sm text-slate-900 mb-1">Hỗ Trợ Công Dân 24/7</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Công dân có thể tự kiểm tra hồ sơ trực tuyến bất kỳ lúc nào mà không cần phải đến trực tiếp Bộ phận Một cửa.
          </p>
        </div>
      </div>
    </div>
  );
}
