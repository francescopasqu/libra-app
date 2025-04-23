import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import LibraAI from "./pages/LibraAI";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Maintenance from "./pages/Maintenance";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const maintenanceMode = false;

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  if (maintenanceMode) return <Maintenance />;

  return (
    <div className="min-h-screen bg-light text-gray-800">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/libra-ai" element={<LibraAI />} />
          <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
          {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </div>
    </div>
  );
}

export default App;
