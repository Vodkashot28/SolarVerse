// client/src/main.tsx

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// IMPORT FIX: Import the TON Provider
import { TonConnectUIProvider } from "@tonconnect/ui-react"; 

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Check index.html for <div id='root'>");
}

// CONFIGURATION: Define the Manifest URL (use your deployed domain)
const manifestUrl = "https://solar-verse.vercel.app/tonconnect-manifest.json";

createRoot(rootElement).render(
    // WRAP FIX: Wrap App in the Provider
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
);
