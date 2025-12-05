// src/pages/Book.jsx
import { useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { CalendarRange, Target, Compass, Sparkles } from "lucide-react";

export default function Book() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToCalendly = () => {
    const el = document.getElementById("calendly-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageWrapper>
      <div className="bg-slate-50 min-h-screen py-16 px-4 md:px-20 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          {/* HERO / ABOVE THE FOLD */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-4">
              <CalendarRange className="w-4 h-4" />
              <span>Free 30-minute strategic session</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#1d3557]">
              Book a Free Consultation
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              In 30 minutes, we will map where your business stands today, what
              is blocking its potential, and how Libra&apos;s method can help you
              move from <span className="font-semibold">check-up and diagnosis</span>{" "}
              to <span className="font-semibold">strategy and execution</span>.
            </p>

            <button
              onClick={scrollToCalendly}
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300 font-semibold text-base md:text-lg"
            >
              Choose a time in my calendar
              <CalendarRange className="w-5 h-5" />
            </button>

            <p className="mt-3 text-xs text-gray-500">
              No obligation, no pitch. Just a focused strategic conversation.
            </p>
          </motion.section>

          {/* 3 MINI-BLOCCHI: COSA OTTIENI DALLA CALL */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col items-start">
              <div className="rounded-full bg-sky-100 p-2 mb-3">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-sm mb-2">
                Clarify your situation
              </h3>
              <p className="text-xs text-gray-600">
                Frame where you are now, what feels stuck, and what you want to
                achieve in the next 6–12 months.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col items-start">
              <div className="rounded-full bg-sky-100 p-2 mb-3">
                <Compass className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-sm mb-2">
                Identify key priorities
              </h3>
              <p className="text-xs text-gray-600">
                Distill 2–3 strategic priorities that would unlock the biggest
                impact for your business right now.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col items-start">
              <div className="rounded-full bg-sky-100 p-2 mb-3">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-sm mb-2">
                Leave with a first outline
              </h3>
              <p className="text-xs text-gray-600">
                Walk away with a first sketch of your strategic path and a
                concrete next step to move forward.
              </p>
            </div>
          </motion.section>

          {/* CALENDLY EMBED */}
          <motion.section
            id="calendly-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-md p-4 mb-6"
          >
            <h2 className="text-lg font-semibold mb-3 text-[#1d3557]">
              Choose a time that works for you
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Pick a slot that fits your schedule. Once booked, you&apos;ll receive
              a calendar invite with a video link and a short prep form.
            </p>

            <div className="w-full">
              <iframe
                title="Libra Consultation"
                // ⬇️ Sostituisci questo URL con il tuo link Calendly corretto
                src="https://calendly.com/TUO_USERNAME/libra-intro-call"
                className="w-full h-[600px] border-0 rounded-xl"
              />
            </div>
          </motion.section>

          {/* FALLBACK EMAIL */}
          <p className="text-center text-xs text-gray-500 mt-2">
            Prefer not to use Calendly? You can also write to{" "}
            <a
              href="mailto:hello@librastrategy.com"
              className="text-accent underline"
            >
              hello@librastrategy.com
            </a>{" "}
            with a short description of your business and your availability.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
