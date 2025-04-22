import Navbar from "../components/Navbar";
export default function Book() {
    return (
        <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Book a Free Consultation</h1>
        <iframe
          src="https://calendly.com/your-username"
          width="100%"
          height="600"
          frameBorder="0"
        ></iframe>
      </div>
      </>
    );
  }
  