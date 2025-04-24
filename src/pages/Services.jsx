// ✅ Services.jsx
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import { Briefcase, Activity, BarChart3 } from "lucide-react";

export default function Services() {
  return (
    <>
      <main className="min-h-screen bg-light text-text px-6 py-12">
        <PageWrapper>
          <h1 className="text-4xl font-bold text-center mb-10">Our Services</h1>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Briefcase className="w-8 h-8 text-accent mb-4" />}
              title="Strategic Consulting"
              description="Personalized advice to scale your business with clarity and confidence."
            />
            <ServiceCard
              icon={<Activity className="w-8 h-8 text-accent mb-4" />}
              title="Automated Business Analysis"
              description="AI-powered insights into your operations, profitability and potential."
            />
            <ServiceCard
              icon={<BarChart3 className="w-8 h-8 text-accent mb-4" />}
              title="AI Dashboard"
              description="An interactive dashboard to track performance and uncover opportunities."
            />
          </div>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-surface p-6 rounded-lg shadow hover:shadow-md transition">
      <div className="flex flex-col items-start">
        {icon}
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted">{description}</p>
      </div>
    </div>
  );
}
