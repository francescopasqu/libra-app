import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Grid3X3,
  LineChart,
  Newspaper,
  Folder,
  MessageCircle,
  LogOut
} from "lucide-react";

export default function Sidebar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user_email");
    if (setIsLoggedIn) setIsLoggedIn(false); // ✅ forza lo stato
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-accent font-semibold underline transition"
      : "hover:text-accent transition";

  return (
    <aside className="w-full sm:w-64 p-6 bg-primary text-white min-h-screen shadow-md">
      <nav className="flex flex-col space-y-4 text-sm font-medium">
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard className="inline w-4 h-4 mr-2" />
          Dashboard
        </NavLink>
        <NavLink to="/canvas-ai" className={linkClass}>
          <Grid3X3 className="inline w-4 h-4 mr-2" />
          Canvas AI
        </NavLink>
        <NavLink to="/market-strategy" className={linkClass}>
          <LineChart className="inline w-4 h-4 mr-2" />
          Market Strategy
        </NavLink>
        <NavLink to="/industry-feed" className={linkClass}>
          <Newspaper className="inline w-4 h-4 mr-2" />
          Industry Feed
        </NavLink>
        <NavLink to="/files" className={linkClass}>
          <Folder className="inline w-4 h-4 mr-2" />
          Files
        </NavLink>
        <NavLink to="/support" className={linkClass}>
          <MessageCircle className="inline w-4 h-4 mr-2" />
          Support
        </NavLink>

        <button
          onClick={handleLogout}
          className="text-left hover:text-accent transition flex items-center mt-4"
        >
          <LogOut className="inline w-4 h-4 mr-2" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
