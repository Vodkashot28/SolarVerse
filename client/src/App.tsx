import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SolarSystem } from "./components/SolarSystem";
import "@fontsource/inter";

// Use a hardcoded manifest URL for reliability in production
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
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <SolarSystem />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;