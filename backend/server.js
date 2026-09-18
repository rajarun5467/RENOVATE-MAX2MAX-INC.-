require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SECRET = process.env.ADMIN_SECRET || 'renovate-max2max-secret';
const VALID_TOKEN = crypto.createHmac('sha256', SECRET).update(ADMIN_PASSWORD).digest('hex');

function readQuotes() {
  try {
    return JSON.parse(fs.readFileSync(QUOTES_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeQuotes(quotes) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2));
}

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s+/i, '');
  if (token !== VALID_TOKEN) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
}

app.get('/api', (req, res) => {
  res.json({ message: 'Renovate Max2Max API' });
});

app.post('/api/quote', (req, res) => {
  const { name, phone, email, type, details } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required' });
  }
  const quotes = readQuotes();
  const quote = {
    id: Date.now().toString(36) + crypto.randomBytes(3).toString('hex'),
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: String(email || '').trim(),
    type: String(type || '').trim(),
    details: String(details || '').trim(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  quotes.unshift(quote);
  writeQuotes(quotes);
  res.json({ success: true, message: 'Quote request received' });
});

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: VALID_TOKEN });
  }
  res.status(401).json({ success: false, message: 'Invalid password' });
});

app.get('/api/admin/quotes', requireAdmin, (req, res) => {
  res.json({ success: true, quotes: readQuotes() });
});

app.patch('/api/admin/quotes/:id', requireAdmin, (req, res) => {
  const quotes = readQuotes();
  const quote = quotes.find((q) => q.id === req.params.id);
  if (!quote) return res.status(404).json({ success: false, message: 'Not found' });
  const { status } = req.body;
  if (['new', 'contacted', 'done'].includes(status)) quote.status = status;
  writeQuotes(quotes);
  res.json({ success: true, quote });
});

app.delete('/api/admin/quotes/:id', requireAdmin, (req, res) => {
  const quotes = readQuotes();
  const filtered = quotes.filter((q) => q.id !== req.params.id);
  if (filtered.length === quotes.length) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  writeQuotes(filtered);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
