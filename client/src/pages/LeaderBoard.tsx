import { Leaderboard } from "@/components/Leaderboard";
import { GameUI } from "@/components/GameUI";
// 🚨 CORRECTION: Import 'useLocation' from 'wouter'. 
// The second item in the array it returns is the navigation function.
import { useLocation } from "wouter"; 

export default function LeaderboardPage() {
  // Use array destructuring to get the setLocation function, which acts as 'navigate'
  // The first element is the current path, which we can ignore with '_'
  const [_, navigate] = useLocation(); 

  const handleClose = () => {
    // Navigate back to the main game or home page (e.g., '/')
    navigate('/'); 
  };
  
  return (
    <>
      <GameUI />
      {/* Pass the required 'onClose' prop which now uses the wouter navigation */}
      <Leaderboard onClose={handleClose} />
      {/* Add logic to fetch leaderboard data using a hook */}
    </>
  );
}

