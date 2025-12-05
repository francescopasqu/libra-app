// ✅ Questionnaire.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import PageWrapper from "../components/PageWrapper";

const questions = [
  // SEZIONE 1 – Profilo dell’attività
  { question: "Come si chiama la tua azienda?", type: "text" },
  { question: "Da quanto tempo è attiva?", type: "choice", options: ["Meno di 1 anno", "1–3 anni", "3–5 anni", "Più di 5 anni"] },
  { question: "Quante persone ci lavorano attualmente?", type: "choice", options: ["Solo io", "2–5", "6–10", "Più di 10"] },
  { question: "In che settore opera la tua azienda?", type: "text" },
  { question: "Il tuo modello di vendita è principalmente?", type: "choice", options: ["B2B", "B2C", "Misto"] },
  { question: "Cosa vendi principalmente?", type: "choice", options: ["Prodotti fisici", "Servizi", "Prodotti digitali", "SaaS o abbonamenti"] },

  // SEZIONE 2 – Posizionamento e canali
  { question: "Qual è il prodotto o servizio più venduto oggi?", type: "text" },
  { question: "Cosa apprezzano di più i tuoi clienti?", type: "choice", options: ["Prezzo competitivo", "Qualità", "Affidabilità", "Flessibilità", "Velocità", "Esperienza/prestigio"] },
  { question: "Come ti trovano principalmente i nuovi clienti?", type: "choice", options: ["Passaparola", "Social media", "Google/pubblicità online", "Eventi", "Collaborazioni"] },
  { question: "Come fornisci i tuoi prodotti o servizi?", type: "choice", options: ["In presenza", "Online", "Consegna fisica"] },
  { question: "Come ricevi i pagamenti dai tuoi clienti?", type: "choice", options: ["Pagamento diretto", "Bonifico o fattura", "Online (Stripe, PayPal, ecc.)"] },

  // SEZIONE 3 – Organizzazione e attività
  { question: "Quali sono le attività principali che svolgi ogni settimana?", type: "choice", options: ["Produzione", "Spedizione/logistica", "Gestione ordini", "Marketing", "Coordinamento team"] },
  { question: "Hai collaboratori attivi o fai tutto da solo?", type: "choice", options: ["Faccio tutto da solo", "Ho 1 o più collaboratori"] },
  { question: "Quali sono i principali costi ricorrenti della tua attività?", type: "choice", options: ["Affitto/bollette", "Personale", "Materie prime/materiali", "Consulenze/servizi esterni"] },
  { question: "Gestisci già un flusso di cassa?", type: "choice", options: ["Sì, con software", "Sì, con Excel", "No"] },

  // SEZIONE 4 – Situazione attuale e obiettivi
  { question: "Il tuo fatturato annuo attuale è circa?", type: "choice", options: ["Fino a 50k", "50k–100k", "100k–300k", "300k–1M", "Oltre 1M"] },
  { question: "La tua attività è attualmente profittevole?", type: "choice", options: ["Sì, margine positivo", "Sì, ma margini bassi", "No, sto investendo", "No, sono in difficoltà"] },
  { question: "Qual è oggi la tua maggiore difficoltà?", type: "text" },
  { question: "Quale aspetto vorresti migliorare più urgentemente?", type: "text" },
  { question: "Hai già in mente una direzione di crescita?", type: "text" },
  { question: "Come ti senti rispetto alla gestione della tua attività?", type: "choice", options: ["In controllo", "Un po' confuso", "Vorrei migliorare"] },

  // SEZIONE 5 – Visione e crescita
  { question: "Se potessi migliorare una sola area in 30 giorni, quale sarebbe?", type: "text" },
  { question: "Dove vorresti essere con la tua azienda tra 6 mesi?", type: "text" },
  { question: "Se avessi un assistente ogni settimana, cosa dovrebbe fare per te?", type: "text" },
  { question: "Saresti interessato a ricevere un piano d’azione e una dashboard personalizzata?", type: "choice", options: ["Sì", "Solo se semplice", "Solo se utile", "No"] },
];

async function saveResponses(userId, answers) {
  const { data, error } = await supabase
    .from('questionnaire_responses')
    .insert([{ user_id: userId, answers: answers }]);

  if (error) {
    console.error('Errore salvataggio:', error);
    return false;
  }
  return true;
}

export default function Questionnaire() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [current]: answer });
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const success = await saveResponses(user.id, answers);
      if (success) {
        setShowToast(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        alert("Errore nel salvataggio. Riprova.");
      }
    } else {
      alert("Utente non autenticato.");
    }
    setSaving(false);
  };

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto p-4 relative"
      >
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Questionario
        </h1>

        {/* Barra di progresso */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-primary h-2.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Domanda corrente */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">
            {questions[current].question}
          </h2>

          {questions[current].type === "choice" && (
            <div className="flex flex-col space-y-4">
              {questions[current].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {questions[current].type === "text" && (
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                onBlur={(e) => handleAnswer(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
                placeholder="Risposta..."
              />
            </div>
          )}
        </div>

        {/* Navigazione */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="flex items-center text-primary disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Indietro
          </button>

          {current < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center text-primary"
            >
              Avanti <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition"
            >
              {saving ? "Salvataggio..." : "Conferma invio risposte"}
            </button>
          )}
        </div>

        {/* Toast di conferma */}
        {showToast && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg">
            ✅ Questionario completato!
          </div>
        )}
      </motion.div>
    </PageWrapper>
  );
}
