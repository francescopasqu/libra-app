// ✅ CanvasAI.jsx
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

export default function CanvasAI() {
  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
          Canvas AI
        </h1>
        <p className="text-muted text-lg">
          🚧 Section under construction — functionality coming soon.
        </p>
      </motion.div>
    </PageWrapper>
  );
}
