import { useOrderStore } from '../hooks/useOrderStore';

export function ExportButton() {
  const getFilteredRecords = useOrderStore((state) => state.getFilteredRecords);
  const dateRange = useOrderStore((state) => state.dateRange);

  const handleExport = () => {
    const records = getFilteredRecords();

    if (records.length === 0) {
      alert('没有可导出的记录');
      return;
    }

    const headers = [
      '日期',
      '类型',
      '派单',
      '代陪',
      '总金额',
      '派抽',
      '团抽',
      '陪抽',
    ];

    const rows = records.map((record) => [
      record.date,
      record.type,
      record.paiDan,
      record.daiPei,
      record.totalAmount.toFixed(2),
      record.paiChou.toFixed(2),
      record.tuanChou.toFixed(2),
      record.peiChou.toFixed(2),
    ]);

    const csvContent =
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `结单表_${dateRange.startDate}_${dateRange.endDate}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
    >
      📥 导出 CSV
    </button>
  );
}
