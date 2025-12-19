# Task Plan: Auth (인증 기능)

## 개요
Supabase Auth를 사용하여 사용자 가입, 로그인, 로그아웃 및 프로필 관리 기능을 구현합니다.

## 참조 문서
- `docs/user_stories.md` (섹션 1. 인증)
- `docs/software_design.md` (아키텍처)
- `docs/task-scaffolding-plan.md` (의존성 확인)

## 상세 작업 목록

### 1. 인증 로직 (Backend/Client)
- [ ] Supabase Auth Client 설정 (`utils/supabase/server.ts`, `utils/supabase/client.ts`)
- [ ] Middleware 구현 (`middleware.ts`): 세션 확인 및 리다이렉션 처리

### 2. UI 구현
- [ ] `app/login/page.tsx`: 이메일 로그인 및 소셜 로그인(구글) 버튼 UI
    - 디자인: 심플하고 모던한 카드 형태
- [ ] `components/auth/AuthButton.tsx`: 사이드바/헤더에 들어갈 로그인/로그아웃 버튼 컴포넌트
- [ ] `app/account/page.tsx`: 사용자 프로필 정보 확인 (읽기 전용 혹은 간단한 수정)

## 주의사항
- **병렬 작업**: `users` 테이블은 Scaffolding 단계에서 생성되지만, Supabase Auth의 `auth.users`와 연동되는 Trigger가 필요할 수 있음. 필요시 SQL 파일 추가 (`supabase/migrations/01_auth_trigger.sql`).
