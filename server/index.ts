// server/index.ts

import express, { type Request, Response, NextFunction } from "express";
import cors from "cors"; // <--- ADDED: Import CORS middleware
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// --- 1. CORS CONFIGURATION ---
// This middleware is crucial for allowing API requests from different origins,
// such as your deployed site (solar-system.xyz) and the Telegram Web App.
app.use(cors({
    // Explicitly define allowed origins based on your deployment structure
    origin: [
        "https://solar-system.xyz", // Your main site
        /^https:\/\/t\.me\/.*solarversx_bot/, // Regex for your TWA return URL pattern from tonconnect-manifest.json
        "http://localhost:5000", // For local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
}));
// -----------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware for API routes
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  // Intercept res.json to capture the response body for logging
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  if (app.get("env") === "development") {
    // Local dev: run Vite middleware
    await setupVite(app, server);
  } else {
    // Production: serve static assets 
    serveStatic(app); // Note: Make sure serveStatic in vite.ts uses the correct path to the 'dist' folder
  }

  // Always listen on port 5000 locally
  const port = 5000;
  server.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
    log(`serving on port ${port}`);
  });
})();

// Export app for serverless runtimes (e.g. Vercel)
export default app;
