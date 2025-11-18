// client/src/App.tsx
import React, { useState, useEffect } from "react";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";

const API_BASE = "https://solar-system.xyz/api";

export default function App() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [challenges, setChallenges] = useState([
    { id: 1, text: "Discover any 2 planets", reward: "+50 ST", done: false },
    { id: 2, text: "Discover Mars", reward: "+30 ST", done: false },
    { id: 3, text: "Collect 100 StarTokens", reward: "+75 ST", done: false },
  ]);

  const [tonConnectUI] = useTonConnectUI();

  // Auto-fill with your address for testing
  useEffect(() => {
    setConnectedWallet("0:fa146529b8e269ffcd7a5eacf9473b641e35389c302d7e8c3df56eb3de9c7f01");
  }, []);

  // Fetch leaderboard
  useEffect(() => {
    fetch(`${API_BASE}/leaderboard`)
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((err) => console.error("Leaderboard fetch failed:", err));
  }, []);

  // Update leaderboard entry
  const updateLeaderboard = async () => {
    if (!connectedWallet) return;
    const payload = {
      walletAddress: connectedWallet,
      username: "Jn",
      totalTokens: 100,
      planetsDiscovered: 3,
    };
    await fetch(`${API_BASE}/leaderboard/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updated = await fetch(`${API_BASE}/leaderboard`).then((res) => res.json());
    setLeaderboard(updated);
  };

  return (
    <div className="app">
      <header>
        <h1>🌌 Solar System Explorer</h1>
        <TonConnectButton />
      </header>

      <section>
        <h2>Daily Challenges</h2>
        <ul>
          {challenges.map((c) => (
            <li key={c.id}>
              {c.text} — <strong>{c.reward}</strong> {c.done ? "✓" : ""}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Leaderboard</h2>
        <button onClick={updateLeaderboard}>Update My Entry</button>
        <ul>
          {leaderboard.map((entry) => (
            <li key={entry.walletAddress}>
              {entry.username || "Anonymous"} — {entry.totalTokens} ST — {entry.planetsDiscovered} planets
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
