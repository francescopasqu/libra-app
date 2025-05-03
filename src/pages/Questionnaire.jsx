// ✅ Questionnaire.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { supabase } from "../supabaseClient"; // Assicurati di averlo!
import { toast } from "react-hot-toast";

const questions = [
  { question: "What is your company's name?", type: "text" },
  { question: "How long has your business been operating?", type: "choice", options: ["Less than 1 year", "1–3 years", "3–5 years", "More than 5 years"] },
  { question: "How many people work in your business (including you)?", type: "choice", options: ["Just me", "2–5", "6–10", "More than 10"] },
  { question: "In which industry does your company operate?", type: "text" },
  { question: "What is your main sales model?", type: "choice", options: ["B2B", "B2C", "Mixed"] },
  { question: "What do you mainly sell?", type: "choice", options: ["Physical products", "Services", "Digital products", "SaaS/subscriptions"] },
  { question: "What is your best-selling product or service?", type: "text" },
  { question: "What do your customers appreciate the most?", type: "choice", options: ["Competitive pricing", "Quality", "Reliability", "Flexibility", "Speed", "Prestige/Experience"] },
  { question: "How do new customers mainly find you?", type: "choice", options: ["Word of mouth", "Social media", "Google/Online ads", "Events", "Partnerships"] },
  { question: "How do you deliver your products/services?", type: "choice", options: ["In-person", "Online", "Physical delivery"] },
  { question: "How do you receive payments?", type: "choice", options: ["Direct payment", "Bank transfer/invoice", "Online payment (Stripe, PayPal)"] },
  { question: "What are your main weekly activities?", type: "choice", options: ["Production/Delivery", "Logistics/Shipping", "Order management/Admin", "Marketing/Promotion", "Team management"] },
  { question: "Do you have active collaborators?", type: "choice", options: ["I work alone", "I have collaborators"] },
  { question: "What are your main recurring costs?", type: "choice", options: ["Rent/Utilities", "Staff/Collaborators", "Raw materials/Goods", "Consulting/External services"] },
  { question: "Do you manage cash flow?", type: "choice", options: ["Yes, with software", "Yes, with Excel", "No"] },
  { question: "Your current annual revenue?", type: "choice", options: ["Up to 50k", "50k–100k", "100k–300k", "300k–1M", "Over 1M"] },
  { question: "Is your business profitable?", type: "choice", options: ["Yes, with positive margins", "Yes, but low margins", "No, investing to grow", "No, struggling"] },
  { question: "What is your biggest current challenge?", type: "text" },
  { question: "Which area would you urgently like to improve?", type: "text" },
  { question: "Do you have a growth direction in mind?", type: "text" },
  { question: "How do you feel about managing your business?", type: "choice", options: ["In control", "A bit confused", "Want to improve but don't know where to start"] },
  { question: "If you could improve one area in 30 days, what would it be?", type: "text" },
  { question: "Where do you see your business in 6 months?", type: "text" },
  { question: "If you had a weekly assistant, what should they do for you?", type: "text" },
  { question: "Are you interested in a personal dashboard and weekly action plan?", type: "choice", options: ["Yes", "Only if simple", "Only if useful", "No"] },
];

export default function Questionnaire() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [current]: answer });
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase.from("questionnaires").insert([
      { user_id: user.data.user.id, answers: answers }
    ]);
    setLoading(false);
    if (error) {
      toast.error("Something went wrong! Please try again.");
    } else {
      toast.success("Questionnaire submitted successfully!");
      window.location.href = "/dashboard"; // Redirect after success
    }
  };

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto p-4 sm:p-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-6">
          Business Assessment
        </h1>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
          <motion.div
            className="bg-primary h-2"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Current question */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">{questions[current].question}</h2>

          {questions[current].type === "choice" && (
            <div className="flex flex-col gap-4">
              {questions[current].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white rounded-full px-6 py-3 transition-all text-sm sm:text-base"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {questions[current].type === "text" && (
            <input
              type="text"
              onBlur={(e) => handleAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="border border-gray-300 rounded-lg w-full p-3"
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="flex items-center text-primary disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>

          {current === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center text-primary disabled:opacity-50"
            >
              Next <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          )}
        </div>
      </motion.div>
    </PageWrapper>
  );
}
