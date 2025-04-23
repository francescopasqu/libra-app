import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar({ isLoggedIn: propLoggedIn, setIsLoggedIn: setPropLoggedIn }) {
  const navigate = useNavigate();
  const [localLoggedIn, setLocalLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLoggedIn = propLoggedIn !== undefined ? propLoggedIn : localLoggedIn;
  const setIsLoggedIn = setPropLoggedIn !== undefined ? setPropLoggedIn : setLocalLoggedIn;

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setLocalLoggedIn(status);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-accent font-semibold underline transition-colors"
      : "hover:text-accent transition-colors";

  return (
    <>
      <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">Libra</h1>
        <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/services" className={linkClass}>Services</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/book" className={linkClass}>Book</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <NavLink to="/libra-ai" className={linkClass}>Libra AI</NavLink>
          {!isLoggedIn ? (
            <NavLink to="/auth" className={linkClass}>Login</NavLink>
          ) : (
            <button onClick={handleLogout} className="hover:text-accent transition-colors">Logout</button>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6 animate-fadeIn">
          <div className="bg-primary w-full max-w-xs p-6 rounded-2xl shadow-2xl relative animate-slideIn">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X />
            </button>
            <nav className="flex flex-col items-start space-y-6 mt-10 text-white text-lg font-medium">
              <NavLink to="/" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
              <NavLink to="/services" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Services</NavLink>
              <NavLink to="/about" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
              <NavLink to="/book" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Book</NavLink>
              <NavLink to="/contact" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
              <NavLink to="/libra-ai" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Libra AI</NavLink>
              {!isLoggedIn ? (
                <NavLink to="/auth" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink>
              ) : (
                <button onClick={handleLogout} className="hover:text-accent transition-colors">Logout</button>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
