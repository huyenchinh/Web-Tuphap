import React, { useState, useRef } from 'react';
import { 
  Car, MapPin, Home, FileText, RefreshCw, Search, ArrowRight, 
  Sparkles, CheckCircle, ChevronRight, ChevronLeft, Layers, Play, Pause,
  ShieldCheck, FileCheck, Zap, Scale, Flame
} from 'lucide-react';

const iconMap = {
  Car: Car,
  MapPin: MapPin,
  Home: Home,
  FileText: FileText,
  RefreshCw: RefreshCw
};

export default function CategoryList({ categories, onSelectProcedure }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const manualScrollRef = useRef(null);

  // Filter procedures based on search query
  const filteredCategories = categories.map(cat => {
    const matchingProcedures = (cat.procedures || []).filter(proc => {
      const q = searchTerm.toLowerCase();
      return (
        proc.title.toLowerCase().includes(q) ||
        (proc.code && proc.code.toLowerCase().includes(q)) ||
        (proc.description && proc.description.toLowerCase().includes(q))
      );
    });
    return { ...cat, procedures: matchingProcedures };
  }).filter(cat => cat.procedures.length > 0);

  const totalProcedures = categories.reduce((acc, c) => acc + (c.procedures?.length || 0), 0);

  const handleManualScroll = (direction) => {
    if (manualScrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      manualScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Quick popular shortcuts
  const popularKeywords = [
    { label: "Chuyển nhượng đất", search: "chuyển nhượng" },
    { label: "Mua bán xe", search: "mua bán động sản" },
    { label: "Chứng thực di chúc", search: "di chúc" },
    { label: "Hủy bỏ giao dịch", search: "hủy bỏ" },
    { label: "Vay tài sản", search: "vay" }
  ];

  // Render a list of pills for marquee
  const renderPills = (isDuplicate = false) => (
    <div className="flex items-center gap-2.5 px-1">
      {/* "All" button */}
      <button
        onClick={() => setSelectedCatId(null)}
        className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 transform active:scale-95 ${
          selectedCatId === null 
            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50 scale-105 shimmer-active' 
            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-sm hover:border-blue-400 hover:shadow-md'
        }`}
      >
        <span className="relative z-10 flex items-center gap-1.5">
          <span>Tất cả thủ tục</span>
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors ${
            selectedCatId === null 
              ? 'bg-white/20 text-white' 
              : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
          }`}>
            {totalProcedures}
          </span>
        </span>
      </button>

      {/* Category Pills */}
      {categories.map(cat => {
        const Icon = iconMap[cat.icon] || FileText;
        const isSelected = selectedCatId === cat.id;

        return (
          <button
            key={`${isDuplicate ? 'dup-' : ''}${cat.id}`}
            onClick={() => setSelectedCatId(isSelected ? null : cat.id)}
            className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 transform active:scale-95 ${
              isSelected 
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50 scale-105 shimmer-active' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-sm hover:border-blue-400 hover:shadow-md'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
            }`}>
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>

            <span className="relative z-10">
              {cat.name.replace(/^\d+\.\s*/, '')}
            </span>

            <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors ${
              isSelected 
                ? 'bg-white/20 text-white' 
                : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
            }`}>
              {cat.procedures?.length || 0}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-page-enter">
      {/* Hero Banner with Stats & Visual Depth */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl border border-slate-800 relative overflow-hidden">
        {/* Background Glowing Ambient Accents */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-600/15 to-transparent blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Tư Pháp Số Hóa • Chuẩn Thể Thức NĐ 30/2020 & NĐ 23/2015</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Cổng Soạn Thảo & Tạo Đơn <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Chứng Thực Hợp Đồng Tư Pháp
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
            Tự động kê khai thông tin chính xác vào các biểu mẫu quy chuẩn, tích hợp 
            <strong className="text-amber-400 font-semibold"> Trợ lý AI Pháp lý </strong> 
            giúp người dân chuốt lại câu chữ lý do, nguyện vọng, cam kết thành văn phong hành chính sắc sảo, chống vô hiệu hợp đồng.
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mb-6">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm nhanh: mua bán xe máy, chuyển nhượng đất, di chúc, hủy hợp đồng..."
              className="w-full pl-12 pr-28 py-4 bg-slate-800/90 text-white placeholder-slate-400 rounded-2xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-xl"
            />
            {searchTerm ? (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors font-medium"
              >
                Xóa tìm
              </button>
            ) : (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 bg-slate-700/60 px-2 py-1 rounded font-mono">
                ⌘K
              </div>
            )}
          </div>

          {/* Quick Filter Tag Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-400 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Thủ tục phổ biến:</span>
            </span>
            {popularKeywords.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSearchTerm(item.search)}
                className="px-2.5 py-1 bg-slate-800/80 hover:bg-blue-600/80 hover:text-white text-slate-300 rounded-lg border border-slate-700/80 transition-all font-medium active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick Metrics Bar (UI/UX Pro Max Social Proof Pattern) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">15+</div>
                <div className="text-xs text-slate-400">Biểu mẫu chuẩn hóa</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">Nghị định 23/2015</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">Gemini / Claude</div>
                <div className="text-xs text-slate-400">AI viết lại câu chữ</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">1 Click</div>
                <div className="text-xs text-slate-400">Xuất file Word & In</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATED CATEGORY FILTER BAR (Khu vực Marquee Animation) */}
      <div className="relative mb-10 bg-white/80 p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm backdrop-blur-sm">
        {/* Controls */}
        <div className="flex items-center justify-between mb-3 px-1 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-bold text-slate-800">Dải phân loại thủ tục động:</span>
            <span className="hidden sm:inline text-slate-400">(Rê chuột vào để tạm dừng cuộn)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoScroll(!isAutoScroll)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
            >
              {isAutoScroll ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-600" />
                  <span>Dừng cuộn</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tự động chạy</span>
                </>
              )}
            </button>

            {/* Manual scroll buttons */}
            <button
              onClick={() => handleManualScroll('left')}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              title="Cuộn sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              title="Cuộn sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Marquee Track with Edge Gradient Masks */}
        <div className="relative overflow-hidden rounded-xl py-1">
          {/* Left Gradient Fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-white to-transparent z-20"></div>

          {/* Right Gradient Fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-white to-transparent z-20"></div>

          {isAutoScroll ? (
            <div className="animate-pill-marquee py-1">
              {renderPills(false)}
              {renderPills(true)}
            </div>
          ) : (
            <div 
              ref={manualScrollRef}
              className="flex items-center overflow-x-auto no-scrollbar py-1"
            >
              {renderPills(false)}
            </div>
          )}
        </div>
      </div>

      {/* Category Groups List */}
      <div className="space-y-10">
        {filteredCategories
          .filter(cat => selectedCatId ? cat.id === selectedCatId : true)
          .map(cat => {
            const Icon = iconMap[cat.icon] || FileText;
            return (
              <section key={cat.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 transition-shadow hover:shadow-md">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-3">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{cat.name}</h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3.5 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
                    {cat.procedures.length} biểu mẫu chuẩn
                  </span>
                </div>

                {/* Procedure Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.procedures.map(proc => (
                    <div
                      key={proc.id}
                      onClick={() => onSelectProcedure(proc.id)}
                      className="group cursor-pointer bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-mono font-bold bg-blue-100/80 text-blue-800 px-2.5 py-0.5 rounded-md border border-blue-200">
                            {proc.code || 'TP-FORM'}
                          </span>
                          {proc.aiFieldKey && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                              <Sparkles className="w-3 h-3 text-amber-500" />
                              AI hỗ trợ
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                          {proc.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {proc.description || 'Thực hiện tạo lập hợp đồng, điền thông tin và ký chứng thực theo quy định.'}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                        <span>Bắt đầu tạo đơn</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <Layers className="w-14 h-14 text-slate-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">Không tìm thấy thủ tục phù hợp</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Thử tìm kiếm với từ khóa khác như "đất", "xe", "nhà", "di chúc", "hủy bỏ"...
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Xóa bộ lọc tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
}
