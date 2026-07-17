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

</div>

---

## What Is Timo?

Timo is a timebox-based to-do service that converts tasks into actionable, time-bound blocks — so you actually finish what you plan.

Unlike traditional to-do lists, Timo asks you to estimate how long each task will take, then builds your day around those time blocks.

As you use it, Timo learns your time patterns and helps you plan more realistically with AI-powered time recommendations.

## Why We Built It

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/f5999e80-24d5-4163-ad7b-464a11eb6f52" />

<br/>

<br/>

- **To-do lists aren't enough**: Writing tasks down feels productive, but without a time structure, most lists stay unfinished at end of day.
- **Time estimates make plans real**: A task without a duration is just a wish. Timo pairs every task with a time block from the start.
- **Feedback closes the loop**: The gap between planned and actual time is where most tools stop. Timo closes that loop by recording real execution time and feeding it back into future planning.

## Features

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/d885c832-0bee-4ef7-aa38-993bd43d916e" />

<br/>

<br/>

- **📝 Todo + Time Estimate**: Enter what you need to do and how long you expect it to take — Timo turns it into a timebox that becomes part of your plan.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/f85b1a15-c86b-4a1b-b2ea-76779a87ae17" />

<br/>

<br/>

- **⏱️ Timer-Based Execution**: Start a timebox and a timer runs for exactly the duration you set, keeping you focused on getting it done.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/f7b549b8-1072-4d31-abb0-0bfcefd91f8f" />

<br/>

<br/>

- **📊 Timeline Tracking**: The actual time you spent is automatically recorded on the timeline as a time block, so you can see exactly when and how long you worked.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/bcd0f9be-7cdf-4d8d-a7af-595c6fa9544e" />

<br/>

<br/>

- **🤖 AI Feedback**: Timo compares your accumulated estimated vs. actual time data and recommends the most realistic duration for each task, giving you feedback to plan better.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/71850f4c-d07a-4620-912d-3f1f2737cded" />

<br/>

<br/>

- **▶️ Seamless Transition**: Complete a timebox and the next one starts right away, keeping your workflow moving without interruption.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/1b49c2a2-bc22-4728-8e93-a52e22e6d352" />

<br/>

<br/>

- **📈 Daily Statistics**: See how much time you focused today, and compare estimated vs. actual time at a glance.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/aa70c797-e815-4b6d-a937-ec8dd5719b7c" />

<br/>

<br/>

- **🎯 Focus Mode**: Zoom into a single todo and work through it distraction-free.

<br/>

<br/>

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
        <img width="1276" height="2032" alt="image" src="https://github.com/user-attachments/assets/ebd38f45-73ad-4ad9-97d9-82d9c057abcd" />
      </a>
      <br/>
      <strong>김민아</strong>
      <br/>
      <sub>Frontend Leader</sub>
    </td>
    <td align="center">
      <a href="https://github.com/yumin-kim2">
        <img width="1276" height="2032" alt="image" src="https://github.com/user-attachments/assets/d093d5c5-27a0-4e7d-b83d-de9379f82f0c" />
      </a>
      <br/>
      <strong>김유민</strong>
      <br/>
      <sub>Frontend Dev</sub>
    </td>
    <td align="center">
      <a href="https://github.com/jjangminii">
        <img width="1276" height="2032" alt="image" src="https://github.com/user-attachments/assets/59959ce9-2cab-4a6f-b4ec-73463bac404d" />
      </a>
      <br/>
      <strong>김정민</strong>
      <br/>
      <sub>Frontend Dev</sub>
    </td>
    <td align="center">
      <a href="https://github.com/ehye1">
     <img width="1276" height="2032" alt="image" src="https://github.com/user-attachments/assets/20bb5e37-6b5e-4f20-8255-658531293e82" />
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
| Design (tokens · Figma · Storybook)                   | [docs/design/](./docs/design/)             |

## AI Collaboration

Claude Code and Codex share a common entry point at [AGENTS.md](./AGENTS.md). All AI work follows the skill-based workflow defined there.

## License

[MIT](LICENSE) © Timo Team
