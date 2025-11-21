// client/src/main.tsx 

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// import { TonConnectUIProvider } from "@tonconnect/ui-react"; // Future: import TON provider

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Check index.html for <div id='root'>");
}

createRoot(rootElement).render(
    // Future: Wrap in TonConnectUIProvider and other Contexts here
    <App />
);
