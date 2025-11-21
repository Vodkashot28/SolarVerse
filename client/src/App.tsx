import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import "./index.css";
import LeaderboardPage from "./pages/LeaderBoard";
import WalletPage from "./pages/Wallet";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";

export default function App() {
  const [tokens, setTokens] = useState(50);
  const [discovered, setDiscovered] = useState(4);

  useEffect(() => {
    // Future: fetch user progress from TON wallet or backend
  }, []);

  return (
    <main className="solarverse">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/leaderboard" component={LeaderboardPage} />
        <Route path="/wallet" component={WalletPage} />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}
