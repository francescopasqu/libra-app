// ✅ Contact.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-light px-6 py-12">
        <PageWrapper>
          <section className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-muted mb-2">Email: <a href="mailto:info@libra.com" className="text-accent underline">info@libra.com</a></p>
            <p className="text-lg text-muted">Instagram: <a href="https://instagram.com/libra.consulting" target="_blank" className="text-accent underline">@libra.consulting</a></p>
          </section>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}
