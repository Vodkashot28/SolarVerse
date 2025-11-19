import { useSolarSystem } from "@/lib/stores/useSolarSystem";
import { planetsData } from "@/data/planets";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { Coins, Trophy, Target, BookOpen, Users } from "lucide-react";
import { CollectionView } from "@/components/CollectionView";
import { ChallengesPanel } from "@/components/ChallengesPanel";
import { Leaderboard } from "@/components/Leaderboard";
import { useChallenges } from "@/lib/stores/useChallenges";

export function GameUI() {
  const {
    totalTokens,
    discoveredPlanets,
    setWalletAddress,
    getNextUndiscoveredPlanet,
  } = useSolarSystem();
  const { checkChallengeProgress } = useChallenges();
  const address = useTonAddress();
  const nextPlanet = getNextUndiscoveredPlanet();
  const [showCollection, setShowCollection] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    setWalletAddress(address || null);
  }, [address, setWalletAddress]);

  useEffect(() => {
    // Example: trigger challenge progress check when nextPlanet changes
    if (nextPlanet) {
      checkChallengeProgress(nextPlanet.id);
    }
  }, [nextPlanet, checkChallengeProgress]);

  return (
    <>
      {/* Top HUD */}
      <div className="absolute top-4 left-4 flex gap-2 pointer-events-auto">
        <TonConnectButton />
        <button
          onClick={() => setShowCollection(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center gap-1"
        >
          <BookOpen size={16} /> Collection
        </button>
        <button
          onClick={() => setShowLeaderboard(true)}
          className="bg-purple-500 text-white px-3 py-1 rounded-lg flex items-center gap-1"
        >
          <Trophy size={16} /> Leaderboard
        </button>
      </div>

      {/* Stats HUD */}
      <div className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg flex gap-4 pointer-events-auto">
        <div className="flex items-center gap-1">
          <Coins size={16} /> {totalTokens}
        </div>
        <div className="flex items-center gap-1">
          <Users size={16} /> {discoveredPlanets.length}/{planetsData.length}
        </div>
        {nextPlanet && (
          <div className="flex items-center gap-1">
            <Target size={16} /> Next: {nextPlanet.name}
          </div>
        )}
      </div>

      {/* Panels */}
      {showCollection && (
        <CollectionView onClose={() => setShowCollection(false)} />
      )}
      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}

      {/* Challenges */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <ChallengesPanel />
      </div>
    </>
  );
}