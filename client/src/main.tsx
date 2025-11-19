// client/src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App"; // Default import is fine if App.tsx uses default export
import "./index.css";
// REMOVED: import { TonConnectUIProvider } from "@tonconnect/ui-react";
// REMOVED: const manifestUrl = "..."; 

createRoot(document.getElementById("root")!).render(
  // REMOVED: <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App /> // App is already wrapped in the Provider
  // REMOVED: </TonConnectUIProvider>
);
