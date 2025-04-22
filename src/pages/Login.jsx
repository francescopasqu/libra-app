import Navbar from "../components/Navbar";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Inserisci email e password.")
      return
    }

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError("Credenziali non valide.")
    } else if (data.user) {
      localStorage.setItem("isLoggedIn", "true")
      setIsLoggedIn(true)
      navigate("/dashboard")
    } else {
      setError("Accesso fallito. Riprova.")
    }
  }

  return (
    <>
      <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-light p-4">
      <h2 className="text-2xl font-bold mb-6 text-primary">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="mb-3 px-4 py-2 w-64 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 px-4 py-2 w-64 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-accent text-white px-6 py-2 rounded hover:bg-blue-400 transition-colors"
        >
          Accedi
        </button>
        <p className="text-sm mt-3 text-gray-600">
          Non hai un account?{" "}
          <Link to="/signup" className="text-accent font-medium hover:underline">Registrati</Link>
        </p>
      </form>
    </div>
    </>
  )
}

export default Login
