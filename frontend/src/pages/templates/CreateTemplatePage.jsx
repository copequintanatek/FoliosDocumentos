import { useState } from 'react';
import { createTemplate } from '../../services/templateService';
import TemplateEditor from '../../components/TemplateEditor';

export default function CreateTemplatePage() {
  const [form, setForm] = useState({
    name: '',
    eventId: '',
    documentType: '',
    logoUrl: '',
    bodyText: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'El nombre de la plantilla es obligatorio.';
    if (!form.eventId || isNaN(Number(form.eventId)) || Number(form.eventId) < 1)
      errs.eventId = 'Ingresa un ID de evento válido.';
    if (!form.documentType) errs.documentType = 'Selecciona el tipo de documento.';
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
      const created = await createTemplate({
        name: form.name.trim(),
        eventId: Number(form.eventId),
        documentType: form.documentType,
        logoUrl: form.logoUrl.trim() || null,
        bodyText: form.bodyText.trim() || null,
      });
      setSuccessMessage(`Plantilla "${created.name}" (${created.documentType}) creada con ID ${created.id}.`);
      setForm({ name: '', eventId: '', documentType: '', logoUrl: '', bodyText: '' });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Diseñar Plantilla de Documento</h1>
      <p style={styles.subtitle}>Crea una plantilla para generar documentos oficiales de un evento.</p>

      {successMessage && <div style={styles.success}>{successMessage}</div>}
      {apiError && <div style={styles.error}>{apiError}</div>}

      <form onSubmit={handleSubmit} noValidate style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="name">Nombre de la plantilla *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Ej. Constancia Congreso 2026"
            style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
          />
          {errors.name && <span style={styles.fieldError}>{errors.name}</span>}
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="eventId">ID del Evento *</label>
          <input
            id="eventId"
            name="eventId"
            type="number"
            min="1"
            value={form.eventId}
            onChange={handleChange}
            placeholder="Ej. 1"
            style={{ ...styles.input, ...(errors.eventId ? styles.inputError : {}) }}
          />
          {errors.eventId && <span style={styles.fieldError}>{errors.eventId}</span>}
        </div>

        <TemplateEditor form={form} errors={errors} onChange={handleChange} />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Guardando...' : 'Crear Plantilla'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
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
  },
  inputError: { border: '1px solid #e53e3e' },
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
