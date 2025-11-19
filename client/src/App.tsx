import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SolarSystem } from "./components/SolarSystem";
import { GameUI } from "./components/GameUI";
import "@fontsource/inter";

const manifestUrl = "https://solar-system.xyz/tonconnect-manifest.json";

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
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
        {/* Background Solar System Canvas */}
        <SolarSystem />
        {/* Overlay HUD */}
        <GameUI />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
