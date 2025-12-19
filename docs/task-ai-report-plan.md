# Task Plan: AI Report (AI 리포트)

## 개요
Gemini API(`gemini-2.5-flash`)를 활용하여 사용자의 물 섭취 데이터를 분석하고, 맞춤형 리포트를 생성하여 제공합니다.

## 참조 문서
- `docs/user_stories.md` (섹션 3. AI 기반 리포트)
- `docs/software_design.md` (백엔드 설계)

## 상세 작업 목록

### 1. Gemini Service 구현
- [x] `lib/gemini.ts`: Google Generative AI 클라이언트 설정
    - **MODEL**: `gemini-2.5-flash` 필수 사용
    - 프롬프트 엔지니어링: 물 섭취 로그 포맷 -> 건강 조언 및 패턴 분석 요청

### 2. API 구현
- [x] `app/api/reports/generate/route.ts`:
    - 최근 7일(또는 지정 기간) 로그 Fetch
    - Gemini에게 분석 요청
    - 결과를 `reports` 테이블에 저장 및 반환
- [x] `app/api/reports/route.ts`: 저장된 리포트 목록 조회

### 3. UI 구현
- [x] `app/reports/page.tsx`: 리포트 목록 및 상세 보기
- [x] `components/report/ReportCard.tsx`: 리포트 내용을 예쁘게 보여주는 카드 컴포넌트 (Markdown 렌더링 지원 권장)

## 주의사항
- API Key 관리는 `.env.local`을 통해 안전하게 처리.
- AI 응답 지연 시간을 고려하여 로딩 UI(Skeleton) 적용 필수.
