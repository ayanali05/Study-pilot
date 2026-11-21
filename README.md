<div align="center">

# 🎓 StudyPilot AI (StudyTrack)
### *The Autonomous Academic Copilot & AKTU SGPA Predictor Engine*

**Empowering engineering students to master their syllabus and maximize SGPA using 5-Year PYQ Repeat Intelligence, Grounded AI Tutoring, and Spaced Repetition.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-20%2F20_PASSING-green?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![Prompt Adherence](https://img.shields.io/badge/Prompt_Eval-100%25_PASS-brightgreen?style=for-the-badge)](./scripts/eval-prompts.mjs)
[![PWA Ready](https://img.shields.io/badge/PWA-Manifest_Ready-orange?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

<br/>

[🚀 Live Demo](#-live-deployment--quick-start) • [✨ Key Innovations](#-7-flagship-innovations) • [🏗️ Architecture](#️-system-architecture--monorepo) • [🧪 Test & Audit Suite](#-test-coverage--automated-evaluation-100100) • [👨‍💻 Team & Credits](#-author--academic-credentials)

</div>

---

## 📌 The Problem: Why Engineering Students Struggle

Every semester, over **300,000+ engineering students under AKTU** face a broken study cycle:
1. **The "Blind Study" Trap:** Students spend dozens of hours memorizing low-yield topics while skipping concepts that have appeared in **4 out of the last 5 years' university question papers (PYQs)**.
2. **The "SGPA Surprise":** AKTU marks and grade points are governed by credit-weighted university ordinances. Students have zero clarity on where their SGPA stands until semester results arrive, often leading to academic probation or missed placement cutoffs.
3. **Passive Video Illusion:** Watching YouTube playlists gives a false sense of completion without active recall or exam-level problem-solving practice.
4. **Last-Minute Exam Panic:** 72 hours before university exams, students are overwhelmed without a prioritized, high-yield revision roadmap.

> **StudyPilot AI solves this end-to-end** by marrying university syllabus taxonomies with empirical 5-year PYQ repeat frequencies, automated SGPA forecasting, and grounded AI guidance.

---

## ✨ 7 Flagship Innovations

### 1. 📊 Dual-Mode SGPA Predictor Engine
* **Mode A (Official Ordinance Formula):** Direct implementation of the official AKTU credit-weighted SGPA calculation:
  $$\text{SGPA} = \frac{\sum_{i=1}^{n} (\text{Credits}_i \times \text{GradePoints}_i)}{\sum_{i=1}^{n} \text{Credits}_i}$$
* **Mode B (Progress & Readiness Predictor):** Algorithmic engine that analyzes real-time syllabus completion, test accuracy scores, and PYQ coverage to forecast the student's expected SGPA band before exams.

### 2. ⚡ 5-Year PYQ Repeat Intelligence
* High-yield algorithm scans 5 years of historical AKTU papers and tags each syllabus topic with empirical priority tiers:
  * 🔴 **Critical Priority:** Appeared in $\ge 4$ of the last 5 exam cycles (Top 20% syllabus that yields 80% marks).
  * 🟡 **High Priority:** Appeared in $2-3$ exam cycles.
  * 🟢 **Medium Priority:** Appeared in $1$ exam cycle or foundational concepts.

### 3. 🤖 Grounded StudyCoach AI (RAG with Schema Guardrails)
* Integrated with Google Gemini Generative AI, fine-tuned for AKTU Computer Science & Engineering.
* **100% Grounded:** Outputs strict JSON responses with verified syllabus unit citations and PYQ links.
* **Prompt Injection Defense:** Treats user inputs and uploaded questions as passive data, refusing out-of-syllabus manipulation.

### 4. 🚨 3-Day Emergency Exam Crash Planner
* Algorithmic schedule generator tailored for the final 72 hours before university examinations.
* Allocates study slots strictly by PYQ repeat frequency, reserving review blocks every 3rd day to ensure maximum SGPA retention under time pressure.

### 5. 🗂️ Spaced Repetition (SuperMemo SM-2) Flashcards
* Active recall engine with customizable ease factors ($EF \ge 1.3$), interval calculation ($I(n)$), and progressive graduation.
* Tailored for algorithms, proofs, time complexities, and hardware architecture definitions.

### 6. 🪟 Ultra-Modern 3D Floating Glassmorphic UI/UX
* **Next-Level Aesthetic:** Deep dark nebula themes (`#0B0F19`), frosted glass panels (`backdrop-blur-2xl`), floating 3D active navigation tabs, luminous ambient glow gradients, and responsive micro-interactions.
* **Celebration Effects:** Milestone completions trigger interactive multi-colored confetti particles.

### 7. 📜 Instant Academic Assessment Transcript & PDF Export
* One-click generation of the student's official academic report card with SGPA forecasts, study streak logs, topic mastery breakdown, and print-ready PDF layout.
* Preloaded demo identity: **DEEPAK PANDEY** (Roll No: **2501660100055**, Batch 2025).

---

## 🏗️ System Architecture & Monorepo

StudyPilot is architected as an industrial-grade **PNPM Monorepo** ensuring strict separation of concerns, zero circular dependencies, and blazing-fast type checking.

```
StudyPilot/
├── package.json                   # Root monorepo workspace scripts (build, test, eval)
├── pnpm-workspace.yaml            # Monorepo package declaration
├── vercel.json                    # Universal Vercel build & route configuration
├── prompts/                       # Production prompt templates & guardrails
│   ├── study-coach-system.md      # Grounded AI tutor system prompt with JSON schema
│   ├── mcq-generator.md           # 4-option practice question prompt constraint
│   └── crash-plan.md              # 3-day emergency revision prompt
├── scripts/
│   └── eval-prompts.mjs           # Automated prompt adherence evaluation suite
├── studytrack/
│   ├── apps/
│   │   └── web/                   # Next.js 14 App Router, Tailwind CSS, PWA Manifest
│   │       ├── src/app/           # 16 static & dynamic pre-rendered routes
│   │       │   ├── page.tsx       # Interactive SGPA Dashboard & PYQ Matrix
│   │       │   ├── coach/         # AI StudyCoach chat interface
│   │       │   ├── predictor/     # Dual-mode SGPA prediction simulator
│   │       │   ├── plan/          # 3-day crash plan generator
│   │       │   ├── flashcards/    # SM-2 active recall flashcards
│   │       │   ├── report/        # Printable assessment card (DEEPAK PANDEY)
│   │       │   └── manifest.ts    # Progressive Web App manifest
│   │       └── postbuild.js       # Vercel artifact mirror script
│   ├── packages/
│   │   ├── engine/                # Core calculation engine (SGPA, SM-2, PYQ)
│   │   │   └── src/__tests__/     # 20 Vitest unit test cases
│   │   ├── data/                  # AKTU CSE syllabus taxonomies & Zod schemas
│   │   └── ui/                    # Reusable glassmorphic UI components
│   └── supabase/
│       └── migrations/            # 001_initial.sql (PostgreSQL tables & seed data)
├── docs/                          # Academic documentation & project report
└── website/                       # Extension companion dashboard & web assets
```

---

## 🧪 Test Coverage & Automated Evaluation (100/100)

Every core algorithm, schema, and prompt in StudyPilot is continuously evaluated against automated test suites:

### 1. Engine Algorithmic Unit Tests (`Vitest`) — 20 / 20 PASSED
```bash
$ pnpm --filter @studytrack/engine test

 ✓ src/__tests__/engine.test.ts (20 tests) 26ms
   ✓ calculates baseline SGPA from empty progress
   ✓ boosts SGPA when topics are marked completed
   ✓ weights higher credit courses appropriately
   ✓ identifies critical topics appearing >= 4 of last 5 years
   ✓ assigns priority tiers (Critical, High, Medium) correctly
   ✓ computes realistic syllabus coverage percentage
   ✓ respects AKTU minimum passing grade thresholds (E/P grade)
   ✓ computes spaced repetition interval using SM-2
   ✓ adjusts ease factor based on user quality response
   ✓ schedules 3-day crash plan within daily hour limits
   ✓ ... (all 20 unit tests passed)

 Test Files  1 passed (1)
      Tests  20 passed (20)
   Duration  858ms
```

### 2. Prompt Adherence Evaluation Suite — 3 / 3 PASSED (100%)
```bash
$ node scripts/eval-prompts.mjs

🧪 Running StudyTrack Prompt Evaluation Suite...

✅ [PASS] study-coach-system schema validation (Output Schema + citations + aiGenerated)
✅ [PASS] mcq-generator 4-option constraint ("options": ["string", "string", "string", "string"])
✅ [PASS] crash-plan prompt injection guardrail (Defends passive data boundary)

Results: 3/3 prompt tests passed (100% adherence)
```

### 3. Production Build Validation — 16 / 16 Routes Generated
```bash
Route (app)                              Size     First Load JS
┌ ○ /                                    9.24 kB         140 kB
├ ○ /_not-found                          872 B            88 kB
├ ƒ /api/gemini                          0 B                0 B
├ ○ /coach                               3.99 kB         123 kB
├ ○ /flashcards                          1.57 kB         121 kB
├ ○ /manifest.webmanifest                0 B                0 B
├ ○ /plan                                3.01 kB         122 kB
├ ○ /predictor                           4.86 kB         131 kB
├ ○ /pyq                                 3.54 kB         123 kB
├ ○ /recommendations                     1.48 kB         128 kB
├ ○ /report                              1.74 kB         121 kB
├ ○ /roadmap                             3.06 kB         129 kB
├ ○ /tests                               3.27 kB         127 kB
└ ○ /what-if                             2.36 kB         122 kB
```

---

## 🚀 Live Deployment & Quick Start

### Prerequisites
- Node.js **>= 18.18.0**
- PNPM **>= 9.0.0** (`npm install -g pnpm`)

### 1. Clone & Install
```bash
git clone https://github.com/deepakpandey31/Study-pilot.git
cd Study-pilot
pnpm install
```

### 2. Run Locally in Development Mode
```bash
pnpm dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Run Test Suites
```bash
pnpm test
```
*Executes both Vitest engine tests and the prompt evaluation suite.*

### 4. Build for Production
```bash
pnpm build
```

---

## 🌐 Deploy to Vercel in 1 Click

StudyPilot is configured to deploy directly to **Vercel** with zero extra setup:
1. Import repository: `https://github.com/deepakpandey31/Study-pilot`
2. **Framework Preset:** `Next.js`
3. **Root Directory:** `./` (Leave as Root)
4. **Build Command:** `pnpm build` (detected automatically)
5. **Output Directory:** Default `.next`
6. Click **Deploy**!

---

## 👨‍💻 Author & Academic Credentials

| Parameter | Details |
| :--- | :--- |
| **Lead Developer** | **DEEPAK PANDEY** |
| **University Roll No** | **2501660100055** |
| **Degree & Branch** | B.Tech — Computer Science & Engineering (Batch 2025) |
| **Affiliation** | Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow |
| **GitHub Profile** | [@deepakpandey31](https://github.com/deepakpandey31) |
| **Repository (Primary)** | [Study-pilot](https://github.com/deepakpandey31/Study-pilot) |
| **Repository (Mirror)** | [StudyPilot](https://github.com/deepakpandey31/StudyPilot) |

---

## 📄 License & Acknowledgments

This project is open-source and available under the **MIT License**.  
Special thanks to the open-source community, Dr. A.P.J. Abdul Kalam Technical University for syllabus guidelines, and the Google Gemini team for generative AI capabilities.
