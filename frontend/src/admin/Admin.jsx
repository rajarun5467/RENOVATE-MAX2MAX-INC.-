import { useEffect, useState, useCallback, useRef } from 'react';
import API from '../config.js';
import './admin.css';
import { ToastProvider, ConfirmProvider, useToast, useConfirm, Modal, Badge, Field, Input, Textarea, Select, Skeleton, TableSkeleton, Empty, Pagination, ImagePicker, useApi, timeAgo, fmtSize } from './ui.jsx';

window.__ADM_API__ = API;
const API_ORIGIN = API.replace(/\/api$/, '');

/* ============================================================
   LOGIN
   ============================================================ */
function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr('');
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) { localStorage.setItem('admin_token', data.token); onLogin(); }
      else setErr(data.message || 'Invalid password');
    } catch { setErr('Could not connect. Backend may be waking up — retry in 30s.'); }
    setLoading(false);
  };
  return (
    <div className="adm adm-login-bg">
      <form className="adm-login-card" onSubmit={submit}>
        <img src="/images/logo.png" alt="" className="adm-login-logo" />
        <h1>Admin Panel</h1>
        <p>Sign in to manage your website</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoFocus />
        <button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        {err && <div className="adm-login-err">{err}</div>}
        <a href="#/" className="adm-login-back">← Back to website</a>
      </form>
    </div>
  );
}

/* ============================================================
   LAYOUT (sidebar + header)
   ============================================================ */
const NAV = [
  { group: 'Overview', items: [
    { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  ]},
  { group: 'Content', items: [
    { id: 'services', label: 'Services', icon: '⚙' },
    { id: 'projects', label: 'Projects', icon: '▣' },
    { id: 'testimonials', label: 'Testimonials', icon: '✦' },
    { id: 'gallery', label: 'Gallery', icon: '▦' },
  ]},
  { group: 'Engagement', items: [
    { id: 'enquiries', label: 'Enquiries', icon: '✉' },
    { id: 'activity', label: 'Activity Logs', icon: '⏱' },
  ]},
  { group: 'System', items: [
    { id: 'media', label: 'Media Library', icon: '☵' },
    { id: 'seo', label: 'SEO', icon: '⌕' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
    { id: 'users', label: 'Users', icon: '☻' },
  ]},
];

function Layout({ view, setView, collapsed, setCollapsed, onLogout, children }) {
  const [drawer, setDrawer] = useState(false);
  const counts = window.__ADM_COUNTS__ || {};
  const current = NAV.flatMap((g) => g.items).find((i) => i.id === view);
  return (
    <div className="adm">
      <aside className={`adm-sidebar ${collapsed ? 'collapsed' : ''} ${drawer ? 'open' : ''}`}>
        <div className="adm-side-head">
          <img src="/images/logo.png" alt="" className="adm-side-logo" />
          <span className="adm-side-name">Renovate Max2Max</span>
        </div>
        <nav className="adm-side-nav">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="adm-side-group">{g.group}</div>
              {g.items.map((it) => (
                <button key={it.id} className={`adm-side-item ${view === it.id ? 'active' : ''}`}
                  onClick={() => { setView(it.id); setDrawer(false); }} title={it.label}>
                  <span className="adm-side-ico">{it.icon}</span>
                  <span className="adm-side-label">{it.label}</span>
                  {counts[it.id] > 0 && <span className="adm-side-badge">{counts[it.id]}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a href="#/" className="adm-side-link"><span className="adm-side-ico">↗</span><span>View Website</span></a>
          <button className="adm-side-link" onClick={onLogout}><span className="adm-side-ico">⏻</span><span>Logout</span></button>
        </div>
      </aside>
      {drawer && <div className="adm-overlay" onClick={() => setDrawer(false)} />}
      <div className="adm-main">
        <header className="adm-header">
          <button className="adm-toggle" onClick={() => setCollapsed(!collapsed)}>☰</button>
          <button className="adm-burger" onClick={() => setDrawer(true)}>☰</button>
          <div className="adm-crumb">Admin <span>›</span> <b>{current?.label}</b></div>
          <div className="adm-header-spacer" />
          <div className="adm-header-actions">
            <a href="#/" className="adm-icon-btn" title="View website" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>↗</a>
            <div className="adm-avatar" title="Administrator">A</div>
          </div>
        </header>
        <div className="adm-content adm-fade" key={view}>{children}</div>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function Dashboard({ go }) {
  const api = useApi();
  const [stats, setStats] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const [s, q, a] = await Promise.all([api('/admin/stats'), api('/admin/quotes'), api('/admin/activity')]);
        if (s.success) setStats(s.stats);
        if (q.success) setQuotes(q.quotes.slice(0, 6));
        if (a.success) setActivity(a.data.slice(0, 8));
      } catch {}
      setLoading(false);
    })();
  }, []);
  if (loading) return <DashSkeleton />;
  if (!stats) return <Empty icon="⚠" title="Could not load dashboard" sub="Check that the backend is running." />;
  const maxBar = Math.max(1, ...stats.last14.map((d) => d.count));
  return (
    <>
      <div className="adm-page-head">
        <div><h1>Dashboard</h1><p>Overview of your website activity</p></div>
      </div>
      <div className="adm-stats">
        <StatCard ico="✉" tone="accent" num={stats.total} label="Total Enquiries" />
        <StatCard ico="●" tone="warn" num={stats.new} label="New Enquiries" />
        <StatCard ico="⚙" tone="blue" num={stats.services} label="Services" sub={`${stats.servicesPublished} published`} />
        <StatCard ico="▣" tone="dark" num={stats.projects} label="Projects" sub={`${stats.projectsFeatured} featured`} />
      </div>
      <div className="adm-grid-2">
        <div className="adm-panel">
          <div className="adm-panel-head"><h3>Enquiries · Last 14 days</h3><span className="adm-muted">{stats.week} this week</span></div>
          <div className="adm-panel-body">
            <div className="adm-chart" style={{ display: 'flex', alignItems: 'flex-end', gap: '.4rem', height: 200 }}>
              {stats.last14.map((d) => (
                <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.3rem' }}>
                  <div title={`${d.date}: ${d.count}`} style={{ width: '100%', maxWidth: 28, height: `${(d.count / maxBar) * 160 + 4}px`, background: d.count ? 'var(--accent)' : 'var(--border)', borderRadius: '4px 4px 0 0', transition: 'height .3s' }} />
                  <span style={{ fontSize: '.62rem', color: 'var(--muted)' }}>{d.date.slice(8, 10)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="adm-panel">
          <div className="adm-panel-head"><h3>Recent Enquiries</h3><button className="adm-link" onClick={() => go('enquiries')}>View all →</button></div>
          <div className="adm-panel-body" style={{ padding: 0 }}>
            {quotes.length === 0 ? <Empty icon="✉" title="No enquiries yet" /> : quotes.map((q) => (
              <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.75rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
                <Badge status={q.status} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: '.87rem' }}>{q.name}</div>
                  <div className="adm-muted" style={{ fontSize: '.78rem' }}>{q.type || 'General'} · {q.phone}</div>
                </div>
                <span className="adm-muted" style={{ fontSize: '.76rem' }}>{timeAgo(q.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="adm-grid-2" style={{ marginTop: '1rem' }}>
        <div className="adm-panel">
          <div className="adm-panel-head"><h3>By Project Type</h3></div>
          <div className="adm-panel-body">
            {Object.keys(stats.byType).length === 0 ? <Empty icon="▦" title="No data yet" /> :
              Object.entries(stats.byType).sort((a, b) => b[1] - a[1]).map(([t, c]) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '.7rem', padding: '.4rem 0' }}>
                  <span style={{ width: 120, fontSize: '.82rem', color: 'var(--text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t}</span>
                  <div style={{ flex: 1, height: 7, background: 'var(--surface-2)', borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{ width: `${(c / Math.max(...Object.values(stats.byType))) * 100}%`, height: '100%', background: 'var(--accent)', borderRadius: 5 }} />
                  </div>
                  <span style={{ fontSize: '.8rem', fontWeight: 600, width: 24, textAlign: 'right' }}>{c}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="adm-panel">
          <div className="adm-panel-head"><h3>Recent Activity</h3></div>
          <div className="adm-panel-body" style={{ padding: 0 }}>
            {activity.length === 0 ? <Empty icon="⏱" title="No activity yet" /> : activity.map((a) => (
              <div key={a.id} className="adm-act" style={{ padding: '.65rem 1.25rem' }}>
                <div className="adm-act-ico">{actIcon(a.action)}</div>
                <div className="adm-act-body">
                  <div className="adm-act-title">{actLabel(a.action)}{a.label ? ` · ${a.label}` : ''}</div>
                  <div className="adm-act-meta">{timeAgo(a.at)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
function StatCard({ ico, tone, num, label, sub }) {
  return (
    <div className="adm-stat">
      <div className="adm-stat-top"><div className={`adm-stat-ico ${tone}`}>{ico}</div></div>
      <div className="adm-stat-num">{num}</div>
      <div className="adm-stat-lbl">{label}</div>
      {sub && <div className="adm-stat-delta">{sub}</div>}
    </div>
  );
}
function DashSkeleton() {
  return (
    <>
      <div className="adm-stats">{Array.from({ length: 4 }).map((_, i) => (
        <div className="adm-stat" key={i}><Skeleton h={36} w={36} r={8} /><div style={{ marginTop: '.75rem' }}><Skeleton h={28} w={60} /><Skeleton h={12} w={90} style={{ marginTop: '.4rem' }} /></div></div>
      ))}</div>
      <div className="adm-grid-2">{Array.from({ length: 2 }).map((_, i) => (
        <div className="adm-panel" key={i}><div className="adm-panel-head"><Skeleton h={18} w={140} /></div><div className="adm-panel-body"><Skeleton h={180} /></div></div>
      ))}</div>
    </>
  );
}
function actIcon(a) { if (a.startsWith('enquiry')) return '✉'; if (a.startsWith('image')) return '☵'; if (a.startsWith('admin')) return '☻'; if (a.includes('settings') || a.includes('seo')) return '⚙'; return '✦'; }
function actLabel(a) { return a.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()); }

/* ============================================================
   ENQUIRIES
   ============================================================ */
function Enquiries() {
  const api = useApi();
  const toast = useToast();
  const confirm = useConfirm();
  const [quotes, setQuotes] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);
  const [notes, setNotes] = useState('');

  const load = useCallback(async () => {
    const data = await api('/admin/quotes');
    if (data.success) setQuotes(data.quotes);
  }, [api]);
  useEffect(() => { load(); }, [load]);

  const setStatus = async (id, status) => {
    await api(`/admin/quotes/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    toast(`Marked as ${status}`, 'success');
    load(); if (detail) setDetail({ ...detail, status });
  };
  const saveNotes = async () => {
    await api(`/admin/quotes/${detail.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ notes }) });
    toast('Notes saved', 'success'); load();
  };
  const del = async (id) => {
    if (!await confirm({ title: 'Delete enquiry', message: 'This permanently removes the enquiry.', danger: true, confirmText: 'Delete' })) return;
    await api(`/admin/quotes/${id}`, { method: 'DELETE' });
    toast('Enquiry deleted', 'success'); setDetail(null); load();
  };

  if (!quotes) return <div className="adm-panel"><TableSkeleton /></div>;
  const filtered = quotes.filter((q) => (filter === 'all' || q.status === filter) && (!search.trim() || [q.name, q.phone, q.email, q.type, q.details].join(' ').toLowerCase().includes(search.toLowerCase())));

  return (
    <>
      <div className="adm-page-head"><div><h1>Enquiries</h1><p>Manage contact form submissions</p></div></div>
      <div className="adm-toolbar">
        <div className="adm-search">
          <span className="adm-search-ico">⌕</span>
          <input placeholder="Search name, phone, email…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="adm-tabs">
          {['all', 'new', 'contacted', 'done'].map((f) => (
            <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f === 'all' ? 'All' : f[0].toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
      </div>
      <div className="adm-panel adm-panel-flush">
        {filtered.length === 0 ? <Empty icon="✉" title="No enquiries found" sub="New submissions from the contact form will appear here." /> : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Name</th><th>Service</th><th>Phone</th><th>Status</th><th>Received</th><th></th></tr></thead>
              <tbody>
                {filtered.map((q) => (
                  <tr key={q.id} style={{ cursor: 'pointer' }} onClick={() => { setDetail(q); setNotes(q.notes || ''); }}>
                    <td><div className="adm-row-title">{q.name}</div><div className="adm-row-sub">{q.email || '—'}</div></td>
                    <td><span className="adm-chip">{q.type || 'General'}</span></td>
                    <td>{q.phone}</td>
                    <td><Badge status={q.status} /></td>
                    <td className="adm-muted">{timeAgo(q.createdAt)}</td>
                    <td><div className="adm-cell-actions"><button className="adm-btn adm-btn-sm" onClick={(e) => { e.stopPropagation(); setDetail(q); setNotes(q.notes || ''); }}>View</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Enquiry Details" size="lg"
        footer={detail && (<>
          <button className="adm-btn adm-btn-danger" onClick={() => del(detail.id)}>Delete</button>
          <button className="adm-btn" onClick={() => setDetail(null)}>Close</button>
        </>)}>
        {detail && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.25rem' }}>
              <Badge status={detail.status} />
              <span className="adm-muted">{new Date(detail.createdAt).toLocaleString()}</span>
            </div>
            <div className="adm-field-row">
              <Field label="Name"><Input value={detail.name} readOnly /></Field>
              <Field label="Phone"><Input value={detail.phone} readOnly /></Field>
            </div>
            <div className="adm-field-row">
              <Field label="Email"><Input value={detail.email || '—'} readOnly /></Field>
              <Field label="Service"><Input value={detail.type || 'General'} readOnly /></Field>
            </div>
            <Field label="Project Details"><Textarea value={detail.details || '—'} readOnly /></Field>
            <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.25rem' }}>
              {detail.status !== 'new' && <button className="adm-btn adm-btn-sm" onClick={() => setStatus(detail.id, 'new')}>Mark New</button>}
              {detail.status !== 'contacted' && <button className="adm-btn adm-btn-sm" onClick={() => setStatus(detail.id, 'contacted')}>Mark Contacted</button>}
              {detail.status !== 'done' && <button className="adm-btn adm-btn-sm adm-btn-primary" onClick={() => setStatus(detail.id, 'done')}>Mark Done</button>}
            </div>
            <Field label="Internal Notes"><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add private notes about this enquiry…" /></Field>
            <button className="adm-btn adm-btn-sm" onClick={saveNotes}>Save Notes</button>
          </div>
        )}
      </Modal>
    </>
  );
}

/* ============================================================
   GENERIC CRUD (Services, Projects, Testimonials)
   ============================================================ */
function CrudPage({ collection, singular, title, desc, columns, renderForm, seedForm, icon }) {
  const api = useApi();
  const toast = useToast();
  const confirm = useConfirm();
  const [rows, setRows] = useState(null);
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    const data = await api(`/admin/${collection}`);
    if (data.success) setRows(data.data);
  }, [api, collection]);
  useEffect(() => { load(); }, [load]);

  const save = async (body) => {
    if (isNew) {
      const data = await api(`/admin/${collection}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (data.success) toast(`${singular} created`, 'success');
    } else {
      const data = await api(`/admin/${collection}/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (data.success) toast(`${singular} updated`, 'success');
    }
    setEditing(null); load();
  };
  const remove = async (id) => {
    if (!await confirm({ title: `Delete ${singular}`, message: `This permanently deletes this ${singular.toLowerCase()}.`, danger: true, confirmText: 'Delete' })) return;
    await api(`/admin/${collection}/${id}`, { method: 'DELETE' });
    toast(`${singular} deleted`, 'success'); load();
  };
  const toggle = async (row, key) => {
    await api(`/admin/${collection}/${row.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [key]: !row[key] }) });
    load();
  };

  if (!rows) return <div className="adm-panel"><TableSkeleton /></div>;
  const filtered = rows.filter((r) => !search.trim() || JSON.stringify(r).toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="adm-page-head">
        <div><h1>{title}</h1><p>{desc}</p></div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-primary" onClick={() => { setEditing(seedForm()); setIsNew(true); }}>+ Add {singular}</button>
        </div>
      </div>
      <div className="adm-toolbar">
        <div className="adm-search">
          <span className="adm-search-ico">⌕</span>
          <input placeholder={`Search ${title.toLowerCase()}…`} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="adm-panel adm-panel-flush">
        {filtered.length === 0 ? <Empty icon={icon} title={`No ${title.toLowerCase()} yet`} sub={`Click "Add ${singular}" to create one.`} /> : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr>{columns.map((c) => <th key={c.key} style={c.w ? { width: c.w } : {}}>{c.label}</th>)}<th style={{ width: 120 }}></th></tr></thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id}>
                    {columns.map((c) => <td key={c.key}>{c.render ? c.render(row, { toggle, Badge }) : row[c.key] || '—'}</td>)}
                    <td><div className="adm-cell-actions">
                      <button className="adm-btn adm-btn-sm" onClick={() => { setEditing(row); setIsNew(false); }}>Edit</button>
                      <button className="adm-btn adm-btn-sm adm-btn-ghost adm-btn-danger" onClick={() => remove(row.id)}>🗑</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal open={!!editing} onClose={() => setEditing(null)} title={isNew ? `Add ${singular}` : `Edit ${singular}`} size="lg"
        footer={editing && (<><button className="adm-btn" onClick={() => setEditing(null)}>Cancel</button><button className="adm-btn adm-btn-primary" onClick={() => save(editing)}>Save</button></>)}>
        {editing && renderForm(editing, setEditing)}
      </Modal>
    </>
  );
}

/* ---------- Services ---------- */
function Services() {
  return (
    <CrudPage collection="services" singular="Service" title="Services" desc="Manage the services displayed on your website" icon="⚙"
      seedForm={() => ({ title: '', slug: '', summary: '', description: '', image: '', icon: '', published: true, order: 0 })}
      columns={[
        { key: 'image', label: '', w: 60, render: (r) => r.image ? <img src={r.image} className="adm-thumb" alt="" /> : <div className="adm-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>⚙</div> },
        { key: 'title', label: 'Service', render: (r) => (<><div className="adm-row-title">{r.title || 'Untitled'}</div><div className="adm-row-sub">{r.summary}</div></>) },
        { key: 'published', label: 'Status', render: (r) => <Badge status={r.published ? 'published' : 'draft'}>{r.published ? 'Published' : 'Draft'}</Badge> },
        { key: 'createdAt', label: 'Created', render: (r) => <span className="adm-muted">{timeAgo(r.createdAt)}</span> },
      ]}
      renderForm={(row, set) => (
        <>
          <Field label="Service Title" required><Input value={row.title} onChange={(e) => set({ ...row, title: e.target.value })} placeholder="e.g. Bathroom Renovation" /></Field>
          <Field label="Summary"><Input value={row.summary} onChange={(e) => set({ ...row, summary: e.target.value })} placeholder="Short one-line description" /></Field>
          <Field label="Description"><Textarea value={row.description} onChange={(e) => set({ ...row, description: e.target.value })} placeholder="Full description of the service" /></Field>
          <ImagePicker value={row.image} onChange={(v) => set({ ...row, image: v })} label="Service Image" />
          <div className="adm-field-row">
            <Field label="Icon (emoji or text)"><Input value={row.icon} onChange={(e) => set({ ...row, icon: e.target.value })} placeholder="🛁" /></Field>
            <Field label="Display Order"><Input type="number" value={row.order} onChange={(e) => set({ ...row, order: +e.target.value })} /></Field>
          </div>
          <label className="adm-checkbox"><input type="checkbox" checked={row.published} onChange={(e) => set({ ...row, published: e.target.checked })} /> Published</label>
        </>
      )}
    />
  );
}

/* ---------- Projects ---------- */
function Projects() {
  return (
    <CrudPage collection="projects" singular="Project" title="Projects" desc="Manage your portfolio of completed projects" icon="▣"
      seedForm={() => ({ title: '', category: '', location: '', description: '', image: '', gallery: [], featured: false, published: true })}
      columns={[
        { key: 'image', label: '', w: 60, render: (r) => r.image ? <img src={r.image} className="adm-thumb" alt="" /> : <div className="adm-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>▣</div> },
        { key: 'title', label: 'Project', render: (r) => (<><div className="adm-row-title">{r.title || 'Untitled'}</div><div className="adm-row-sub">{r.category}{r.location ? ` · ${r.location}` : ''}</div></>) },
        { key: 'featured', label: 'Featured', render: (r) => r.featured ? <Badge status="featured">Featured</Badge> : <span className="adm-muted">—</span> },
        { key: 'published', label: 'Status', render: (r) => <Badge status={r.published ? 'published' : 'draft'}>{r.published ? 'Published' : 'Draft'}</Badge> },
        { key: 'createdAt', label: 'Created', render: (r) => <span className="adm-muted">{timeAgo(r.createdAt)}</span> },
      ]}
      renderForm={(row, set) => (
        <>
          <div className="adm-field-row">
            <Field label="Project Title" required><Input value={row.title} onChange={(e) => set({ ...row, title: e.target.value })} placeholder="e.g. Modern Bathroom Remodel" /></Field>
            <Field label="Category"><Input value={row.category} onChange={(e) => set({ ...row, category: e.target.value })} placeholder="Bathroom" /></Field>
          </div>
          <div className="adm-field-row">
            <Field label="Location"><Input value={row.location} onChange={(e) => set({ ...row, location: e.target.value })} placeholder="Edmonton, AB" /></Field>
            <Field label="Featured"><Select value={row.featured ? '1' : '0'} onChange={(e) => set({ ...row, featured: e.target.value === '1' })}><option value="0">No</option><option value="1">Yes</option></Select></Field>
          </div>
          <Field label="Description"><Textarea value={row.description} onChange={(e) => set({ ...row, description: e.target.value })} /></Field>
          <ImagePicker value={row.image} onChange={(v) => set({ ...row, image: v })} label="Cover Image" />
          <label className="adm-checkbox"><input type="checkbox" checked={row.published} onChange={(e) => set({ ...row, published: e.target.checked })} /> Published</label>
        </>
      )}
    />
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  return (
    <CrudPage collection="testimonials" singular="Testimonial" title="Testimonials" desc="Customer reviews and testimonials" icon="✦"
      seedForm={() => ({ name: '', designation: '', image: '', text: '', rating: 5, published: true })}
      columns={[
        { key: 'image', label: '', w: 60, render: (r) => r.image ? <img src={r.image} className="adm-thumb" alt="" /> : <div className="adm-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>☻</div> },
        { key: 'name', label: 'Customer', render: (r) => (<><div className="adm-row-title">{r.name || 'Untitled'}</div><div className="adm-row-sub">{r.designation}</div></>) },
        { key: 'rating', label: 'Rating', render: (r) => <span style={{ color: 'var(--accent)' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span> },
        { key: 'published', label: 'Status', render: (r) => <Badge status={r.published ? 'published' : 'draft'}>{r.published ? 'Published' : 'Draft'}</Badge> },
        { key: 'createdAt', label: 'Created', render: (r) => <span className="adm-muted">{timeAgo(r.createdAt)}</span> },
      ]}
      renderForm={(row, set) => (
        <>
          <div className="adm-field-row">
            <Field label="Customer Name" required><Input value={row.name} onChange={(e) => set({ ...row, name: e.target.value })} /></Field>
            <Field label="Designation"><Input value={row.designation} onChange={(e) => set({ ...row, designation: e.target.value })} placeholder="Homeowner, Edmonton" /></Field>
          </div>
          <Field label="Testimonial" required><Textarea value={row.text} onChange={(e) => set({ ...row, text: e.target.value })} /></Field>
          <div className="adm-field-row">
            <Field label="Rating (1-5)"><Select value={row.rating} onChange={(e) => set({ ...row, rating: +e.target.value })}>{[1,2,3,4,5].map((n) => <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>)}</Select></Field>
            <Field label="Published"><Select value={row.published ? '1' : '0'} onChange={(e) => set({ ...row, published: e.target.value === '1' })}><option value="1">Yes</option><option value="0">No</option></Select></Field>
          </div>
          <ImagePicker value={row.image} onChange={(v) => set({ ...row, image: v })} label="Profile Image" />
        </>
      )}
    />
  );
}

/* ============================================================
   GALLERY (uses projects as source — featured projects)
   ============================================================ */
function Gallery({ go }) {
  const api = useApi();
  const [projects, setProjects] = useState(null);
  useEffect(() => { api('/admin/projects').then((d) => d.success && setProjects(d.data)); }, []);
  if (!projects) return <div className="adm-panel"><TableSkeleton /></div>;
  return (
    <>
      <div className="adm-page-head"><div><h1>Gallery</h1><p>Featured project showcase</p></div>
        <button className="adm-btn adm-btn-primary" onClick={() => go('projects')}>Manage Projects →</button></div>
      <div className="adm-panel">
        <div className="adm-panel-body">
          {projects.filter((p) => p.image).length === 0 ? <Empty icon="▦" title="No gallery images yet" sub="Add project images to populate the gallery." /> : (
            <div className="adm-media-grid">
              {projects.filter((p) => p.image).map((p) => (
                <div key={p.id} className="adm-media-card">
                  <div className="adm-media-img"><img src={p.image} alt={p.title} /></div>
                  <div className="adm-media-info"><div className="adm-media-name">{p.title || 'Untitled'}</div><div className="adm-media-meta">{p.category || 'Project'}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   MEDIA LIBRARY
   ============================================================ */
function Media() {
  const api = useApi();
  const toast = useToast();
  const confirm = useConfirm();
  const [images, setImages] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    const data = await api('/admin/images');
    if (data.success) setImages(data.images);
  }, [api]);
  useEffect(() => { load(); }, [load]);

  const upload = async (files) => {
    if (!files || !files.length) return;
    setUploading(true);
    for (const file of files) {
      const fd = new FormData(); fd.append('image', file);
      await api('/admin/images', { method: 'POST', body: fd });
    }
    setUploading(false); toast('Upload complete', 'success'); load();
  };
  const del = async (name) => {
    if (!await confirm({ title: 'Delete image', message: 'This permanently deletes the image.', danger: true, confirmText: 'Delete' })) return;
    await api(`/admin/images/${name}`, { method: 'DELETE' });
    toast('Image deleted', 'success'); load();
  };
  const copy = (url) => { navigator.clipboard.writeText(`${API_ORIGIN}${url}`); toast('URL copied', 'success'); };

  return (
    <>
      <div className="adm-page-head"><div><h1>Media Library</h1><p>Upload and manage images</p></div></div>
      <div className={`adm-dropzone ${drag ? 'over' : ''}`} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files); }} onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => { upload(e.target.files); e.target.value = ''; }} />
        <div className="adm-drop-ico">⬆</div>
        <p>{uploading ? 'Uploading…' : 'Click or drag images to upload'}</p>
        <span>JPG, PNG, WebP · max 15MB</span>
      </div>
      <div className="adm-panel">
        <div className="adm-panel-body">
          {!images ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1rem' }}>{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} h={180} r={10} />)}</div> :
           images.length === 0 ? <Empty icon="☵" title="No images uploaded yet" sub="Upload images using the area above." /> : (
            <div className="adm-media-grid">
              {images.map((img) => (
                <div key={img.name} className="adm-media-card">
                  <div className="adm-media-img"><img src={`${API_ORIGIN}${img.url}`} alt={img.name} loading="lazy" /></div>
                  <div className="adm-media-info"><div className="adm-media-name">{img.name}</div><div className="adm-media-meta">{fmtSize(img.size)} · {timeAgo(img.uploadedAt)}</div></div>
                  <div className="adm-media-actions">
                    <button onClick={() => copy(img.url)}>Copy URL</button>
                    <a href={`${API_ORIGIN}${img.url}`} target="_blank" rel="noreferrer">Open</a>
                    <button className="danger" onClick={() => del(img.name)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   SEO
   ============================================================ */
function SEO() {
  const api = useApi();
  const toast = useToast();
  const [seo, setSeo] = useState(null);
  const [page, setPage] = useState('home');
  useEffect(() => { api('/admin/seo').then((d) => setSeo(d.data || {})); }, []);
  if (!seo) return <div className="adm-panel"><div className="adm-panel-body"><Skeleton h={200} /></div></div>;
  const pages = ['home', 'about', 'services', 'residential', 'philosophy', 'contact'];
  const cur = seo[page] || {};
  const save = async () => {
    const next = { ...seo, [page]: cur };
    await api('/admin/seo', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(next) });
    setSeo(next); toast('SEO saved', 'success');
  };
  return (
    <>
      <div className="adm-page-head"><div><h1>SEO</h1><p>Manage meta tags for each page</p></div></div>
      <div className="adm-tabs" style={{ marginBottom: '1.25rem' }}>
        {pages.map((p) => <button key={p} className={page === p ? 'active' : ''} onClick={() => setPage(p)} style={{ textTransform: 'capitalize' }}>{p}</button>)}
      </div>
      <div className="adm-grid-2">
        <div className="adm-panel">
          <div className="adm-panel-head"><h3>Meta Information</h3></div>
          <div className="adm-panel-body">
            <Field label="Meta Title"><Input value={cur.title || ''} onChange={(e) => setSeo({ ...seo, [page]: { ...cur, title: e.target.value } })} placeholder="Renovate Max2Max Inc." /></Field>
            <Field label="Meta Description"><Textarea value={cur.description || ''} onChange={(e) => setSeo({ ...seo, [page]: { ...cur, description: e.target.value } })} placeholder="Professional renovation services in Edmonton…" /></Field>
            <Field label="Keywords"><Input value={cur.keywords || ''} onChange={(e) => setSeo({ ...seo, [page]: { ...cur, keywords: e.target.value } })} placeholder="renovation, tile, edmonton" /></Field>
            <Field label="OG Image URL"><Input value={cur.ogImage || ''} onChange={(e) => setSeo({ ...seo, [page]: { ...cur, ogImage: e.target.value } })} placeholder="/images/logo.png" /></Field>
            <button className="adm-btn adm-btn-primary" onClick={save}>Save SEO</button>
          </div>
        </div>
        <div className="adm-panel">
          <div className="adm-panel-head"><h3>Search Preview</h3></div>
          <div className="adm-panel-body">
            <div style={{ fontFamily: 'Arial', border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', background: '#fff' }}>
              <div style={{ fontSize: '.78rem', color: '#202124' }}>https://renovate-max-2-max-inc.vercel.app</div>
              <div style={{ fontSize: '1.1rem', color: '#1a0dab', marginTop: '.2rem' }}>{cur.title || 'Renovate Max2Max Inc.'}</div>
              <div style={{ fontSize: '.82rem', color: '#4d5156', marginTop: '.15rem' }}>{cur.description || 'Professional tile installation, bathroom upgrades, custom showers, waterproofing, kitchen backsplashes, flooring and renovation services in Edmonton, Alberta.'}</div>
            </div>
            <p className="adm-muted" style={{ marginTop: '1rem' }}>This is approximately how your page appears in Google search results.</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   SETTINGS
   ============================================================ */
function Settings() {
  const api = useApi();
  const toast = useToast();
  const [s, setS] = useState(null);
  useEffect(() => { api('/admin/settings').then((d) => setS(d.data || {})); }, []);
  if (!s) return <div className="adm-panel"><div className="adm-panel-body"><Skeleton h={200} /></div></div>;
  const save = async () => { await api('/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) }); toast('Settings saved', 'success'); };
  return (
    <>
      <div className="adm-page-head"><div><h1>Settings</h1><p>Manage your website configuration</p></div>
        <button className="adm-btn adm-btn-primary" onClick={save}>Save Changes</button></div>
      <div className="adm-grid-2">
        <div className="adm-panel">
          <div className="adm-panel-head"><h3>General</h3></div>
          <div className="adm-panel-body">
            <Field label="Website Name"><Input value={s.siteName || ''} onChange={(e) => setS({ ...s, siteName: e.target.value })} /></Field>
            <Field label="Tagline"><Input value={s.tagline || ''} onChange={(e) => setS({ ...s, tagline: e.target.value })} /></Field>
            <Field label="Logo URL"><Input value={s.logo || ''} onChange={(e) => setS({ ...s, logo: e.target.value })} placeholder="/images/logo.png" /></Field>
          </div>
        </div>
        <div className="adm-panel">
          <div className="adm-panel-head"><h3>Contact</h3></div>
          <div className="adm-panel-body">
            <Field label="Phone"><Input value={s.phone || ''} onChange={(e) => setS({ ...s, phone: e.target.value })} placeholder="437-869-8609" /></Field>
            <Field label="Email"><Input value={s.email || ''} onChange={(e) => setS({ ...s, email: e.target.value })} placeholder="Renovatemax2max@gmail.com" /></Field>
            <Field label="Address"><Input value={s.address || ''} onChange={(e) => setS({ ...s, address: e.target.value })} placeholder="Edmonton, Alberta" /></Field>
          </div>
        </div>
        <div className="adm-panel">
          <div className="adm-panel-head"><h3>Social</h3></div>
          <div className="adm-panel-body">
            <Field label="Instagram"><Input value={s.instagram || ''} onChange={(e) => setS({ ...s, instagram: e.target.value })} /></Field>
            <Field label="Facebook"><Input value={s.facebook || ''} onChange={(e) => setS({ ...s, facebook: e.target.value })} /></Field>
            <Field label="WhatsApp"><Input value={s.whatsapp || ''} onChange={(e) => setS({ ...s, whatsapp: e.target.value })} /></Field>
          </div>
        </div>
        <div className="adm-panel">
          <div className="adm-panel-head"><h3>Security</h3></div>
          <div className="adm-panel-body">
            <p className="adm-muted">Admin password is managed via the <code>ADMIN_PASSWORD</code> environment variable on your hosting provider (Render). Change it there to update login credentials.</p>
            <div className="adm-divider" />
            <Field label="Current Session"><Input value="Active · single-admin" readOnly /></Field>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   ACTIVITY LOGS
   ============================================================ */
function Activity() {
  const api = useApi();
  const [logs, setLogs] = useState(null);
  useEffect(() => { api('/admin/activity').then((d) => d.success && setLogs(d.data)); }, []);
  if (!logs) return <div className="adm-panel"><TableSkeleton /></div>;
  return (
    <>
      <div className="adm-page-head"><div><h1>Activity Logs</h1><p>Recent admin actions</p></div></div>
      <div className="adm-panel">
        <div className="adm-panel-body" style={{ padding: 0 }}>
          {logs.length === 0 ? <Empty icon="⏱" title="No activity yet" /> : logs.map((a) => (
            <div key={a.id} className="adm-act" style={{ padding: '.85rem 1.25rem' }}>
              <div className="adm-act-ico">{actIcon(a.action)}</div>
              <div className="adm-act-body">
                <div className="adm-act-title">{actLabel(a.action)}{a.label ? ` · ${a.label}` : ''}</div>
                <div className="adm-act-meta">{new Date(a.at).toLocaleString()} · {timeAgo(a.at)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   USERS (single-admin — shows profile)
   ============================================================ */
function Users() {
  return (
    <>
      <div className="adm-page-head"><div><h1>Users</h1><p>Admin account management</p></div></div>
      <div className="adm-panel">
        <div className="adm-panel-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="adm-avatar" style={{ width: 56, height: 56, fontSize: '1.2rem' }}>A</div>
            <div><div style={{ fontWeight: 600, fontSize: '1rem' }}>Administrator</div><div className="adm-muted">Super Admin · Single-admin mode</div></div>
          </div>
          <div className="adm-divider" />
          <p className="adm-muted">This deployment uses single-admin authentication. To enable multiple users with roles (Super Admin, Admin, Editor), the backend would need user accounts, JWT sessions, and a permissions system. That's available as a future upgrade.</p>
          <div className="adm-divider" />
          <Field label="Role"><Input value="Super Admin (full access)" readOnly /></Field>
          <Field label="Last Login"><Input value={new Date().toLocaleString()} readOnly /></Field>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [view, setView] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const logout = () => { localStorage.removeItem('admin_token'); setToken(''); };

  if (!token) return (
    <ToastProvider><ConfirmProvider>
      <Login onLogin={() => setToken(localStorage.getItem('admin_token'))} />
    </ConfirmProvider></ToastProvider>
  );

  const pages = { dashboard: Dashboard, enquiries: Enquiries, services: Services, projects: Projects, testimonials: Testimonials, gallery: Gallery, media: Media, seo: SEO, settings: Settings, activity: Activity, users: Users };
  const Page = pages[view] || Dashboard;

  return (
    <ToastProvider><ConfirmProvider>
      <Layout view={view} setView={setView} collapsed={collapsed} setCollapsed={setCollapsed} onLogout={logout}>
        <Page go={setView} />
      </Layout>
    </ConfirmProvider></ToastProvider>
  );
}
