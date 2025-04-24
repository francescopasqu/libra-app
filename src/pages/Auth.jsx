import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import { supabase } from "../lib/supabaseClient";

export default function Auth({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password || (!isLogin && !confirmPassword)) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user_email", email);
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-light py-12">
        <PageWrapper>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white shadow p-8 rounded-lg w-full max-w-md">
              <h1 className="text-2xl font-bold mb-4 text-center">
                {isLogin ? "Login to Libra" : "Create an Account"}
              </h1>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 border border-gray-300 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 border border-gray-300 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {!isLogin && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="p-3 border border-gray-300 rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-accent text-white py-2 rounded transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"}`}
                >
                  {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
                </button>
              </form>

              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

              <div className="text-sm text-center mt-4 text-muted">
                {isLogin ? (
                  <>
                    Don’t have an account?{" "}
                    <button className="text-accent underline" onClick={() => setIsLogin(false)}>
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button className="text-accent underline" onClick={() => setIsLogin(true)}>
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}
