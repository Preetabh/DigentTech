import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { AboutPage } from './AboutPage';
import { AISolutions } from './AISolutions';
import { AppDevelopment } from './AppDevelopment';
import { CareersPage } from './CareersPage';
import { ContactPage } from './ContactPage';
import { DigitalMarketing } from './DigitalMarketing';
import GhostFibers from './GhostFibers';
import { ServicesPage } from './ServicesPage';
import { WebDevelopment } from './WebDevelopment';
import { WorkPage } from './WorkPage';
import type { RouteModuleSet } from './routeModules';
import { buildStructuredData, DEFAULT_OG_IMAGE, getPageSEO, SITE_URL } from './seo-data';

const SSR_PAGES: RouteModuleSet = {
  WorkPage,
  ServicesPage: ServicesPage as RouteModuleSet['ServicesPage'],
  WebDevelopment,
  AppDevelopment,
  DigitalMarketing,
  AISolutions,
  AboutPage,
  CareersPage,
  ContactPage,
  GhostFibers: GhostFibers as unknown as RouteModuleSet['GhostFibers'],
};

export function render(url: string) {
  const cleanUrl = url.split('?')[0].replace(/\/+$/, '') || '/';
  const html = renderToString(
    <React.StrictMode>
      <App initialPath={cleanUrl} initialSearch="" ssrPages={SSR_PAGES} />
    </React.StrictMode>
  );
  const seo = getPageSEO(cleanUrl);
  const canonicalUrl = `${SITE_URL}${seo.canonicalPath === '/' ? '/' : seo.canonicalPath}`;
  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;
  const jsonLd = buildStructuredData(seo);

  return {
    html,
    seo,
    canonicalUrl,
    ogImage,
    jsonLd,
  };
}
