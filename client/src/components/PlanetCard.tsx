import { PlanetData } from "@/data/planets";
import { useSolarSystem } from "@/lib/stores/useSolarSystem";
import { Trophy, Lock, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

interface PlanetCardProps {
  planet: PlanetData;
  index: number;
}

export function PlanetCard({ planet, index }: PlanetCardProps) {
  const { isPlanetDiscovered, discoveredPlanets } = useSolarSystem();
  const isDiscovered = isPlanetDiscovered(planet.name);
  
  const discovery = discoveredPlanets.find(d => d.name === planet.name);
  const rarityData = getRarityColor(planet.rarity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative rounded-xl overflow-hidden border-2 ${
        isDiscovered 
          ? `${rarityData.borderClass} ${rarityData.bgClass}`
          : 'border-gray-700 bg-black/60'
      } backdrop-blur-sm`}
    >
      <div className="p-4">
        {!isDiscovered && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <Lock className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Undiscovered</p>
            </div>
          </div>
        )}
        
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-white">{planet.name}</h3>
            {isDiscovered && (
              <div className={`flex items-center gap-1 ${rarityData.textClass} text-xs mt-1`}>
                <Star className="w-3 h-3 fill-current" />
                <span className="font-semibold">{planet.rarity}</span>
              </div>
            )}
          </div>
          {isDiscovered && (
            <Award className={`w-6 h-6 ${rarityData.textClass}`} />
          )}
        </div>

        <div
          className="w-full h-32 rounded-lg mb-3 flex items-center justify-center"
          style={{
            backgroundColor: isDiscovered ? planet.color : '#333',
            boxShadow: isDiscovered ? `0 0 30px ${planet.color}40` : 'none',
            opacity: isDiscovered ? 1 : 0.3
          }}
        >
          <div
            className="w-20 h-20 rounded-full"
            style={{
              backgroundColor: isDiscovered ? planet.color : '#555',
              boxShadow: isDiscovered ? `0 0 40px ${planet.color}` : 'none'
            }}
          />
        </div>

        {isDiscovered && (
          <>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <StatBox label="Difficulty" value={`${planet.stats.explorationDifficulty}/10`} />
              <StatBox label="Value" value={`${planet.stats.scientificValue}/10`} />
              <StatBox label="Unique" value={`${planet.stats.uniqueness}/10`} />
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <StatBox label="Moons" value={planet.facts.moons} />
              <StatBox label="Reward" value={`${planet.tokenReward} ST`} />
            </div>
            
            {discovery && (
              <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-700">
                Discovered {new Date(discovery.discoveredAt).toLocaleDateString()}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/40 rounded px-2 py-1">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm font-bold text-white">{value}</div>
    </div>
  );
}

function getRarityColor(rarity: string): { textClass: string; borderClass: string; bgClass: string } {
  switch (rarity) {
    case "Legendary":
      return { 
        textClass: "text-purple-400",
        borderClass: "border-purple-500/50",
        bgClass: "bg-gradient-to-br from-purple-500/10 to-black/80"
      };
    case "Epic":
      return { 
        textClass: "text-blue-400",
        borderClass: "border-blue-500/50",
        bgClass: "bg-gradient-to-br from-blue-500/10 to-black/80"
      };
    case "Rare":
      return { 
        textClass: "text-green-400",
        borderClass: "border-green-500/50",
        bgClass: "bg-gradient-to-br from-green-500/10 to-black/80"
      };
    default:
      return { 
        textClass: "text-gray-400",
        borderClass: "border-gray-500/50",
        bgClass: "bg-gradient-to-br from-gray-500/10 to-black/80"
      };
  }
}
