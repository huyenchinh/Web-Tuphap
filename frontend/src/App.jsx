import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategoryList from './components/CategoryList';
import DocumentWizard from './components/DocumentWizard';
import AdminPortal from './components/AdminPortal';
import LookupPage from './components/LookupPage';
import LegalGuidePage from './components/LegalGuidePage';
import TaxFilingPage from './components/TaxFilingPage';
import LegalCopilotPage from './components/LegalCopilotPage';
import ContractAuditPage from './components/ContractAuditPage';
import CourtFeeCalculator from './components/CourtFeeCalculator';
import SettingsModal from './components/SettingsModal';
import HistoryModal from './components/HistoryModal';
import { api } from './services/api';
import { CheckCircle2, AlertCircle, Bot, Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'wizard' | 'copilot' | 'audit' | 'fee' | 'tax' | 'lookup' | 'guide' | 'admin'
  const [categories, setCategories] = useState([]);
  const [selectedProcedureId, setSelectedProcedureId] = useState(null);
  const [prefillTaxData, setPrefillTaxData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch initial data
  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Lỗi tải danh mục:", err);
    }
  };

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
    } catch (err) {
      console.error("Lỗi tải cài đặt:", err);
    }
  };

  useEffect(() => {
    loadCategories();
    loadSettings();
  }, []);

  const handleSelectProcedure = (procedureId) => {
    setSelectedProcedureId(procedureId);
    setActiveTab('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTax = (contractData) => {
    setPrefillTaxData(contractData);
    setActiveTab('tax');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'catalog' && activeTab !== 'wizard') {
            // Keep procedure if just switching views
          }
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        settings={settings}
        hasActiveProcedure={Boolean(selectedProcedureId)}
      />

      {/* Main Content Area with Smooth Page Transitions */}
      <main className="flex-1 transition-all duration-300">
        {activeTab === 'catalog' && (
          <div className="animate-page-enter">
            <CategoryList
              categories={categories}
              onSelectProcedure={handleSelectProcedure}
            />
          </div>
        )}

        {activeTab === 'wizard' && (
          <div className="animate-page-enter">
            {selectedProcedureId ? (
              <DocumentWizard
                procedureId={selectedProcedureId}
                onBack={() => {
                  setActiveTab('catalog');
                }}
                onShowSuccessToast={showToast}
                onNavigateToTax={handleNavigateToTax}
              />
            ) : (
              <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Chưa chọn thủ tục cụ thể</h2>
                <p className="text-sm text-slate-500 mb-6">Vui lòng chọn một thủ tục từ danh mục để bắt đầu tạo đơn.</p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Xem danh mục thủ tục
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'copilot' && (
          <div className="animate-page-enter">
            <LegalCopilotPage
              onSelectProcedure={handleSelectProcedure}
              onNavigateToTax={() => setActiveTab('tax')}
              onNavigateToFee={() => setActiveTab('fee')}
            />
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="animate-page-enter">
            <ContractAuditPage
              onSelectProcedure={handleSelectProcedure}
            />
          </div>
        )}

        {activeTab === 'fee' && (
          <div className="animate-page-enter">
            <CourtFeeCalculator
              onSelectProcedure={handleSelectProcedure}
              onNavigateToCopilot={() => setActiveTab('copilot')}
            />
          </div>
        )}

        {activeTab === 'tax' && (
          <div className="animate-page-enter">
            <TaxFilingPage
              prefillContractData={prefillTaxData}
              onBackToWizard={() => {
                if (selectedProcedureId) setActiveTab('wizard');
                else setActiveTab('catalog');
              }}
              onShowToast={showToast}
            />
          </div>
        )}

        {activeTab === 'lookup' && (
          <div className="animate-page-enter">
            <LookupPage 
              onSelectProcedure={handleSelectProcedure}
            />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="animate-page-enter">
            <LegalGuidePage 
              onStartProcedure={() => {
                setActiveTab('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="animate-page-enter">
            <AdminPortal
              categories={categories}
              onRefreshCategories={loadCategories}
              onSelectProcedureForTest={(procId) => {
                setSelectedProcedureId(procId);
                setActiveTab('wizard');
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-10 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-900">
            <div className="md:col-span-2">
              <div className="font-extrabold text-white text-base tracking-tight mb-2">
                HỆ THỐNG DỊCH VỤ CÔNG TƯ PHÁP ĐIỆN TỬ
              </div>
              <p className="text-slate-400 leading-relaxed text-xs max-w-md">
                Phần mềm tạo đơn, số hóa hồ sơ chứng thực và hợp đồng giao dịch cấp cơ sở, tuân thủ nghiêm ngặt Nghị định 23/2015/NĐ-CP, Thông tư 01/2020/TT-BTP và thể thức văn bản hành chính theo Nghị định 30/2020/NĐ-CP.
              </p>
            </div>

            <div>
              <div className="font-bold text-white text-xs uppercase tracking-wider mb-3">Liên kết nhanh</div>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setActiveTab('catalog')} className="hover:text-white transition-colors">Danh mục 5 nhóm thủ tục</button></li>
                <li><button onClick={() => setActiveTab('lookup')} className="hover:text-white transition-colors">Tra cứu hồ sơ & QR</button></li>
                <li><button onClick={() => setActiveTab('guide')} className="hover:text-white transition-colors">Cẩm nang pháp lý</button></li>
                <li><button onClick={() => setActiveTab('admin')} className="hover:text-white transition-colors">Quản trị biểu mẫu</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white text-xs uppercase tracking-wider mb-3">Công nghệ tích hợp</div>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>• Google Gemini 2.5 Flash & Claude 3.7 Sonnet</li>
                <li>• Docxtemplater & Pizzip (Xuất chuẩn Word)</li>
                <li>• Thiết kế UI/UX Pro Max Intelligence</li>
                <li>• Bảo mật dữ liệu cá nhân & Định danh điện tử</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600">
            <div>© 2026 Bản quyền thuộc Dự án Tư Pháp Số Hóa. Mọi quyền được bảo lưu.</div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Tiêu chuẩn WCAG 2.1 AA</span>
              <span>•</span>
              <span>An toàn thông tin cấp độ 3</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsUpdated={(newSettings) => setSettings(newSettings)}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {/* Floating AI Copilot Quick Button */}
      {activeTab !== 'copilot' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              setActiveTab('copilot');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-600/30 font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all ring-2 ring-white/60 group"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Hỏi Trợ Lý AI Pháp Lý</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5"></span>
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-page-enter text-xs font-bold backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
