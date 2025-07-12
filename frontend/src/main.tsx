import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/index.tsx';
import { ThemeProvider } from './contexts/theme/index.ts';
import { Toaster } from './components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppRoutes />
      <Toaster position="top-center" />
    </ThemeProvider>
  </StrictMode>,
);
