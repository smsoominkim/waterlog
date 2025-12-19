import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

interface Report {
    id: number;
    content: string;
    period_type: string;
    start_date: string;
    end_date: string;
    created_at: string;
}

interface ReportCardProps {
    report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">
                        {report.period_type === 'WEEKLY' ? '주간 건강 리포트' : '일간 건강 리포트'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        분석 기간: {format(new Date(report.start_date), 'yyyy.MM.dd')} - {format(new Date(report.end_date), 'yyyy.MM.dd')}
                    </p>
                </div>
                <div className="text-xs text-gray-400">
                    생성일: {format(new Date(report.created_at), 'yyyy.MM.dd HH:mm')}
                </div>
            </div>

            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => <h1 className="text-xl font-bold mt-4 mb-2 text-blue-600" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-lg font-bold mt-4 mb-2 text-gray-800" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-md font-bold mt-3 mb-1 text-gray-800" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-semibold text-blue-700" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
                        li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-3" {...props} />,
                    }}
                >
                    {report.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
