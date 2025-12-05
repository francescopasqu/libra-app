// src/pages/Onboarding.jsx
import React, { useEffect, useState } from "react";
import LibraOnboardingFlow from "../components/LibraOnboardingFlow";
import { supabase } from "../supabaseClient"; // <-- adattato al tuo path reale

export default function Onboarding() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      // Legge la sessione corrente
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData?.session?.user?.id || null;

      // fallback per ottenere l'utente se la sessione è vuota
      if (!uid) {
        const { data: userData } = await supabase.auth.getUser();
        if (mounted) setUserId(userData?.user?.id || null);
      } else {
        if (mounted) setUserId(uid);
      }

      if (mounted) setLoading(false);
    }

    loadUser();
    return () => { mounted = false; };
  }, []);

  if (loading) return null; // puoi sostituire con uno spinner o skeleton

  return (
    <div className="max-w-5xl mx-auto">
      <LibraOnboardingFlow
        userId={userId}
        bookingUrl="https://calendly.com/your-calendly/30min"
      />
    </div>
  );
}
