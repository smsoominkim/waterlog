import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // params is a Promise in Next.js 15
) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Await params to access id
    const { id } = await params;

    const { error } = await supabase
        .from('water_logs')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Ensure user owns the log

    if (error) {
        console.error('Error deleting log:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
