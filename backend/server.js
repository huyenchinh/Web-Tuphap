const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const storage = require('./services/storage');
const aiService = require('./services/aiService');
const documentService = require('./services/documentService');

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Multer for uploading .docx templates
const uploadDir = path.join(__dirname, 'storage', 'templates');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const procId = req.body.procedureId || 'template-' + Date.now();
    cb(null, `${procId}.docx`);
  }
});
const upload = multer({ storage: fileStorage });

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Vietnam Judicial & Notary Contract Generator API', time: new Date() });
});

// Admin Authentication
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if ((username === 'Admin' || username === 'admin') && password === 'chinh123') {
    return res.json({
      success: true,
      token: 'admin-auth-token-session-' + Date.now(),
      user: { username: 'Admin', role: 'administrator' }
    });
  }
  return res.status(401).json({
    success: false,
    error: 'Tên đăng nhập hoặc mật khẩu quản trị không đúng!'
  });
});


// Categories & Procedures
app.get('/api/categories', (req, res) => {
  try {
    const categories = storage.getCategories();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/procedures/:id', (req, res) => {
  try {
    const procedure = storage.getProcedure(req.params.id);
    if (!procedure) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy thủ tục' });
    }
    // Check if custom .docx exists
    const hasCustomDocx = fs.existsSync(path.join(uploadDir, `${procedure.id}.docx`));
    res.json({ success: true, data: { ...procedure, hasCustomDocx } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Create Procedure
app.post('/api/procedures', (req, res) => {
  try {
    const { categoryId, procedure } = req.body;
    if (!categoryId || !procedure || !procedure.title) {
      return res.status(400).json({ success: false, error: 'Thiếu thông tin danh mục hoặc tiêu đề thủ tục' });
    }
    const created = storage.createProcedure(categoryId, procedure);
    res.json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Update Procedure
app.put('/api/procedures/:id', (req, res) => {
  try {
    const updated = storage.updateProcedure(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy thủ tục để cập nhật' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Delete Procedure
app.delete('/api/procedures/:id', (req, res) => {
  try {
    const deleted = storage.deleteProcedure(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy thủ tục để xóa' });
    }
    res.json({ success: true, data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Upload Custom .docx Template
app.post('/api/templates/upload', upload.single('templateFile'), (req, res) => {
  try {
    const { procedureId } = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Không có file mẫu nào được tải lên' });
    }
    res.json({
      success: true,
      message: 'Tải lên mẫu .docx thành công!',
      file: req.file.filename,
      procedureId
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// AI Rewrite Endpoint
app.post('/api/ai/rewrite', async (req, res) => {
  try {
    const { context, userDraft, fieldLabel, procedureTitle } = req.body;
    if (!userDraft || !userDraft.trim()) {
      return res.status(400).json({ success: false, error: 'Vui lòng nhập nội dung nháp cần AI chuốt lại' });
    }

    const rewritten = await aiService.rewriteText({
      context: context || {},
      userDraft,
      fieldLabel: fieldLabel || 'Điều khoản thỏa thuận',
      procedureTitle: procedureTitle || 'Hợp đồng giao dịch tư pháp'
    });

    res.json({ success: true, rewritten });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Document Preview
app.post('/api/documents/preview', (req, res) => {
  try {
    const { procedureId, formData } = req.body;
    const html = documentService.generatePreview(procedureId, formData || {});
    res.json({ success: true, html });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Export Word (.docx)
app.post('/api/documents/export-docx', async (req, res) => {
  try {
    const { procedureId, formData } = req.body;
    const buffer = await documentService.generateDocx(procedureId, formData || {});
    
    // Also save to submissions history
    storage.addSubmission({
      procedureId,
      procedureTitle: formData.procedureTitle || procedureId,
      customerName: formData.ben_a_ho_ten || formData.nguoi_lap_di_chuc || formData.nguoi_yeu_cau || 'Khách hàng',
      formData
    });

    const safeTitle = (formData.procedureTitle || 'hop-dong-tu-phap')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}-${Date.now()}.docx"`);
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Submissions History
app.get('/api/submissions', (req, res) => {
  try {
    const submissions = storage.getSubmissions();
    res.json({ success: true, data: submissions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// AI Settings
app.get('/api/settings', (req, res) => {
  try {
    const settings = storage.getSettings();
    // Mask API keys for security in UI
    const masked = {
      ...settings,
      geminiApiKeyMasked: settings.geminiApiKey ? `${settings.geminiApiKey.substring(0, 4)}...${settings.geminiApiKey.substring(settings.geminiApiKey.length - 4)}` : '',
      claudeApiKeyMasked: settings.claudeApiKey ? `${settings.claudeApiKey.substring(0, 7)}...${settings.claudeApiKey.substring(settings.claudeApiKey.length - 4)}` : '',
    };
    res.json({ success: true, data: masked });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/settings', (req, res) => {
  try {
    const updated = storage.updateSettings(req.body);
    res.json({ success: true, data: updated, message: 'Lưu cài đặt AI thành công!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend Server đang chạy tại: http://localhost:${PORT}`);
});
