import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ isLoggedIn: propLoggedIn, setIsLoggedIn: setPropLoggedIn }) {
  const navigate = useNavigate();
  const [localLoggedIn, setLocalLoggedIn] = useState(false);

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
    <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-semibold tracking-wide">Libra</h1>
      <div className="space-x-6 text-sm font-medium flex items-center">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/services" className={linkClass}>Services</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
        <NavLink to="/book" className={linkClass}>Book</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        <NavLink to="/libra-ai" className={linkClass}>Libra AI</NavLink>

        {!isLoggedIn ? (
          <NavLink to="/auth" className={linkClass}>Login / Signup</NavLink>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-accent transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
