import Navbar from "../components/Navbar";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

function Signup({ setIsLoggedIn }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!email || !password || !confirmPassword) {
      setError("Compila tutti i campi.")
      return
    }

    if (password !== confirmPassword) {
      setError("Le password non coincidono.")
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    const userId = data.user?.id
    if (!userId) {
      setError("Errore imprevisto: utente non creato.")
      return
    }

    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId,
        email: email,
        full_name: "", // Puoi aggiungere un campo input per il nome, se vuoi
      },
    ])

    if (profileError) {
      setError("Registrazione avvenuta, ma non è stato possibile creare il profilo.")
    } else {
      localStorage.setItem("isLoggedIn", "true")
      setIsLoggedIn(true)
      navigate("/dashboard")
    }
  }

  return (
    <>
      <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-light p-4">
      <h2 className="text-2xl font-bold mb-6 text-primary">SignIn</h2>
      <form onSubmit={handleSignup} className="flex flex-col items-center">
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
          className="mb-3 px-4 py-2 w-64 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Conferma Password"
          className="mb-4 px-4 py-2 w-64 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-accent text-white px-6 py-2 rounded hover:bg-blue-400 transition-colors"
        >
          SignIn
        </button>
        <p className="text-sm mt-3 text-gray-600">
          Hai già un account?{" "}
          <Link to="/" className="text-accent font-medium hover:underline">Accedi</Link>
        </p>
      </form>
    </div>
    </>
  )
}

export default Signup
