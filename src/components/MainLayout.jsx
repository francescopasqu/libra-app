// ✅ MainLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout({ setIsLoggedIn }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      <main className="flex-1 bg-light p-6">
        <Outlet />
      </main>
    </div>
  );
}
