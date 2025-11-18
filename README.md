# Solar System Explorer - TON Crypto Game

## Overview
SolarVerse is a 3D interactive solar system exploration game built with React and Three.js, integrated with the TON blockchain. Players explore planets in sequential order, earning **StarTokens** for each discovery. The app combines immersive visuals, educational facts, and blockchain wallet connectivity via TON Connect.

---

## Features
- 🌌 Fully rendered 3D solar system with realistic orbits
- 🪐 Sequential planet discovery with token rewards
- 📚 Educational facts for each planet
- 🔗 TON Wallet integration via TON Connect
- 🎵 Background music and sound effects
- 🏆 Leaderboard (in-memory, ready for Neon DB)

---

## Tech Stack
### Frontend
- **React 18 + TypeScript**
- **React Three Fiber (@react-three/fiber)** for 3D rendering
- **@react-three/drei** helpers (Stars, OrbitControls, etc.)
- **Tailwind CSS** for styling
- **Radix UI** for modals, toasts, and overlays
- **Framer Motion** for smooth animations
- **Vite** for fast builds and HMR

### Backend
- **Express.js** server (`server/index.ts`)
- **API routes** under `/api` (leaderboard, user endpoints)
- **Storage abstraction** (`MemStorage` for dev, `DBStorage` for Neon/Postgres)
- **Drizzle ORM** for schema and migrations
- **Neon serverless Postgres** (optional, via `DATABASE_URL`)

### Blockchain
- **TON Connect** (`@tonconnect/ui-react`)
- Manifest served at `/tonconnect-manifest.json`
- Telegram Web App return URL configured

---

## Project Structure
