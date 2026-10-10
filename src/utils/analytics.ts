import { getApps, initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAnalytics, initializeAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics';

const QA_FIREBASE_CONFIG: FirebaseOptions = {
  apiKey: 'AIzaSyBm0-qZcaO0ZfS5H3f2wweGlS0NWoEIQpQ',
  authDomain: 'aura-qa-8017d.firebaseapp.com',
  projectId: 'aura-qa-8017d',
  storageBucket: 'aura-qa-8017d.firebasestorage.app',
  messagingSenderId: '686510602842',
  appId: '1:686510602842:web:23ef19a100c1e2fcc0f663',
  measurementId: 'G-XSC59PC8TP',
};

const PROD_FIREBASE_CONFIG: FirebaseOptions = {
  apiKey: 'AIzaSyDa6OIqS2W9UcW6FrKymqGFUBByTiPzeNc',
  authDomain: 'aura-1732146305241.firebaseapp.com',
  projectId: 'aura-1732146305241',
  storageBucket: 'aura-1732146305241.firebasestorage.app',
  messagingSenderId: '732945909223',
  appId: '1:732945909223:web:15aa3030ee8bab027aa942',
  measurementId: 'G-T5PR4FRJEE',
};

let analyticsPromise: Promise<Analytics | null> | null = null;
let lastPageViewKey = '';

export function getFirebaseConfig(): FirebaseOptions {
  const env = String(import.meta.env.PUBLIC_DEPLOY_ENV ?? 'qa').toLowerCase();
  if (env === 'prod' || env === 'production') return PROD_FIREBASE_CONFIG;
  return QA_FIREBASE_CONFIG;
}

async function loadAnalytics(): Promise<Analytics | null> {
  if (!(await isSupported())) return null;

  const apps = getApps();
  const app = apps.length ? apps[0] : initializeApp(getFirebaseConfig());
  try {
    return initializeAnalytics(app, {
      config: { send_page_view: false },
    });
  } catch {
    return getAnalytics(app);
  }
}

export function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (!analyticsPromise) analyticsPromise = loadAnalytics().catch(() => null);
  return analyticsPromise;
}

export function trackCurrentPageView() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const pageName = path ? path.replace(/\//g, '_') : 'home';
  return trackPageView(pageName);
}

export async function trackPageView(pageName: string) {
  const pageKey = `${pageName}|${window.location.pathname}${window.location.search}`;
  if (lastPageViewKey === pageKey) return;
  lastPageViewKey = pageKey;

  const analytics = await initAnalytics();
  if (!analytics) return;

  logEvent(analytics, 'page_view', {
    page_name: pageName,
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
}

export async function trackClick(pageName: string, buttonName: string) {
  const analytics = await initAnalytics();
  if (!analytics) return;

  logEvent(analytics, 'button_click', {
    page_name: pageName,
    button_name: buttonName,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
}

export function bindTrackedClick(element: Element | null, pageName: string, buttonName: string) {
  if (!(element instanceof HTMLElement) || element.dataset.analyticsBound === '1') return;
  element.dataset.analyticsBound = '1';
  element.addEventListener('click', () => {
    void trackClick(pageName, buttonName);
  });
}
