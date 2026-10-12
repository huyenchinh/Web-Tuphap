const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Admin Login
  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Đăng nhập không thành công');
    return json;
  },

  // Categories & Procedures
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to fetch categories');
    return json.data;
  },

  async getProcedure(id) {
    const res = await fetch(`${API_BASE}/procedures/${id}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to fetch procedure');
    return json.data;
  },

  async createProcedure(categoryId, procedure) {
    const res = await fetch(`${API_BASE}/procedures`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId, procedure })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to create procedure');
    return json.data;
  },

  async updateProcedure(id, data) {
    const res = await fetch(`${API_BASE}/procedures/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update procedure');
    return json.data;
  },

  async deleteProcedure(id) {
    const res = await fetch(`${API_BASE}/procedures/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete procedure');
    return json.data;
  },

  // Upload custom .docx template
  async uploadDocxTemplate(procedureId, file) {
    const formData = new FormData();
    formData.append('procedureId', procedureId);
    formData.append('templateFile', file);

    const res = await fetch(`${API_BASE}/templates/upload`, {
      method: 'POST',
      body: formData
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to upload template');
    return json;
  },

  // AI Rewrite
  async rewriteWithAI({ context, userDraft, fieldLabel, procedureTitle }) {
    const res = await fetch(`${API_BASE}/ai/rewrite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, userDraft, fieldLabel, procedureTitle })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'AI rewrite failed');
    return json.rewritten;
  },

  // Document Preview
  async getPreview(procedureId, formData) {
    const res = await fetch(`${API_BASE}/documents/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ procedureId, formData })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to generate preview');
    return json.html;
  },

  // Export .docx
  async exportDocx(procedureId, formData) {
    const res = await fetch(`${API_BASE}/documents/export-docx`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ procedureId, formData })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Export failed' }));
      throw new Error(err.error || 'Xuất file Word thất bại');
    }
    const blob = await res.blob();
    return blob;
  },

  // AI Settings
  async getSettings() {
    const res = await fetch(`${API_BASE}/settings`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to fetch settings');
    return json.data;
  },

  async saveSettings(settings) {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to save settings');
    return json.data;
  },

  // Submissions
  async getSubmissions() {
    const res = await fetch(`${API_BASE}/submissions`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to fetch submissions');
    return json.data;
  }
};
