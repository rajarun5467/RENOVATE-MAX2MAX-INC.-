const base = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');
const API = base.endsWith('/api') ? base : `${base}/api`;
export default API;
