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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => resolveRouteFromLocation());
  const [menuTargetSection, setMenuTargetSection] = useState<string | undefined>(undefined);

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
    setMenuTargetSection(page === 'menu' ? sectionId : undefined);

    const nextHash = page === 'home' ? '' : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash || window.location.pathname);
    }

    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen flex flex-col bg-[#FFF8F6] text-[#211A17]">
          <Header currentPage={currentPage} onNavigate={handleNavigate} />

          <main className="flex-1 w-full pt-16 md:pt-20">
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {currentPage === 'menu' && <MenuPage initialSection={menuTargetSection} />}
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
