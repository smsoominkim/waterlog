import { createClient } from '@/utils/supabase/server';
import { generateWaterReport, WaterLogData } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase: any = await createClient();

    // 1. Check Authentication
    let userId = '';
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // DEMO MODE: If not logged in, use dummy ID '00000000-0000-0000-0000-000000000000'
    if (authError || !user) {
        // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        userId = '00000000-0000-0000-0000-000000000000';
    } else {
        userId = user.id;
    }

    try {
        let logs: any[] = [];
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        // DEMO MODE: Mock Data if userId is dummy
        if (userId === '00000000-0000-0000-0000-000000000000') {
            console.log("Using Mock Data for Demo");
            logs = [
                { amount_ml: 500, logged_at: new Date(Date.now() - 86400000).toISOString() },
                { amount_ml: 300, logged_at: new Date(Date.now() - 86400000 - 7200000).toISOString() },
                { amount_ml: 1200, logged_at: new Date(Date.now() - 172800000).toISOString() },
                { amount_ml: 800, logged_at: new Date(Date.now() - 259200000).toISOString() },
                { amount_ml: 1500, logged_at: new Date(Date.now() - 345600000).toISOString() },
                { amount_ml: 2000, logged_at: new Date(Date.now() - 432000000).toISOString() },
                { amount_ml: 500, logged_at: new Date(Date.now() - 518400000).toISOString() },
            ];
        } else {
            // 2. Fetch Water Logs (Last 7 Days) from DB
            const { data: dbLogs, error: logsError } = await supabase
                .from('water_logs')
                .select('amount_ml, logged_at')
                .eq('user_id', userId)
                .gte('logged_at', sevenDaysAgo.toISOString())
                .order('logged_at', { ascending: true });

            if (logsError) {
                console.error('Error fetching logs:', logsError);
                return NextResponse.json({ error: 'Failed to fetch water logs' }, { status: 500 });
            }
            logs = dbLogs || [];
        }

        if (!logs || logs.length === 0) {
            return NextResponse.json({
                message: 'No water logs found for the last 7 days. Please log some water first!',
                report: null
            }, { status: 400 });
        }

        // 3. Format Data for Gemini
        const formattedLogs: WaterLogData[] = logs.map((log: any) => ({
            date: new Date(log.logged_at).toISOString().split('T')[0], // YYYY-MM-DD
            amount_ml: log.amount_ml,
        }));

        // 4. Generate Report via Gemini (Mock if Demo)
        let reportContent = '';
        if (userId === '00000000-0000-0000-0000-000000000000') {
            reportContent = `
# 🌊 주간 수분 섭취 분석 리포트

**기간**: 2025.02.10 - 2025.02.17

## 1. 섭취량 분석
지난 7일간의 총 섭취량은 평균 **1,500ml**입니다.
성인 권장 섭취량인 2,000ml 대비 **75%** 수준으로, 조금 더 분발이 필요합니다!
특히 주중에는 섭취량이 꾸준하지만, 주말에 급격히 줄어드는 패턴이 보입니다.

## 2. 건강 조언
- **주말 관리**: 집에 있을 때도 물병을 가까이 두세요.
- **아침 습관**: 기상 직후 물 한 잔은 신진대사에 아주 좋습니다.
- **피부 건강**: 수분이 부족하면 피부가 건조해질 수 있어요.

## 3. 응원 메시지
이미 물 마시는 습관이 형성되고 있습니다! 
하루에 **한 잔(250ml)만 더** 마시는 것을 목표로 해볼까요? 
작은 변화가 큰 건강을 만듭니다. 화이팅! 💪
            `;
        } else {
            reportContent = await generateWaterReport(formattedLogs, 'WEEKLY');
        }

        // 5. Save Report to Database (Skip if Demo)
        let savedReport;
        if (userId === '00000000-0000-0000-0000-000000000000') {
            savedReport = {
                id: Math.floor(Math.random() * 10000),
                user_id: userId,
                content: reportContent,
                period_type: 'WEEKLY',
                start_date: sevenDaysAgo.toISOString().split('T')[0],
                end_date: today.toISOString().split('T')[0],
                created_at: new Date().toISOString()
            };
        } else {
            const { data, error: saveError } = await supabase
                .from('reports')
                .insert({
                    user_id: userId,
                    content: reportContent,
                    period_type: 'WEEKLY',
                    start_date: sevenDaysAgo.toISOString().split('T')[0],
                    end_date: today.toISOString().split('T')[0],
                })
                .select()
                .single();

            if (saveError) {
                console.error('Error saving report:', saveError);
                return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
            }
            savedReport = data;
        }

        return NextResponse.json({ report: savedReport });

    } catch (error) {
        console.error('Error generating report:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
