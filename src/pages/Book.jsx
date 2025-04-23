import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Book() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-light px-6 py-12">
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
      </main>
      <Footer />
    </>
  );
}
