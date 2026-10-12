import React, { useState } from 'react';
import { 
  Scale, Settings, ShieldCheck, History, Sparkles, LayoutGrid, 
  FileText, Search, BookOpen, Menu, X, ChevronRight, Receipt
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenSettings, onOpenHistory, settings, hasActiveProcedure }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'catalog', label: 'Dịch vụ công', icon: LayoutGrid },
    { id: 'wizard', label: 'Tạo đơn hợp đồng', icon: FileText, hidden: !hasActiveProcedure },
    { id: 'tax', label: 'Khai thuế Online', icon: Receipt },
    { id: 'lookup', label: 'Tra cứu & QR', icon: Search },
    { id: 'guide', label: 'Cẩm nang pháp lý', icon: BookOpen },
    { id: 'admin', label: 'Quản trị Admin', icon: ShieldCheck }
  ].filter(item => !item.hidden);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => handleNavClick('catalog')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-bold group-hover:scale-105 transition-transform duration-200">
              <Scale className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base tracking-tight flex items-center gap-2">
                <span>HỆ THỐNG TƯ PHÁP ĐIỆN TỬ</span>
                <span className="hidden md:inline-flex bg-amber-400/20 text-amber-300 text-[11px] px-2 py-0.5 rounded-full border border-amber-400/30 font-semibold">
                  Nghị định 23/2015
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden lg:block">
                Cổng Tạo Đơn & Chứng Thực Hợp Đồng - Trợ Lý AI Pháp Lý
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & AI Badge */}
          <div className="flex items-center space-x-2">
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
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-slate-800 to-slate-800/80 hover:from-slate-700 hover:to-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold shadow-inner transition-all active:scale-95"
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
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-page-enter">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
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
