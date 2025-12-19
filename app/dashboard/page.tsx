import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardClient from './client_page';

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    // Fetch logs for the current user
    // Fetching a broader range (e.g., last 30 days) to populate calendar
    // Adjust limit as needed
    const { data: logs, error } = await supabase
        .from('water_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('logged_at', { ascending: false })
        .limit(100);

    if (error) {
        console.error('Error fetching logs:', error);
        // Handle error gracefully or pass empty array
    }

    return <DashboardClient initialLogs={logs || []} user={user} />;
}
