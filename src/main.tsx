import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@mui/material';

import TreeView from './modules/tree/components/TreeView/TreeView';
import { darkTheme } from './modules/core/theme/theme';

import './assets/styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <TreeView />
    </ThemeProvider>
  </StrictMode>
);
