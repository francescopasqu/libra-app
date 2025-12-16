// src/pages/Contact.jsx
import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Mail, Instagram, Send, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.privacy) return;

    const subject = encodeURIComponent("New enquiry from Libra website");
    const body = encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\n` +
        `Email: ${form.email}\n` +
        `Phone: ${form.phone}\n\n` +
        `Message:\n${form.message}`
    );

    window.location.href = `mailto:info@libra.com?subject=${subject}&body=${body}`;
  };

  const isValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.message &&
    form.privacy;

  return (
    <>
      <main className="min-h-screen bg-slate-50 text-[#1d3557] px-4 py-16">
        <PageWrapper>
          {/* HERO */}
          <motion.section
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
              Contact <span className="text-accent">Libra</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re here to help you build clarity, momentum, and sustainable
              growth. Choose how you prefer to reach out, or send a message
              directly through the form.
            </p>
          </motion.section>

          {/* QUICK CONTACT CARDS */}
          <motion.section
  className="max-w-3xl mx-auto mb-12 space-y-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.6 }}
>
  <div className="bg-white rounded-2xl shadow-md border border-slate-200 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="bg-sky-100 rounded-full p-3">
        <Mail className="w-6 h-6 text-accent" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Email
        </p>
        <a
          href="mailto:francescopasquariello94@gmail.com"
          className="font-semibold text-[#1d3557] hover:text-accent"
        >
          francescopasquariello94@gmail.com
        </a>
      </div>
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow-md border border-slate-200 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="bg-sky-100 rounded-full p-3">
        <Instagram className="w-6 h-6 text-accent" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Instagram
        </p>
        <a
          href="https://instagram.com/francesco.pasqu"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[#1d3557] hover:text-accent"
        >
          @francesco.pasqu
        </a>
      </div>
    </div>
  </div>
</motion.section>


          {/* CONTACT FORM */}
          <motion.section
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 px-6 md:px-8 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold">
                Send us a message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-600">
                    First name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-slate-100 focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-600">
                    Last name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-slate-100 focus:outline-none focus:border-accent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-600">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-slate-100 focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-600">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-slate-100 focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-600">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-slate-100 focus:outline-none focus:border-accent resize-none"
                  required
                />
              </div>

              <div className="flex items-start gap-2 mt-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={form.privacy}
                  onChange={handleChange}
                  className="mt-0.5"
                  required
                />
                <span>
                  I agree to the processing of my personal data in accordance
                  with the{" "}
                  <a
                    href="#"
                    className="text-accent underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                  . *
                </span>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-md transition ${
                    isValid
                      ? "bg-primary hover:bg-primary/90 hover:shadow-lg"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.section>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}
