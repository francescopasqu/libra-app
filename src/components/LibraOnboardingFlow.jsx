import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronRight, Rocket, Shield, Calendar, Database,
  Loader2, ArrowLeft, Save, UploadCloud
} from "lucide-react";
import { supabase } from "../supabaseClient";

const STEPS = ["Profile", "Goals", "Operations", "Consent", "Summary", "Book"];

const container = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const emptyData = {
  companyName: "",
  legalForm: "",
  website: "",
  industry: "",
  country: "Italy",
  city: "Milan",
  teamSize: "1-5",
  revenueRange: "<100k",
  mainPain: "",
  topGoals: "",
  kpisTracked: "",
  opsModel: "",
  toolsStack: "",
  acceptsPrivacy: false,
  acceptsProcessing: false,
};

export default function LibraOnboardingFlow({
  userId,
  bookingUrl = "https://calendly.com/your-calendly/30min",
}) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("libra_onboarding_draft");
      if (cached) return { ...emptyData, ...JSON.parse(cached) };
    }
    return emptyData;
  });

  const progress = useMemo(
    () => Math.round(((step + 1) / STEPS.length) * 100),
    [step]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("libra_onboarding_draft", JSON.stringify(data));
    }
  }, [data]);

  function update(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function canNext(currentStep) {
    if (currentStep === 0) return data.companyName.trim() && data.industry.trim();
    if (currentStep === 1) return data.mainPain.trim() && data.topGoals.trim();
    if (currentStep === 2) return data.opsModel.trim();
    if (currentStep === 3) return data.acceptsPrivacy && data.acceptsProcessing;
    return true;
  }

  async function persistToSupabase() {
    if (!userId) {
      alert("Missing userId. Make sure you're passing Supabase auth user id.");
      return;
    }
    setSaving(true);
    try {
      const { error: profileErr } = await supabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            company_name: data.companyName,
            legal_form: data.legalForm,
            website: data.website,
            industry: data.industry,
            country: data.country,
            city: data.city,
            team_size: data.teamSize,
            revenue_range: data.revenueRange,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );
      if (profileErr) throw profileErr;

      const { error: qErr } = await supabase.from("questionnaire_responses").insert({
        user_id: userId,
        section: "onboarding_v1",
        responses: data,
        created_at: new Date().toISOString(),
      });
      if (qErr) throw qErr;

      setSubmitted(true);
      if (typeof window !== "undefined")
        localStorage.removeItem("libra_onboarding_draft");
    } catch (e) {
      console.error(e);
      alert("Couldn’t save to Supabase. Check console for details and verify table schemas.");
    } finally {
      setSaving(false);
    }
  }

  const next = () => step < STEPS.length - 1 && setStep((s) => s + 1);
  const prev = () => step > 0 && setStep((s) => s - 1);

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6 md:p-8">
      <div className="rounded-2xl border bg-white/70 backdrop-blur shadow-xl">
        <header className="space-y-2 p-6 border-b">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100">Libra Onboarding</span>
          </div>
          <h2 className="text-2xl font-semibold">Let’s calibrate Libra to your business</h2>
          <div className="text-sm text-gray-600">
            {STEPS.map((s, i) => (
              <span key={s} className={`mr-2 ${i === step ? "font-semibold" : "opacity-60"}`}>
                {s}{i < STEPS.length - 1 ? " · " : ""}
              </span>
            ))}
          </div>
          <div className="mt-2">
            <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
              <div className="h-full bg-black/80" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-1 text-xs opacity-70">{progress}% complete</div>
          </div>
        </header>

        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div key={step} variants={container} initial="hidden" animate="visible" exit="exit">
              {step === 0 && <StepProfile data={data} update={update} />}
              {step === 1 && <StepGoals data={data} update={update} />}
              {step === 2 && <StepOps data={data} update={update} />}
              {step === 3 && <StepConsent data={data} update={update} />}
              {step === 4 && <StepSummary data={data} />}
              {step === 5 && <StepBook bookingUrl={bookingUrl} submitted={submitted} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="flex items-center justify-between gap-2 p-6 border-t">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="flex items-center gap-2">
            {step <= 4 && (
              <button
                onClick={persistToSupabase}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save draft to Supabase
              </button>
            )}

            {step < STEPS.length - 1 && (
              <button
                onClick={next}
                disabled={!canNext(step)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm disabled:opacity-50"
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {step === 4 && (
              <button
                onClick={() => setStep(5)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm"
              >
                Confirm & Book <Calendar className="h-4 w-4" />
              </button>
            )}
          </div>
        </footer>

        <div className="px-6 pb-6 text-xs opacity-60 flex items-center gap-2">
          <Database className="h-3.5 w-3.5" />
          Drafts auto-save locally. We only persist to Supabase when you click “Save draft”.
        </div>
      </div>
    </div>
  );
}

function FieldRow({ label, children, hint }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {hint && <p className="text-xs opacity-70">{hint}</p>}
    </div>
  );
}

function TwoCol({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function TextInput(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 ${props.className || ""}`}
    />
  );
}

function TextArea(props) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 ${props.className || ""}`}
    />
  );
}

function SelectInput({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
    >
      {children}
    </select>
  );
}

function CheckboxInput({ checked, onChange, id }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 rounded border"
    />
  );
}

function StepProfile({ data, update }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Company profile</h3>
      <TwoCol>
        <FieldRow label="Company name*">
          <TextInput value={data.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder="Libra S.r.l." />
        </FieldRow>
        <FieldRow label="Legal form">
          <TextInput value={data.legalForm} onChange={(e) => update("legalForm", e.target.value)} placeholder="S.r.l., S.p.A., Sole Proprietorship…" />
        </FieldRow>
      </TwoCol>
      <TwoCol>
        <FieldRow label="Website">
          <TextInput value={data.website} onChange={(e) => update("website", e.target.value)} placeholder="https://…" />
        </FieldRow>
        <FieldRow label="Industry*">
          <SelectInput value={data.industry} onChange={(v) => update("industry", v)}>
            <option value="">Select industry</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail</option>
            <option value="ecommerce">E-commerce</option>
            <option value="services">Services</option>
            <option value="renewables">Renewables / Energy</option>
            <option value="logistics">Logistics</option>
            <option value="other">Other</option>
          </SelectInput>
        </FieldRow>
      </TwoCol>
      <TwoCol>
        <FieldRow label="Country">
          <TextInput value={data.country} onChange={(e) => update("country", e.target.value)} />
        </FieldRow>
        <FieldRow label="City">
          <TextInput value={data.city} onChange={(e) => update("city", e.target.value)} />
        </FieldRow>
      </TwoCol>

      <TwoCol>
        <FieldRow label="Team size">
          <SelectInput value={data.teamSize} onChange={(v) => update("teamSize", v)}>
            <option value="1-5">1–5</option>
            <option value="6-20">6–20</option>
            <option value="21-50">21–50</option>
            <option value="51-200">51–200</option>
            <option value=">200">200+</option>
          </SelectInput>
        </FieldRow>
        <FieldRow label="Annual revenue (range)">
          <SelectInput value={data.revenueRange} onChange={(v) => update("revenueRange", v)}>
            <option value="<100k">&lt; €100k</option>
            <option value="100k-500k">€100k–€500k</option>
            <option value="500k-1m">€500k–€1m</option>
            <option value=">1m">€1m+</option>
          </SelectInput>
        </FieldRow>
      </TwoCol>
    </div>
  );
}

function StepGoals({ data, update }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Pain points & goals</h3>
      <FieldRow
        label="What’s the #1 problem to solve in the next 90 days?*"
        hint="Be specific: e.g., 'Stockouts on top SKUs, losing €8k/mo' or 'CAC too high vs LTV'"
      >
        <TextArea rows={3} value={data.mainPain} onChange={(e) => update("mainPain", e.target.value)} placeholder="…" />
      </FieldRow>
      <FieldRow
        label="Top 3 goals for the next quarter*"
        hint="Examples: Reduce unit economics losses; Improve forecasting accuracy; Launch B2B channel"
      >
        <TextArea rows={3} value={data.topGoals} onChange={(e) => update("topGoals", e.target.value)} placeholder="…" />
      </FieldRow>
      <FieldRow label="Which KPIs are you tracking today? How?">
        <TextArea
          rows={3}
          value={data.kpisTracked}
          onChange={(e) => update("kpisTracked", e.target.value)}
          placeholder="e.g., Revenue, AOV, Churn, OTIF, Forecast accuracy, NPS…"
        />
      </FieldRow>
    </div>
  );
}

function StepOps({ data, update }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Operations & tools</h3>
      <FieldRow
        label="How does the business operate today? (Ops model)*"
        hint="Summarize your process from lead → order → fulfillment → cash"
      >
        <TextArea rows={4} value={data.opsModel} onChange={(e) => update("opsModel", e.target.value)} placeholder="…" />
      </FieldRow>
      <FieldRow
        label="Current tool stack (ERP/CRM, marketing, analytics, finance)"
        hint="List key tools and pain points (e.g., 'No single source of truth')"
      >
        <TextArea
          rows={3}
          value={data.toolsStack}
          onChange={(e) => update("toolsStack", e.target.value)}
          placeholder="e.g., Stripe, Shopify, HubSpot, Xero, Excel…"
        />
      </FieldRow>
    </div>
  );
}

function StepConsent({ data, update }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Shield className="h-5 w-5" /> Privacy & data processing
      </h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <CheckboxInput
            id="privacy"
            checked={data.acceptsPrivacy}
            onChange={(v) => update("acceptsPrivacy", v)}
          />
          <label htmlFor="privacy" className="leading-snug">
            I agree to Libra’s Privacy Notice (data stored securely, used only for service delivery).
          </label>
        </div>
        <div className="flex items-start gap-3">
          <CheckboxInput
            id="processing"
            checked={data.acceptsProcessing}
            onChange={(v) => update("acceptsProcessing", v)}
          />
          <label htmlFor="processing" className="leading-snug">
            I consent to processing my answers to build my tailored diagnostic plan.
          </label>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ k, v }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b last:border-b-0">
      <div className="text-sm opacity-70 min-w-[140px]">{k}</div>
      <div className="text-sm font-medium text-right whitespace-pre-wrap">{v || "—"}</div>
    </div>
  );
}

function StepSummary({ data }) {
  const summary = [
    ["Company", data.companyName],
    ["Industry", data.industry],
    ["Location", `${data.city}, ${data.country}`],
    ["Team size", data.teamSize],
    ["Revenue", data.revenueRange],
    ["Website", data.website],
  ];
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review & confirm</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border p-4">
          <div className="text-base font-semibold mb-2">Snapshot</div>
          {summary.map(([k, v]) => <InfoRow key={k} k={k} v={v} />)}
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-base font-semibold mb-2">Focus</div>
          <div className="space-y-2">
            <InfoRow k="#1 Pain" v={data.mainPain} />
            <InfoRow k="Top goals" v={data.topGoals} />
            <InfoRow k="KPIs" v={data.kpisTracked} />
            <InfoRow k="Ops model" v={data.opsModel} />
            <InfoRow k="Tools" v={data.toolsStack} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs opacity-70">
        <UploadCloud className="h-3.5 w-3.5" /> We’ll turn this into a tailored diagnostic plan post-call.
      </div>
    </div>
  );
}

function StepBook({ bookingUrl, submitted }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Book your intro call</h3>
      {!submitted && (
        <div className="text-sm opacity-80 p-3 rounded-md border">
          Tip: hit <strong>“Save draft to Supabase”</strong> first so your answers are stored before booking.
        </div>
      )}
      <div className="rounded-lg border overflow-hidden">
        <iframe title="Calendly" src={bookingUrl} className="w-full h-[720px]" frameBorder="0" />
      </div>
      <div className="flex items-center gap-2 text-green-600">
        <Check className="h-4 w-4" /> You’re almost done — pick a slot and you’re set.
      </div>
    </div>
  );
}

/* --------- Supabase SQL (promemoria)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_name text,
  legal_form text,
  website text,
  industry text,
  country text,
  city text,
  team_size text,
  revenue_range text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists public.questionnaire_responses (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  section text not null,
  responses jsonb not null,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
alter table public.questionnaire_responses enable row level security;
create policy "Profiles are viewable by owner" on public.profiles for select using (auth.uid() = id);
create policy "Profiles are upsertable by owner" on public.profiles for insert with check (auth.uid() = id);
create policy "Profiles are updatable by owner" on public.profiles for update using (auth.uid() = id);
create policy "Questionnaires readable by owner" on public.questionnaire_responses for select using (auth.uid() = user_id);
create policy "Questionnaires insertable by owner" on public.questionnaire_responses for insert with check (auth.uid() = user_id);
--------- */
