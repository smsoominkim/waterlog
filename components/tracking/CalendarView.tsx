'use client';

import { useState } from 'react';

// Using database types would be better if shared, but for now defining locally to match API response
interface WaterLog {
    id: number;
    amount_ml: number;
    logged_at: string;
}

interface CalendarViewProps {
    logs: WaterLog[];
}

export default function CalendarView({ logs }: CalendarViewProps) {
    // Simple weekly view logic
    // For a "Google Calendar" style, we might want time slots on Y-axis.
    // But for water tracking, maybe just a list of logs per day in a week view is sufficient for MVP.
    // Let's do a simple 7-day view (Current Week).

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        return d;
    });

    const getLogsForDay = (date: Date) => {
        return logs.filter(log => {
            const logDate = new Date(log.logged_at);
            return (
                logDate.getDate() === date.getDate() &&
                logDate.getMonth() === date.getMonth() &&
                logDate.getFullYear() === date.getFullYear()
            );
        });
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">이번 주 기록</h3>
                <div className="flex gap-2">
                    {/* Controls could go here */}
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                    <div key={day} className={`text-sm font-medium ${i === 0 ? 'text-red-400' : 'text-gray-500'}`}>
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 h-64">
                {weekDays.map((day) => {
                    const dayLogs = getLogsForDay(day);
                    const totalAmount = dayLogs.reduce((sum, log) => sum + log.amount_ml, 0);
                    const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

                    return (
                        <div
                            key={day.toISOString()}
                            className={`rounded-2xl p-2 flex flex-col items-center gap-2 group transition-colors ${isToday ? 'bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-gray-50'
                                }`}
                        >
                            <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-gray-700'
                                }`}>
                                {day.getDate()}
                            </span>

                            {/* Visualization of logs as dots or a bar */}
                            <div className="flex-1 w-full flex flex-col-reverse gap-1 justify-end pb-2">
                                {dayLogs.map((log) => (
                                    <div
                                        key={log.id}
                                        className="w-full bg-blue-200 rounded-md text-[10px] text-blue-800 text-center py-0.5 truncate"
                                        title={`${new Date(log.logged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: ${log.amount_ml}ml`}
                                    >
                                        {log.amount_ml}
                                    </div>
                                ))}
                            </div>

                            {totalAmount > 0 && (
                                <div className="text-xs font-semibold text-blue-600 mt-auto">
                                    {totalAmount}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
