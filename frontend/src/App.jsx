import { useState } from 'react';
import CreateEventPage from './pages/events/CreateEventPage';
import CreateTemplatePage from './pages/templates/CreateTemplatePage';

const NAV_ITEMS = [
  { id: 'events', label: 'Crear Evento' },
  { id: 'templates', label: 'Crear Plantilla' },
];

export default function App() {
  const [page, setPage] = useState('events');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6fa' }}>
      <nav style={styles.nav}>
        <span style={styles.brand}>FoliosDocumentos ITSON</span>
        <div style={styles.navLinks}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                ...styles.navBtn,
                ...(page === item.id ? styles.navBtnActive : {}),
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      <main style={{ padding: '16px' }}>
        {page === 'events' && <CreateEventPage />}
        {page === 'templates' && <CreateTemplatePage />}
      </main>
    </div>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    height: 56,
    backgroundColor: '#1a1a2e',
    color: '#fff',
  },
  brand: { fontWeight: 700, fontSize: 16, letterSpacing: 0.5 },
  navLinks: { display: 'flex', gap: 8 },
  navBtn: {
    padding: '6px 16px',
    background: 'transparent',
    color: '#ccc',
    border: '1px solid transparent',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
  },
  navBtnActive: {
    color: '#fff',
    borderColor: '#fff',
  },
};
