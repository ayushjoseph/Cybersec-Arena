# CyberSec Arena

A unified AI-powered cybersecurity game hub with a sleek neon hacker theme. Built with Vite + React + TypeScript + Tailwind. Desktop mode provided via Electron for a native-like experience.

## Features (MVP Scaffold)
- Dashboard with progress stub, quick links to modes
- Game modes pages:
  - Capture The Flag (Web, Crypto, Forensics, Reverse, Binary)
  - Business CyberSim
  - Phish Hunt
  - Code & Secure
  - Firewall Defender
  - Malware Lab Escape
  - AI Cyber QuizBot
- Leaderboard, News Feed, Tutorials, Profile pages
- Ambient audio control (WebAudio drone) and neon theme

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Run web dev server
   ```bash
   npm run dev
   ```
3. Optional: Desktop mode (Electron)
   ```bash
   npm run dev:desktop
   ```

## Next Steps
- Implement real gameplay mechanics per mode
- Add Supabase for auth, profiles, progress, leaderboard, and news fetch
- Add AI Quiz logic and explanations
- Add persistent settings (audio, theme), achievements, and badges

## Tech
- React 18, TypeScript, Vite 5, Tailwind CSS
- Electron (dev only, simple launcher)
