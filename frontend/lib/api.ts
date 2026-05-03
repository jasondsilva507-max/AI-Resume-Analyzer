import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      Cookies.remove('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(err);
  }
);

// ─── Auth ───────────────────────────────────────────────────────────────────
export const authAPI = {
  signup: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  googleAuth: (token: string) =>
    api.post('/auth/google', { token }),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
  me: () => api.get('/auth/me'),
};

// ─── Resume ─────────────────────────────────────────────────────────────────
export const resumeAPI = {
  parse: (file: File) => {
    const fd = new FormData();
    fd.append('resume', file);
    return api.post('/resume/parse', fd);
  },
  analyze: (resumeText: string, jobDesc?: string) =>
    api.post('/resume/analyze', { resumeText, jobDesc }),
  getAll: () => api.get('/resume'),
  getOne: (id: string) => api.get(`/resume/${id}`),
  delete: (id: string) => api.delete(`/resume/${id}`),
};

// ─── Reports ────────────────────────────────────────────────────────────────
export const reportAPI = {
  getAll: () => api.get('/reports'),
  getOne: (id: string) => api.get(`/reports/${id}`),
  exportPDF: (id: string) =>
    api.get(`/reports/${id}/export`, { responseType: 'blob' }),
};

// ─── User ────────────────────────────────────────────────────────────────────
export const userAPI = {
  update: (data: any) => api.put('/user/profile', data),
  getUsage: () => api.get('/user/usage'),
};

// ─── Admin ────────────────────────────────────────────────────────────────────
export const adminAPI = {
  getUsers: (page = 1) => api.get(`/admin/users?page=${page}`),
  getStats: () => api.get('/admin/stats'),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
};

export default api;
