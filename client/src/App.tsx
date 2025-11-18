import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// --- LIBRARY SIMULATION & TYPES ---
// We simulate the TonConnect UI, R3F, and Drei components
// to allow the code structure to match real-world usage.

type Vector3 = [number, number, number];
type Color = string | number | THREE.Color;

// Global Three.js / R3F types (assumed available in the canvas environment)
declare const THREE: any;
declare const Canvas: any;
declare const useFrame: (callback: (state: any) => void) => void;
declare const OrbitControls: any;
declare const Line: any;


// --- 1. MOCKING TON CONNECT CONTEXT & HOOKS ---

// Mock data
const MOCK_WALLET_ADDRESS = "EQB-wL3J-z5iY_L6_Q4S-eF5A5W-E1B2G3H4I5J6K7L8";

// Mock TonConnect UI Context (Simulating the provider's capabilities)
interface TonConnectContextType {
    connected: boolean;
    address: string | null;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    setWalletAddress: (address: string | null) => void;
}

const TonConnectContext = React.createContext<TonConnectContextType | null>(null);

// Simulating the TonConnectUIProvider wrapper
const TonConnectUIProvider: React.FC<{ children: React.ReactNode, manifestUrl: string, actionsConfiguration: any }> = ({ children, manifestUrl }) => {
    const [address, setAddress] = useState<string | null>(null);

    const connect = useCallback(async () => {
        // Mock connection delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAddress(MOCK_WALLET_ADDRESS);
        console.log("TON Connect Mock: Connected.");
    }, []);

    const disconnect = useCallback(async () => {
        setAddress(null);
        console.log("TON Connect Mock: Disconnected.");
    }, []);

    const contextValue: TonConnectContextType = useMemo(() => ({
        connected: !!address,
        address,
        connect,
        disconnect,
        setWalletAddress: setAddress, // Used by the state store to sync
    }), [address, connect, disconnect]);

    return (
        <TonConnectContext.Provider value={contextValue}>
            {children}
        </TonConnectContext.Provider>
    );
};

// Mock useTonAddress hook
const useTonAddress = (): string => {
    const context = React.useContext(TonConnectContext);
    if (!context) return '';
    return context.address || '';
};

// Mock useTonConnectUI hook
const useTonConnectUI = () => {
    const context = React.useContext(TonConnectContext);
    if (!context) {
        throw new Error("useTonConnectUI must be used within a TonConnectUIProvider");
    }
    return [{ connected: context.connected, account: { address: context.address } }, { connect: context.connect, disconnect: context.disconnect }];
};


// --- 2. DATA ARCHITECTURE: PLANET CONFIGURATION (UPDATED FROM #plannet.ts) ---

export type PlanetRarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface PlanetData {
  name: string;
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  tokenReward: number;
  rarity: PlanetRarity;
  stats: {
    explorationDifficulty: number;
    scientificValue: number;
    uniqueness: number;
  };
  facts: {
    distance: string;
    diameter: string;
    moons: string;
    dayLength: string;
    yearLength: string;
    temperature: string;
    composition: string;
    funFact: string;
  };
}

export const PLANETS_DATA: PlanetData[] = [
  {
    name: "Mercury",
    size: 0.4,
    color: "#8C7853",
    orbitRadius: 8,
    orbitSpeed: 0.04,
    rotationSpeed: 0.001,
    tokenReward: 10,
    rarity: "Common",
    stats: {
      explorationDifficulty: 3,
      scientificValue: 6,
      uniqueness: 5
    },
    facts: {
      distance: "57.9 million km from Sun",
      diameter: "4,879 km",
      moons: "0",
      dayLength: "59 Earth days",
      yearLength: "88 Earth days",
      temperature: "-173°C to 427°C",
      composition: "Rocky, iron core",
      funFact: "Mercury is the fastest planet, zipping around the Sun at 47 km/s!"
    }
  },
  {
    name: "Venus",
    size: 0.9,
    color: "#FFC649",
    orbitRadius: 12,
    orbitSpeed: 0.015,
    rotationSpeed: -0.0005,
    tokenReward: 15,
    rarity: "Common",
    stats: {
      explorationDifficulty: 8,
      scientificValue: 7,
      uniqueness: 7
    },
    facts: {
      distance: "108.2 million km from Sun",
      diameter: "12,104 km",
      moons: "0",
      dayLength: "243 Earth days",
      yearLength: "225 Earth days",
      temperature: "462°C",
      composition: "Rocky, thick CO2 atmosphere",
      funFact: "Venus rotates backwards and its day is longer than its year!"
    }
  },
  {
    name: "Earth",
    size: 1,
    color: "#4A90E2",
    orbitRadius: 16,
    orbitSpeed: 0.01,
    rotationSpeed: 0.002,
    tokenReward: 20,
    rarity: "Rare",
    stats: {
      explorationDifficulty: 1,
      scientificValue: 10,
      uniqueness: 10
    },
    facts: {
      distance: "149.6 million km from Sun",
      diameter: "12,742 km",
      moons: "1 (The Moon)",
      dayLength: "24 hours",
      yearLength: "365.25 days",
      temperature: "-88°C to 58°C",
      composition: "Rocky, nitrogen-oxygen atmosphere",
      funFact: "The only planet known to support life, with 71% water coverage!"
    }
  },
  {
    name: "Mars",
    size: 0.5,
    color: "#E27B58",
    orbitRadius: 20,
    orbitSpeed: 0.008,
    rotationSpeed: 0.0018,
    tokenReward: 25,
    rarity: "Rare",
    stats: {
      explorationDifficulty: 5,
      scientificValue: 9,
      uniqueness: 8
    },
    facts: {
      distance: "227.9 million km from Sun",
      diameter: "6,779 km",
      moons: "2 (Phobos and Deimos)",
      dayLength: "24.6 hours",
      yearLength: "687 Earth days",
      temperature: "-87°C to -5°C",
      composition: "Rocky, thin CO2 atmosphere",
      funFact: "Mars has the largest volcano in the solar system: Olympus Mons!"
    }
  },
  {
    name: "Jupiter",
    size: 2.5,
    color: "#C88B3A",
    orbitRadius: 28,
    orbitSpeed: 0.002,
    rotationSpeed: 0.004,
    tokenReward: 40,
    rarity: "Epic",
    stats: {
      explorationDifficulty: 9,
      scientificValue: 9,
      uniqueness: 9
    },
    facts: {
      distance: "778.5 million km from Sun",
      diameter: "139,820 km",
      moons: "95 known moons",
      dayLength: "10 hours",
      yearLength: "12 Earth years",
      temperature: "-108°C",
      composition: "Gas giant, hydrogen and helium",
      funFact: "Jupiter's Great Red Spot is a storm that's been raging for over 300 years!"
    }
  },
  {
    name: "Saturn",
    size: 2.2,
    color: "#FAD5A5",
    orbitRadius: 36,
    orbitSpeed: 0.0009,
    rotationSpeed: 0.0038,
    tokenReward: 50,
    rarity: "Epic",
    stats: {
      explorationDifficulty: 8,
      scientificValue: 10,
      uniqueness: 10
    },
    facts: {
      distance: "1.43 billion km from Sun",
      diameter: "116,460 km",
      moons: "146 known moons",
      dayLength: "10.7 hours",
      yearLength: "29 Earth years",
      temperature: "-139°C",
      composition: "Gas giant with iconic rings",
      funFact: "Saturn's rings are made of billions of ice and rock particles!"
    }
  },
  {
    name: "Uranus",
    size: 1.8,
    color: "#4FD0E7",
    orbitRadius: 44,
    orbitSpeed: 0.0004,
    rotationSpeed: 0.003,
    tokenReward: 60,
    rarity: "Legendary",
    stats: {
      explorationDifficulty: 10,
      scientificValue: 8,
      uniqueness: 9
    },
    facts: {
      distance: "2.87 billion km from Sun",
      diameter: "50,724 km",
      moons: "27 known moons",
      dayLength: "17 hours",
      yearLength: "84 Earth years",
      temperature: "-197°C",
      composition: "Ice giant, methane atmosphere",
      funFact: "Uranus rotates on its side, likely from a massive ancient collision!"
    }
  },
  {
    name: "Neptune",
    size: 1.7,
    color: "#4169E1",
    orbitRadius: 52,
    orbitSpeed: 0.0001,
    rotationSpeed: 0.0032,
    tokenReward: 75,
    rarity: "Legendary",
    stats: {
      explorationDifficulty: 10,
      scientificValue: 9,
      uniqueness: 10
    },
    facts: {
      distance: "4.5 billion km from Sun",
      diameter: "49,244 km",
      moons: "14 known moons",
      dayLength: "16 hours",
      yearLength: "165 Earth years",
      temperature: "-201°C",
      composition: "Ice giant, methane atmosphere",
      funFact: "Neptune has the strongest winds in the solar system at 2,100 km/h!"
    }
  }
];


// --- 3. STATE MANAGEMENT (ZUSTAND/PERSIST SIMULATION) ---

interface PlanetState {
  name: string;
  isDiscovered: boolean;
  discoveredAt: number | null;
}

interface SolarSystemStore {
  discoveredPlanets: PlanetState[];
  starTokens: number;
  discoverPlanet: (planetName: string, reward: number) => void;
  resetGame: () => void;
}

const initialStoreState: Omit<SolarSystemStore, 'discoverPlanet' | 'resetGame'> = {
  discoveredPlanets: PLANETS_DATA.map(p => ({
    name: p.name,
    isDiscovered: false,
    discoveredAt: null,
  })),
  starTokens: 0,
};

// Custom Hook to simulate Zustand's persist middleware
const useSolarSystem = (): SolarSystemStore => {
  const [state, setState] = useState<Omit<SolarSystemStore, 'discoverPlanet' | 'resetGame'>>(() => {
    const savedState = localStorage.getItem('solarSystemStore');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        const combinedPlanets = PLANETS_DATA.map(p => {
          const existing = parsed.discoveredPlanets.find((ep: PlanetState) => ep.name === p.name);
          return existing || { name: p.name, isDiscovered: false, discoveredAt: null };
        });

        return {
          ...initialStoreState,
          ...parsed,
          discoveredPlanets: combinedPlanets,
        };
      } catch (e) {
        console.error("Failed to parse persisted state, starting fresh.", e);
        return initialStoreState;
      }
    }
    return initialStoreState;
  });

  // Effect to persist state whenever it changes
  useEffect(() => {
    localStorage.setItem('solarSystemStore', JSON.stringify(state));
  }, [state]);

  const discoverPlanet = useCallback((planetName: string, reward: number) => {
    setState(prev => {
      const newDiscoveredPlanets = prev.discoveredPlanets.map(p =>
        p.name === planetName && !p.isDiscovered
          ? { ...p, isDiscovered: true, discoveredAt: Date.now() }
          : p
      );
      const isNewDiscovery = newDiscoveredPlanets.some(p => p.name === planetName && p.isDiscovered && !prev.discoveredPlanets.find(op => op.name === p.name)?.isDiscovered);
      
      return {
        ...prev,
        discoveredPlanets: newDiscoveredPlanets,
        starTokens: isNewDiscovery ? prev.starTokens + reward : prev.starTokens,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem('solarSystemStore');
    setState(initialStoreState);
  }, []);

  return {
    ...state,
    discoverPlanet,
    resetGame,
  };
};

// Utility function for responsive R3F sizing
const getR3FViewSize = () => {
  const isMobile = window.innerWidth < 768;
  return isMobile ? 120 : 100;
};


// --- 4. 3D COMPONENTS ---

const Stars = () => {
  const starCount = 500;
  const positions = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 100 + Math.random() * 500;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={0.5} sizeAttenuation={true} color="white" />
    </points>
  );
};

const Sun = () => {
  return (
    <>
      <pointLight position={[0, 0, 0]} intensity={200} distance={500} decay={2} color="#FFD700" />
      <mesh>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial color="#FFD700" toneMapped={false} />
      </mesh>
    </>
  );
};

interface PlanetProps {
  data: PlanetData;
  state: PlanetState;
  isClickable: boolean;
  onSelect: (planet: PlanetData) => void;
}

const Planet: React.FC<PlanetProps> = ({ data, state, isClickable, onSelect }) => {
  const ref = useRef<any>(null!);

  useFrame((state) => {
    if (ref.current) {
      // Axial Rotation
      ref.current.rotation.y += data.rotationSpeed * 0.5; // Adjusted factor for better visual speed

      // Orbital Rotation (around the Sun at [0,0,0])
      const angle = state.clock.getElapsedTime() * data.orbitSpeed;
      ref.current.position.x = data.orbitRadius * Math.cos(angle);
      ref.current.position.z = data.orbitRadius * Math.sin(angle);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(data);
  };

  const ringGeometry = useMemo(() => {
    if (data.name === 'Saturn') {
      const segments = 64;
      // Adjusted ring size based on new data size (2.2)
      const innerRadius = data.size * 1.3; 
      const outerRadius = data.size * 2.2;
      const geometry = new THREE.RingGeometry(innerRadius, outerRadius, segments);
      geometry.rotateX(Math.PI / 2); 
      return geometry;
    }
    return null;
  }, [data.name, data.size]);

  // Determine the color for the discovery indicator based on rarity
  const getRarityColor = (rarity: PlanetRarity) => {
    switch(rarity) {
        case 'Common': return '#00FF00'; // Green
        case 'Rare': return '#00FFFF'; // Cyan
        case 'Epic': return '#FF00FF'; // Magenta
        case 'Legendary': return '#FFD700'; // Gold
        default: return '#FFFFFF';
    }
  }

  const indicatorColor = getRarityColor(data.rarity);
  const clickableGlowColor = getRarityColor(data.rarity);

  return (
    <group ref={ref} onClick={handleClick}>
      {/* Mesh - Planet Body */}
      <mesh>
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial
          color={state.isDiscovered ? data.color : '#222222'}
          emissive={state.isDiscovered ? new THREE.Color(data.color).lerp(new THREE.Color(0x000000), 0.7) : '#000000'}
          emissiveIntensity={state.isDiscovered ? 0.3 : 0}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      {/* Saturn Rings */}
      {data.name === 'Saturn' && ringGeometry && (
        <mesh geometry={ringGeometry} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial 
            color="#C0C0C0" 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Discovery Indicator (Dot on top, colored by rarity) */}
      {state.isDiscovered && (
        <mesh position={[0, data.size + 0.1, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={indicatorColor} />
        </mesh>
      )}
      
      {/* Clickability Indicator (Glow) */}
      {isClickable && (
        <mesh position={[0, data.size + 0.15, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial 
                color={clickableGlowColor} 
                transparent 
                // Simple pulse effect based on time
                opacity={0.3 + 0.1 * Math.sin(Math.max(0, performance.now() - (state.discoveredAt || 0)) * 0.005)} 
            />
        </mesh>
      )}

    </group>
  );
};

const OrbitLine: React.FC<{ radius: number }> = ({ radius }) => {
  const points = useMemo(() => {
    const numPoints = 64;
    const pts = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      pts.push(new THREE.Vector3(radius * Math.cos(angle), 0, radius * Math.sin(angle)));
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color="#444444"
      lineWidth={1}
      dashed={false}
      opacity={0.4}
      transparent
    />
  );
};

// Main 3D Scene Component
const SolarSystemScene = ({ onPlanetSelect }: { onPlanetSelect: (planet: PlanetData) => void }) => {
  const { discoveredPlanets } = useSolarSystem();
  
  const discoveredNames = discoveredPlanets.filter(p => p.isDiscovered).map(p => p.name);
  const nextPlanetIndex = discoveredNames.length;
  const nextPlanetName = PLANETS_DATA[nextPlanetIndex]?.name;

  return (
    <>
      <ambientLight intensity={0.5} />
      <Sun />
      
      <Stars />

      {PLANETS_DATA.map((data) => {
        const state = discoveredPlanets.find(p => p.name === data.name)!;
        const isClickable = data.name === nextPlanetName && !state.isDiscovered;

        return (
          <React.Fragment key={data.name}>
            <OrbitLine radius={data.orbitRadius} />
            <Planet
              data={data}
              state={state}
              isClickable={isClickable}
              onSelect={onPlanetSelect}
            />
          </React.Fragment>
        );
      })}

      <OrbitControls 
        enablePan={false} 
        maxDistance={getR3FViewSize() * 1.5} // Allow more distance for larger system
        minDistance={5}
        target={[0, 0, 0]} 
        enableZoom={true} 
      />
    </>
  );
};


// --- 5. UI OVERLAYS & GAME LOGIC (Icons used here) ---

// Icons (Simulating lucide-react or inline SVG)
const WalletIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M22 9h-4"/><path d="M6 11h.01"/><path d="M18 11h.01"/></svg>
);
const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const TelescopeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.6 10.6 3.1 3.1"/><path d="M17.43 3.93a2.91 2.91 0 1 0-4.13-4.13l-9.17 9.17a2.91 2.91 0 1 0 4.13 4.13z"/><path d="m14 21-2.5-2.5"/><path d="m17 18 2.5 2.5"/></svg>
);
const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);


// TON Connect Button Component
const ConnectWalletButton: React.FC = () => {
    const address = useTonAddress();
    const [tonUIState, tonUI] = useTonConnectUI();
    const connected = tonUIState.connected;

    const handleConnect = () => {
        if (connected) {
            tonUI.disconnect();
        } else {
            tonUI.connect();
        }
    };
    
    return (
        <button
            onClick={handleConnect}
            className={`
                flex items-center space-x-2 p-2.5 rounded-full shadow-lg transition duration-300
                ${connected ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-green-600 hover:bg-green-700'}
                text-white font-semibold pointer-events-auto
            `}
        >
            <WalletIcon className="w-5 h-5"/>
            <span className="hidden sm:inline">
                {connected
                    ? `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
                    : 'Connect TON Wallet'}
            </span>
        </button>
    );
};

// Main Game UI (Tokens, Progress)
const GameUI = () => {
  const { starTokens, discoveredPlanets } = useSolarSystem();
  
  const discoveredCount = discoveredPlanets.filter(p => p.isDiscovered).length;
  const totalPlanets = PLANETS_DATA.length;
  const progressPercent = Math.round((discoveredCount / totalPlanets) * 100);
  const nextPlanetIndex = discoveredCount;
  const nextPlanetName = PLANETS_DATA[nextPlanetIndex]?.name || 'Explorer';

  return (
    <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl mx-auto p-4 text-white pointer-events-none">
      
      {/* Left: Token Count */}
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-3 shadow-2xl flex items-center space-x-3 mb-4 md:mb-0 pointer-events-auto">
        <ZapIcon className="w-6 h-6 text-yellow-400" />
        <span className="text-2xl font-extrabold text-yellow-300">{starTokens}</span>
        <span className="text-sm font-medium text-gray-400">STARTOKENS</span>
      </div>

      {/* Center: Progression Status */}
      <div className="flex flex-col items-center justify-center bg-gray-900/70 backdrop-blur-sm rounded-xl p-3 shadow-2xl pointer-events-auto">
        <div className="text-xs font-semibold uppercase text-cyan-400 mb-1">
          Discovery Progress
        </div>
        <div className="text-center">
          <span className="text-xl font-bold">{discoveredCount} / {totalPlanets}</span>
          <span className="text-xs text-gray-400 ml-2">Planets</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
          <div
            className="bg-cyan-500 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="text-xs font-medium mt-2 text-gray-300">
          Next Target: <span className="text-yellow-300 font-bold">{nextPlanetName}</span>
        </div>
      </div>
      
      {/* Right Placeholder (hidden on small screen to maintain center alignment) */}
      <div className="hidden md:block w-[150px]"></div>

    </div>
  );
};

// Rarity Badge Component
const RarityBadge: React.FC<{ rarity: PlanetRarity }> = ({ rarity }) => {
    let colorClass = '';
    let shadowClass = '';
    switch (rarity) {
        case 'Common':
            colorClass = 'bg-gray-600 text-white';
            shadowClass = 'shadow-gray-700';
            break;
        case 'Rare':
            colorClass = 'bg-blue-600 text-white';
            shadowClass = 'shadow-blue-700';
            break;
        case 'Epic':
            colorClass = 'bg-purple-600 text-white';
            shadowClass = 'shadow-purple-700';
            break;
        case 'Legendary':
            colorClass = 'bg-yellow-500 text-gray-900 font-bold';
            shadowClass = 'shadow-yellow-700';
            break;
    }
    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold uppercase rounded-full shadow-md ${colorClass} ${shadowClass}`}>
            {rarity}
        </span>
    );
};

// Planet Fact Card Modal (Radix Dialog simulation)
const FactCard: React.FC<{
  planet: PlanetData | null;
  onClose: () => void;
  onDiscover: (planet: PlanetData) => void;
  isDiscoverable: boolean;
}> = ({ planet, onClose, onDiscover, isDiscoverable }) => {
  if (!planet) return null;

  const { discoveredPlanets } = useSolarSystem();
  const address = useTonAddress();
  const planetState = discoveredPlanets.find(p => p.name === planet.name);
  const isDiscovered = planetState?.isDiscovered;
  const canDiscover = isDiscoverable && !isDiscovered && !!address;
  const isLocked = isDiscoverable && !address;
  const isAlreadyDiscovered = isDiscovered;

  const handleDiscover = () => {
    if (canDiscover) {
      onDiscover(planet);
    }
  };

  const buttonText = isAlreadyDiscovered 
    ? "Discovery Complete"
    : (isLocked ? "Connect Wallet to Discover" : "Discover & Claim Tokens");
  
  const buttonClass = isAlreadyDiscovered
    ? 'bg-gray-600 cursor-not-allowed'
    : (canDiscover ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-700/80 cursor-not-allowed');

  const factItems = [
    { label: "Distance from Sun", value: planet.facts.distance },
    { label: "Diameter", value: planet.facts.diameter },
    { label: "Moons", value: planet.facts.moons },
    { label: "Day Length", value: planet.facts.dayLength },
    { label: "Year Length", value: planet.facts.yearLength },
    { label: "Temperature Range", value: planet.facts.temperature },
    { label: "Composition", value: planet.facts.composition },
  ];

  const statItems = [
    { label: "Exploration Difficulty", value: planet.stats.explorationDifficulty, max: 10 },
    { label: "Scientific Value", value: planet.stats.scientificValue, max: 10 },
    { label: "Uniqueness", value: planet.stats.uniqueness, max: 10 },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 transition-opacity duration-300 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-gray-900 border border-purple-800 rounded-xl shadow-2xl p-6 text-white transform transition-transform duration-300 scale-100 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-purple-900 pb-3 mb-4">
          <div>
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-1">
                {planet.name}
              </h2>
              <RarityBadge rarity={planet.rarity} />
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Content Tabs (Simplified to Sections for single-file structure) */}
        
        {/* Fun Fact */}
        <div className="bg-purple-900/30 border border-purple-800/50 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 text-purple-300 font-semibold mb-1">
                <HeartIcon className="w-4 h-4" />
                <span>Fun Fact</span>
            </div>
            <p className="text-gray-200 text-sm italic">{planet.facts.funFact}</p>
        </div>

        {/* Core Facts */}
        <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center space-x-2">
            <InfoIcon className="w-5 h-5"/>
            <span>Core Planetary Data</span>
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm mb-6">
            {factItems.map(item => (
                <div key={item.label} className="flex flex-col">
                    <span className="text-gray-400 text-xs uppercase font-medium">{item.label}</span>
                    <span className="text-white font-semibold">{item.value}</span>
                </div>
            ))}
        </div>

        {/* Exploration Stats */}
        <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center space-x-2">
            <TelescopeIcon className="w-5 h-5"/>
            <span>Exploration Metrics</span>
        </h3>
        <div className="space-y-3 mb-6">
            {statItems.map(item => (
                <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{item.label}</span>
                        <span className="font-bold text-cyan-300">{item.value} / {item.max}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(item.value / item.max) * 100}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>

        {/* Reward */}
        <div className="pt-2 border-t border-purple-900/50">
          <div className="text-xs uppercase font-semibold text-yellow-400 mb-1">StarToken Reward</div>
          <div className="flex items-center space-x-2">
            <ZapIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold">{planet.tokenReward}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={handleDiscover}
            disabled={!canDiscover && !isAlreadyDiscovered}
            className={`
              w-full py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all shadow-xl
              ${buttonClass}
            `}
          >
            {buttonText}
          </button>
        </div>
        
        {/* Instructions/Feedback */}
        {!isAlreadyDiscovered && (
            <p className="mt-4 text-center text-xs text-gray-500">
                {isLocked 
                    ? "You must connect your TON wallet to claim this planetary reward." 
                    : (isDiscoverable ? "Click above to sign the transaction (mocked) and receive your tokens." : "You must discover the previous planets first.")}
            </p>
        )}
      </div>
    </div>
  );
};


// --- 6. CORE GAME COMPONENT (SolarSystem) ---

// This component was the previous App, now renamed to fit the user's structure.
const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const { discoveredPlanets, starTokens, discoverPlanet, resetGame } = useSolarSystem();
  const address = useTonAddress();

  // Determine the next planet for sequential discovery
  const nextPlanetIndex = discoveredPlanets.filter(p => p.isDiscovered).length;
  const nextPlanetData = PLANETS_DATA[nextPlanetIndex];

  // Handler for planet selection (click in 3D scene)
  const handlePlanetSelect = useCallback((planet: PlanetData) => {
    setSelectedPlanet(planet);
  }, []);

  // Handler for discovery button in the FactCard
  const handleDiscover = useCallback((planet: PlanetData) => {
    if (planet.name === nextPlanetData?.name) {
      discoverPlanet(planet.name, planet.tokenReward);
      setSelectedPlanet(null); // Close modal on successful discovery
    }
  }, [discoverPlanet, nextPlanetData]);

  const isPlanetDiscoverable = selectedPlanet?.name === nextPlanetData?.name;


  // Check for game completion
  const isGameComplete = discoveredPlanets.every(p => p.isDiscovered);
  useEffect(() => {
    if (isGameComplete) {
      console.log("Congratulations, Solar System fully explored!");
    }
  }, [isGameComplete]);

  return (
    <div className="h-full w-full bg-black font-sans relative">
      <style>{`
        /* Load Inter font from a reliable source or assume it's available */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        
        body { margin: 0; overflow: hidden; background-color: #000; }
        .r3f-canvas {
            touch-action: none;
            font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* R3F Canvas Container */}
      <div className="absolute inset-0 r3f-canvas">
        <Canvas 
          camera={{ fov: 60, position: [0, 20, 30] }} // Adjusted camera for larger orbits
          style={{ height: '100%', width: '100%', pointerEvents: 'auto' }}
        >
          <SolarSystemScene onPlanetSelect={handlePlanetSelect} />
        </Canvas>
      </div>

      {/* UI Overlays */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
        
        {/* Top UI */}
        <div className="flex justify-between w-full max-w-7xl mx-auto items-start pt-2">
            
            {/* Game Title */}
            <div className="flex flex-col text-white pointer-events-auto">
                <h1 className="text-2xl md:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    SOLAR EXPLORER
                </h1>
                <p className="text-xs text-gray-500 font-mono italic mt-0.5">TON Crypto Game</p>
            </div>

            {/* Wallet Button */}
            <ConnectWalletButton />

        </div>

        {/* Bottom UI */}
        <div className="mb-4">
          <GameUI />

          {/* Reset Button (for local testing/debugging) */}
          <div className="mt-4 flex justify-center pointer-events-auto">
            <button 
              onClick={resetGame} 
              className="px-3 py-1 text-xs bg-gray-800 text-red-400 rounded-full hover:bg-gray-700 transition"
            >
              Reset Local Progress
            </button>
          </div>
        </div>
      </div>

      {/* Planet Fact Card Modal */}
      <FactCard 
        planet={selectedPlanet} 
        onClose={() => setSelectedPlanet(null)} 
        onDiscover={handleDiscover}
        isDiscoverable={isPlanetDiscoverable}
      />
      
      {/* Game Complete Modal */}
      {isGameComplete && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-gray-800 border-4 border-yellow-500 rounded-xl shadow-2xl p-6 text-white text-center">
                <ZapIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-extrabold mb-2 text-yellow-300">SYSTEM DISCOVERY COMPLETE!</h2>
                <p className="text-gray-300 mb-4">You have explored all 8 planets and earned a total of <span className="font-bold text-yellow-400">{starTokens}</span> StarTokens!</p>
                <button 
                    onClick={() => { resetGame(); setSelectedPlanet(null); }} 
                    className="mt-4 w-full py-3 rounded-lg font-bold uppercase tracking-wider text-sm bg-yellow-600 hover:bg-yellow-700 transition"
                >
                    Start New Expedition
                </button>
            </div>
        </div>
      )}

    </div>
  );
};


// --- 7. MAIN APP COMPONENT (User's requested wrapper) ---
const manifestUrl = "https://solar-verse.vercel.app/tonconnect-manifest.json";

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/solarversx_bot"
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden"
        }}
        className="h-screen w-screen" // Added Tailwind for full screen support
      >
        <SolarSystem />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;

