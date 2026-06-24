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

- **투두 리스트만으로는 부족합니다**: 할 일을 적는 것만으로는 실제로 완수하기 어렵습니다. 시간 구조 없이 작성된 목록은 대부분 그날 끝나지 않습니다.
- **시간 추정이 계획을 실행 가능하게 만듭니다**: 소요 시간 없는 태스크는 바람일 뿐입니다. Timo는 모든 태스크에 시간을 붙여 구체적인 계획으로 만듭니다.
- **실행과 피드백까지 연결합니다**: 계획한 시간과 실제 수행 시간의 차이를 추적하고, 이를 다음 계획에 반영해 점점 더 현실적인 일정을 만들어 갑니다.

## 주요 기능

- **✏️ 투두 + 예상 소요 시간 입력**: 태스크를 입력할 때 예상 소요 시간과 태그를 함께 설정합니다. 이 정보가 하루 일정의 기반이 됩니다.

- **📦 타임박스 자동 생성**: 입력된 태스크는 실행 가능한 시간 단위의 타임박스로 자동 변환됩니다. 평면적인 리스트가 실행 가능한 일정으로 바뀝니다.

- **⏱️ 타이머 기반 실행**: 타임박스를 시작하면 타이머가 작동합니다. 일시정지·연장·전체화면 기능을 제공하며, 완료 시 알림을 받을 수 있습니다. 실제 수행 시간은 자동으로 기록됩니다.

- **🤖 AI 소요 시간 추천**: 반복 사용을 통해 유사 태스크의 실제 소요 시간 패턴을 학습하고, 더 정확한 시간 추천을 제공합니다. 이를 통해 사용할수록 더 현실적인 계획을 세울 수 있습니다.

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

## 문서

| 내용                                    | 경로                                       |
| --------------------------------------- | ------------------------------------------ |
| 컨벤션 (커밋·브랜치·코드 스타일·네이밍) | [docs/conventions/](./docs/conventions/)   |
| 아키텍처 (스택·구조·컴포넌트·상태 전략) | [docs/architecture/](./docs/architecture/) |
| 디자인 (토큰·피그마 연동)               | [docs/design/](./docs/design/)             |

## AI 협업

Claude Code·Codex 공통 진입점은 [AGENTS.md](./AGENTS.md)입니다. 모든 AI 작업은 스킬 기반 워크플로우를 따릅니다.

## 라이선스

[MIT](LICENSE) © Timo Team
