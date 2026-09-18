require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));

const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SECRET = process.env.ADMIN_SECRET || 'renovate-max2max-secret';
const VALID_TOKEN = crypto.createHmac('sha256', SECRET).update(ADMIN_PASSWORD).digest('hex');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOADS_DIR));

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const safe = path.basename(file.originalname, ext).replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      cb(null, `${Date.now()}-${safe}${ext}`);
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /^image\/(jpeg|png|webp|gif|avif)$/.test(file.mimetype);
    cb(ok ? null : new Error('Only image files allowed'), ok);
  },
});

/* ---------- generic JSON collection helper ---------- */
function fileFor(name) { return path.join(DATA_DIR, `${name}.json`); }
function readCol(name) {
  try { return JSON.parse(fs.readFileSync(fileFor(name), 'utf8')); }
  catch { return []; }
}
function writeCol(name, rows) {
  fs.writeFileSync(fileFor(name), JSON.stringify(rows, null, 2));
}
function readObj(name) {
  try { return JSON.parse(fs.readFileSync(fileFor(name), 'utf8')); }
  catch { return {}; }
}
function writeObj(name, obj) {
  fs.writeFileSync(fileFor(name), JSON.stringify(obj, null, 2));
}
function newId() { return Date.now().toString(36) + crypto.randomBytes(3).toString('hex'); }

function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (token !== VALID_TOKEN) return res.status(401).json({ success: false, message: 'Unauthorized' });
  next();
}

function logActivity(action, meta = {}) {
  const rows = readCol('activity');
  rows.unshift({ id: newId(), action, ...meta, at: new Date().toISOString() });
  writeCol('activity', rows.slice(0, 200));
}

/* ---------- public ---------- */
app.get('/api', (req, res) => res.json({ message: 'Renovate Max2Max API' }));

app.post('/api/quote', (req, res) => {
  const { name, phone, email, type, details } = req.body;
  if (!name || !phone) return res.status(400).json({ success: false, message: 'Name and phone are required' });
  const quotes = readCol('quotes');
  const quote = {
    id: newId(),
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: String(email || '').trim(),
    type: String(type || '').trim(),
    details: String(details || '').trim(),
    status: 'new',
    notes: '',
    createdAt: new Date().toISOString(),
  };
  quotes.unshift(quote);
  writeCol('quotes', quotes);
  logActivity('enquiry_received', { ref: quote.id, label: quote.name });
  res.json({ success: true, message: 'Quote request received' });
});

/* public read-only for site content (no auth) */
app.get('/api/content/:collection', (req, res) => {
  const allowed = ['services', 'projects', 'testimonials', 'settings', 'seo'];
  if (!allowed.includes(req.params.collection)) return res.status(404).json({ success: false });
  if (req.params.collection === 'settings' || req.params.collection === 'seo') {
    return res.json({ success: true, data: readObj(req.params.collection) });
  }
  res.json({ success: true, data: readCol(req.params.collection).filter((r) => r.published) });
});

/* ---------- auth ---------- */
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    logActivity('admin_login');
    return res.json({ success: true, token: VALID_TOKEN, name: 'Administrator' });
  }
  res.status(401).json({ success: false, message: 'Invalid password' });
});

/* ---------- stats ---------- */
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const quotes = readCol('quotes');
  const services = readCol('services');
  const projects = readCol('projects');
  const testimonials = readCol('testimonials');
  const now = Date.now();
  const day = 86400000;
  const byType = {};
  quotes.forEach((q) => { const t = q.type || 'Other'; byType[t] = (byType[t] || 0) + 1; });
  const last14 = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * day);
    const key = d.toISOString().slice(0, 10);
    const count = quotes.filter((q) => q.createdAt.slice(0, 10) === key).length;
    last14.push({ date: key, count });
  }
  res.json({
    success: true,
    stats: {
      total: quotes.length,
      new: quotes.filter((q) => q.status === 'new').length,
      contacted: quotes.filter((q) => q.status === 'contacted').length,
      done: quotes.filter((q) => q.status === 'done').length,
      today: quotes.filter((q) => now - new Date(q.createdAt).getTime() < day).length,
      week: quotes.filter((q) => now - new Date(q.createdAt).getTime() < 7 * day).length,
      services: services.length,
      servicesPublished: services.filter((s) => s.published).length,
      projects: projects.length,
      projectsFeatured: projects.filter((p) => p.featured).length,
      testimonials: testimonials.length,
      byType,
      last14,
    },
  });
});

/* ---------- quotes / enquiries ---------- */
app.get('/api/admin/quotes', requireAdmin, (req, res) => {
  res.json({ success: true, quotes: readCol('quotes') });
});

app.patch('/api/admin/quotes/:id', requireAdmin, (req, res) => {
  const quotes = readCol('quotes');
  const q = quotes.find((x) => x.id === req.params.id);
  if (!q) return res.status(404).json({ success: false, message: 'Not found' });
  const { status, notes } = req.body;
  if (['new', 'contacted', 'done'].includes(status)) q.status = status;
  if (typeof notes === 'string') q.notes = notes;
  writeCol('quotes', quotes);
  logActivity('enquiry_updated', { ref: q.id, label: q.name, status: q.status });
  res.json({ success: true, quote: q });
});

app.delete('/api/admin/quotes/:id', requireAdmin, (req, res) => {
  const quotes = readCol('quotes');
  const q = quotes.find((x) => x.id === req.params.id);
  const filtered = quotes.filter((x) => x.id !== req.params.id);
  if (filtered.length === quotes.length) return res.status(404).json({ success: false, message: 'Not found' });
  writeCol('quotes', filtered);
  logActivity('enquiry_deleted', { ref: req.params.id, label: q ? q.name : '' });
  res.json({ success: true });
});

/* ---------- generic collection CRUD (services, projects, testimonials) ---------- */
const COLLECTIONS = ['services', 'projects', 'testimonials'];

function makeRow(collection, body) {
  const id = newId();
  const now = new Date().toISOString();
  if (collection === 'services') {
    return {
      id, title: body.title || '', slug: body.slug || '', summary: body.summary || '',
      description: body.description || '', image: body.image || '', icon: body.icon || '',
      published: body.published !== false, order: body.order || 0, createdAt: now, updatedAt: now,
    };
  }
  if (collection === 'projects') {
    return {
      id, title: body.title || '', category: body.category || '', location: body.location || '',
      description: body.description || '', image: body.image || '', gallery: body.gallery || [],
      featured: !!body.featured, published: body.published !== false, createdAt: now, updatedAt: now,
    };
  }
  return {
    id, name: body.name || '', designation: body.designation || '', image: body.image || '',
    text: body.text || '', rating: Math.min(5, Math.max(1, body.rating || 5)),
    published: body.published !== false, createdAt: now, updatedAt: now,
  };
}

COLLECTIONS.forEach((col) => {
  app.get(`/api/admin/${col}`, requireAdmin, (req, res) => {
    res.json({ success: true, data: readCol(col) });
  });
  app.post(`/api/admin/${col}`, requireAdmin, (req, res) => {
    const rows = readCol(col);
    const row = makeRow(col, req.body);
    rows.unshift(row);
    writeCol(col, rows);
    logActivity(`${col}_created`, { ref: row.id, label: row.title || row.name || '' });
    res.json({ success: true, data: row });
  });
  app.put(`/api/admin/${col}/:id`, requireAdmin, (req, res) => {
    const rows = readCol(col);
    const row = rows.find((r) => r.id === req.params.id);
    if (!row) return res.status(404).json({ success: false, message: 'Not found' });
    Object.keys(req.body).forEach((k) => { if (k !== 'id' && k !== 'createdAt') row[k] = req.body[k]; });
    row.updatedAt = new Date().toISOString();
    writeCol(col, rows);
    logActivity(`${col}_updated`, { ref: row.id, label: row.title || row.name || '' });
    res.json({ success: true, data: row });
  });
  app.delete(`/api/admin/${col}/:id`, requireAdmin, (req, res) => {
    const rows = readCol(col);
    const r = rows.find((x) => x.id === req.params.id);
    const filtered = rows.filter((x) => x.id !== req.params.id);
    if (filtered.length === rows.length) return res.status(404).json({ success: false, message: 'Not found' });
    writeCol(col, filtered);
    logActivity(`${col}_deleted`, { ref: req.params.id, label: r ? (r.title || r.name || '') : '' });
    res.json({ success: true });
  });
});

/* ---------- settings & seo (single objects) ---------- */
app.get('/api/admin/settings', requireAdmin, (req, res) => {
  res.json({ success: true, data: readObj('settings') });
});
app.put('/api/admin/settings', requireAdmin, (req, res) => {
  const cur = readObj('settings');
  const next = { ...cur, ...req.body, updatedAt: new Date().toISOString() };
  writeObj('settings', next);
  logActivity('settings_updated');
  res.json({ success: true, data: next });
});
app.get('/api/admin/seo', requireAdmin, (req, res) => {
  res.json({ success: true, data: readObj('seo') });
});
app.put('/api/admin/seo', requireAdmin, (req, res) => {
  const cur = readObj('seo');
  const next = { ...cur, ...req.body, updatedAt: new Date().toISOString() };
  writeObj('seo', next);
  logActivity('seo_updated');
  res.json({ success: true, data: next });
});

/* ---------- activity ---------- */
app.get('/api/admin/activity', requireAdmin, (req, res) => {
  res.json({ success: true, data: readCol('activity') });
});

/* ---------- images / media ---------- */
app.get('/api/admin/images', requireAdmin, (req, res) => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .map((f) => {
        const s = fs.statSync(path.join(UPLOADS_DIR, f));
        return { name: f, url: `/uploads/${f}`, size: s.size, uploadedAt: s.mtime };
      })
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    res.json({ success: true, images: files });
  } catch { res.json({ success: true, images: [] }); }
});

app.post('/api/admin/images', requireAdmin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    logActivity('image_uploaded', { ref: req.file.filename });
    res.json({ success: true, image: { name: req.file.filename, url: `/uploads/${req.file.filename}`, size: req.file.size } });
  });
});

app.delete('/api/admin/images/:name', requireAdmin, (req, res) => {
  const name = path.basename(req.params.name);
  const file = path.join(UPLOADS_DIR, name);
  if (!fs.existsSync(file)) return res.status(404).json({ success: false, message: 'Not found' });
  fs.unlinkSync(file);
  logActivity('image_deleted', { ref: name });
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
