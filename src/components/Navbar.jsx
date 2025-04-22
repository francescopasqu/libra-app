import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ isLoggedIn: propLoggedIn, setIsLoggedIn: setPropLoggedIn }) {
  const navigate = useNavigate();

  const [localLoggedIn, setLocalLoggedIn] = useState(false);

  // Se non riceve props, usa lo stato interno
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

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-semibold tracking-wide">Libra</h1>
      <div className="space-x-6 text-sm font-medium flex items-center">
        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
        <Link to="/services" className="hover:text-accent transition-colors">Services</Link>
        <Link to="/about" className="hover:text-accent transition-colors">About</Link>
        <Link to="/book" className="hover:text-accent transition-colors">Book</Link>
        <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
        <Link to="/libra-ai" className="hover:text-accent transition-colors">Libra AI</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:text-accent transition-colors">Login</Link>
            <Link to="/signup" className="hover:text-accent transition-colors">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="hover:text-accent transition-colors">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
