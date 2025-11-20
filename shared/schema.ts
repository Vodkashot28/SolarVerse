import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Users table
 * - Basic authentication (username/password)
 * - Could be extended with wallet binding later
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Leaderboard table
 * - Tracks wallet, tokens, planets discovered
 * - Useful for global rankings
 */
export const leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull().unique(),
  username: text("username"),
  totalTokens: integer("total_tokens").notNull().default(0),
  planetsDiscovered: integer("planets_discovered").notNull().default(0),
  lastActive: timestamp("last_active").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Planet discoveries table
 * - Tracks which user discovered which planet
 * - Useful for challenge completion and collections
 */
export const discoveries = pgTable("discoveries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  planetName: text("planet_name").notNull(),
  discoveredAt: timestamp("discovered_at").notNull().defaultNow(),
});

/**
 * Zod schemas for validation
 */
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLeaderboardSchema = createInsertSchema(leaderboard).pick({
  walletAddress: true,
  username: true,
  totalTokens: true,
  planetsDiscovered: true,
});

export const insertDiscoverySchema = createInsertSchema(discoveries).pick({
  userId: true,
  planetName: true,
});

/**
 * Types
 */
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type LeaderboardEntry = typeof leaderboard.$inferSelect;
export type InsertLeaderboardEntry = z.infer<typeof insertLeaderboardSchema>;

export type Discovery = typeof discoveries.$inferSelect;
export type InsertDiscovery = z.infer<typeof insertDiscoverySchema>;
