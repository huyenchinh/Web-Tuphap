import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Upload, FileText, Check, AlertCircle, 
  Layers, Shield, Search, Sparkles, Save, X, Eye, FileUp, Loader2,
  Lock, User, LogOut, KeyRound
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminPortal({ categories, onRefreshCategories, onSelectProcedureForTest }) {
  const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id || 'dong-san');
  const [editingProcedure, setEditingProcedure] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [uploadModalProc, setUploadModalProc] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('admin_token'));
  });
  const [authUsername, setAuthUsername] = useState('Admin');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = await api.login(authUsername, authPassword);
      if (res.token) {
        localStorage.setItem('admin_token', res.token);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setAuthError(err.message || 'Tên đăng nhập hoặc mật khẩu không đúng!');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setAuthPassword('');
  };

  // Form state for creating / editing procedure
  const [procForm, setProcForm] = useState({
    title: '',
    code: '',
    description: '',
    aiFieldKey: 'thoa_thuan_khac',
    aiFieldLabel: 'Thỏa thuận cam kết (AI hỗ trợ)',
    fields: [],
    templateContent: ''
  });

  const activeCategory = categories.find(c => c.id === selectedCatId) || categories[0];

  const handleOpenEdit = (proc) => {
    setEditingProcedure(proc);
    setProcForm({
      title: proc.title || '',
      code: proc.code || '',
      description: proc.description || '',
      aiFieldKey: proc.aiFieldKey || '',
      aiFieldLabel: proc.aiFieldLabel || '',
      fields: proc.fields ? JSON.parse(JSON.stringify(proc.fields)) : [],
      templateContent: proc.templateContent || ''
    });
  };

  const handleOpenAddNew = () => {
    setIsAddingNew(true);
    setEditingProcedure(null);
    setProcForm({
      title: '',
      code: 'TP-NEW-' + Math.floor(100 + Math.random() * 900),
      description: 'Mô tả thủ tục chứng thực mới...',
      aiFieldKey: 'thoa_thuan_khac',
      aiFieldLabel: 'Thỏa thuận cam kết (Có AI hỗ trợ)',
      fields: [
        { key: "ben_a_ho_ten", label: "Họ và tên Bên A", type: "text", required: true, group: "bena", placeholder: "NGUYỄN VĂN A" },
        { key: "ben_a_cccd", label: "Số CCCD Bên A", type: "text", required: true, group: "bena", placeholder: "001090012345" },
        { key: "ben_b_ho_ten", label: "Họ và tên Bên B", type: "text", required: true, group: "benb", placeholder: "TRẦN THỊ B" },
        { key: "ben_b_cccd", label: "Số CCCD Bên B", type: "text", required: true, group: "benb", placeholder: "036195009876" },
        { key: "thong_tin_tai_san", label: "Thông tin tài sản", type: "text", required: true, group: "taisan", placeholder: "Mô tả tài sản..." },
        { key: "thoa_thuan_khac", label: "Nội dung thỏa thuận (Có AI hỗ trợ)", type: "textarea", required: false, group: "dieuphap", placeholder: "Nhập nội dung thỏa thuận..." }
      ],
      templateContent: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n\nVĂN BẢN THỦ TỤC TƯ PHÁP\n\nHôm nay, ngày {{ngay_lap}} tháng {{thang_lap}} năm {{nam_lap}}, chúng tôi gồm có:\n\nBÊN A: {{ben_a_ho_ten}}, CCCD: {{ben_a_cccd}}\nBÊN B: {{ben_b_ho_ten}}, CCCD: {{ben_b_cccd}}\n\nTài sản: {{thong_tin_tai_san}}\n\nThỏa thuận: {{thoa_thuan_khac}}`
    });
  };

  const handleSaveProcedure = async (e) => {
    e.preventDefault();
    try {
      if (isAddingNew) {
        await api.createProcedure(selectedCatId, procForm);
        alert('Đã thêm biểu mẫu thủ tục mới thành công!');
      } else {
        await api.updateProcedure(editingProcedure.id, procForm);
        alert('Cập nhật biểu mẫu thành công!');
      }
      setIsAddingNew(false);
      setEditingProcedure(null);
      if (onRefreshCategories) onRefreshCategories();
    } catch (err) {
      alert('Lỗi lưu thủ tục: ' + err.message);
    }
  };

  const handleDeleteProcedure = async (procId, procTitle) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa biểu mẫu "${procTitle}" không?`)) return;
    try {
      await api.deleteProcedure(procId);
      alert('Đã xóa biểu mẫu thành công!');
      if (onRefreshCategories) onRefreshCategories();
    } catch (err) {
      alert('Lỗi xóa thủ tục: ' + err.message);
    }
  };

  // Add a field to procedure fields list
  const handleAddField = () => {
    const key = 'truong_moi_' + Date.now().toString().slice(-4);
    setProcForm({
      ...procForm,
      fields: [
        ...procForm.fields,
        { key, label: 'Trường thông tin mới', type: 'text', required: false, group: 'taisan', placeholder: '' }
      ]
    });
  };

  // Remove field
  const handleRemoveField = (index) => {
    const nextFields = [...procForm.fields];
    nextFields.splice(index, 1);
    setProcForm({ ...procForm, fields: nextFields });
  };

  // Upload custom .docx
  const handleUploadDocx = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert('Vui lòng chọn file .docx từ máy tính.');
      return;
    }
    try {
      setUploadLoading(true);
      await api.uploadDocxTemplate(uploadModalProc.id, uploadFile);
      alert('Tải lên mẫu file Word (.docx) gốc thành công!');
      setUploadModalProc(null);
      setUploadFile(null);
      if (onRefreshCategories) onRefreshCategories();
    } catch (err) {
      alert('Lỗi tải file: ' + err.message);
    } finally {
      setUploadLoading(false);
    }
  };

  const filteredProcedures = (activeCategory?.procedures || []).filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.code && p.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // If not logged in, show Admin Login Card
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24 animate-page-enter">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 sm:p-10 relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/25">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Đăng Nhập Quản Trị
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Hệ Thống Dịch Vụ Công Tư Pháp - Quản Lý Biểu Mẫu
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tên tài khoản quản trị
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  placeholder="Admin"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Đăng Nhập Quản Trị Viên</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              Tài khoản: <strong className="text-slate-700 font-mono">Admin</strong> | Mật khẩu: <strong className="text-slate-700 font-mono">chinh123</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-page-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Phân hệ Quản Trị Viên (Admin Portal)</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold ml-1">
              Đã đăng nhập: {authUsername}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Quản Lý Biểu Mẫu, Danh Mục & File Mẫu Gốc (.docx)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Thêm, sửa, xóa nội dung các trường thông tin; tải lên file Word mẫu gốc và cấu hình các biến placeholder.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 font-bold text-xs rounded-xl transition-all active:scale-95"
            title="Đăng xuất khỏi phân hệ quản trị"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>

          <button
            onClick={handleOpenAddNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Biểu Mẫu Mới</span>
          </button>
        </div>
      </div>

      {/* 5 Categories Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCatId(cat.id)}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedCatId === cat.id
                ? 'bg-blue-50/80 border-blue-500 text-blue-900 ring-2 ring-blue-200 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-xs uppercase tracking-wider line-clamp-2 mb-2">
              {cat.name}
            </div>
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Biểu mẫu:</span>
              <span className="font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-blue-700">
                {cat.procedures?.length || 0}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Procedures List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{activeCategory?.name}</h2>
            <p className="text-xs text-slate-500">{activeCategory?.description}</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Lọc tên biểu mẫu..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                <th className="py-3 px-4">Mã số</th>
                <th className="py-3 px-4">Tên biểu mẫu thủ tục</th>
                <th className="py-3 px-4">Số trường dữ liệu</th>
                <th className="py-3 px-4">Mẫu Word (.docx) gốc</th>
                <th className="py-3 px-4">AI hỗ trợ</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProcedures.map(proc => (
                <tr key={proc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-blue-700">
                    {proc.code || 'FORM'}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    <div>{proc.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{proc.description}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-semibold">
                      {proc.fields?.length || 0} trường
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {proc.hasCustomDocx ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-xs font-semibold">
                        <Check className="w-3 h-3" />
                        Đã nạp file .docx
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Mẫu tự động (Mặc định)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {proc.aiFieldKey ? (
                      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-xs font-medium">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        Có AI
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => onSelectProcedureForTest(proc.id)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border border-blue-200"
                      title="Chạy thử nghiệm tạo đơn"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setUploadModalProc(proc)}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded border border-emerald-200"
                      title="Tải lên file mẫu Word (.docx) gốc"
                    >
                      <FileUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(proc)}
                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded border border-amber-200"
                      title="Sửa trường thông tin & nội dung mẫu"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProcedure(proc.id, proc.title)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-red-200"
                      title="Xóa biểu mẫu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Edit or Create Procedure */}
      {(editingProcedure || isAddingNew) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {isAddingNew ? 'Thêm Mới Biểu Mẫu Thủ Tục' : `Chỉnh Sửa Biểu Mẫu: ${editingProcedure?.title}`}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cấu hình các trường nhập liệu tương ứng với các biến placeholder trong mẫu.
                </p>
              </div>
              <button
                onClick={() => { setEditingProcedure(null); setIsAddingNew(false); }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProcedure} className="space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên biểu mẫu thủ tục *</label>
                  <input
                    type="text"
                    required
                    value={procForm.title}
                    onChange={(e) => setProcForm({ ...procForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mã ký hiệu biểu mẫu *</label>
                  <input
                    type="text"
                    required
                    value={procForm.code}
                    onChange={(e) => setProcForm({ ...procForm, code: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả tóm tắt thủ tục</label>
                <input
                  type="text"
                  value={procForm.description}
                  onChange={(e) => setProcForm({ ...procForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              {/* Form Fields Config */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Danh Sách Trường Dữ Liệu Thay Thế (Placeholders)</h4>
                    <p className="text-xs text-slate-500">Mỗi trường ứng với biến <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono text-[11px]">&#123;&#123;key&#125;&#125;</code> trong mẫu văn bản.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddField}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm trường</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {procForm.fields.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm text-xs">
                      <input
                        type="text"
                        placeholder="Mã biến (key)"
                        value={f.key}
                        onChange={(e) => {
                          const updated = [...procForm.fields];
                          updated[idx].key = e.target.value;
                          setProcForm({ ...procForm, fields: updated });
                        }}
                        className="w-32 px-2 py-1 font-mono font-bold bg-amber-50 border border-amber-300 rounded text-amber-900"
                      />
                      <input
                        type="text"
                        placeholder="Tiêu đề hiển thị (label)"
                        value={f.label}
                        onChange={(e) => {
                          const updated = [...procForm.fields];
                          updated[idx].label = e.target.value;
                          setProcForm({ ...procForm, fields: updated });
                        }}
                        className="flex-1 px-2 py-1 border border-slate-300 rounded"
                      />
                      <select
                        value={f.type}
                        onChange={(e) => {
                          const updated = [...procForm.fields];
                          updated[idx].type = e.target.value;
                          setProcForm({ ...procForm, fields: updated });
                        }}
                        className="w-24 px-2 py-1 border border-slate-300 rounded"
                      >
                        <option value="text">Văn bản</option>
                        <option value="textarea">Văn bản dài</option>
                        <option value="number">Số</option>
                      </select>
                      <select
                        value={f.group}
                        onChange={(e) => {
                          const updated = [...procForm.fields];
                          updated[idx].group = e.target.value;
                          setProcForm({ ...procForm, fields: updated });
                        }}
                        className="w-28 px-2 py-1 border border-slate-300 rounded font-semibold text-slate-700"
                      >
                        <option value="bena">Nhóm Bên A</option>
                        <option value="benb">Nhóm Bên B</option>
                        <option value="taisan">Tài sản / Hồ sơ</option>
                        <option value="dieuphap">Thỏa thuận / AI</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveField(idx)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Content Editor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nội dung Biểu mẫu Mặc định (Chứa các biến &#123;&#123;tên_biến&#125;&#125;)
                </label>
                <textarea
                  rows={8}
                  value={procForm.templateContent}
                  onChange={(e) => setProcForm({ ...procForm, templateContent: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setEditingProcedure(null); setIsAddingNew(false); }}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Thay Đổi Biểu Mẫu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Upload Custom .docx Template File */}
      {uploadModalProc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <FileUp className="w-5 h-5 text-emerald-600" />
                <span>Nạp Mẫu File Word (.docx) Gốc</span>
              </div>
              <button onClick={() => setUploadModalProc(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Bạn đang tải lên file mẫu gốc cho thủ tục: <strong className="text-slate-900">{uploadModalProc.title}</strong>.<br/>
              Trong file Word của bạn, hãy đặt các biến trong dấu ngoặc nhọn, ví dụ: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700 font-mono">&#123;&#123;ben_a_ho_ten&#125;&#125;</code>, hệ thống sẽ tự động điền dữ liệu vào đúng vị trí!
            </p>

            <form onSubmit={handleUploadDocx} className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept=".docx"
                  required
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                <p className="text-[11px] text-slate-400 mt-2">Chỉ chấp nhận định dạng Microsoft Word (.docx)</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalProc(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={uploadLoading}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {uploadLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>Tải lên & Lưu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
