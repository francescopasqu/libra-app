import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-accent font-semibold underline transition-colors"
      : "hover:text-accent transition-colors";

  return (
    <>
      <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">
          <NavLink to="/" className="hover:text-accent">
            Libra
          </NavLink>
        </h1>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/services" className={linkClass}>
            Services
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/book" className={linkClass}>
            Book
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
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
              <NavLink
                to="/"
                className={linkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/services"
                className={linkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </NavLink>
              <NavLink
                to="/about"
                className={linkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/book"
                className={linkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book
              </NavLink>
              <NavLink
                to="/contact"
                className={linkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
