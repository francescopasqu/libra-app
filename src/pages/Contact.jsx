// ✅ Contact.jsx - Supreme Version
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import { Mail, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <>
      <main className="min-h-screen bg-light text-text px-6 py-16">
        <PageWrapper>
          <section className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-6 text-primary"
            >
              Contact Libra
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-muted mb-10"
            >
              We're here to help you build clarity, momentum, and success.
            </motion.p>

            <div className="grid gap-8">
              <ContactCard
                icon={<Mail className="w-8 h-8 text-accent" />}
                label="Email"
                value="info@libra.com"
                href="mailto:info@libra.com"
              />
              <ContactCard
                icon={<Instagram className="w-8 h-8 text-accent" />}
                label="Instagram"
                value="@libra.consulting"
                href="https://instagram.com/libra.consulting"
              />
            </div>
          </section>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}

function ContactCard({ icon, label, value, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-4 bg-surface p-6 rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition text-center"
      whileHover={{ scale: 1.03 }}
    >
      {icon}
      <div className="flex flex-col">
        <span className="text-sm text-muted uppercase tracking-wide">{label}</span>
        <span className="text-lg font-semibold text-primary">{value}</span>
      </div>
    </motion.a>
  );
}
