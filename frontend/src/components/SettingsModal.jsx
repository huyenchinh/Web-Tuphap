import React, { useState } from 'react';
import { X, Sparkles, Key, Check, ShieldCheck, Cpu, AlertTriangle, ExternalLink, Save, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function SettingsModal({ isOpen, onClose, settings, onSettingsUpdated }) {
  const [provider, setProvider] = useState(settings?.aiProvider || 'gemini');
  const [geminiKey, setGeminiKey] = useState(settings?.geminiApiKey || '');
  const [geminiModel, setGeminiModel] = useState(settings?.geminiModel || 'gemini-2.5-flash');
  const [claudeKey, setClaudeKey] = useState(settings?.claudeApiKey || '');
  const [claudeModel, setClaudeModel] = useState(settings?.claudeModel || 'claude-3-7-sonnet-latest');
  const [systemPrompt, setSystemPrompt] = useState(settings?.systemPrompt || '');
  const [saving, setSaving] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updated = await api.saveSettings({
        aiProvider: provider,
        geminiApiKey: geminiKey,
        geminiModel,
        claudeApiKey: claudeKey,
        claudeModel,
        systemPrompt
      });
      if (onSettingsUpdated) onSettingsUpdated(updated);
      alert('Đã cập nhật cấu hình Trợ lý AI thành công!');
      onClose();
    } catch (err) {
      alert('Lỗi lưu cài đặt: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    try {
      setTesting(true);
      setTestResult(null);

      // Save first then test
      await api.saveSettings({
        aiProvider: provider,
        geminiApiKey: geminiKey,
        geminiModel,
        claudeApiKey: claudeKey,
        claudeModel,
        systemPrompt
      });

      const res = await api.rewriteWithAI({
        context: { test: true },
        userDraft: "hai ben thoa thuan cham dut hop dong do ben mua khong du tien tra nua",
        fieldLabel: "Lý do chấm dứt",
        procedureTitle: "Kiểm tra kết nối AI"
      });

      setTestResult({
        success: true,
        message: 'Kết nối thành công!',
        sample: res
      });
    } catch (err) {
      setTestResult({
        success: false,
        message: err.message
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Cấu Hình Trợ Lý AI Pháp Lý</h3>
              <p className="text-xs text-slate-500">Tích hợp Google Gemini (kiểm thử trước) và Anthropic Claude</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Nhà cung cấp AI đang kích hoạt
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProvider('gemini')}
                className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  provider === 'gemini'
                    ? 'border-blue-500 bg-blue-50/80 text-blue-900 ring-2 ring-blue-200'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>Google Gemini</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">Đang dùng test</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Tốc độ siêu nhanh, miễn phí</div>
                </div>
                {provider === 'gemini' && <Check className="w-5 h-5 text-blue-600" />}
              </button>

              <button
                type="button"
                onClick={() => setProvider('claude')}
                className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  provider === 'claude'
                    ? 'border-purple-500 bg-purple-50/80 text-purple-900 ring-2 ring-purple-200'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>Anthropic Claude</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-mono">Sẵn sàng</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Văn phong hành chính sắc sảo</div>
                </div>
                {provider === 'claude' && <Check className="w-5 h-5 text-purple-600" />}
              </button>
            </div>
          </div>

          {/* Gemini Config */}
          {provider === 'gemini' && (
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-blue-900">Google Gemini API Key</label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Lấy API Key miễn phí</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Nếu chưa nhập API Key, hệ thống sẽ sử dụng thuật toán chuẩn hóa pháp lý tích hợp sẵn để bạn trải nghiệm ngay.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-900 mb-1">Model Gemini</label>
                <select
                  value={geminiModel}
                  onChange={(e) => setGeminiModel(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                >
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Khuyến nghị - Nhanh & Mới nhất)</option>
                  <option value="gemini-1.5-flash">gemini-1.5-flash (Tiêu chuẩn)</option>
                  <option value="gemini-1.5-pro">gemini-1.5-pro (Suy luận sâu)</option>
                </select>
              </div>
            </div>
          )}

          {/* Claude Config */}
          {provider === 'claude' && (
            <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-purple-900">Anthropic Claude API Key</label>
                  <a
                    href="https://console.anthropic.com/settings/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-purple-600 hover:underline flex items-center gap-1"
                  >
                    <span>Lấy API Key từ Anthropic</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="password"
                  placeholder="sk-ant-api..."
                  value={claudeKey}
                  onChange={(e) => setClaudeKey(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-900 mb-1">Model Claude</label>
                <select
                  value={claudeModel}
                  onChange={(e) => setClaudeModel(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                >
                  <option value="claude-3-7-sonnet-latest">claude-3-7-sonnet-latest (Đỉnh cao câu chữ)</option>
                  <option value="claude-3-5-sonnet-20241022">claude-3-5-sonnet</option>
                  <option value="claude-3-5-haiku-20241022">claude-3-5-haiku (Siêu tốc)</option>
                </select>
              </div>
            </div>
          )}

          {/* System Prompt Customization */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Lời nhắc hệ thống chuyên gia (System Prompt Pháp Lý)
            </label>
            <textarea
              rows={4}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono leading-relaxed"
            />
          </div>

          {/* Test Connection Button & Result */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Kiểm tra kết nối trực tiếp với {provider.toUpperCase()}:</span>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg disabled:opacity-50 flex items-center gap-1.5"
              >
                {testing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                <span>Gửi thử nghiệm AI</span>
              </button>
            </div>

            {testResult && (
              <div className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                testResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                <div className="font-bold mb-1">{testResult.message}</div>
                {testResult.sample && <div>{testResult.sample}</div>}
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Đóng
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 px-6 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Đang lưu...' : 'Lưu Cài Đặt AI'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
