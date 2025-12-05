// ✅ About.jsx - SUPREME VERSION
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import { Sparkles, Rocket, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <main className="min-h-screen bg-light text-text px-6 py-16">
        <PageWrapper>
          {/* 🔹 WHY LIBRA EXISTS */}
          <section className="max-w-5xl mx-auto text-center mb-24">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-6"
            >
              Why Libra Exists
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-muted max-w-3xl mx-auto"
            >
              Libra was founded with a belief: powerful business strategy
              shouldn&apos;t be a luxury. Every entrepreneur deserves clarity,
              structure, and momentum — not just those with big budgets or big
              teams.
            </motion.p>
          </section>

          {/* 🔹 CORE BELIEFS */}
          <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-left mb-28">
            {beliefsData.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-surface p-6 rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted">{item.text}</p>
              </motion.div>
            ))}
          </section>

          {/* 🔹 WHO WE ARE */}
          <section className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-6"
            >
              Who We Are
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-muted mb-6"
            >
              Libra is a strategy-first consulting practice created to empower
              entrepreneurs, amplify underdog businesses, and unlock the true
              potential of bold ideas. With roots in innovation hubs across
              Milan and Amsterdam, our DNA blends operational excellence with
              creative disruption.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted mb-8"
            >
              Our mission is to democratize access to world-class strategic
              guidance, making it intuitive, actionable, and accessible — for
              all those who dare to build.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg font-semibold text-accent"
            >
              Libra isn&apos;t just a service. It&apos;s a movement for the
              builders of tomorrow.
            </motion.p>
          </section>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}

const beliefsData = [
  {
    title: "Empowering Visionaries",
    text: "Too many great ideas fade because they lack structure or support. Libra transforms intuition into execution.",
    icon: <Sparkles className="w-8 h-8 text-accent mb-4" />
  },
  {
    title: "Making Strategy Simple",
    text: "We decode complex challenges into clear, actionable steps — combining analytical thinking with practical execution.",
    icon: <Rocket className="w-8 h-8 text-accent mb-4" />
  },
  {
    title: "Democratizing Expertise",
    text: "High-level consulting should be accessible to every founder — not just Fortune 500 giants.",
    icon: <HeartHandshake className="w-8 h-8 text-accent mb-4" />
  }
];
