import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DailyChallenge {
  id: string;
  date: string;
  description: string;
  requirement: {
    type: "discover" | "collect";
    target: number;
    planetName?: string;
  };
  reward: number;
  completed: boolean;
}

interface ChallengesState {
  dailyChallenges: DailyChallenge[];
  lastChallengeDate: string | null;
  
  initializeChallenges: () => void;
  completeChallenge: (challengeId: string) => number;
  checkChallengeProgress: (discoveredCount: number, latestPlanet: string | null) => void;
}

const generateDailyChallenges = (): DailyChallenge[] => {
  const today = new Date().toISOString().split('T')[0];
  
  return [
    {
      id: `daily-1-${today}`,
      date: today,
      description: "Discover any 2 planets",
      requirement: {
        type: "discover",
        target: 2
      },
      reward: 50,
      completed: false
    },
    {
      id: `daily-2-${today}`,
      date: today,
      description: "Discover Mars",
      requirement: {
        type: "discover",
        target: 1,
        planetName: "Mars"
      },
      reward: 30,
      completed: false
    },
    {
      id: `daily-3-${today}`,
      date: today,
      description: "Collect 100 StarTokens",
      requirement: {
        type: "collect",
        target: 100
      },
      reward: 75,
      completed: false
    }
  ];
};

export const useChallenges = create<ChallengesState>()(
  persist(
    (set, get) => ({
      dailyChallenges: [],
      lastChallengeDate: null,

      initializeChallenges: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastChallengeDate } = get();
        
        if (lastChallengeDate !== today) {
          set({
            dailyChallenges: generateDailyChallenges(),
            lastChallengeDate: today
          });
          console.log("🎯 New daily challenges generated!");
        }
      },

      completeChallenge: (challengeId: string) => {
        const { dailyChallenges } = get();
        const challenge = dailyChallenges.find(c => c.id === challengeId);
        
        if (!challenge || challenge.completed) {
          return 0;
        }

        set({
          dailyChallenges: dailyChallenges.map(c =>
            c.id === challengeId ? { ...c, completed: true } : c
          )
        });

        console.log(`✅ Challenge completed: ${challenge.description} (+${challenge.reward} tokens)`);
        return challenge.reward;
      },

      checkChallengeProgress: (discoveredCount: number, latestPlanet: string | null) => {
        const { dailyChallenges, completeChallenge } = get();
        
        dailyChallenges.forEach(challenge => {
          if (challenge.completed) return;
          
          if (challenge.requirement.type === "discover") {
            if (challenge.requirement.planetName) {
              if (latestPlanet === challenge.requirement.planetName) {
                completeChallenge(challenge.id);
              }
            } else {
              if (discoveredCount >= challenge.requirement.target) {
                completeChallenge(challenge.id);
              }
            }
          }
        });
      }
    }),
    {
      name: "challenges-storage"
    }
  )
);
