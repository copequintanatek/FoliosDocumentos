const DOCUMENT_TYPES = [
  { value: 'CONSTANCIA', label: 'Constancia' },
  { value: 'RECONOCIMIENTO', label: 'Reconocimiento' },
  { value: 'AGRADECIMIENTO', label: 'Agradecimiento' },
];

export default function TemplateEditor({ form, errors, onChange }) {
  return (
    <>
      <div style={styles.field}>
        <label style={styles.label} htmlFor="documentType">Tipo de documento *</label>
        <select
          id="documentType"
          name="documentType"
          value={form.documentType}
          onChange={onChange}
          style={{ ...styles.select, ...(errors.documentType ? styles.inputError : {}) }}
        >
          <option value="">-- Selecciona un tipo --</option>
          {DOCUMENT_TYPES.map(dt => (
            <option key={dt.value} value={dt.value}>{dt.label}</option>
          ))}
        </select>
        {errors.documentType && <span style={styles.fieldError}>{errors.documentType}</span>}
      </div>

      <div style={styles.field}>
        <label style={styles.label} htmlFor="logoUrl">URL del logo institucional</label>
        <input
          id="logoUrl"
          name="logoUrl"
          type="url"
          value={form.logoUrl}
          onChange={onChange}
          placeholder="https://ejemplo.com/logo.png"
          style={styles.input}
        />
        {form.logoUrl && (
          <img
            src={form.logoUrl}
            alt="Vista previa del logo"
            style={styles.logoPreview}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
        )}
      </div>

      <div style={styles.field}>
        <label style={styles.label} htmlFor="bodyText">Texto del documento</label>
        <textarea
          id="bodyText"
          name="bodyText"
          value={form.bodyText}
          onChange={onChange}
          placeholder="Se hace constar que [NOMBRE] participó en..."
          rows={5}
          style={styles.textarea}
        />
      </div>
    </>
  );
}

const styles = {
  field: { display: 'flex', flexDirection: 'column', gap: 4 },
  label: { fontSize: 14, fontWeight: 600, color: '#333' },
  input: {
    padding: '10px 12px',
    border: '1px solid #d0d0d0',
    borderRadius: 6,
    fontSize: 14,
  },
  inputError: { border: '1px solid #e53e3e' },
  select: {
    padding: '10px 12px',
    border: '1px solid #d0d0d0',
    borderRadius: 6,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  textarea: {
    padding: '10px 12px',
    border: '1px solid #d0d0d0',
    borderRadius: 6,
    fontSize: 14,
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  fieldError: { fontSize: 12, color: '#e53e3e' },
  logoPreview: {
    marginTop: 8,
    maxHeight: 60,
    maxWidth: 200,
    objectFit: 'contain',
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    padding: 4,
  },
};
