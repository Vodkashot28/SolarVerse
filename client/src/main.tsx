import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Mount the React app at #root
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Check index.html for <div id='root'>");
}

createRoot(rootElement).render(<App />);
