import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-light text-text">
        <PageWrapper>
          <motion.div
            className="flex flex-col items-center text-center pt-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Welcome to <span className="text-accent">Libra</span>
            </h1>
            <p className="text-lg text-muted max-w-xl mb-8">
              The new era of strategic intelligence for small businesses.
            </p>
            <button
              onClick={handleClick}
              className="bg-accent text-white px-6 py-3 rounded hover:bg-blue-500 transition font-medium"
            >
              Launch the AI Assistant
            </button>
          </motion.div>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}
