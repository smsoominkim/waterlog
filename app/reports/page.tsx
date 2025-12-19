'use client';

import React, { useEffect, useState } from 'react';
import ReportCard from '@/components/report/ReportCard';
import { useRouter } from 'next/navigation';

export default function ReportsPage() {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await fetch('/api/reports');
            if (res.ok) {
                const data = await res.json();
                setReports(data.reports);
            }
        } catch (error) {
            console.error('Failed to fetch reports', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateReport = async () => {
        setGenerating(true);
        try {
            const res = await fetch('/api/reports/generate', { method: 'POST' });
            const data = await res.json();

            if (!res.ok) {
                alert(data.message || data.error || '리포트 생성에 실패했습니다.');
                return;
            }

            // Add new report to the top of the list
            setReports([data.report, ...reports]);
        } catch (error) {
            console.error('Error generating report:', error);
            alert('리포트 생성 중 오류가 발생했습니다.');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">AI 건강 리포트</h1>
                    <p className="text-gray-500 mt-2">AI가 분석한 당신의 물 섭취 습관을 확인해보세요.</p>
                </div>
                <button
                    onClick={handleGenerateReport}
                    disabled={generating}
                    className={`px-6 py-3 rounded-xl font-medium text-white shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 flex items-center gap-2
            ${generating
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                        }`}
                >
                    {generating ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            분석 중...
                        </>
                    ) : (
                        <>
                            ✨ 새 리포트 생성
                        </>
                    )}
                </button>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-gray-100 h-64">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : reports.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg mb-4">아직 생성된 리포트가 없습니다.</p>
                    <p className="text-gray-400 text-sm">오른쪽 상단의 버튼을 눌러 첫 번째 리포트를 받아보세요!</p>
                </div>
            ) : (
                <div>
                    {reports.map((report) => (
                        <ReportCard key={report.id} report={report} />
                    ))}
                </div>
            )}
        </div>
    );
}
