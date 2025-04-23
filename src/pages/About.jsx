import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-light text-text px-6 py-12">
        <section className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Libra</h1>
          <p className="text-lg text-muted mb-6">
            My name is Francesco Pasquariello, and I founded Libra to help entrepreneurs and SMEs scale intelligently and sustainably.
          </p>
          <p className="text-lg text-muted">
            With a background in engineering and strategy, I built Libra as a platform where businesses can receive real-time insights, tailored advice, and innovative AI-powered tools to grow smarter—not harder.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
