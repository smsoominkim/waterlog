'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface LogModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function LogModal({ isOpen, onClose, onSuccess }: LogModalProps) {
    const [amount, setAmount] = useState<number>(200);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // We can call the API route we created: /api/logs
            const response = await fetch('/api/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount_ml: amount,
                    logged_at: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create log');
            }

            setAmount(200); // Reset to default
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert('기록 저장에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">물 마시기 기록</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[200, 350, 500].map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => setAmount(preset)}
                                className={`py-3 px-4 rounded-xl border-2 transition-all duration-200 ${amount === preset
                                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                                        : 'border-gray-100 hover:border-blue-200 text-gray-600'
                                    }`}
                            >
                                {preset}ml
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            직접 입력 (ml)
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                            min="0"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? '저장 중...' : '기록하기'}
                    </button>
                </form>
            </div>
        </div>
    );
}
