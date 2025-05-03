// ✅ Auth.jsx (Supreme Version)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import { supabase } from "../lib/supabaseClient";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
            {/* Form Container */}
            <div className="bg-white shadow p-8 rounded-lg w-full max-w-md mb-12">
              <h1 className="text-3xl font-bold mb-6 text-center text-primary">
                {isLogin ? "Login to Libra" : "Create an Account"}
              </h1>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {!isLogin && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent transition"
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

              {error && <p className="text-red-500 mt-3 text-sm text-center">{error}</p>}

              <div className="text-sm text-center mt-6 text-muted">
                {isLogin ? (
                  <>
                    Don’t have an account?{" "}
                    <button
                      className="text-accent underline hover:text-blue-500 transition"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      className="text-accent underline hover:text-blue-500 transition"
                      onClick={() => setIsLogin(true)}
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Testimonials Section */}
            <TestimonialsCarousel />
          </div>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}

// 🔹 Testimonials Carousel Component
function TestimonialsCarousel() {
  const testimonials = [
    {
      name: "Elena B.",
      comment: "Libra gave my startup the clarity and structure we were missing. A real game changer!"
    },
    {
      name: "Marco R.",
      comment: "The insights and dashboards helped me double my business performance in just 6 months."
    },
    {
      name: "Sophia L.",
      comment: "Thanks to Libra, I was able to rebuild my entire business model with confidence."
    },
    {
      name: "David P.",
      comment: "Finally a strategic consulting platform that makes sense for small businesses too."
    },
    {
      name: "Lucia V.",
      comment: "The AI-powered strategy canvas is simply brilliant. It made me rethink my entire growth plan."
    }
  ];

  return (
    <section className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6 text-primary">What People Say</h2>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={4000}
        swipeable
        emulateTouch
        transitionTime={500}
        className="text-center"
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-6">
            <p className="text-lg italic text-muted mb-4">&ldquo;{testimonial.comment}&rdquo;</p>
            <p className="text-accent font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

