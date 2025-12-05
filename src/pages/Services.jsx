// src/pages/Services.jsx
import { useEffect } from "react";
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
  Target
} from "lucide-react";

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

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <div className="py-12 px-4 md:px-20 bg-slate-50 min-h-screen">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-3">Our Services</h1>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
          Libra offers a structured set of strategic services designed to work
          together. You can start with a single check-up or build a full
          end-to-end engagement.
        </p>

        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="bg-white shadow-md rounded-2xl p-6 transition hover:shadow-xl border border-slate-200 hover:border-accent"
            >
              <div className="mb-3">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1 text-[#1d3557]">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-snug">
                {service.description}
              </p>
            </a>
          ))}
        </div>

        {/* Process section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Strategic Process</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We simplify complexity. Our model guides your business from
            assessment to sustainable transformation — with clarity, not chaos.
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

        {/* Shared tools / frameworks */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-200 mb-12 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-2 text-center text-[#1d3557]">
            Frameworks & Tools We Use
          </h3>
          <p className="text-gray-600 text-sm text-center mb-4 max-w-2xl mx-auto">
            Behind every engagement there is a clear method. We combine classic
            management frameworks with pragmatic tools tailored to your
            business.
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

        {/* Detailed sections – McKinsey-style blocks */}
        {services.map((service) => (
          <div
            key={service.id}
            id={service.id}
            className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-200 mb-10"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-100">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1d3557]">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {service.description} We help you apply this with method,
                  clarity, and long-term thinking.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2 text-[#1d3557]">
                  What we do
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {service.bullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="md:pl-6 md:border-l md:border-slate-200">
                <h4 className="font-semibold mb-2 text-[#1d3557]">
                  What you get
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {service.outcomes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
