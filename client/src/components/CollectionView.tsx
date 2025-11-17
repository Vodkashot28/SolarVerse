import { planetsData } from "@/data/planets";
import { PlanetCard } from "@/components/PlanetCard";
import { X, Trophy } from "lucide-react";
import { useSolarSystem } from "@/lib/stores/useSolarSystem";

interface CollectionViewProps {
  onClose: () => void;
}

export function CollectionView({ onClose }: CollectionViewProps) {
  const { discoveredPlanets, totalTokens } = useSolarSystem();
  const completionPercentage = Math.round((discoveredPlanets.length / planetsData.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Planet Collection</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Trophy className="w-4 h-4" />
                  <span className="font-semibold">{discoveredPlanets.length}/{planetsData.length} Discovered</span>
                </div>
                <div className="text-gray-400">
                  {completionPercentage}% Complete
                </div>
                <div className="text-yellow-400 font-semibold">
                  {totalTokens} StarTokens
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planetsData.map((planet, index) => (
              <PlanetCard key={planet.name} planet={planet} index={index} />
            ))}
          </div>

          {discoveredPlanets.length === planetsData.length && (
            <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/30 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">🎉 Master Explorer! 🎉</h2>
              <p className="text-gray-300">
                You've discovered all planets in the solar system!
              </p>
              <p className="text-yellow-400 font-bold text-xl mt-4">
                Total Earnings: {totalTokens} StarTokens
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
