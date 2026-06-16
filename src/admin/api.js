const BASE = '/api';
const tok = () => localStorage.getItem('adm_token');

async function req(method, path, body, isForm = false) {
  const headers = { Authorization: `Bearer ${tok()}` };
  if (!isForm) headers['Content-Type'] = 'application/json';

  const res = await fetch(BASE + path, {
    method,
    headers,
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return data;
}

export const api = {
  login: (email, password) => req('POST', '/auth/login', { email, password }),

  dashboard: () => req('GET', '/dashboard'),

  getProperties: () => req('GET', '/properties'),
  getProperty: (id) => req('GET', `/properties/${id}`),
  createProperty: (data) => req('POST', '/properties', data),
  updateProperty: (id, data) => req('PUT', `/properties/${id}`, data),
  deleteProperty: (id) => req('DELETE', `/properties/${id}`),
  updateStatus: (id, estado) => req('PATCH', `/properties/${id}/status`, { estado }),

  uploadPhotos: (propertyId, formData) => req('POST', `/photos/${propertyId}`, formData, true),
  deletePhoto: (id) => req('DELETE', `/photos/${id}`),
  reorderPhotos: (photos) => req('PUT', '/photos/reorder', { photos }),
};
