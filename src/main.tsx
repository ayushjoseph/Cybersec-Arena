import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ProgressProvider } from './lib/progress.tsx';
import { createStorageService } from './config/storage';

const storage = createStorageService();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProgressProvider storage={storage}>
      <App />
    </ProgressProvider>
  </StrictMode>
);
