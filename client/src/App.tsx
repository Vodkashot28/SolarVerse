import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SolarSystem } from "./components/SolarSystem";
import "@fontsource/inter";

const manifestUrl = window.location.origin + "/tonconnect-manifest.json";

function App() {
  return (
    <TonConnectUIProvider 
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/your_bot_name'
      }}
    >
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <SolarSystem />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
