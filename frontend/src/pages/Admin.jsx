import { useEffect, useState, useCallback } from 'react';
import './Admin.css';

const API = 'http://localhost:5000/api';

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const fetchQuotes = useCallback(async (t) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/quotes`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setQuotes(data.quotes);
      } else if (res.status === 401) {
        localStorage.removeItem('admin_token');
        setToken('');
      }
    } catch {
      /* keep existing list */
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) fetchQuotes(token);
  }, [token, fetchQuotes]);

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
      setLoginError('Could not connect to server. Is the backend running?');
    }
    setLoggingIn(false);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setQuotes([]);
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API}/admin/quotes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchQuotes(token);
  };

  const deleteQuote = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    await fetch(`${API}/admin/quotes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchQuotes(token);
  };

  if (!token) {
    return (
      <div className="admin-page">
        <div className="ad-login">
          <img src="/images/logo.png" alt="Renovate Max2Max" className="ad-logo" />
          <h1>Admin Panel</h1>
          <p>Sign in to manage quote inquiries</p>
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

  const counts = {
    all: quotes.length,
    new: quotes.filter((q) => q.status === 'new').length,
    contacted: quotes.filter((q) => q.status === 'contacted').length,
    done: quotes.filter((q) => q.status === 'done').length,
  };
  const visible = filter === 'all' ? quotes : quotes.filter((q) => q.status === filter);

  return (
    <div className="admin-page">
      <div className="ad-dash">
        <div className="ad-topbar">
          <div className="ad-brand">
            <img src="/images/logo.png" alt="" />
            <span>Admin Panel</span>
          </div>
          <div className="ad-topbar-actions">
            <a href="#/" className="ad-back">View Website</a>
            <button className="ad-refresh" onClick={() => fetchQuotes(token)} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            <button className="ad-logout" onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="ad-stats">
          <button className={filter === 'all' ? 'ad-stat active' : 'ad-stat'} onClick={() => setFilter('all')}>
            <span className="num">{counts.all}</span>
            <span className="lbl">Total Inquiries</span>
          </button>
          <button className={filter === 'new' ? 'ad-stat active' : 'ad-stat'} onClick={() => setFilter('new')}>
            <span className="num">{counts.new}</span>
            <span className="lbl">New</span>
          </button>
          <button className={filter === 'contacted' ? 'ad-stat active' : 'ad-stat'} onClick={() => setFilter('contacted')}>
            <span className="num">{counts.contacted}</span>
            <span className="lbl">Contacted</span>
          </button>
          <button className={filter === 'done' ? 'ad-stat active' : 'ad-stat'} onClick={() => setFilter('done')}>
            <span className="num">{counts.done}</span>
            <span className="lbl">Done</span>
          </button>
        </div>

        {visible.length === 0 ? (
          <div className="ad-empty">
            <p>No inquiries {filter !== 'all' ? `marked "${filter}"` : 'yet'}.</p>
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
                    <span className="ad-date">{new Date(q.createdAt).toLocaleString()}</span>
                    <span className="ad-caret">{expanded === q.id ? '−' : '+'}</span>
                  </div>
                </button>
                {expanded === q.id && (
                  <div className="ad-card-body">
                    {q.email && <p><strong>Email:</strong> <a href={`mailto:${q.email}`}>{q.email}</a></p>}
                    <p><strong>Phone:</strong> <a href={`tel:${q.phone}`}>{q.phone}</a></p>
                    {q.type && <p><strong>Project Type:</strong> {q.type}</p>}
                    {q.details && <p><strong>Details:</strong> {q.details}</p>}
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
    </div>
  );
}
