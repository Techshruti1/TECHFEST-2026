# TECHFEST 2026 - Futuristic Web Odyssey

An award-winning, highly interactive, production-ready cyberpunk website showcasing the **Future of Technology**. Built with **Next.js**, **React Three Fiber (WebGL)**, **GSAP**, **Framer Motion**, **Tailwind CSS**, and custom procedural audio.

---

## 🚀 Key Features

1. **Procedural Synth Sound System**: Built using the Web Audio API. Eliminates copyright-restricted static `.mp3` payloads. Synthesizes background space hums, hover clicks, glitches, and victory alert tones procedurally.
2. **Digital Holographic WebGL Canvas**: Features 6,000+ depth-sorted particles (stars/nebulae), an interactive rotating wireframe/point globe, and floating wireframe geometries that rotate and parallax relative to scroll depth and cursor position.
3. **Glitch Boot Loader**: Simulates a system diagnostic booting routine showing logs, a loading indicator, and volume glitch sound triggers.
4. **Interactive Custom Cursor**: Incorporates lagging spring physics with separate cyan center dot and purple glowing outer ring. Automatically scales and glows when hover-targeting buttons or cards.
5. **Championship Grid**: 3D-tilting glow-shaded cards with mock registration ticket processors and success triggers.
6. **Timeline & Carousel**: Standard vertical timeline linked to scroll trackers, accompanied by a 3D horizontal infinite auto-slide workshops previewer.
7. **Standings Leaderboard**: Dynamic telemetry log displaying current hackathon rankings, team values, and reward details.
8. **AI Chatbot (A.L.I.C.E. V2)**: Simulated supercomputer assistant parsing user questions about prizes, hackathons, and registration procedures, outputting terminal transcripts.
9. **Cyber HUD Maps**: Custom inline dark vector map showing event headquarters with radar sweeps, coordinates, and latency indicators.

---

## 🛠️ Folder Structure

```
├── public/                 # Static asset definitions
├── src/
│   ├── app/
│   │   ├── globals.css     # Cyberpunk layouts, scrollbars, noise overlays
│   │   ├── layout.tsx      # Google fonts imports and metadata
│   │   └── page.tsx        # Main layout assembler
│   ├── components/
│   │   ├── About.tsx       # Core pillars and statistic meters
│   │   ├── Chatbot.tsx     # ALICE helper widget
│   │   ├── Competitions.tsx# Standings leaderboard
│   │   ├── Contact.tsx     # Forms & radar map HUDs
│   │   ├── CustomCursor.tsx# Magnetic dual cursor
│   │   ├── Events.tsx      # 3D tilting event modules
│   │   ├── FAQ.tsx         # Glowing glass accordions
│   │   ├── Footer.tsx      # Newsletters & quick links
│   │   ├── Hero.tsx        # Countdown timer & CTA buttons
│   │   ├── Loader.tsx      # Diagnostic booting screen
│   │   ├── Navbar.tsx      # Header & sound toggles
│   │   ├── SpaceCanvas.tsx # React Three Fiber 3D Scene
│   │   ├── Sponsors.tsx    # Dual infinite marquee rows
│   │   ├── Timeline.tsx    # Scroll timeline track
│   │   └── Workshops.tsx   # 3D infinite carousel slider
│   └── utils/
│       └── sound.ts        # Procedural synth oscillators
├── tailwind.config.ts      # Cyber HSL color palette
├── tsconfig.json           # Type definitions
└── package.json            # Script commands
```

---

## 📦 Installation & Setup

1. **Clone or navigate** to the project directory:
   ```bash
   cd "e:/shruti 3"
   ```

2. **Install all packages** (bypassing peer-dependency checks for React 19 / R3F experimental support):
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Launch the Development Server**:
   ```bash
   npm run dev
   ```

4. **Compile the Production Bundle**:
   ```bash
   npm run build
   ```

5. **Start Production Host**:
   ```bash
   npm run start
   ```

---

## 🖥️ Custom Keyboard Shortcuts

- `M`: Toggle space synth volume.
- `ESC`: Dismiss overlay modals or chatbots.
- `C`: Scroll directly to the contact cards.
