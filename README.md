<div align="center">
  <h1 align="center">Timo</h1>

  <p align="center">
    <strong>A timebox-based to-do service that turns your tasks into executable time blocks.</strong><br>
    Plan what you want to do. Timo helps you actually finish it.
  </p>

  <p align="center">
    <a href="https://github.com/Team-Timo/Timo-client/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-f97316.svg" alt="License MIT"></a>&nbsp;
    <img src="https://img.shields.io/badge/Next.js-16-000000?logo=next.js" alt="Next.js 16">&nbsp;
    <img src="https://img.shields.io/badge/Turborepo-EF4444?logo=turborepo&logoColor=white" alt="Turborepo">&nbsp;
    <img src="https://img.shields.io/badge/platform-Desktop%20Web-2563eb" alt="Desktop Web">
  </p>

  <p align="center">
    <a href="./docs/conventions/"><strong>Conventions</strong></a> ·
    <a href="./docs/architecture/"><strong>Architecture</strong></a> ·
    <a href="./AGENTS.md"><strong>AI Collab</strong></a> ·
    <a href="README_ko.md"><strong>한국어</strong></a>
  </p>

  <!-- Uncomment once a screenshot is ready -->
  <!-- <p align="center">
    <img src="assets/screenshot.png" alt="Timo screenshot" width="960">
  </p> -->
</div>

---

## What Is Timo?

Timo is a timebox-based to-do service that converts tasks into actionable, time-bound blocks — so you actually finish what you plan. Unlike traditional to-do lists, Timo asks you to estimate how long each task will take, then builds your day around those time blocks. As you use it, Timo learns your time patterns and helps you plan more realistically with AI-powered time recommendations.

## Why We Built It

- **To-do lists aren't enough**: Writing tasks down feels productive, but without a time structure, most lists stay unfinished at end of day.
- **Time estimates make plans real**: A task without a duration is just a wish. Timo pairs every task with a time block from the start.
- **Feedback closes the loop**: The gap between planned and actual time is where most tools stop. Timo closes that loop by recording real execution time and feeding it back into future planning.

## Features

### ✏️ Todo + Time Estimate

Add tasks with an expected duration and optional tags. The estimate becomes the foundation of your daily schedule.

### 📦 Automatic Timebox Scheduling

Each task is automatically converted into a time block on your schedule — turning a flat to-do list into an executable plan.

### ⏱️ Timer-Based Execution

Start a timebox and a timer begins. Pause, extend, or go full-screen to stay focused. When time is up, you get a notification. Actual time spent is recorded automatically.

### 🤖 AI Time Recommendations

Timo learns how long similar tasks actually take you, then recommends more accurate time estimates — making future plans increasingly realistic.

## Getting Started

**Prerequisites**

- Node.js 18+
- pnpm 9+

```bash
# Clone the repository
git clone https://github.com/Team-Timo/Timo-client.git
cd Timo-client

# Install dependencies
pnpm install

# Start all packages in development mode
pnpm dev

# Or start only the web app
pnpm dev:web
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Platform

| Platform    | Status       |
| ----------- | ------------ |
| Desktop Web | ✅ Supported |
| Mobile Web  | 🚧 Planned   |

Timo is optimized for desktop use — designed for students and job seekers who self-manage long, focused work sessions.

## Team

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/kimminna">
        <img src="https://github.com/kimminna.png" width="80" alt="김민아"/>
      </a>
      <br/>
      <strong>김민아</strong>
      <br/>
      <sub>Frontend Leader</sub>
    </td>
    <td align="center">
      <a href="https://github.com/yumin-kim2">
        <img src="https://github.com/yumin-kim2.png" width="80" alt="김유민"/>
      </a>
      <br/>
      <strong>김유민</strong>
      <br/>
      <sub>Frontend Dev</sub>
    </td>
    <td align="center">
      <a href="https://github.com/jjangminii">
        <img src="https://github.com/jjangminii.png" width="80" alt="김정민"/>
      </a>
      <br/>
      <strong>김정민</strong>
      <br/>
      <sub>Frontend Dev</sub>
    </td>
    <td align="center">
      <a href="https://github.com/ehye1">
        <img src="https://github.com/ehye1.png" width="80" alt="이혜원"/>
      </a>
      <br/>
      <strong>이혜원</strong>
      <br/>
      <sub>Frontend Dev</sub>
    </td>
  </tr>
</table>

---

## Documentation

| Content                                               | Path                                       |
| ----------------------------------------------------- | ------------------------------------------ |
| Conventions (commit · branch · code style · naming)   | [docs/conventions/](./docs/conventions/)   |
| Architecture (stack · structure · components · state) | [docs/architecture/](./docs/architecture/) |
| Design (tokens · Figma)                               | [docs/design/](./docs/design/)             |

## AI Collaboration

Claude Code and Codex share a common entry point at [AGENTS.md](./AGENTS.md). All AI work follows the skill-based workflow defined there.

## License

[MIT](LICENSE) © Timo Team
