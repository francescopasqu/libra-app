import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-light text-text flex flex-col items-center justify-center px-6">
        <h1 className="text-5xl font-bold mb-6 text-center">
          Welcome to <span className="text-accent">Libra</span>
        </h1>
        <p className="text-lg text-muted max-w-xl text-center mb-8">
          The new era of strategic intelligence for small businesses.
        </p>
        <a
          href="/libraAI"
          className="bg-accent text-white px-6 py-3 rounded hover:bg-blue-500 transition font-medium"
        >
          Launch the AI Assistant
        </a>
      </main>
      <Footer />
    </>
  );
}
