// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  // Services preview for "What We Do" section
  const servicesList = [
    "Business Check-up",
    "Business Model Redesign",
    "Strategic Consulting",
    "KPI Monitoring",
    "Market Signals",
    "Strategic Roadmap"
  ];

  const handleClick = () => {
    // CTA principale: porta sempre alla pagina di booking
    navigate("/book");
  };

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-light text-[#1d3557]">
        {/* Background animato */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 animate-gradient bg-gradient-radial opacity-10" />

        <PageWrapper>
          {/* Hero Section */}
          <motion.div
            className="flex flex-col items-center text-center pt-28 px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-4">
              Welcome to <span className="text-accent">Libra</span>
            </h1>

            <p className="text-2xl md:text-3xl text-[#1d3557] font-semibold mb-6">
              Strategic clarity. Systematic growth.
            </p>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
              A smart framework to assess, realign, and elevate your business —{" "}
              with method, not guesswork.
            </p>

            <button
              onClick={handleClick}
              className="bg-accent text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300 font-semibold text-lg"
            >
              Book Your Strategic Check-up
            </button>
          </motion.div>

          {/* 3 Pillars */}
          <motion.div
            className="grid md:grid-cols-3 gap-10 mt-20 text-left text-muted max-w-6xl mx-auto px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                🔍 Strategic Assessment
              </h3>
              <p>
                We uncover blind spots and performance gaps across your business
                model.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                🛠️ Focused Intervention
              </h3>
              <p>
                Receive a tailored action plan — based on your stage, your
                goals, your data.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                📈 Continuous Alignment
              </h3>
              <p>
                Track results, refine your model, and evolve with confidence
                over time.
              </p>
            </div>
          </motion.div>

          {/* What We Do – preview servizi */}
          <motion.section
            className="mt-20 mb-16 px-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-4">
              What We Do
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-center">
              Libra helps entrepreneurs and small businesses gain clarity,
              rebuild their strategic foundations, and make better decisions
              with method, structure, and long-term thinking.
            </p>

            {/* mini-cards centrati */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {servicesList.map((item) => (
                <a
                  key={item}
                  href={
                    "/services#" +
                    item
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z-]/g, "")
                  }
                  className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition text-sm text-gray-800 flex items-center justify-center text-center"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent mr-2" />
                  <span className="font-medium">{item}</span>
                </a>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate("/services")}
                className="inline-block px-6 py-3 bg-accent text-white rounded-lg shadow hover:bg-accent/90 transition"
              >
                Explore Services
              </button>
            </div>
          </motion.section>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}
