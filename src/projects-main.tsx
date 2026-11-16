import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AllProjects from './pages/AllProjects';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AllProjects />
  </StrictMode>,
);
