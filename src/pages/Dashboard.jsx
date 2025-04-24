import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
            Welcome to your Dashboard
          </h1>
          <p className="text-muted text-lg">
            Here you'll find key performance indicators (KPIs) for your company.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <KpiCard title="Revenue" value="€ 120,000" subtitle="This Month" color="text-green-600" />
          <KpiCard title="Profit Margin" value="25%" subtitle="This Month" color="text-blue-600" />
          <KpiCard title="New Customers" value="15" subtitle="This Month" color="text-purple-600" />
          <KpiCard title="Customer Retention" value="85%" subtitle="Year to Date" color="text-orange-600" />
          <KpiCard title="Operating Expenses" value="€ 45,000" subtitle="This Month" color="text-red-600" />
          <KpiCard title="Net Profit" value="€ 30,000" subtitle="This Month" color="text-green-700" />
        </div>

        <div className="text-center text-gray-500 italic">
          🚧 Section under construction — functionality coming soon.
        </div>
      </motion.div>
    </PageWrapper>
  );
}

function KpiCard({ title, value, subtitle, color }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

export default Dashboard;
