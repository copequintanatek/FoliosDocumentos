const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getEvents() {
  const res = await fetch(`${API_BASE}/api/events`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener eventos');
  return res.json();
}

export async function getEventById(id) {
  const res = await fetch(`${API_BASE}/api/events/${id}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Evento no encontrado');
  return res.json();
}

export async function createEvent(data) {
  const res = await fetch(`${API_BASE}/api/events`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Error al crear evento' }));
    throw new Error(err.message ?? 'Error al crear evento');
  }
  return res.json();
}
