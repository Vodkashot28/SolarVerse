import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Leaderboard endpoints
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const entries = await storage.getLeaderboard(50);
      res.json(entries);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  app.post("/api/leaderboard/update", async (req, res) => {
    try {
      const { walletAddress, username, totalTokens, planetsDiscovered } = req.body;
      
      if (!walletAddress) {
        return res.status(400).json({ error: "Wallet address is required" });
      }

      if (typeof totalTokens !== 'number' || typeof planetsDiscovered !== 'number') {
        return res.status(400).json({ error: "Invalid data: totalTokens and planetsDiscovered must be numbers" });
      }

      const entry = await storage.upsertLeaderboardEntry({
        walletAddress,
        username: username || null,
        totalTokens,
        planetsDiscovered
      });

      res.json(entry);
    } catch (error) {
      console.error("Error updating leaderboard:", error);
      res.status(500).json({ error: "Failed to update leaderboard" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
