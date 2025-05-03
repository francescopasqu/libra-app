// ✅ Sidebar.jsx aggiornato
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Grid3X3,
  LineChart,
  Newspaper,
  Folder,
  MessageCircle,
  LogOut,
  Menu,
  X,
  User,
  ClipboardList, // aggiunto
} from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ setIsLoggedIn }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user_email");
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/canvas-ai", label: "Canvas AI", icon: Grid3X3 },
    { to: "/market-strategy", label: "Market Strategy", icon: LineChart },
    { to: "/industry-feed", label: "Industry Feed", icon: Newspaper },
    { to: "/files", label: "Files", icon: Folder },
    { to: "/support", label: "Support", icon: MessageCircle },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/questionnaire", label: "Questionnaire", icon: ClipboardList }, // 👈 Aggiunto qui
  ];

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-accent font-semibold underline transition"
      : "hover:text-accent transition";

  return (
    <>
      {/* 🔹 Top bar for mobile */}
      <div className="md:hidden p-4 bg-primary text-white shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Libra</h1>
        <button onClick={() => setMobileOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* 🔹 Desktop sidebar */}
      <aside className="hidden md:flex w-64 p-6 bg-primary text-white min-h-screen flex-col shadow-md">
        <nav className="flex flex-col space-y-4 text-sm font-medium">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon className="inline w-4 h-4 mr-2" />
              {label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center text-left hover:text-accent transition mt-4"
          >
            <LogOut className="inline w-4 h-4 mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* 🔹 Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-64 z-50 bg-primary text-white p-6 shadow-lg"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Libra</h1>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col space-y-4 text-sm font-medium">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={linkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="inline w-4 h-4 mr-2" />
                    {label}
                  </NavLink>
                ))}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center text-left hover:text-accent transition mt-4"
                >
                  <LogOut className="inline w-4 h-4 mr-2" />
                  Logout
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
