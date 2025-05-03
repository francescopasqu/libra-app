// ✅ CanvasAI.jsx
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { Star } from "lucide-react";

function Block({ title, description, bullets, rating }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between h-full hover:shadow-lg transition">
      <div>
        <h2 className="text-xl font-bold text-primary mb-2">{title}</h2>
        <p className="text-muted mb-3">{description}</p>
        <ul className="list-disc list-inside text-muted text-sm space-y-1">
          {bullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex items-center mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${index < Math.floor(rating) ? "text-blue-400" : "text-gray-300"}`}
            fill={index < Math.floor(rating) ? "#60A5FA" : "none"}
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-muted">{rating.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default function CanvasAI() {
  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-4"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-primary">
          Business Model Canvas AI
        </h1>

        {/* 🔹 Prima e Seconda Riga */}
        <div className="grid grid-cols-5 gap-6 mb-6">
          {/* Riga 1 */}
          <div className="row-span-2">
            <Block
              title="Key Partners"
              description="Who are your key partners and suppliers?"
              rating={4.5}
              bullets={[
                "Strategic alliances",
                "Joint ventures",
                "Buyer-supplier relationships",
              ]}
            />
          </div>
          <Block
            title="Key Activities"
            description="What are the most important activities?"
            rating={4.0}
            bullets={[
              "Production",
              "Problem solving",
              "Platform/network management",
            ]}
          />
          <div className="row-span-2">
            <Block
              title="Value Proposition"
              description="What value do you deliver to the customer?"
              rating={5.0}
              bullets={[
                "Problem solving",
                "Customization",
                "Performance or convenience",
              ]}
            />
          </div>
          <Block
            title="Customer Relationships"
            description="How do you interact with customers?"
            rating={4.5}
            bullets={[
              "Personalized services",
              "Self-service",
              "Communities",
            ]}
          />
          <div className="row-span-2">
            <Block
              title="Customer Segments"
              description="Who are your target customers?"
              rating={4.0}
              bullets={[
                "Mass market or niche?",
                "B2B, B2C, or B2B2C?",
                "Early adopters or mainstream?",
              ]}
            />
          </div>

          {/* Riga 2 */}
          <div className="col-start-2">
            <Block
              title="Key Resources"
              description="What key resources are required?"
              rating={4.5}
              bullets={[
                "Physical assets",
                "Intellectual property",
                "Human or financial resources",
              ]}
            />
          </div>
          <div className="col-start-4">
            <Block
              title="Channels"
              description="Through which channels do you reach customers?"
              rating={4.5}
              bullets={[
                "Sales force",
                "Web sales",
                "Retail or partners",
              ]}
            />
          </div>
        </div>

        {/* 🔹 Terza Riga - 2 colonne 50/50 */}
        <div className="grid grid-cols-2 gap-6">
          <Block
            title="Cost Structure"
            description="What are the major cost drivers?"
            rating={4.5}
            bullets={[
              "Economies of scale",
              "Fixed vs variable costs",
              "Key resource and activity costs",
            ]}
          />
          <Block
            title="Revenue Streams"
            description="How does your business earn revenue?"
            rating={4.5}
            bullets={[
              "Direct sales",
              "Subscriptions",
              "Licensing or renting",
            ]}
          />
        </div>
      </motion.div>
    </PageWrapper>
  );
}
