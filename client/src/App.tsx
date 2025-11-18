import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SolarSystem } from "./components/SolarSystem";
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

export default App;
