# 피그마 MCP 연동

## 개요

Claude Code의 Figma MCP를 통해 피그마 디자인을 직접 참조하면서 컴포넌트를 구현합니다.

## 설정

### 1. Figma Personal Access Token 발급

1. Figma → 우측 상단 프로필 → Settings → Security
2. Personal access tokens → `Create new token`
3. 이름 입력 후 토큰 복사

### 2. 환경 변수 설정

`.env.local`에 추가한다 (커밋 금지):

```text
FIGMA_API_KEY=your_personal_access_token
```

### 3. MCP 서버 등록

`~/.claude/settings.json`에 추가:

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

## 주의사항

- Personal Access Token은 절대 커밋하지 않는다
- 피그마 값이 `docs/design/tokens.md` 토큰 표에 없으면 hex를 하드코딩하지 않고 토큰 추가 여부를 먼저 확인한다
