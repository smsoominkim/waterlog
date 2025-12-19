import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase: any = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const amount_ml = Number(json.amount_ml);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const logged_at = json.logged_at ? String(json.logged_at) : undefined;

        if (!amount_ml) {
            return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('water_logs')
            .insert([
                {
                    user_id: user.id,
                    amount_ml,
                    logged_at: logged_at || new Date().toISOString(),
                } as any,
            ])
            .select()
            .single();

        if (error) {
            console.error('Error inserting log:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}

export async function GET(request: Request) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    let query = supabase
        .from('water_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('logged_at', { ascending: false });

    if (startDate) {
        query = query.gte('logged_at', startDate);
    }
    if (endDate) {
        query = query.lte('logged_at', endDate);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching logs:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
