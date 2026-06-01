import { useOrderStore } from '../hooks/useOrderStore';

export function DateSelector() {
  const { dateRange, setDateRange } = useOrderStore();

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center bg-white p-3 rounded-lg shadow mb-6">
      <div className="flex items-center gap-2">
        <label className="font-medium text-gray-700 text-sm">开始日期:</label>
        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, startDate: e.target.value })
          }
          className="border rounded px-2 py-1.5 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="font-medium text-gray-700 text-sm">结束日期:</label>
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, endDate: e.target.value })
          }
          className="border rounded px-2 py-1.5 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
        />
      </div>
    </div>
  );
}
