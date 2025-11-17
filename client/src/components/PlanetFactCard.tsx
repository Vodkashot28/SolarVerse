import { useSolarSystem } from "@/lib/stores/useSolarSystem";
import { planetsData } from "@/data/planets";
import { X, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PlanetFactCard() {
  const { selectedPlanet, selectPlanet, isPlanetDiscovered } = useSolarSystem();
  
  if (!selectedPlanet) return null;

  const planet = planetsData.find(p => p.name === selectedPlanet);
  if (!planet) return null;

  const isDiscovered = isPlanetDiscovered(planet.name);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 pointer-events-auto z-50"
      >
        <div className="bg-black/90 backdrop-blur-xl border-2 border-white/30 rounded-2xl p-6 max-w-md shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{planet.name}</h2>
              {isDiscovered && (
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <Award className="w-4 h-4" />
                  <span>Discovered</span>
                </div>
              )}
            </div>
            <button
              onClick={() => selectPlanet(null)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className="w-16 h-16 rounded-full mb-4 shadow-lg"
            style={{
              backgroundColor: planet.color,
              boxShadow: `0 0 30px ${planet.color}80`
            }}
          />

          <div className="space-y-3">
            <FactItem label="Distance from Sun" value={planet.facts.distance} />
            <FactItem label="Diameter" value={planet.facts.diameter} />
            <FactItem label="Moons" value={planet.facts.moons} />
            <FactItem label="Day Length" value={planet.facts.dayLength} />
            <FactItem label="Year Length" value={planet.facts.yearLength} />
            <FactItem label="Temperature" value={planet.facts.temperature} />
            <FactItem label="Composition" value={planet.facts.composition} />
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-sm text-blue-300 font-semibold mb-1">Fun Fact</p>
            <p className="text-white/90 text-sm leading-relaxed">{planet.facts.funFact}</p>
          </div>

          {isDiscovered && (
            <div className="mt-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-3 text-center">
              <p className="text-yellow-400 font-bold">+{planet.tokenReward} StarTokens Earned!</p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-white/60 text-sm font-medium">{label}:</span>
      <span className="text-white text-sm font-semibold text-right max-w-[60%]">{value}</span>
    </div>
  );
}
