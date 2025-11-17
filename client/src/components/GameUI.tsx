import { useSolarSystem } from "@/lib/stores/useSolarSystem";
import { planetsData } from "@/data/planets";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { Coins, Trophy, Target } from "lucide-react";

export function GameUI() {
  const { totalTokens, discoveredPlanets, setWalletAddress, getNextUndiscoveredPlanet } = useSolarSystem();
  const address = useTonAddress();
  const nextPlanet = getNextUndiscoveredPlanet();

  useEffect(() => {
    setWalletAddress(address || null);
  }, [address, setWalletAddress]);

  const progress = (discoveredPlanets.length / planetsData.length) * 100;

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-4 min-w-[280px]">
          <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">🌌</span>
            Solar System Explorer
          </h1>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">StarTokens</span>
              </div>
              <span className="text-2xl font-bold text-yellow-400">{totalTokens}</span>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm">Progress</span>
                </div>
                <span className="text-white text-sm font-semibold">
                  {discoveredPlanets.length}/{planetsData.length}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {nextPlanet && (
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-xs font-semibold">NEXT DISCOVERY</span>
                </div>
                <p className="text-white font-bold">{nextPlanet}</p>
              </div>
            )}

            {discoveredPlanets.length === planetsData.length && (
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-3 text-center">
                <p className="text-white font-bold text-sm">🎉 ALL PLANETS DISCOVERED! 🎉</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3">
          <TonConnectButton />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg px-6 py-3">
          <p className="text-white text-sm text-center">
            <span className="font-semibold">Click planets to discover them</span>
            <span className="text-white/60"> • Earn StarTokens • Complete your collection</span>
          </p>
        </div>
      </div>
    </div>
  );
}
