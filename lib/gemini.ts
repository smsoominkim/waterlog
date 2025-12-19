import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export interface WaterLogData {
    date: string;
    amount_ml: number;
}

export async function generateWaterReport(logs: WaterLogData[], period: 'DAILY' | 'WEEKLY'): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const logSummary = logs.map(log => `- ${log.date}: ${log.amount_ml}ml`).join('\n');

    const prompt = `
당신은 사용자의 수분 섭취 습관을 분석하는 건강 전문가 AI입니다.
다음은 사용자의 최근 ${period === 'DAILY' ? '일간' : '주간'} 물 섭취 기록입니다:

${logSummary}

이 데이터를 바탕으로 다음 내용을 포함한 마크다운 형식의 리포트를 작성해주세요:
1. **섭취량 분석**: 권장 섭취량(성인 기준 약 2000ml) 대비 분석, 섭취 패턴(규칙적인지 등).
2. **건강 조언**: 현재 습관이 건강에 미치는 영향과 개선할 점.
3. **응원 메시지**: 긍정적인 습관 형성을 위한 동기 부여 메시지.

강조할 내용은 굵은 글씨로 표시하고, 읽기 편한 어조로 작성해주세요.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating report with Gemini:", error);
        throw new Error("리포트 생성 중 오류가 발생했습니다.");
    }
}
