import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SolarSystem } from "./components/SolarSystem.tsx";
import "@fontsource/inter";

// Use your production domain for manifest
const manifestUrl = "https://solar-system.xyz/tonconnect-manifest.json";

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        // Telegram bot return URL
        twaReturnUrl: "https://t.me/solarversx_bot?startapp=solarverse"
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <SolarSystem />
      </div>
    </TonConnectUIProvider>
  );
}

// CRITICAL FIX: This line tells the module system (Vite/Rollup) that 
// the function 'App' is the main export of this file.
export default App;

