import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import {AppProviders} from '../shared/app-providers';

import {App} from './app.tsx';

import './reset.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
