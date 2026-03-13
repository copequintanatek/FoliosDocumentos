import { useState } from 'react';
import { createEvent } from '../../services/eventService';

const today = new Date().toISOString().split('T')[0];

export default function CreateEventPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    eventDate: today,
    organizerName: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'El nombre del evento es obligatorio.';
    if (!form.eventDate) errs.eventDate = 'La fecha del evento es obligatoria.';
    else if (form.eventDate < today) errs.eventDate = 'La fecha debe ser actual o futura.';
    if (!form.organizerName.trim()) errs.organizerName = 'El organizador es obligatorio.';
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
    setApiError('');
    setSuccessMessage('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      const created = await createEvent({
        name: form.name.trim(),
        description: form.description.trim() || null,
        eventDate: new Date(form.eventDate).toISOString(),
        organizerName: form.organizerName.trim(),
      });
      setSuccessMessage(`Evento "${created.name}" creado con folio ID ${created.id}.`);
      setForm({ name: '', description: '', eventDate: today, organizerName: '' });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Crear Evento</h1>
      <p style={styles.subtitle}>Registra un nuevo evento para generar documentos oficiales.</p>

      {successMessage && <div style={styles.success}>{successMessage}</div>}
      {apiError && <div style={styles.error}>{apiError}</div>}

      <form onSubmit={handleSubmit} noValidate style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="name">Nombre del evento *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Ej. Congreso de Tecnología Educativa"
            style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
          />
          {errors.name && <span style={styles.fieldError}>{errors.name}</span>}
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción opcional del evento"
            rows={3}
            style={styles.textarea}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="eventDate">Fecha del evento *</label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            value={form.eventDate}
            min={today}
            onChange={handleChange}
            style={{ ...styles.input, ...(errors.eventDate ? styles.inputError : {}) }}
          />
          {errors.eventDate && <span style={styles.fieldError}>{errors.eventDate}</span>}
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="organizerName">Organizador responsable *</label>
          <input
            id="organizerName"
            name="organizerName"
            type="text"
            value={form.organizerName}
            onChange={handleChange}
            placeholder="Nombre del responsable"
            style={{ ...styles.input, ...(errors.organizerName ? styles.inputError : {}) }}
          />
          {errors.organizerName && <span style={styles.fieldError}>{errors.organizerName}</span>}
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Guardando...' : 'Crear Evento'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 560,
    margin: '48px auto',
    padding: '32px',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  title: { margin: '0 0 4px', fontSize: 24, fontWeight: 700, color: '#1a1a2e' },
  subtitle: { margin: '0 0 24px', color: '#666', fontSize: 14 },
  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  field: { display: 'flex', flexDirection: 'column', gap: 4 },
  label: { fontSize: 14, fontWeight: 600, color: '#333' },
  input: {
    padding: '10px 12px',
    border: '1px solid #d0d0d0',
    borderRadius: 6,
    fontSize: 14,
    outline: 'none',
    transition: 'border 0.2s',
  },
  inputError: { border: '1px solid #e53e3e' },
  textarea: {
    padding: '10px 12px',
    border: '1px solid #d0d0d0',
    borderRadius: 6,
    fontSize: 14,
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  fieldError: { fontSize: 12, color: '#e53e3e' },
  button: {
    padding: '12px',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 4,
  },
  success: {
    padding: '12px 16px',
    backgroundColor: '#f0fff4',
    border: '1px solid #38a169',
    color: '#276749',
    borderRadius: 6,
    fontSize: 14,
    marginBottom: 16,
  },
  error: {
    padding: '12px 16px',
    backgroundColor: '#fff5f5',
    border: '1px solid #e53e3e',
    color: '#c53030',
    borderRadius: 6,
    fontSize: 14,
    marginBottom: 16,
  },
};
