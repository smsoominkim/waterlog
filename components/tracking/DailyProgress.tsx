interface DailyProgressProps {
    currentAmount: number;
    goalAmount: number; // e.g. 2000ml
}

export default function DailyProgress({ currentAmount, goalAmount }: DailyProgressProps) {
    const percentage = Math.min((currentAmount / goalAmount) * 100, 100);
    const remaining = Math.max(goalAmount - currentAmount, 0);

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">오늘의 목표</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-extrabold text-blue-900">
                            {currentAmount}
                            <span className="text-lg font-medium text-gray-400 ml-1">ml</span>
                        </h3>
                        <span className="text-gray-300 text-xl">/</span>
                        <span className="text-gray-400 text-xl font-medium">{goalAmount}ml</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`text-sm font-bold px-3 py-1 rounded-full ${percentage >= 100 ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'
                        }`}>
                        {Math.round(percentage)}% 달성
                    </div>
                </div>
            </div>

            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
                <p>
                    👍 잘하고 있어요!
                </p>
                {remaining > 0 ? (
                    <p>목표까지 <span className="font-bold text-blue-600">{remaining}ml</span> 남았어요</p>
                ) : (
                    <p className="text-green-600 font-bold">목표 달성! 🎉</p>
                )}
            </div>
        </div>
    );
}
