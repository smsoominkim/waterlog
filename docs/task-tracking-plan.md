# Task Plan: Tracking (물 기록 및 대시보드)

## 개요
사용자가 물을 마신 기록을 생성(Create), 조회(Read), 삭제(Delete)하고, 이를 달력 형태의 대시보드로 시각화합니다.

## 참조 문서
- `docs/user_stories.md` (섹션 2. 물 마신 기록 관리)
- `docs/software_design.md` (UI 컨셉 - 구글 캘린더 스타일)

## 상세 작업 목록

### 1. API 구현
- [ ] `app/api/logs/route.ts`: GET (기간별 조회), POST (기록 추가)
- [ ] `app/api/logs/[id]/route.ts`: DELETE (기록 삭제)

### 2. UI 구현 (대시보드)
- [ ] `app/dashboard/page.tsx`: 메인 대시보드 페이지
- [ ] `components/calendar/CalendarView.tsx`:
    - 시간축(Time Grid)이 있는 일간(Day) 뷰 / 주간(Week) 뷰 구현
    - CSS Grid 등을 활용하여 이벤트 블록 렌더링
- [ ] `components/tracking/LogModal.tsx`: 물 섭취량 입력 모달 (프리셋 버튼: 200ml, 500ml 등)
- [ ] `components/tracking/DailyProgress.tsx`: 하루 목표 달성률 시각화 (원형 차트 등)

## 데이터 구조 (참조: types/database.ts)
- `WaterLog` { id, user_id, amount_ml, logged_at }
