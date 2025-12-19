# AI Report Feature Implementation Plan

## Goal Description
Implement an AI-powered reporting feature that analyzes user's water intake logs using Google's Gemini API (`gemini-2.5-flash`) and provides personalized health advice and patterns.

## User Review Required
> [!IMPORTANT]
> Ensure `GEMINI_API_KEY` is set in `.env.local` for the Gemini API to function.

## Proposed Changes

### Backend logic & API
#### [NEW] [gemini.ts](file:///Users/soomin/water/lib/gemini.ts)
- Configure Google Generative AI client.
- Implement function to generate report content based on logs.

#### [NEW] [route.ts](file:///Users/soomin/water/app/api/reports/generate/route.ts)
- POST endpoint to generate reports.
- Fetches recent water logs.
- Calls Gemini service.
- Saves report to `reports` table.

#### [NEW] [route.ts](file:///Users/soomin/water/app/api/reports/route.ts)
- GET endpoint to list user's reports.

### Frontend UI
#### [NEW] [ReportCard.tsx](file:///Users/soomin/water/components/report/ReportCard.tsx)
- Component to display individual reports.
- Supports markdown rendering for AI output.

#### [NEW] [page.tsx](file:///Users/soomin/water/app/reports/page.tsx)
- Page to list past reports and trigger new report generation.
- Loading states for AI generation.

## Verification Plan

### Manual Verification
1.  **Environment Setup**: Add `GEMINI_API_KEY` to `.env.local`.
2.  **Generate Report**:
    - Navigate to `/reports`.
    - Click "Generate New Report".
    - Verify loading state appears.
    - Verify report appears after completion.
    - Verify data is saved in Supabase `reports` table.
3.  **View Reports**:
    - Refresh page.
    - Verify previously generated reports are listed.
