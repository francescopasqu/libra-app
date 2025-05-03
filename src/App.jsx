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
import Profile from "./pages/Profile";
import Questionnaire from "./pages/Questionnaire";

// ✅ Funzione per sapere se la route è pubblica (navbar visibile solo su queste)
const isPublicRoute = (path) => {
  return [
    "/",
    "/services",
    "/about",
    "/book",
    "/contact",
    "/auth",
    "/questionnaire"

  ].includes(path);
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const maintenanceMode = false;
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setLoading(false);
  }, []);

  if (maintenanceMode) return <Maintenance />;
  if (loading) return null; // oppure uno spinner se vuoi

  return (
    <div className="min-h-screen bg-light text-gray-800">
      {isPublicRoute(location.pathname) && <Navbar />}

      <div className="p-4">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {/* 🌐 Pagine pubbliche */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/questionnaire" element={<Questionnaire />} />

            {/* 🔒 Pagine private (solo se loggato) */}
            {isLoggedIn && (
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/canvas-ai" element={<CanvasAI />} />
                <Route path="/market-strategy" element={<MarketStrategy />} />
                <Route path="/industry-feed" element={<IndustryFeed />} />
                <Route path="/support" element={<Support />} />
                <Route path="/files" element={<Files />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            )}
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
