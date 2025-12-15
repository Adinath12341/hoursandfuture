import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutBook from './pages/AboutBook';
import AboutAuthor from './pages/AboutAuthor';
import Chapters from './pages/Chapters';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import NextHours from './pages/NextHours';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ComingSoon from './pages/ComingSoon';
import { AuthProvider } from './context/AuthContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-page-enter min-h-[80vh]">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<AboutBook />} />
        <Route path="/author" element={<AboutAuthor />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/speaking" element={<Contact />} />
        <Route path="/nexthours" element={<NextHours />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-brand-gold selection:text-black">
          
          {/* Global Noise Texture */}
          <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[5] mix-blend-overlay" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>

          {/* Global Grid Lines */}
          <div className="fixed inset-0 pointer-events-none z-[0] bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

          {/* Navigation (Sidebar on Desktop, Topbar on Mobile) */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow relative z-10 flex flex-col w-full md:w-[calc(100%-16rem)] md:ml-64 transition-all duration-300">
             <div className="flex-grow">
                <AnimatedRoutes />
             </div>
             <Footer />
          </main>

        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;