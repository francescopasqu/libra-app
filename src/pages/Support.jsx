import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

export default function Support() {
  return (
      <PageWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-primary text-center">
            Support
          </h1>
          <p className="text-center text-gray-500 italic">
            🚧 Section under construction — functionality coming soon.
          </p>
        </motion.div>
      </PageWrapper>
  );
}
