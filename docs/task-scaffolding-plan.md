# Task Plan: Scaffolding (기초 공사)

## 개요
프로젝트의 폴더 구조, 데이터베이스 스키마, 전역 스타일, 공통 타입을 정의하여 다른 Agent들이 병렬로 작업할 수 있는 기반을 마련합니다.

## 참조 문서
- `docs/software_design.md` (기술 스택, 데이터베이스 설계, 아키텍처)

## 상세 작업 목록

### 1. 프로젝트 초기화
- [ ] Next.js (App Router), TypeScript, Tailwind CSS, pnpm(또는 npm) 설치
- [ ] 필수 라이브러리 설치: `@supabase/supabase-js`, `lucide-react` (아이콘), `date-fns` (날짜 처리)
- [ ] `tailwind.config.ts` 설정 (기본 컬러 팔레트 정의 - Software Design의 'Premium & Dynamic' 반영)

### 2. 데이터베이스 스키마 및 타입
- [ ] `supabase/migrations/` 폴더 생성
- [ ] `00_init.sql` 작성: `users`, `water_logs`, `reports` 테이블 생성 SQL (Design 문서의 ERD 준수)
- [ ] `types/database.ts` 생성: 테이블별 TypeScript Interface 정의 (Supabase generated types와 유사하게 구성하여 수동 배포 가능하도록 함)

### 3. 레이아웃 및 네비게이션
- [ ] `app/layout.tsx`: 전역 폰트, 메타데이터 설정
- [ ] `components/layout/Sidebar.tsx`: 사이드바 메뉴 컴포넌트 (링크만 연결, 페이지는 없어도 됨)
- [ ] `components/layout/Header.tsx`: 모바일용 헤더 혹은 데스크탑 상단 바

## 산출물
- 실행 가능한 로컬 서버
- 데이터베이스 마이그레이션 SQL 파일
- 팀원 공유용 `types/database.ts`
