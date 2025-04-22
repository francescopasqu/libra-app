import Navbar from "../components/Navbar";
export default function Services() {
    return (
        <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Our Services</h1>
        <ul className="list-disc ml-6 space-y-2">
          <li>Strategic business consulting</li>
          <li>Automated business analysis</li>
          <li>Interactive AI dashboard</li>
        </ul>
      </div>
      </>
    );
  }
  