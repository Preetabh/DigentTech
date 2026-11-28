import './utils/gsapConfig';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { preloadRouteModule } from './routeModules';
import './index.css';
import './home-luxury.css';
import './atelier-luxury.css';

async function mount() {
  const rootEl = document.getElementById('root') as HTMLElement;
  await preloadRouteModule(window.location.pathname);

  const appNode = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  if (rootEl.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootEl, appNode);
  } else {
    ReactDOM.createRoot(rootEl).render(appNode);
  }
}

mount();
