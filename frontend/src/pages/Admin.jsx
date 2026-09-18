import { useEffect, useState, useCallback, useRef } from 'react';
import API from '../config.js';
import './Admin.css';

const API_ORIGIN = API.replace(/\/api$/, '');

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [view, setView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const authFetch = useCallback(async (url, opts = {}) => {
    const res = await fetch(`${API}${url}`, {
      ...opts,
      headers: { Authorization: `Bearer ${token}`, ...(opts.headers || {}) },
    });
    if (res.status === 401) {
      localStorage.removeItem('admin_token');
      setToken('');
      throw new Error('unauthorized');
    }
    return res.json();
  }, [token]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [q, s, i] = await Promise.all([
        authFetch('/admin/quotes'),
        authFetch('/admin/stats'),
        authFetch('/admin/images'),
      ]);
      if (q.success) setQuotes(q.quotes);
      if (s.success) setStats(s.stats);
      if (i.success) setImages(i.images);
    } catch { /* session expired or network error */ }
    setLoading(false);
  }, [authFetch]);

  useEffect(() => {
    if (token) loadAll();
  }, [token, loadAll]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
      } else {
        setLoginError(data.message || 'Invalid password');
      }
    } catch {
      setLoginError('Could not connect to server. Backend may be waking up — try again in 30s.');
    }
    setLoggingIn(false);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setQuotes([]);
    setStats(null);
    setImages([]);
  };

  const updateStatus = async (id, status) => {
    await authFetch(`/admin/quotes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    showToast(`Marked as ${status}`);
    loadAll();
  };

  const deleteQuote = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    await authFetch(`/admin/quotes/${id}`, { method: 'DELETE' });
    showToast('Inquiry deleted');
    loadAll();
  };

  const uploadImage = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const data = await authFetch('/admin/images', { method: 'POST', body: fd });
      if (data.success) {
        showToast('Image uploaded');
        loadAll();
      } else {
        showToast(data.message || 'Upload failed');
      }
    } catch {
      showToast('Upload failed');
    }
    setUploading(false);
  };

  const deleteImage = async (name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    await authFetch(`/admin/images/${name}`, { method: 'DELETE' });
    showToast('Image deleted');
    loadAll();
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(`${API_ORIGIN}${url}`);
    showToast('URL copied');
  };

  /* ---------------- LOGIN ---------------- */
  if (!token) {
    return (
      <div className="admin-page ad-login-bg">
        <div className="ad-login">
          <img src="/images/logo.png" alt="Renovate Max2Max" className="ad-logo" />
          <h1>Admin Panel</h1>
          <p>Sign in to manage your website</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              autoFocus
            />
            <button type="submit" disabled={loggingIn}>
              {loggingIn ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
          {loginError && <div className="ad-error">{loginError}</div>}
          <a href="#/" className="ad-back">← Back to website</a>
        </div>
      </div>
    );
  }

  /* ---------------- INQUIRIES DATA ---------------- */
  const searched = quotes.filter((q) => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return [q.name, q.phone, q.email, q.type, q.details].join(' ').toLowerCase().includes(s);
  });
  const visible = filter === 'all' ? searched : searched.filter((q) => q.status === filter);
  const recent = quotes.slice(0, 5);
  const typeEntries = stats ? Object.entries(stats.byType).sort((a, b) => b[1] - a[1]).slice(0, 6) : [];
  const maxType = typeEntries.length ? typeEntries[0][1] : 1;

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: '◈' },
    { id: 'inquiries', label: 'Inquiries', icon: '✉', badge: stats?.new },
    { id: 'media', label: 'Media Library', icon: '▦', badge: images.length || null },
  ];

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className={`ad-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="ad-side-brand">
          <img src="/images/logo.png" alt="" />
          <span>Admin Panel</span>
        </div>
        <nav className="ad-side-nav">
          {nav.map((n) => (
            <button
              key={n.id}
              className={view === n.id ? 'active' : ''}
              onClick={() => { setView(n.id); setSidebarOpen(false); }}
            >
              <span className="ad-ico">{n.icon}</span>
              {n.label}
              {n.badge > 0 && <span className="ad-nav-badge">{n.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="ad-side-foot">
          <a href="#/" className="ad-side-link">↗ View Website</a>
          <button className="ad-side-link danger" onClick={logout}>⏻ Logout</button>
        </div>
      </aside>
      {sidebarOpen && <div className="ad-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="ad-main">
        <div className="ad-mainbar">
          <button className="ad-burger" onClick={() => setSidebarOpen(true)}>☰</button>
          <h2>{nav.find((n) => n.id === view)?.label}</h2>
          <button className="ad-refresh" onClick={loadAll} disabled={loading}>
            {loading ? 'Loading…' : '↻ Refresh'}
          </button>
        </div>

        {/* ======= DASHBOARD ======= */}
        {view === 'dashboard' && (
          <div className="ad-view">
            <div className="ad-stats">
              <div className="ad-stat">
                <span className="num">{stats?.total ?? '—'}</span>
                <span className="lbl">Total Inquiries</span>
              </div>
              <div className="ad-stat accent">
                <span className="num">{stats?.new ?? '—'}</span>
                <span className="lbl">New / Pending</span>
              </div>
              <div className="ad-stat">
                <span className="num">{stats?.today ?? '—'}</span>
                <span className="lbl">Today</span>
              </div>
              <div className="ad-stat">
                <span className="num">{stats?.week ?? '—'}</span>
                <span className="lbl">This Week</span>
              </div>
            </div>

            <div className="ad-dash-grid">
              <div className="ad-panel">
                <div className="ad-panel-head">
                  <h3>Recent Inquiries</h3>
                  <button className="ad-link" onClick={() => setView('inquiries')}>View all →</button>
                </div>
                {recent.length === 0 ? (
                  <p className="ad-muted">No inquiries yet.</p>
                ) : recent.map((q) => (
                  <div key={q.id} className="ad-mini-row">
                    <span className={`ad-badge ${q.status}`}>{q.status}</span>
                    <div className="ad-mini-info">
                      <strong>{q.name}</strong>
                      <span>{q.type || 'General'} · {q.phone}</span>
                    </div>
                    <span className="ad-mini-time">{timeAgo(q.createdAt)}</span>
                  </div>
                ))}
              </div>

              <div className="ad-panel">
                <div className="ad-panel-head">
                  <h3>By Project Type</h3>
                </div>
                {typeEntries.length === 0 ? (
                  <p className="ad-muted">No data yet.</p>
                ) : typeEntries.map(([type, count]) => (
                  <div key={type} className="ad-bar-row">
                    <span className="ad-bar-label">{type}</span>
                    <div className="ad-bar-track">
                      <div className="ad-bar-fill" style={{ width: `${(count / maxType) * 100}%` }} />
                    </div>
                    <span className="ad-bar-num">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======= INQUIRIES ======= */}
        {view === 'inquiries' && (
          <div className="ad-view">
            <div className="ad-toolbar">
              <input
                className="ad-search"
                placeholder="Search name, phone, email, type…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="ad-tabs">
                {['all', 'new', 'contacted', 'done'].map((f) => (
                  <button
                    key={f}
                    className={filter === f ? 'active' : ''}
                    onClick={() => setFilter(f)}
                  >
                    {f === 'all' ? 'All' : f[0].toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {visible.length === 0 ? (
              <div className="ad-empty">
                <p>No inquiries {filter !== 'all' ? `marked "${filter}"` : 'found'}.</p>
              </div>
            ) : (
              <div className="ad-list">
                {visible.map((q) => (
                  <div key={q.id} className={`ad-card ${expanded === q.id ? 'open' : ''}`}>
                    <button className="ad-card-head" onClick={() => setExpanded(expanded === q.id ? null : q.id)}>
                      <div className="ad-card-main">
                        <span className={`ad-badge ${q.status}`}>{q.status}</span>
                        <strong>{q.name}</strong>
                        {q.type && <span className="ad-type">{q.type}</span>}
                      </div>
                      <div className="ad-card-meta">
                        <span>{q.phone}</span>
                        <span className="ad-date" title={new Date(q.createdAt).toLocaleString()}>
                          {timeAgo(q.createdAt)}
                        </span>
                        <span className="ad-caret">{expanded === q.id ? '−' : '+'}</span>
                      </div>
                    </button>
                    {expanded === q.id && (
                      <div className="ad-card-body">
                        {q.email && <p><strong>Email:</strong> <a href={`mailto:${q.email}`}>{q.email}</a></p>}
                        <p><strong>Phone:</strong> <a href={`tel:${q.phone}`}>{q.phone}</a></p>
                        {q.type && <p><strong>Project Type:</strong> {q.type}</p>}
                        {q.details && <p><strong>Details:</strong> {q.details}</p>}
                        <p className="ad-muted"><strong>Received:</strong> {new Date(q.createdAt).toLocaleString()}</p>
                        <div className="ad-card-actions">
                          {q.status !== 'contacted' && (
                            <button onClick={() => updateStatus(q.id, 'contacted')}>Mark Contacted</button>
                          )}
                          {q.status !== 'done' && (
                            <button onClick={() => updateStatus(q.id, 'done')}>Mark Done</button>
                          )}
                          {q.status !== 'new' && (
                            <button onClick={() => updateStatus(q.id, 'new')}>Mark New</button>
                          )}
                          <button className="danger" onClick={() => deleteQuote(q.id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======= MEDIA ======= */}
        {view === 'media' && (
          <div className="ad-view">
            <div
              className={`ad-dropzone ${dragOver ? 'over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                uploadImage(e.dataTransfer.files[0]);
              }}
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => { uploadImage(e.target.files[0]); e.target.value = ''; }}
              />
              <span className="ad-drop-ico">⬆</span>
              <p>{uploading ? 'Uploading…' : 'Click or drag an image here to upload'}</p>
              <span className="ad-muted">JPG, PNG, WebP · max 15 MB</span>
            </div>

            <p className="ad-note">
              Uploaded images are served at <code>{API_ORIGIN}/uploads/…</code> — copy a URL to use it on the site.
            </p>

            {images.length === 0 ? (
              <div className="ad-empty"><p>No images uploaded yet.</p></div>
            ) : (
              <div className="ad-grid">
                {images.map((img) => (
                  <div key={img.name} className="ad-img-card">
                    <div className="ad-img-wrap">
                      <img src={`${API_ORIGIN}${img.url}`} alt={img.name} loading="lazy" />
                    </div>
                    <div className="ad-img-info">
                      <span className="ad-img-name" title={img.name}>{img.name}</span>
                      <span className="ad-muted">{fmtSize(img.size)} · {timeAgo(img.uploadedAt)}</span>
                    </div>
                    <div className="ad-img-actions">
                      <button onClick={() => copyUrl(img.url)}>Copy URL</button>
                      <a href={`${API_ORIGIN}${img.url}`} target="_blank" rel="noreferrer">Open</a>
                      <button className="danger" onClick={() => deleteImage(img.name)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {toast && <div className="ad-toast">{toast}</div>}
    </div>
  );
}
