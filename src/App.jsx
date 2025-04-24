import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Maintenance from "./pages/Maintenance";
import Services from "./pages/Services";
import About from "./pages/About";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import CanvasAI from "./pages/CanvasAI";
import MarketStrategy from "./pages/MarketStrategy";
import IndustryFeed from "./pages/IndustryFeed";
import Support from "./pages/Support";
import Files from "./pages/Files";

// Funzione per determinare se una route è privata
const isProtectedRoute = (path) => {
  return [
    "/dashboard",
    "/canvas-ai",
    "/market-strategy",
    "/industry-feed",
    "/support",
    "/files"
  ].some((prefix) => path.startsWith(prefix));
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ⬅️ inizializza loading
  const maintenanceMode = false;
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setLoading(false); // ⬅️ loading finito dopo check
  }, []);

  if (maintenanceMode) return <Maintenance />;

  if (loading) return null; // ⬅️ evita glitch o return <Spinner /> per animazione

  return (
    <div className="min-h-screen bg-light text-gray-800">
      {!isProtectedRoute(location.pathname) && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <div className="p-4">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {/* PUBBLICHE */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />

            {/* PRIVATE (con layout sidebar) */}
            {isLoggedIn && (
              <Route element={<MainLayout setIsLoggedIn={setIsLoggedIn} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/canvas-ai" element={<CanvasAI />} />
                <Route path="/market-strategy" element={<MarketStrategy />} />
                <Route path="/industry-feed" element={<IndustryFeed />} />
                <Route path="/support" element={<Support />} />
                <Route path="/files" element={<Files />} />
              </Route>
            )}
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
