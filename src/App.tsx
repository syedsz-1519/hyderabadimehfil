import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { InstagramBubble } from './components/InstagramBubble';
import { MobileStickyBar } from './components/MobileStickyBar';
import { PageRoute } from './data/restaurantData';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';

function resolveRouteFromLocation(): PageRoute {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path.startsWith('/menu') || hash === '#menu') {
    return 'menu';
  }
  if (path.startsWith('/contact') || hash === '#contact') {
    return 'contact';
  }
  return 'home';
}

export type ThemeMode = 'light' | 'dark';

function resolveInitialTheme(): ThemeMode {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark';
  }
  try {
    return localStorage.getItem('hm-theme') === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => resolveRouteFromLocation());
  const [theme, setTheme] = useState<ThemeMode>(() => resolveInitialTheme());
  const [menuTargetRequest, setMenuTargetRequest] = useState<{ id: string; nonce: number } | undefined>(
    undefined
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('hm-theme', theme);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(resolveRouteFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleNavigate = (page: PageRoute, sectionId?: string) => {
    setCurrentPage(page);
    setMenuTargetRequest(
      page === 'menu' && sectionId ? { id: sectionId, nonce: Date.now() } : undefined
    );

    const nextHash = page === 'home' ? '' : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash || window.location.pathname);
    }

    if (page === 'home' && sectionId) {
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 90);
    } else if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen flex flex-col bg-[#FAF5EA] dark:bg-[#1A171D] text-[#1F1A17] dark:text-[#F7F1E3] transition-colors duration-200">
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />

          <main className="flex-1 w-full pt-16 md:pt-20">
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {currentPage === 'menu' && <MenuPage initialSectionRequest={menuTargetRequest} />}
            {currentPage === 'contact' && <ContactPage />}
          </main>

          <Footer />
          <InstagramBubble />
          <MobileStickyBar />
        </div>
      </MotionConfig>
    </ErrorBoundary>
  );
}
