import React, { useState, useRef, useEffect } from 'react';
import { 
  Scale, Settings, ShieldCheck, History, Sparkles, LayoutGrid, 
  FileText, Search, BookOpen, Menu, X, ChevronRight, Receipt,
  Calculator, ShieldAlert, Bot, ChevronDown
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenSettings, onOpenHistory, settings, hasActiveProcedure }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [utilitiesOpen, setUtilitiesOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUtilitiesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Primary visible tabs on desktop
  const primaryNavItems = [
    { id: 'catalog', label: 'Dịch vụ công', icon: LayoutGrid },
    { id: 'wizard', label: 'Tạo đơn', icon: FileText, hidden: !hasActiveProcedure },
    { id: 'copilot', label: 'Trợ lý AI Copilot', icon: Bot, isAiSpecial: true },
    { id: 'audit', label: 'Soát xét Hợp đồng', icon: ShieldAlert },
    { id: 'tax', label: 'Khai thuế Online', icon: Receipt }
  ].filter(item => !item.hidden);

  // Secondary utilities in the dropdown menu
  const utilityItems = [
    { id: 'fee', label: 'Tính Án phí Tòa án', desc: 'Chuẩn Nghị quyết 326/2016/UBTVQH14', icon: Calculator },
    { id: 'lookup', label: 'Tra cứu & QR Chống Giả', desc: 'Kiểm tra tính xác thực hồ sơ lưu sổ', icon: Search },
    { id: 'guide', label: 'Cẩm nang Pháp lý', desc: 'Luật Đất đai 2024, BLDS & Hỏi đáp FAQ', icon: BookOpen },
    { id: 'admin', label: 'Quản trị Hệ thống', desc: 'Biểu mẫu, phân quyền & bảo mật', icon: ShieldCheck }
  ];

  // Check if current tab is one of the utility items
  const activeUtility = utilityItems.find(u => u.id === activeTab);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setUtilitiesOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand (Clean, Never Wrapped) */}
          <div 
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0 select-none" 
            onClick={() => handleNavClick('catalog')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-bold group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
              <Scale className="w-6 h-6 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <div className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-2 whitespace-nowrap">
                <span>TƯ PHÁP ĐIỆN TỬ</span>
                <span className="hidden sm:inline-flex bg-amber-400/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full border border-amber-400/30 font-bold">
                  NĐ 23/2015
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium whitespace-nowrap hidden sm:block">
                Cổng Dịch Vụ Công & Trợ Lý AI Pháp Lý
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center max-w-2xl">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                    isActive
                      ? item.isAiSpecial
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400'
                        : 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : item.isAiSpecial
                      ? 'text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.isAiSpecial ? 'text-amber-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.isAiSpecial && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                  )}
                </button>
              );
            })}

            {/* Sleek Utilities Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUtilitiesOpen(!utilitiesOpen)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                  Boolean(activeUtility)
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span>{activeUtility ? activeUtility.label : 'Tiện ích & Khác'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${utilitiesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Popup */}
              {utilitiesOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-page-enter">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                    Công cụ & Thông tin bổ trợ
                  </div>
                  {utilityItems.map((u) => {
                    const Icon = u.icon;
                    const isSelected = activeTab === u.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => handleNavClick(u.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                          isSelected 
                            ? 'bg-blue-600 text-white' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-blue-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight">{u.label}</div>
                          <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                            {u.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & AI Badge */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* History Button */}
            <button
              onClick={onOpenHistory}
              title="Lịch sử tạo hồ sơ"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors active:scale-95"
            >
              <History className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* AI Settings Button & Active Provider Pill */}
            <button
              onClick={onOpenSettings}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-slate-800 to-slate-800/80 hover:from-slate-700 hover:to-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold shadow-inner transition-all active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">AI:</span>
              <span className="uppercase text-amber-300 font-bold">
                {settings?.aiProvider || 'Gemini'}
              </span>
              <Settings className="w-3.5 h-3.5 ml-1 text-slate-400" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-1.5 animate-page-enter">
          {[...primaryNavItems, ...utilityItems].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
