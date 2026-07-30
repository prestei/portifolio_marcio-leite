import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename={basename === '/' ? undefined : basename}>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
