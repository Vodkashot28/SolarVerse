import { Leaderboard } from "@/components/Leaderboard";
import { GameUI } from "@/components/GameUI";

export default function LeaderboardPage() {
  return (
    <>
      <GameUI />
      {/* FIX: Pass the required onClose prop */}
      <Leaderboard onClose={() => {}} />
      {/* Add logic to fetch leaderboard data using a hook */}
    </>
  );
}
