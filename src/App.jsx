import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Maintenance from "./pages/Maintenance";
import Services from "./pages/Services";
import About from "./pages/About";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import Questionnaire from "./pages/Questionnaire";

// ✅ Rotte pubbliche (quelle dove vogliamo mostrare la Navbar)
const isPublicRoute = (path) => {
  return ["/", "/services", "/about", "/book", "/contact", "/questionnaire"].includes(
    path
  );
};

function App() {
  const maintenanceMode = false;
  const location = useLocation();

  if (maintenanceMode) return <Maintenance />;

  return (
    <div className="min-h-screen bg-light text-gray-800">
      {isPublicRoute(location.pathname) && <Navbar />}

      <div className="p-4">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {/* 🌐 Pagine pubbliche */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/questionnaire" element={<Questionnaire />} />

            {/* Fallback: qualunque altra route -> Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
