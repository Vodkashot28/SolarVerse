import {
  users,
  leaderboard,
  type User,
  type InsertUser,
  type LeaderboardEntry,
  type InsertLeaderboardEntry
} from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getLeaderboard(limit: number): Promise<LeaderboardEntry[]>;
  upsertLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
}

// 🔗 Database-backed storage
class DBStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    const sql = neon(process.env.DATABASE_URL);
    this.db = drizzle(sql);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getLeaderboard(limit: number): Promise<LeaderboardEntry[]> {
    return await this.db
      .select()
      .from(leaderboard)
      .orderBy(desc(leaderboard.totalTokens))
      .limit(limit);
  }

  async upsertLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const existing = await this.db
      .select()
      .from(leaderboard)
      .where(eq(leaderboard.walletAddress, entry.walletAddress))
      .limit(1);

    if (existing.length > 0) {
      const updated = await this.db
        .update(leaderboard)
        .set({
          ...entry,
          lastActive: new Date()
        })
        .where(eq(leaderboard.walletAddress, entry.walletAddress))
        .returning();
      return updated[0];
    } else {
      const inserted = await this.db
        .insert(leaderboard)
        .values({
          ...entry,
          totalTokens: entry.totalTokens ?? 0,
          planetsDiscovered: entry.planetsDiscovered ?? 0
        })
        .returning();
      return inserted[0];
    }
  }
}

// 🧪 In-memory fallback for dev/test
class MemStorage implements IStorage {
  private users: User[] = [];
  private leaderboard: LeaderboardEntry[] = [];
  private nextUserId = 1;
  private nextLeaderboardId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.nextUserId++,
      ...insertUser
    };
    this.users.push(user);
    return user;
  }

  async getLeaderboard(limit: number): Promise<LeaderboardEntry[]> {
    return this.leaderboard
      .sort((a, b) => b.totalTokens - a.totalTokens)
      .slice(0, limit);
  }

  async upsertLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const existing = this.leaderboard.find(e => e.walletAddress === entry.walletAddress);

    if (existing) {
      Object.assign(existing, {
        ...entry,
        totalTokens: entry.totalTokens ?? 0,
        planetsDiscovered: entry.planetsDiscovered ?? 0,
        lastActive: new Date()
      });
      return existing;
    } else {
      const newEntry: LeaderboardEntry = {
        id: this.nextLeaderboardId++,
        walletAddress: entry.walletAddress,
        username: entry.username ?? null,
        totalTokens: entry.totalTokens ?? 0,
        planetsDiscovered: entry.planetsDiscovered ?? 0,
        lastActive: new Date(),
        createdAt: new Date()
      };
      this.leaderboard.push(newEntry);
      return newEntry;
    }
  }
}

// 🧬 Restorationist toggle: DB or memory
export const storage: IStorage = process.env.DATABASE_URL
  ? new DBStorage()
  : new MemStorage();
