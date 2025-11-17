import { useState, useEffect, useRef } from "react";
import { X, Trophy } from "lucide-react";
import { useSolarSystem } from "@/lib/stores/useSolarSystem";

interface Asteroid {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
}

interface AsteroidGameProps {
  planetName: string;
  onClose: () => void;
}

export function AsteroidGame({ planetName, onClose }: AsteroidGameProps) {
  const [playerX, setPlayerX] = useState(50);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [rewardsClaimed, setRewardsClaimed] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const asteroidIdRef = useRef(0);
  const { addTokens } = useSolarSystem();

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setAsteroids(prev => {
        const newAsteroids = prev
          .map(a => ({ ...a, y: a.y + a.speed }))
          .filter(a => a.y < 100);

        if (Math.random() < 0.3) {
          newAsteroids.push({
            id: asteroidIdRef.current++,
            x: Math.random() * 90,
            y: -5,
            speed: 0.5 + Math.random() * 1,
            size: 3 + Math.random() * 4
          });
        }

        return newAsteroids;
      });

      setScore(s => s + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setPlayerX(x => Math.max(0, x - 5));
      if (e.key === "ArrowRight") setPlayerX(x => Math.min(90, x + 5));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    asteroids.forEach(asteroid => {
      const distX = Math.abs(asteroid.x - playerX);
      const distY = Math.abs(asteroid.y - 90);
      if (distX < 5 && distY < 5) {
        setGameOver(true);
      }
    });
  }, [asteroids, playerX]);

  const bonusTokens = Math.max(Math.floor(score / 50), 1);

  useEffect(() => {
    if (gameOver && !rewardsClaimed) {
      if (bonusTokens > 0) {
        addTokens(bonusTokens);
      }
      setRewardsClaimed(true);
    }
  }, [gameOver, bonusTokens, rewardsClaimed, addTokens]);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30 rounded-2xl p-6 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Asteroid Dodger</h2>
            <p className="text-gray-400 text-sm">{planetName} Mini-Game</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!gameStarted ? (
          <div className="text-center py-12">
            <p className="text-white mb-4">Use arrow keys to dodge asteroids!</p>
            <p className="text-gray-400 text-sm mb-6">
              Survive as long as possible to earn bonus tokens
            </p>
            <button
              onClick={() => setGameStarted(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Start Game
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
            <p className="text-gray-400 mb-4">Score: {score}</p>
            {bonusTokens > 0 && (
              <p className="text-yellow-400 font-bold mb-6">
                +{bonusTokens} Bonus StarTokens Earned!
              </p>
            )}
            <div className="space-x-4">
              <button
                onClick={() => {
                  setScore(0);
                  setAsteroids([]);
                  setGameOver(false);
                  setGameStarted(true);
                  setPlayerX(50);
                  setRewardsClaimed(false);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between text-white">
              <span>Score: {score}</span>
              <span className="text-yellow-400">Bonus: +{bonusTokens} ST</span>
            </div>

            <div
              ref={gameRef}
              className="relative w-full h-96 bg-black border-2 border-purple-500/30 rounded-lg overflow-hidden"
              style={{ background: "linear-gradient(to bottom, #000428, #004e92)" }}
            >
              {asteroids.map(asteroid => (
                <div
                  key={asteroid.id}
                  className="absolute bg-gray-400 rounded-full shadow-lg"
                  style={{
                    left: `${asteroid.x}%`,
                    top: `${asteroid.y}%`,
                    width: `${asteroid.size}%`,
                    height: `${asteroid.size}%`,
                  }}
                />
              ))}

              <div
                className="absolute bg-blue-500 rounded-full shadow-xl transition-all duration-100"
                style={{
                  left: `${playerX}%`,
                  top: "90%",
                  width: "5%",
                  height: "5%",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)"
                }}
              />
            </div>

            <p className="text-center text-gray-400 text-sm mt-4">
              Use ← → arrow keys to move
            </p>
          </>
        )}
      </div>
    </div>
  );
}
