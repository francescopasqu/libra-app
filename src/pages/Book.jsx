// ✅ Book.jsx
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";

export default function Book() {
  return (
    <>
      <main className="min-h-screen bg-light px-6 py-12">
        <PageWrapper>
          <section className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Book a Free Consultation</h1>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://calendly.com/your-link"
                width="100%"
                height="600"
                frameBorder="0"
                className="w-full"
                title="Calendly Booking"
              ></iframe>
            </div>
          </section>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}
