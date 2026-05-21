import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { CartProvider } from './contexts/CartContext';
import { DonationProvider } from './contexts/DonationContext';
import Navbar from './components/navbar';
import './App.css';
import StickyBar from "./components/stickybar";



// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));


 

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // or smooth:
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {

  useEffect(() => {
    document.body.classList.add('banner-visible');
    return () => document.body.classList.remove('banner-visible');
  }, []);

  return (
    <Router>
      <CartProvider>
        <DonationProvider>
          <ScrollToTop />
          {/* <StickyBar /> */}
          <Navbar />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
             </Routes>
            </Suspense>
        </DonationProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
