import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SolarSystem } from "./components/SolarSystem";
import { GameUI } from "./components/GameUI";
import "@fontsource/inter";

// Values pulled from .env (must be prefixed with VITE_)
const manifestUrl = import.meta.env.VITE_MANIFEST_URL;
const twaReturnUrl = import.meta.env.VITE_TWA_RETURN_URL;

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{ twaReturnUrl }}
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
