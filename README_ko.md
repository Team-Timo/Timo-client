<div align="center">
  <h1 align="center">Timo</h1>

  <p align="center">
    <strong>할 일을 실행 가능한 시간 단위로 바꿔주는 타임박싱 기반 투두 서비스</strong><br>
    계획한 것을 실제로 끝낼 수 있도록 돕습니다.
  </p>

  <p align="center">
    <a href="https://github.com/Team-Timo/Timo-client/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-f97316.svg" alt="License MIT"></a>&nbsp;
    <img src="https://img.shields.io/badge/Next.js-16-000000?logo=next.js" alt="Next.js 16">&nbsp;
    <img src="https://img.shields.io/badge/Turborepo-EF4444?logo=turborepo&logoColor=white" alt="Turborepo">&nbsp;
    <img src="https://img.shields.io/badge/플랫폼-데스크탑%20웹-2563eb" alt="데스크탑 웹">
  </p>

  <p align="center">
    <a href="./docs/conventions/"><strong>컨벤션</strong></a> ·
    <a href="./docs/architecture/"><strong>아키텍처</strong></a> ·
    <a href="./AGENTS.md"><strong>AI 협업</strong></a> ·
    <a href="README.md"><strong>English</strong></a>
  </p>

</div>

---

## Timo란?

Timo는 할 일을 실행 가능한 시간 단위(타임박스)로 변환해주는 투두 서비스입니다.

단순히 할 일 목록을 나열하는 대신, 각 태스크에 예상 소요 시간을 입력하면 하루 일정이 자동으로 구성됩니다.

반복 사용을 통해 Timo는 개인의 시간 사용 패턴을 학습하고, AI 기반 시간 추천으로 점점 더 현실적인 계획 수립을 돕습니다.

## 왜 만들었나요?

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/f5999e80-24d5-4163-ad7b-464a11eb6f52" />

<br/>

<br/>

- **투두 리스트만으로는 부족합니다**: 할 일을 적는 것만으로는 실제로 완수하기 어렵습니다. 시간 구조 없이 작성된 목록은 대부분 그날 끝나지 않습니다.
- **시간 추정이 계획을 실행 가능하게 만듭니다**: 소요 시간 없는 태스크는 바람일 뿐입니다. Timo는 모든 태스크에 시간을 붙여 구체적인 계획으로 만듭니다.
- **실행과 피드백까지 연결합니다**: 계획한 시간과 실제 수행 시간의 차이를 추적하고, 이를 다음 계획에 반영해 점점 더 현실적인 일정을 만들어 갑니다.

## 주요 기능

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/d885c832-0bee-4ef7-aa38-993bd43d916e" />

<br/>

<br/>

- **📝 투두 + 예상 소요 시간 입력**: 해야 할 일과 예상 소요 시간을 입력하면 타임박스가 생성되어 계획에 반영됩니다.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/f85b1a15-c86b-4a1b-b2ea-76779a87ae17" />

<br/>

<br/>

- **⏱️ 타이머 실행**: 타임박스를 실행하면 설정한 시간만큼 타이머가 작동해 계획을 수행합니다.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/f7b549b8-1072-4d31-abb0-0bfcefd91f8f" />

<br/>

<br/>

- **📊 타임라인 기록**: 실제로 수행한 시간만큼 타임라인에 박스 형태로 기록됩니다.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/bcd0f9be-7cdf-4d8d-a7af-595c6fa9544e" />

<br/>

<br/>

- **🤖 AI 피드백**: 그동안의 예상 소요 시간과 실제 소요 시간 데이터를 비교해 AI가 가장 적합한 시간을 추천하고 피드백을 제공합니다.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/71850f4c-d07a-4620-912d-3f1f2737cded" />

<br/>

<br/>

- **▶️ 다음 타임박스로 자연스러운 전환**: 하나의 타임박스를 완료하면 바로 다음 타임박스가 시작됩니다.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/1b49c2a2-bc22-4728-8e93-a52e22e6d352" />

<br/>

<br/>

- **📈 통계**: 하루에 집중한 시간과 예상·실제 소요 시간의 차이를 한눈에 확인할 수 있습니다.

<br/>

<br/>

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/aa70c797-e815-4b6d-a937-ec8dd5719b7c" />

<br/>

<br/>

- **🎯 집중 모드**: 하나의 투두에 집중해서 수행할 수 있는 모드입니다.

<br/>

<br/>

## 실행 방법

**사전 요구사항**

- Node.js 18 이상
- pnpm 9 이상

```bash
# 레포지토리 클론
git clone https://github.com/Team-Timo/Timo-client.git
cd Timo-client

# 의존성 설치
pnpm install

# 전체 개발 서버 실행
pnpm dev

# 웹 앱만 실행
pnpm dev:web
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 플랫폼

| 플랫폼      | 지원 상태 |
| ----------- | --------- |
| 데스크탑 웹 | ✅ 지원   |
| 모바일 웹   | 🚧 예정   |

Timo는 데스크탑 환경에서 장시간 자기주도적 작업을 수행하는 대학생 및 취업준비생을 주요 대상으로 합니다.

## 팀원

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

## 문서

| 내용                                    | 경로                                       |
| --------------------------------------- | ------------------------------------------ |
| 컨벤션 (커밋·브랜치·코드 스타일·네이밍) | [docs/conventions/](./docs/conventions/)   |
| 아키텍처 (스택·구조·컴포넌트·상태 전략) | [docs/architecture/](./docs/architecture/) |
| 디자인 (토큰·피그마·스토리북)           | [docs/design/](./docs/design/)             |

## AI 협업

Claude Code·Codex 공통 진입점은 [AGENTS.md](./AGENTS.md)입니다. 모든 AI 작업은 스킬 기반 워크플로우를 따릅니다.

## 라이선스

[MIT](LICENSE) © Timo Team
