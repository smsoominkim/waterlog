'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DailyProgress from '@/components/tracking/DailyProgress';
import CalendarView from '@/components/tracking/CalendarView';
import LogModal from '@/components/tracking/LogModal';

interface WaterLog {
    id: number;
    amount_ml: number;
    logged_at: string;
}

interface DashboardClientProps {
    initialLogs: WaterLog[];
    user: {
        email?: string | null;
        full_name?: string | null;
    };
}

export default function DashboardClient({ initialLogs, user }: DashboardClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    // Calculate today's total
    const today = new Date();
    const todayLogs = initialLogs.filter((log) => {
        const logDate = new Date(log.logged_at);
        return (
            logDate.getDate() === today.getDate() &&
            logDate.getMonth() === today.getMonth() &&
            logDate.getFullYear() === today.getFullYear()
        );
    });
    const todayTotal = todayLogs.reduce((sum, log) => sum + log.amount_ml, 0);
    const goalAmount = 2000; // Hardcoded goal for now, could be dynamic later

    const handleLogSuccess = () => {
        router.refresh(); // Refresh server data
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Nav */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-extrabold text-blue-600 tracking-tight">WaterLog</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600">
                            {user.full_name || user.email?.split('@')[0]}님
                        </span>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                            {(user.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-md mx-auto px-6 py-8 space-y-6">
                {/* Date Header */}
                <div className="mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
                    </h2>
                    <p className="text-gray-500">오늘도 건강한 하루 보내세요! 💧</p>
                </div>

                {/* Progress Card */}
                <DailyProgress currentAmount={todayTotal} goalAmount={goalAmount} />

                {/* Calendar / Stats */}
                <CalendarView logs={initialLogs} />
            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-20 md:hidden">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>

            {/* Desktop Record Button (in main flow for better UX on desktop) */}
            <div className="hidden md:block fixed bottom-10 right-[calc(50%-240px)] translate-x-32 xl:translate-x-48">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg font-bold transition-all hover:-translate-y-1"
                >
                    <span className="text-xl">+</span> 기록하기
                </button>
            </div>

            <LogModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleLogSuccess}
            />
        </div>
    );
}
