import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Maintenance from "./pages/Maintenance" // ⬅️ aggiunto

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 👇 qui attivi o disattivi la modalità manutenzione
  const maintenanceMode = false // ⬅️ Cambia in true per mettere in pausa il sito

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  if (maintenanceMode) {
    return <Maintenance />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </div>
    </div>
  )
}

export default App
