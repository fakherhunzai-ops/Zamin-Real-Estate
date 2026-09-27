import { Routes, Route } from 'react-router-dom';
import { ShortlistProvider } from './context/ShortlistContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StickyContactBar from './components/layout/StickyContactBar';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import PropertiesForSalePage from './pages/PropertiesForSalePage';
import PropertiesForRentPage from './pages/PropertiesForRentPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import SellPropertyPage from './pages/SellPropertyPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import ValuationPage from './pages/ValuationPage';
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/BlogArticlePage';
import ToolsPage from './pages/ToolsPage';
import MortgageCalculatorPage from './pages/tools/MortgageCalculatorPage';
import RentalYieldCalculatorPage from './pages/tools/RentalYieldCalculatorPage';
import StampDutyCalculatorPage from './pages/tools/StampDutyCalculatorPage';
import ShortlistPage from './pages/ShortlistPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ToastProvider>
      <ShortlistProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties-for-sale" element={<PropertiesForSalePage />} />
              <Route path="/properties-for-rent" element={<PropertiesForRentPage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/sell-your-property" element={<SellPropertyPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/valuation" element={<ValuationPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/tools/mortgage-calculator" element={<MortgageCalculatorPage />} />
              <Route path="/tools/rental-yield-calculator" element={<RentalYieldCalculatorPage />} />
              <Route path="/tools/stamp-duty-calculator" element={<StampDutyCalculatorPage />} />
              <Route path="/shortlist" element={<ShortlistPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <StickyContactBar />
        </div>
      </ShortlistProvider>
    </ToastProvider>
  );
}
