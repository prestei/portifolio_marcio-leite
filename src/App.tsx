import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { MusicPlayer } from './components/MusicPlayer';
import { AppRoutes } from './routes';

/** Vite base, or `/docs` when the build is opened under Live Server at /docs/. */
function resolveBasename(): string | undefined {
  const raw = import.meta.env.BASE_URL
  if (raw !== './' && raw !== '/') {
    return raw.replace(/\/$/, '') || undefined
  }
  if (typeof window !== 'undefined') {
    const { pathname } = window.location
    if (pathname === '/docs' || pathname.startsWith('/docs/')) {
      return '/docs'
    }
  }
  return undefined
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename={resolveBasename()}>
        <MusicPlayer />
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
