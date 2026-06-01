import { useMemo } from 'react';
import { useOrderStore } from '../hooks/useOrderStore';
import { Statistics as StatisticsType } from '../types';

export function Statistics() {
  const records = useOrderStore((state) => state.getFilteredRecords());
  const dateRange = useOrderStore((state) => state.dateRange);

  const stats = useMemo((): StatisticsType => {
    const totalRevenue = records.reduce(
      (sum, record) => sum + record.totalAmount,
      0
    );

    const paiDanMap = new Map<string, number>();
    const daiPeiMap = new Map<string, number>();

    records.forEach((record) => {
      paiDanMap.set(
        record.paiDan,
        (paiDanMap.get(record.paiDan) || 0) + record.totalAmount
      );
      daiPeiMap.set(
        record.daiPei,
        (daiPeiMap.get(record.daiPei) || 0) + record.totalAmount
      );
    });

    const paiDanRanking = Array.from(paiDanMap.entries())
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount);

    const daiPeiRanking = Array.from(daiPeiMap.entries())
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount);

    return { totalRevenue, paiDanRanking, daiPeiRanking };
  }, [records, dateRange]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-base font-bold text-gray-800 mb-2">💰 总营业额</h3>
        <p className="text-3xl font-bold text-purple-600">
          ¥{stats.totalRevenue.toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-base font-bold text-gray-800 mb-2">
          🏆 派单流水排名
        </h3>
        {stats.paiDanRanking.length === 0 ? (
          <p className="text-gray-500 text-sm">暂无数据</p>
        ) : (
          <ul className="space-y-1">
            {stats.paiDanRanking.slice(0, 5).map((item, index) => (
              <li
                key={item.name}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-700">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  {' '}{item.name}
                </span>
                <span className="font-medium text-gray-800">
                  ¥{item.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-base font-bold text-gray-800 mb-2">
          🏆 代陪流水排名
        </h3>
        {stats.daiPeiRanking.length === 0 ? (
          <p className="text-gray-500 text-sm">暂无数据</p>
        ) : (
          <ul className="space-y-1">
            {stats.daiPeiRanking.slice(0, 5).map((item, index) => (
              <li
                key={item.name}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-700">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  {' '}{item.name}
                </span>
                <span className="font-medium text-gray-800">
                  ¥{item.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
