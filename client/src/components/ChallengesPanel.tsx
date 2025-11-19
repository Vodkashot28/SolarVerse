import { useChallenges } from "@/lib/stores/useChallenges";
import { useEffect } from "react";
import { Target, CheckCircle2, Circle, Gift } from "lucide-react";
import { motion } from "framer-motion";

export function ChallengesPanel() {
  const { dailyChallenges, initializeChallenges } = useChallenges();

  useEffect(() => {
    initializeChallenges();
  }, [initializeChallenges]);

  const completedCount = dailyChallenges.filter(c => c.completed).length;
  const totalRewards = dailyChallenges
    .filter(c => c.completed)
    .reduce((sum, c) => sum + c.reward, 0);

  return (
    <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-4 min-w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          Daily Challenges
        </h2>
        <div className="text-sm text-gray-400">
          {completedCount}/{dailyChallenges.length}
        </div>
      </div>

      <div className="space-y-2">
        {dailyChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg border ${
              challenge.completed
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="flex items-start gap-2">
              {challenge.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  challenge.completed ? 'text-green-300' : 'text-white'
                }`}>
                  {challenge.description}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Gift className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-semibold">
                    +{challenge.reward} ST
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {totalRewards > 0 && (
        <div className="mt-3 pt-3 border-t border-white/20 text-center">
          <p className="text-xs text-gray-400">Bonus Earned Today</p>
          <p className="text-lg font-bold text-yellow-400">+{totalRewards} ST</p>
        </div>
      )}

      {completedCount === dailyChallenges.length && dailyChallenges.length > 0 && (
        <div className="mt-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg p-2 text-center">
          <p className="text-green-300 font-semibold text-sm">🎉 All Challenges Complete!</p>
        </div>
      )}
    </div>
  );
}