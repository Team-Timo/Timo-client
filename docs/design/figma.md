# 피그마 MCP 연동

## 개요

Claude Code의 Figma MCP를 통해 피그마 디자인을 직접 참조하면서 컴포넌트를 구현합니다.
`timo-figma` 스킬이 이 문서를 참조합니다.

## 설정

### 1. Figma Personal Access Token 발급

1. Figma → 우측 상단 프로필 → Settings → Security
2. Personal access tokens → `Create new token`
3. 이름 입력 후 토큰 복사

### 2. 환경 변수 설정

`.env.local`에 토큰을 추가한다 (커밋하지 않는다):

```text
FIGMA_API_KEY=your_personal_access_token
```

### 3. MCP 서버 등록

프로젝트 루트 `.mcp.json` 또는 `~/.claude/settings.json`에 추가:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp"],
      "env": {
        "FIGMA_API_KEY": "${FIGMA_API_KEY}"
      }
    }
  }
}
```

### 4. 연결 확인

Claude Code 세션에서 피그마 파일 URL을 공유하면 MCP가 자동으로 디자인 데이터를 로드한다.

## 사용 방법

`timo-figma` 스킬 실행 시 피그마 URL을 함께 전달한다.  
MCP를 통해 아래 정보를 자동 추출한다:

- 컴포넌트 스펙 (크기·색상·폰트·간격)
- 디자인 토큰 매핑 (`docs/design/tokens.md` 참조)
- 컴포넌트 계층 구조 및 variant 목록

## 주의사항

- Personal Access Token은 절대 커밋하지 않는다
- `.mcp.json`을 `.gitignore`에 추가하거나 환경 변수 방식을 사용한다
