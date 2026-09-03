/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { FloatingScrollTop } from './components/layout/FloatingScrollTop';
import { ScrollProgressIndicator } from './components/common/ScrollProgressIndicator';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { SkillsPage } from './pages/SkillsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { CertificatesPage } from './pages/CertificatesPage';
import { EducationPage } from './pages/EducationPage';
import { ResumePage } from './pages/ResumePage';
import { GitHubPage } from './pages/GitHubPage';
import { YouTubePage } from './pages/YouTubePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { NotFound } from './pages/NotFound';
import { I18nProvider } from './context/I18nContext';
import { SearchProvider } from './context/SearchContext';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <Router>
            <SearchProvider>
              <ScrollToTop />
              <ScrollProgressIndicator />
              <GlobalSearchModal />
              <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-cyan-500 selection:text-white">
                <Navbar />
                <div className="flex-1 pb-16 md:pb-0">
                <Routes>
                {/* Main Menu Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/portfolio" element={<Projects />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetails />} />
                <Route path="/blog" element={<ArticlesPage />} />
                <Route path="/blog/:slug" element={<ArticleDetailPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/articles/:slug" element={<ArticleDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* User Menu & CTA Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/get-started" element={<GetStartedPage />} />

                {/* Additional Portfolio Routes */}
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/certificates" element={<CertificatesPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/github" element={<GitHubPage />} />
                <Route path="/youtube" element={<YouTubePage />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <MobileBottomNav />
            <FloatingScrollTop />
          </div>
        </SearchProvider>
      </Router>
      </AuthProvider>
    </I18nProvider>
  </ThemeProvider>
  );
}

