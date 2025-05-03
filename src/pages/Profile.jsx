// ✅ Profile.jsx
import { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";


export default function Profile() {
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <main className="min-h-screen bg-light text-text px-6 py-12">
      <PageWrapper>
        <div className="max-w-3xl mx-auto space-y-10">
          <h1 className="text-4xl font-bold mb-6 text-center">Your Profile</h1>

          <section className="bg-surface p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Account Info</h2>
            <p className="text-muted mb-2">Email: {email}</p>
            <p className="text-green-600 text-sm">✅ Email verified</p>
          </section>

          <section className="bg-surface p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Preferences</h2>
            <label className="flex items-center space-x-3 mb-4">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="text-muted">Enable AI Assistant Notifications</span>
            </label>
            <button className="mt-2 px-4 py-2 bg-accent text-white rounded hover:bg-opacity-90 transition">
              Change Password
            </button>
          </section>

          <section className="bg-surface p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <ul className="text-muted list-disc list-inside space-y-1">
              <li>Connect wallet or social login</li>
              <li>Upgrade your plan</li>
              <li>View AI usage history</li>
            </ul>
          </section>
        </div>
      </PageWrapper>
    </main>
  );
}
