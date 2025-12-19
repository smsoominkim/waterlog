import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase: any = await createClient();

    let userId = '';
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // DEMO MODE
    if (authError || !user) {
        // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        userId = '00000000-0000-0000-0000-000000000000';
    } else {
        userId = user.id;
    }

    const { data: reports, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reports });
}
