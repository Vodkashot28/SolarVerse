import { create } from "zustand";
import { persist } from "zustand/middleware";
import { planetsData } from "@/data/planets";

export interface DiscoveredPlanet {
  name: string;
  discoveredAt: number;
  tokenEarned: number;
}

interface SolarSystemState {
  discoveredPlanets: DiscoveredPlanet[];
  totalTokens: number;
  selectedPlanet: string | null;
  walletAddress: string | null;
  
  discoverPlanet: (planetName: string) => void;
  selectPlanet: (planetName: string | null) => void;
  setWalletAddress: (address: string | null) => void;
  addTokens: (amount: number) => void;
  isPlanetDiscovered: (planetName: string) => boolean;
  canDiscoverPlanet: (planetName: string) => boolean;
  getNextUndiscoveredPlanet: () => string | null;
}

export const useSolarSystem = create<SolarSystemState>()(
  persist(
    (set, get) => ({
      discoveredPlanets: [],
      totalTokens: 0,
      selectedPlanet: null,
      walletAddress: null,

      discoverPlanet: (planetName: string) => {
        const state = get();
        
        if (state.isPlanetDiscovered(planetName)) {
          console.log(`${planetName} already discovered`);
          return;
        }

        if (!state.canDiscoverPlanet(planetName)) {
          console.log(`Cannot discover ${planetName} yet. Discover previous planets first!`);
          return;
        }

        const planet = planetsData.find(p => p.name === planetName);
        if (!planet) return;

        const newDiscovery: DiscoveredPlanet = {
          name: planetName,
          discoveredAt: Date.now(),
          tokenEarned: planet.tokenReward
        };

        set((state) => ({
          discoveredPlanets: [...state.discoveredPlanets, newDiscovery],
          totalTokens: state.totalTokens + planet.tokenReward
        }));

        console.log(`🎉 Discovered ${planetName}! Earned ${planet.tokenReward} StarTokens`);
      },

      selectPlanet: (planetName: string | null) => {
        set({ selectedPlanet: planetName });
      },

      setWalletAddress: (address: string | null) => {
        set({ walletAddress: address });
      },

      addTokens: (amount: number) => {
        set((state) => ({
          totalTokens: state.totalTokens + amount
        }));
      },

      isPlanetDiscovered: (planetName: string) => {
        return get().discoveredPlanets.some(p => p.name === planetName);
      },

      canDiscoverPlanet: (planetName: string) => {
        const state = get();
        const planetIndex = planetsData.findIndex(p => p.name === planetName);
        
        if (planetIndex === 0) return true;
        
        const previousPlanet = planetsData[planetIndex - 1];
        return state.isPlanetDiscovered(previousPlanet.name);
      },

      getNextUndiscoveredPlanet: () => {
        const state = get();
        const nextPlanet = planetsData.find(planet => 
          !state.isPlanetDiscovered(planet.name) && state.canDiscoverPlanet(planet.name)
        );
        return nextPlanet ? nextPlanet.name : null;
      }
    }),
    {
      name: "solar-system-storage"
    }
  )
);
