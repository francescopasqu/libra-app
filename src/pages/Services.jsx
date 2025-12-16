// src/pages/Services.jsx
import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import {
  Stethoscope,
  BarChart,
  Blocks,
  Compass,
  Radar,
  Route,
  Workflow,
  FileText,
  Target,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Check,
  ChevronDown
} from "lucide-react";

/* ===========================
   CAPABILITIES (METHOD BLOCKS)
=========================== */
const services = [
  {
    id: "business-check-up",
    title: "Business Check-up",
    icon: <Stethoscope className="w-8 h-8 text-accent" />,
    description: "A full check-up to understand what’s working and what’s not.",
    bullets: [
      "Review of your current business model, numbers, and operations",
      "SWOT analysis across strategy, finance, and execution",
      "Identification of blind spots, contradictions, and hidden risks"
    ],
    outcomes: [
      "Clear picture of where you stand today",
      "Prioritized list of issues and opportunities",
      "Foundation for every next strategic move"
    ]
  },
  {
    id: "kpi-monitoring",
    title: "KPI Monitoring",
    icon: <BarChart className="w-8 h-8 text-accent" />,
    description: "Identify what’s growing and what’s collapsing over time.",
    bullets: [
      "Define the right KPIs for your stage and industry",
      "Set up simple routines for tracking and reporting",
      "Create a rhythm of review to read signals early"
    ],
    outcomes: [
      "Better, faster decisions based on facts",
      "Early warning on problems and bottlenecks",
      "Shared visibility for founders and teams"
    ]
  },
  {
    id: "business-model-redesign",
    title: "Business Model Redesign",
    icon: <Blocks className="w-8 h-8 text-accent" />,
    description: "Rebuild your model, one piece at a time.",
    bullets: [
      "Map how you create, deliver, and capture value today",
      "Redesign value proposition, revenue logic, and cost structure",
      "Test alternative scenarios before committing resources"
    ],
    outcomes: [
      "Stronger value proposition and positioning",
      "More scalable and resilient business model",
      "Clearer narrative for investors and partners"
    ]
  },
  {
    id: "strategic-consulting",
    title: "Strategic Consulting",
    icon: <Compass className="w-8 h-8 text-accent" />,
    description: "Method, focus, and a clear growth path for your business.",
    bullets: [
      "Clarify vision, objectives, and non-negotiables",
      "Translate strategy into priorities, projects, and focus areas",
      "Support key decisions with structured reasoning"
    ],
    outcomes: [
      "Alignment between vision and day-to-day execution",
      "Momentum instead of constant firefighting",
      "A sparring partner for critical decisions"
    ]
  },
  {
    id: "market-signals",
    title: "Market Signals",
    icon: <Radar className="w-8 h-8 text-accent" />,
    description: "Catch weak signals before they become tsunamis.",
    bullets: [
      "Scan trends, competitors, and customer behaviour",
      "Translate signals into risks and opportunities",
      "Discuss strategic implications for your business"
    ],
    outcomes: [
      "Foresight on what’s coming next",
      "Ability to adapt instead of react",
      "Better timing for launches and investments"
    ]
  },
  {
    id: "strategic-roadmap",
    title: "Strategic Roadmap",
    icon: <Route className="w-8 h-8 text-accent" />,
    description: "A clear path forward from vision to execution.",
    bullets: [
      "Synthesize insights from check-up and diagnosis",
      "Define milestones, timelines, and ownership",
      "Design a simple review and accountability system"
    ],
    outcomes: [
      "Concrete plan instead of scattered ideas",
      "Everyone knows what happens, when, and why",
      "Visible progress you can track over time"
    ]
  }
];

const processFlow = [
  { label: "1. Check-up", desc: "Understand the current state" },
  { label: "2. Diagnosis", desc: "Identify the core issues" },
  { label: "3. Strategy", desc: "Design a growth path" },
  { label: "4. Action", desc: "Implement with precision" },
  { label: "5. Follow-up", desc: "Review, adapt, and grow" }
];

const coreTools = [
  { icon: <Workflow className="w-5 h-5" />, label: "Business Model Canvas" },
  { icon: <Target className="w-5 h-5" />, label: "SWOT & risk mapping" },
  { icon: <BarChart className="w-5 h-5" />, label: "KPI & dashboard design" },
  { icon: <FileText className="w-5 h-5" />, label: "Strategic memos & reports" },
  { icon: <Compass className="w-5 h-5" />, label: "OKR & goal setting" },
  { icon: <Route className="w-5 h-5" />, label: "Roadmaps & execution plans" }
];

/* ===========================
   ENGAGEMENT LEVELS (WHAT YOU SELL)
=========================== */
const engagementLevels = [
  {
    badge: "Entry",
    title: "Strategic Call",
    subtitle: "Clarity",
    icon: <Sparkles className="w-6 h-6 text-accent" />,
    description:
      "A sharp 30-minute call to isolate the real bottleneck and define the next move.",
    highlights: [
      "Identify the core constraint",
      "Clear direction (do / stop / next)",
      "Fit check for Libra"
    ],
    cta: { label: "Book the call", href: "/book" },
    featured: false
  },
  {
    badge: "Core",
    title: "Business Assessment",
    subtitle: "Structure",
    icon: <ShieldCheck className="w-6 h-6 text-accent" />,
    description:
      "A complete diagnosis + decision framework delivered as a structured strategic memo.",
    highlights: [
      "Full business check-up",
      "SWOT & risk mapping",
      "30–90 day strategic roadmap"
    ],
    cta: { label: "Start the assessment", href: "/book" },
    featured: true
  },
  {
    badge: "Advanced",
    title: "Advisory",
    subtitle: "Momentum",
    icon: <Zap className="w-6 h-6 text-accent" />,
    description:
      "Ongoing support to keep priorities aligned as reality changes — momentum without chaos.",
    highlights: [
      "KPI rhythm + roadmap updates",
      "Market signals → implications",
      "Ongoing decision support"
    ],
    cta: { label: "Apply for advisory", href: "/book" },
    featured: false
  }
];

/* Matrix: ONLY ✓ and — */
const matrixRows = [
  { label: "Business Check-up", call: "✓", assess: "✓", adv: "✓" },
  { label: "Business Model", call: "—", assess: "✓", adv: "✓" },
  { label: "SWOT & Risk Mapping", call: "—", assess: "✓", adv: "✓" },
  { label: "Strategic Roadmap", call: "—", assess: "✓", adv: "✓" },
  { label: "KPI Monitoring", call: "—", assess: "—", adv: "✓" },
  { label: "Market Signals", call: "—", assess: "—", adv: "✓" },
  { label: "Ongoing Decision Support", call: "—", assess: "—", adv: "✓" }
];

/* ===========================
   UI HELPERS
=========================== */
function Pill({ children, tone = "neutral" }) {
  const base =
    "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold";
  const styles =
    tone === "accent"
      ? "bg-white border-accent/30 text-accent shadow-sm"
      : "bg-slate-100 border-slate-200 text-slate-700";
  return <span className={`${base} ${styles}`}>{children}</span>;
}

function MatrixValue({ value, variant = "neutral" }) {
  if (value === "—") return <span className="text-slate-300 font-semibold">—</span>;
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold ${
        variant === "accent" ? "text-accent" : "text-slate-700"
      }`}
    >
      <span
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full border ${
          variant === "accent"
            ? "border-accent/30 bg-white"
            : "border-slate-200 bg-white"
        }`}
      >
        <Check className="w-3.5 h-3.5" />
      </span>
      ✓
    </span>
  );
}

function SectionCard({ children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
      {children}
    </div>
  );
}

function Accordion({ title, subtitle, isOpen, onToggle, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-6 md:px-8 py-5 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-white"
      >
        <div>
          <div className="text-lg font-bold text-[#1d3557]">{title}</div>
          {subtitle && <div className="text-sm text-gray-600 mt-1">{subtitle}</div>}
        </div>
        <div
          className={`w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center transition ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </div>
      </button>
      {isOpen && <div className="px-6 md:px-8 pb-7">{children}</div>}
    </div>
  );
}

export default function Services() {
  const [matrixOpen, setMatrixOpen] = useState(false);

  const presence = useMemo(
    () => ({
      call: "Low",
      assess: "Medium",
      adv: "High"
    }),
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <div className="py-12 px-4 md:px-20 bg-slate-50 min-h-screen">
        {/* HERO (clean, premium) */}
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-[#1d3557]">
            Work with <span className="text-accent">Libra</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Choose your engagement level. Each step increases continuity and control.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Pill>
              <Sparkles className="w-4 h-4 text-accent" />
              Clarity
            </Pill>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <Pill>
              <ShieldCheck className="w-4 h-4 text-accent" />
              Structure
            </Pill>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <Pill tone="accent">
              <Zap className="w-4 h-4 text-accent" />
              Momentum
            </Pill>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-2xl shadow-md hover:opacity-95 transition"
            >
              Book the Strategic Call <ArrowRight className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setMatrixOpen((v) => !v)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-[#1d3557] px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              See what’s included <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Engagement cards */}
        <div className="max-w-6xl mx-auto mb-10">
          <SectionCard>
            <div className="px-6 md:px-8 py-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                  <h2 className="text-3xl font-bold text-[#1d3557]">
                    Libra Engagement Levels
                  </h2>
                  <p className="text-gray-600 mt-1 max-w-2xl">
                    A clear starting point, a structured assessment, or ongoing advisory support.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill>Clear starting point</Pill>
                  <Pill>Upgrade-friendly</Pill>
                  <Pill tone="accent">Advisory stands out</Pill>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {engagementLevels.map((lvl) => (
                  <div
                    key={lvl.title}
                    className={[
                      "rounded-2xl border overflow-hidden bg-white shadow-sm",
                      lvl.featured ? "border-accent shadow-md" : "border-slate-200"
                    ].join(" ")}
                  >
                    <div className="p-6 bg-gradient-to-b from-slate-50 to-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                            {lvl.icon}
                          </div>
                          <div className="text-left">
                            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">
                              {lvl.badge}
                            </div>
                            <div className="text-xl font-extrabold text-[#1d3557] leading-tight">
                              {lvl.title}
                            </div>
                          </div>
                        </div>
                        <span
                          className={[
                            "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
                            lvl.title === "Advisory"
                              ? "bg-white border-accent/30 text-accent shadow-sm"
                              : "bg-slate-100 border-slate-200 text-slate-700"
                          ].join(" ")}
                        >
                          {lvl.subtitle}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed">
                        {lvl.description}
                      </p>

                      <ul className="mt-4 space-y-2 text-sm text-slate-700">
                        {lvl.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <span className="mt-0.5 w-5 h-5 rounded-full border border-slate-200 bg-white inline-flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-accent" />
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5">
                        <a
                          href={lvl.cta.href}
                          className={[
                            "w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl transition shadow-sm",
                            lvl.featured
                              ? "bg-accent text-white hover:opacity-95"
                              : "bg-white border border-slate-200 text-[#1d3557] hover:shadow-md"
                          ].join(" ")}
                        >
                          {lvl.cta.label} <ArrowRight className="w-5 h-5" />
                        </a>

                        {lvl.featured && (
                          <p className="text-xs text-slate-500 mt-2 text-center">
                            Most clients start here.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Matrix (optional details) */}
        <div className="max-w-6xl mx-auto mb-14">
          <Accordion
            title="Included by level"
            subtitle="Details, if you need them."
            isOpen={matrixOpen}
            onToggle={() => setMatrixOpen((v) => !v)}
          >
            {/* Presence row */}
            <div className="hidden md:grid grid-cols-4 gap-3 mb-6 mt-4">
              <div className="text-sm font-semibold text-[#1d3557]">
                Consultant presence
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                {presence.call}
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                {presence.assess}
              </div>
              <div className="rounded-xl border border-accent/30 bg-white px-3 py-2 text-sm font-semibold text-accent shadow-sm">
                {presence.adv}
              </div>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block">
              <div className="grid grid-cols-4 gap-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 px-1">
                  Capability
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 px-1">
                  Call
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 px-1">
                  Assessment
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-accent px-1">
                  Advisory
                </div>

                {matrixRows.map((row) => (
                  <div key={row.label} className="contents">
                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                      <div className="font-semibold text-[#1d3557]">{row.label}</div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <MatrixValue value={row.call} variant="neutral" />
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <MatrixValue value={row.assess} variant="neutral" />
                    </div>

                    <div className="rounded-xl border border-accent/30 bg-white px-4 py-3 shadow-sm">
                      <MatrixValue value={row.adv} variant="accent" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile stacked */}
            <div className="md:hidden space-y-4 mt-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="font-bold text-[#1d3557] mb-2">
                  Consultant presence
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-slate-600">
                    {presence.call}
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-slate-600">
                    {presence.assess}
                  </div>
                  <div className="rounded-xl border border-accent/30 bg-white px-3 py-2 text-center font-semibold text-accent shadow-sm">
                    {presence.adv}
                  </div>
                </div>
              </div>

              {matrixRows.map((row) => (
                <div
                  key={row.label}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
                >
                  <div className="font-bold text-[#1d3557] mb-3">{row.label}</div>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                      <span className="text-slate-600">Call</span>
                      <MatrixValue value={row.call} variant="neutral" />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                      <span className="text-slate-600">Assessment</span>
                      <MatrixValue value={row.assess} variant="neutral" />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-accent/30 bg-white px-3 py-2 shadow-sm">
                      <span className="text-accent font-semibold">Advisory</span>
                      <MatrixValue value={row.adv} variant="accent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-sm text-gray-600">
                If you’re unsure, start with the call.
              </div>
              <a
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-white px-5 py-3 rounded-2xl shadow-md hover:opacity-95 transition"
              >
                Book the Strategic Call <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </Accordion>
        </div>

        {/* Method blocks */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 text-[#1d3557]">
            What’s inside the method
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            These are the building blocks used across Libra engagements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="bg-white shadow-md rounded-2xl p-6 transition hover:shadow-xl border border-slate-200 hover:border-accent"
            >
              <div className="mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-1 text-[#1d3557]">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-snug">
                {service.description}
              </p>
            </a>
          ))}
        </div>

        {/* Process */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-[#1d3557]">
            Our Strategic Process
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Assessment to transformation — with clarity, not chaos.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 p-6 bg-white border border-slate-200 rounded-2xl shadow-md mb-16">
          {processFlow.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center relative w-full md:w-1/5"
            >
              <div className="text-accent text-xl font-bold mb-1">
                {step.label}
              </div>
              <p className="text-sm text-gray-600 mb-1">{step.desc}</p>
              {index < processFlow.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 border-t-2 border-r-2 border-accent rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-200 mb-12 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-2 text-center text-[#1d3557]">
            Frameworks & Tools We Use
          </h3>
          <p className="text-gray-600 text-sm text-center mb-4 max-w-2xl mx-auto">
            Classic frameworks, pragmatic execution.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 mt-2">
            {coreTools.map((tool) => (
              <div
                key={tool.label}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
              >
                <div className="text-accent">{tool.icon}</div>
                <span>{tool.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed sections */}
        {services.map((service) => (
          <div
            key={service.id}
            id={service.id}
            className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-200 mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-100">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1d3557]">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2 text-[#1d3557]">What we do</h4>
                <ul className="list-disc list-inside space-y-1">
                  {service.bullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="md:pl-6 md:border-l md:border-slate-200">
                <h4 className="font-semibold mb-2 text-[#1d3557]">What you get</h4>
                <ul className="list-disc list-inside space-y-1">
                  {service.outcomes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Final CTA */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 md:p-8 text-center">
            <h3 className="text-2xl font-extrabold text-[#1d3557]">
              Ready to move forward?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Start with the Strategic Call. If it’s a fit, we’ll choose the right level together.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-2xl shadow-md hover:opacity-95 transition"
              >
                Book the Strategic Call <ArrowRight className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={() => setMatrixOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-[#1d3557] px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                See what’s included <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
