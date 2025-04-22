import { useState } from "react";
import Navbar from "../components/Navbar";
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

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
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
    const aiOutput = data.choices[0].message.content;
    setReport(aiOutput);

    // 🧠 SAVE TO SUPABASE
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

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Libra AI Assistant</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {Object.entries(input).map(([key, value]) => (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
              value={value}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          ))}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Generating..." : "Generate Strategic Report"}
          </button>
        </form>

        {report && (
          <div className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap">
            <h2 className="text-xl font-semibold mb-2">Strategic Report</h2>
            {report}
          </div>
        )}
      </div>
    </>
  );
}

export default LibraAI;
