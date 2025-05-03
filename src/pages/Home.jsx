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
      <main className="relative min-h-screen overflow-hidden bg-light text-[#1d3557]">
        {/* Background animato tech elegante */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 animate-gradient bg-gradient-radial opacity-10" />

        <PageWrapper>
          <motion.div
            className="flex flex-col items-center text-center pt-32 px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Welcome to <span className="text-accent">Libra</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 animate-fadeIn">
              The new era of strategic intelligence for small businesses.
            </p>
            <button
              onClick={handleClick}
              className="bg-accent text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300 font-semibold text-lg"
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
