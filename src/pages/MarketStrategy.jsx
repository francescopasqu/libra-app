// ✅ MarketStrategy.jsx (aggiornato completo)
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

function Block({ title, description, bullets, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between h-full border-t-4" style={{ borderTopColor: color }}>
      <div>
        <h2 className="text-xl font-bold mb-2" style={{ color: color }}>{title}</h2>
        <p className="text-muted mb-3">{description}</p>
        <ul className="list-disc list-inside text-muted text-sm space-y-1">
          {bullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function MarketStrategy() {
  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-4"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-primary">
          Market Strategy
        </h1>

        {/* Introduzione */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-gray-500 italic">
            Understand your strategic market position through proven business frameworks.
          </p>
        </div>

        {/* Porter's Five Forces */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Porter's Five Forces
          </h2>
          <div className="grid grid-cols-3 gap-6 items-center mb-10">
            <div></div>
            <Block title="Threat of New Entrants" description="New players entering the market" color="#3B82F6" bullets={["Low barriers to entry", "Minimal capital needs", "Light regulations"]} />
            <div></div>
            <Block title="Bargaining Power of Suppliers" description="Influence suppliers have over you" color="#F59E0B" bullets={["Few suppliers", "High switching costs", "Supplier concentration"]} />
            <Block title="Industry Rivalry" description="Intensity of competition" color="#10B981" bullets={["Many competitors", "Low differentiation", "Price wars"]} />
            <Block title="Bargaining Power of Buyers" description="Customer power to dictate terms" color="#EF4444" bullets={["Few buyers", "Price sensitivity", "Low switching costs"]} />
            <div></div>
            <Block title="Threat of Substitutes" description="Availability of alternatives" color="#8B5CF6" bullets={["Substitute performance", "Lower cost options", "Customer loyalty"]} />
            <div></div>
          </div>
        </section>

        {/* SWOT Analysis */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            SWOT Analysis
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <Block title="Strengths" description="Internal advantages" color="#10B981" bullets={["Brand reputation", "Unique technology", "Efficient operations"]} />
            <Block title="Weaknesses" description="Internal disadvantages" color="#EF4444" bullets={["High costs", "Limited channels", "Dependency on few clients"]} />
            <Block title="Opportunities" description="External areas for growth" color="#3B82F6" bullets={["Emerging markets", "Tech trends", "Changing customer needs"]} />
            <Block title="Threats" description="External risks" color="#F59E0B" bullets={["New competitors", "Economic downturn", "Regulation changes"]} />
          </div>
        </section>

        {/* VRIO Framework */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            VRIO Framework
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <Block title="Value" description="Does it provide value to customers?" color="#3B82F6" bullets={["Customer satisfaction", "Solves critical needs"]} />
            <Block title="Rarity" description="Is it rare among competitors?" color="#F59E0B" bullets={["Few possess it", "Difficult to find"]} />
            <Block title="Imitability" description="Is it hard to imitate?" color="#10B981" bullets={["Costly to duplicate", "Protected by IP"]} />
            <Block title="Organization" description="Is your company organized to exploit it?" color="#EF4444" bullets={["Strong processes", "Internal capabilities"]} />
          </div>
        </section>

        {/* PESTEL Analysis */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            PESTEL Analysis
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <Block title="Political" description="Government influence" color="#EF4444" bullets={["Regulations", "Trade policies"]} />
            <Block title="Economic" description="Economic trends" color="#F59E0B" bullets={["Growth rates", "Exchange rates"]} />
            <Block title="Social" description="Societal trends" color="#10B981" bullets={["Demographic changes", "Cultural shifts"]} />
            <Block title="Technological" description="Technological innovations" color="#3B82F6" bullets={["Automation", "Digitalization"]} />
            <Block title="Environmental" description="Environmental concerns" color="#22C55E" bullets={["Sustainability", "Climate change"]} />
            <Block title="Legal" description="Legal factors" color="#8B5CF6" bullets={["Employment laws", "Consumer protection"]} />
          </div>
        </section>

        {/* Competitive Positioning */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Competitive Positioning Map
          </h2>
          <div className="flex flex-col items-center">
            <p className="text-muted text-center mb-4">
              Visualize your brand position relative to competitors.
            </p>
            {/* 🔵 Qui in futuro possiamo aggiungere un grafico XY scatter plot! */}
            <div className="w-64 h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-muted italic">
              Graph Placeholder
            </div>
          </div>
        </section>

        {/* Strategic Moves & Scenarios */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Strategic Moves & Scenarios
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <Block title="Offensive Strategies" description="How to attack competitors?" color="#3B82F6" bullets={["Market penetration", "Product innovation", "Strategic alliances"]} />
            <Block title="Defensive Strategies" description="How to defend your position?" color="#EF4444" bullets={["Customer loyalty programs", "Cost leadership", "Legal protection"]} />
          </div>
        </section>

      </motion.div>
    </PageWrapper>
  );
}
