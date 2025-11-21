import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// 1. Import the Provider
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Check index.html for <div id='root'>");
}

// 2. Define the Manifest URL (pointing to your Vercel app)
const manifestUrl = "https://solar-verse.vercel.app/tonconnect-manifest.json";

createRoot(rootElement).render(
  // 3. Wrap the App in the Provider
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
