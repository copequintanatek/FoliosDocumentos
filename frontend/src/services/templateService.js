const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getTemplatesByEvent(eventId) {
  const res = await fetch(`${API_BASE}/api/templates/event/${eventId}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener plantillas');
  return res.json();
}

export async function getTemplateById(id) {
  const res = await fetch(`${API_BASE}/api/templates/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Plantilla no encontrada');
  return res.json();
}

export async function createTemplate(data) {
  const res = await fetch(`${API_BASE}/api/templates`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Error al crear plantilla' }));
    throw new Error(err.message ?? 'Error al crear plantilla');
  }
  return res.json();
}
