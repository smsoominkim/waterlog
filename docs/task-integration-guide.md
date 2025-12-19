# 멀티 에이전트 협업 가이드 (Multi-Agent Integration Guide)

이 문서는 여러 AI Agent가 `Water Intake Service`를 병렬로 개발하기 위한 협업 가이드, 규칙, 그리고 프롬프트를 정의합니다.

## 1. 프로젝트 원칙 (Principles)
1.  **모델 고정**: 모든 LLM 호출 및 AI 기능 구현 시 모델명은 **`gemini-2.5-flash`** 를 사용한다.
2.  **병렬성 극대화**: 각 Agent는 서로의 작업이 완료되기를 기다리지 않도록, **인터페이스(Data Types, API Signatures)** 를 먼저 정의하고 Mocking을 적극 활용한다.
3.  **충돌 방지**:
    - 공통 파일(`layout.tsx`, `global.css`, `tailwind.config.ts`) 수정은 최소화하거나, **Scaffolding Agent**가 전담한다.
    - 각 기능은 모듈화된 폴더 구조(`features/auth`, `features/tracking` 등) 또는 독립된 컴포넌트 파일로 분리하여 개발한다.

## 2. 작업 단계 (Phases)

### Phase 1: 기초 공사 (Scaffolding) - **MUST START HERE**
- **담당**: Scaffolding Agent
- **목표**: 프로젝트 초기화, DB 스키마 마이그레이션 파일 생성, 공통 타입 정의, 기본 레이아웃 및 스타일 설정.
- **산출물**: 실행 가능한 Next.js 앱, Supabase 클라이언트 설정, `types/database.ts`.
- **주의**: 이 단계가 완료되어야 다른 Agent들이 `types/database.ts`를 참조하여 작업할 수 있음.

### Phase 2: 기능 구현 (Parallel Execution)
다음 3개의 Agent는 Phase 1 완료 후 동시에 작업을 시작할 수 있습니다.

| Agent | 담당 기능 | 주요 작업 영역 | 의존성 |
| --- | --- | --- | --- |
| **Auth Agent** | 로그인/가입/프로필 | `/app/login`, `/components/auth`, Supabase Auth | `types/database.ts` |
| **Tracking Agent** | 물 기록 CRUD, 캘린더 UI | `/app/dashboard`, `/api/logs`, `/components/calendar` | `types/database.ts` |
| **AI Agent** | AI 리포트 생성 및 조회 | `/app/report`, `/api/reports`, Gemini Service | `types/database.ts` |

### Phase 3: 통합 및 폴리싱 (Integration)
- **담당**: Integration Agent (혹은 사용자가 직접 병합 확인)
- **목표**: 각 기능 간의 연결(네비게이션), 전반적인 UI 톤앤매너 통일, 버그 수정.

---

## 3. 에이전트별 프롬프트 가이드 (Prompt Guide)

각 Agent에게 작업을 지시할 때 아래의 프롬프트를 사용하십시오. 각 Agent는 **자신의 담당 문서(`task-*-plan.md`)** 와 공통 문서(`software_design.md`)를 반드시 참고해야 합니다.

### [Phase 1] Scaffolding Agent
```markdown
당신은 프로젝트의 기반을 다지는 Lead Engineer입니다.
`docs/task-scaffolding-plan.md`와 `docs/software_design.md`를 참고하여 다음을 수행하세요:
1. Next.js 프로젝트 초기화 및 라이브러리 설치.
2. Supabase 환경 설정 및 DB 스키마(SQL) 파일 생성.
3. 공통 Type Definition (`types/database.ts`) 작성.
4. 기본 레이아웃 및 네비게이션 바(껍데기) 구현.
```

### [Phase 2] Auth Agent
```markdown
당신은 인증 및 사용자 관리 담당 Engineer입니다.
`docs/task-auth-plan.md`, `docs/software_design.md`, 그리고 `types/database.ts`를 참고하세요.
1. Supabase Auth를 연동한 로그인/회원가입 페이지 구현.
2. 미들웨어를 통한 보호된 라우트 처리.
3. 프로필 관리 UI 구현.
```

### [Phase 2] Tracking Agent
```markdown
당신은 핵심 기능인 물 기록 및 대시보드 담당 Engineer입니다.
`docs/task-tracking-plan.md`, `docs/software_design.md`를 참고하세요.
1. 물 섭취 기록 API (CRUD) 구현.
2. 구글 캘린더 스타일의 메인 대시보드 UI 및 '기록하기' 모달 구현.
3. 데이터 시각화 (일간/주간 뷰).
```

### [Phase 2] AI Agent
```markdown
당신은 AI/LLM 기능 담당 Engineer입니다.
`docs/task-ai-report-plan.md`, `docs/software_design.md`를 참고하세요.
1. Gemini API (`gemini-2.5-flash`)를 활용한 리포트 생성 서비스 로직 구현.
2. 리포트 생성 및 조회 API 구현.
3. 리포트 UI 페이지 구현.
```
