// ✅ Services.jsx - FORZA SUPREMA COMPLETA
import { useRef, useEffect } from "react";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import {
  Briefcase,
  Activity,
  BarChart3,
  Puzzle,
  BellDot,
  Bot,
  FlaskConical,
  Radar,
  GraduationCap,
} from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function Services() {
  const refs = Object.fromEntries(
    servicesData.map(({ title }) => [title, useRef(null)])
  );

  const scrollToSection = (section) => {
    refs[section]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <main className="min-h-screen bg-light text-text px-6 py-20">
        <PageWrapper>
          <h1 className="text-4xl font-extrabold text-center text-primary mb-16">Our Services</h1>

          {/* 🔹 Blocchi servizi */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
            {servicesData.map(({ icon, title, description }) => (
              <ServiceCard
                key={title}
                icon={icon}
                title={title}
                description={description}
                onClick={() => scrollToSection(title)}
              />
            ))}
          </div>

          {/* 🔹 Sezioni dettagliate */}
          <div className="max-w-5xl mx-auto space-y-32">
            {servicesData.map(({ title, longDescription }, idx) => (
              <AnimatedSection key={title} innerRef={refs[title]} delay={idx * 0.1}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-primary">{title}</h2>
                  <motion.hr
                    className="w-16 h-1 bg-accent rounded mx-auto mt-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>

                <div className="space-y-6 text-muted text-left max-w-3xl mx-auto">
                  <p className="text-lg leading-relaxed">{longDescription.intro}</p>
                  <ul className="space-y-4 text-base">
                    <li>
                      <span className="text-accent font-semibold transition hover:text-primary cursor-pointer">Where:</span> {longDescription.where}
                    </li>
                    <li>
                      <span className="text-accent font-semibold transition hover:text-primary cursor-pointer">How:</span> {longDescription.how}
                    </li>
                    <li>
                      <span className="text-accent font-semibold transition hover:text-primary cursor-pointer">Benefits:</span> {longDescription.benefits}
                    </li>
                  </ul>
                </div>

                {idx !== servicesData.length - 1 && (
                  <div className="w-3/5 mx-auto h-[1px] bg-gray-300 mt-16" />
                )}
              </AnimatedSection>
            ))}
          </div>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}

// 🔹 Card per ogni servizio
function ServiceCard({ icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-surface p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-[1.02] cursor-pointer flex flex-col items-start"
    >
      {icon}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted">{description}</p>
    </div>
  );
}

// 🔹 Sezione animata
function AnimatedSection({ children, innerRef, delay = 0 }) {
  const controls = useAnimation();
  const inView = useInView(innerRef, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={innerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}

// 🔹 Dati dei servizi
const servicesData = [
  {
    title: "Strategic Consulting",
    icon: <Briefcase className="w-8 h-8 text-accent mb-4" />,
    description: "Personalized advice to scale your business with clarity and confidence.",
    longDescription: {
      intro: "Personalized consulting sessions to analyze your current business model, define strategic priorities, and build a clear, actionable growth plan.",
      where: "Online consultations via video call.",
      how: "We assess your positioning, strengths, and gaps to design a custom scaling strategy.",
      benefits: "Gain clarity, define realistic goals, and accelerate growth with expert strategic guidance.",
    },
  },
  {
    title: "Automated Business Analysis",
    icon: <Activity className="w-8 h-8 text-accent mb-4" />,
    description: "AI-powered insights into your operations, profitability and potential.",
    longDescription: {
      intro: "Automate the analysis of your financial and operational data to gain actionable insights.",
      where: "Via your Libra Dashboard and reports.",
      how: "We integrate data sources and provide AI-powered analysis and recommendations.",
      benefits: "Understand performance drivers, identify opportunities, and optimize profitability effortlessly.",
    },
  },
  {
    title: "AI Dashboard",
    icon: <BarChart3 className="w-8 h-8 text-accent mb-4" />,
    description: "An interactive dashboard to track performance and uncover opportunities.",
    longDescription: {
      intro: "A dynamic dashboard to track KPIs, trends, and performance in real-time.",
      where: "Available inside your Libra account, 24/7.",
      how: "Automatically tracks your KPIs based on your business data and goals.",
      benefits: "Immediate visibility, proactive decision-making, and constant performance optimization.",
    },
  },
  {
    title: "Business Model Rebuilding",
    icon: <Puzzle className="w-8 h-8 text-accent mb-4" />,
    description: "Reinvent your business model with AI-guided suggestions and interactive frameworks.",
    longDescription: {
      intro: "We help you rethink, improve or pivot your business model for long-term success.",
      where: "Workshops and personalized sessions with AI support.",
      how: "Frameworks and simulations to design, test and validate new strategies.",
      benefits: "Innovative, scalable and future-proof business models tailored to your needs.",
    },
  },
  {
    title: "Performance & KPI Alerts",
    icon: <BellDot className="w-8 h-8 text-accent mb-4" />,
    description: "Real-time metrics with smart alerts to help you stay on top of your performance.",
    longDescription: {
      intro: "Stay informed about critical changes in your KPIs with smart alerts.",
      where: "Real-time notifications in your Libra Dashboard.",
      how: "Set thresholds and receive alerts for underperformance or exceptional results.",
      benefits: "Prevent problems before they escalate, seize opportunities faster, and optimize agility.",
    },
  },
  {
    title: "AI Business Coach",
    icon: <Bot className="w-8 h-8 text-accent mb-4" />,
    description: "Your digital chief of staff, available 24/7 to guide your strategic decisions.",
    longDescription: {
      intro: "An AI-powered business assistant to support your daily and strategic decisions.",
      where: "Accessible 24/7 from your Libra account.",
      how: "Chat-based AI trained on your data and strategic frameworks.",
      benefits: "Immediate support, informed decisions, constant strategic alignment.",
    },
  },
  {
    title: "Strategy Lab",
    icon: <FlaskConical className="w-8 h-8 text-accent mb-4" />,
    description: "Test ideas, simulate outcomes, and explore strategic scenarios with confidence.",
    longDescription: {
      intro: "A virtual lab to test your ideas and predict their potential outcomes.",
      where: "Inside your Libra Strategy Lab area.",
      how: "Scenario modeling and AI-powered simulations.",
      benefits: "Better risk management, smarter bets, and data-driven strategic planning.",
    },
  },
  {
    title: "Market & Industry Intelligence",
    icon: <Radar className="w-8 h-8 text-accent mb-4" />,
    description: "Stay ahead of trends and competitors with real-time insights and alerts.",
    longDescription: {
      intro: "Real-time market and competitor monitoring for smarter moves.",
      where: "Libra Market Intelligence reports and dashboards.",
      how: "Collects and analyzes external data to predict trends and shifts.",
      benefits: "Proactive strategy adjustments, opportunity spotting, competitive edge.",
    },
  },
  {
    title: "Learning Center (beta)",
    icon: <GraduationCap className="w-8 h-8 text-accent mb-4" />,
    description: "Access curated resources, templates, and video guides to boost your business skills.",
    longDescription: {
      intro: "Boost your skills and knowledge with curated learning resources.",
      where: "Libra Learning Center inside your Dashboard.",
      how: "Access to templates, guides, video lessons tailored to business growth.",
      benefits: "Continuous learning, business growth acceleration, practical upskilling.",
    },
  },
];
