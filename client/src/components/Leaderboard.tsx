import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSolarSystem } from "@/lib/stores/useSolarSystem";
import { Trophy, Medal, Award, X } from "lucide-react";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  id: number;
  walletAddress: string;
  username: string | null;
  totalTokens: number;
  planetsDiscovered: number;
  lastActive: string;
}

interface LeaderboardProps {
  onClose: () => void;
}

export function Leaderboard({ onClose }: LeaderboardProps) {
  const { totalTokens, discoveredPlanets, walletAddress } = useSolarSystem();

  const { data: entries = [], isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (walletAddress && discoveredPlanets.length > 0) {
      fetch("/api/leaderboard/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress,
          totalTokens,
          planetsDiscovered: discoveredPlanets.length,
        }),
      }).catch(err => console.error("Failed to update leaderboard:", err));
    }
  }, [walletAddress, totalTokens, discoveredPlanets]);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                Leaderboard
              </h1>
              <p className="text-gray-400">Top StarToken Collectors</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, index) => {
                const rank = index + 1;
                const isCurrentUser = entry.walletAddress === walletAddress;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${
                      isCurrentUser
                        ? "bg-blue-500/20 border-blue-400/50"
                        : "bg-black/40 border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30">
                      {getMedalIcon(rank) || (
                        <span className="text-white font-bold text-lg">#{rank}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold truncate">
                          {entry.username || `${entry.walletAddress.slice(0, 6)}...${entry.walletAddress.slice(-4)}`}
                        </p>
                        {isCurrentUser && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                            YOU
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {entry.planetsDiscovered} planets discovered
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-yellow-400">
                        {entry.totalTokens.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">StarTokens</p>
                    </div>
                  </motion.div>
                );
              })}

              {entries.length === 0 && (
                <div className="text-center text-gray-400 py-12">
                  <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p>No entries yet. Be the first to discover planets!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
