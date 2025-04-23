import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

function LibraAI() {
  const [input, setInput] = useState({
    company: "",
    industry: "",
    revenue: "",
    margin: "",
    employees: "",
    channels: "",
    mainProblem: "",
    objectives: "",
    vision: ""
  });

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are Libra Assistant, an advanced business consultant AI specialized in helping small businesses. Analyze the following company data and generate a strategic report including: 1) a short company summary, 2) SWOT analysis, 3) 3 strategic levers to activate, 4) 5 action points for the next 30 days, 5) 3 goals for the next 90 days, and 6) a motivational quote to close."
            },
            {
              role: "user",
              content: `Company data:\n${JSON.stringify(input, null, 2)}`
            }
          ]
        })
      });

      const data = await response.json();

      if (data?.choices?.[0]?.message?.content) {
        const aiOutput = data.choices[0].message.content;
        setReport(aiOutput);

        const { error } = await supabase.from("ai_reports").insert([
          {
            user_email: localStorage.getItem("user_email") || "anonymous",
            input_data: input,
            output_text: aiOutput
          }
        ]);

        if (error) {
          console.error("Error saving report:", error.message);
        }
      } else {
        console.error("Invalid response:", data);
        setReport("⚠️ No valid response received from AI.");
      }
    } catch (err) {
      console.error("Error during AI request:", err);
      setReport("⚠️ Error generating report. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-light px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Libra AI Assistant</h1>
          <form onSubmit={handleSubmit} className="grid gap-4 bg-surface p-6 rounded shadow">
            {Object.entries(input).map(([key, value]) => (
              <input
                key={key}
                type="text"
                name={key}
                placeholder={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                value={value}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded"
              />
            ))}
            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-500 transition"
            >
              {loading ? "Generating..." : "Generate Strategic Report"}
            </button>
          </form>

          {report && (
            <div className="mt-8 bg-white p-6 rounded shadow-md whitespace-pre-wrap">
              <h2 className="text-xl font-semibold mb-4">Strategic Report</h2>
              {report}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default LibraAI;
