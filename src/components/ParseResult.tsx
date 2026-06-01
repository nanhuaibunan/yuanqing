import { useState, useEffect } from 'react';
import { OrderRecord } from '../types';
import { useOrderStore } from '../hooks/useOrderStore';

interface ParseResultProps {
  record: Omit<OrderRecord, 'id'> | null;
  onClear: () => void;
}

export function ParseResult({ record, onClear }: ParseResultProps) {
  const { addRecord } = useOrderStore();
  const [editableRecord, setEditableRecord] = useState<
    Omit<OrderRecord, 'id'> | null
  >(null);

  useEffect(() => {
    setEditableRecord(record ? { ...record } : null);
  }, [record]);

  if (!editableRecord) return null;

  const handleAdd = () => {
    if (editableRecord) {
      addRecord(editableRecord);
      onClear();
    }
  };

  const updateField = (
    field: keyof Omit<OrderRecord, 'id'>,
    value: string | number
  ) => {
    setEditableRecord((prev) =>
      prev ? { ...prev, [field]: value } : null
    );
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg shadow mb-6 border-2 border-purple-200">
      <h2 className="text-lg font-bold text-gray-800 mb-3">✨ 解析结果</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-white p-2 rounded shadow-sm">
          <label className="text-xs text-gray-500 block mb-1">类型</label>
          <input
            type="text"
            value={editableRecord.type}
            onChange={(e) => updateField('type', e.target.value)}
            className="w-full border-none focus:ring-0 text-gray-800 font-medium text-sm"
          />
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <label className="text-xs text-gray-500 block mb-1">日期</label>
          <input
            type="date"
            value={editableRecord.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="w-full border-none focus:ring-0 text-gray-800 font-medium text-sm"
          />
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <label className="text-xs text-gray-500 block mb-1">派单</label>
          <input
            type="text"
            value={editableRecord.paiDan}
            onChange={(e) => updateField('paiDan', e.target.value)}
            className="w-full border-none focus:ring-0 text-gray-800 font-medium text-sm"
          />
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <label className="text-xs text-gray-500 block mb-1">代陪</label>
          <input
            type="text"
            value={editableRecord.daiPei}
            onChange={(e) => updateField('daiPei', e.target.value)}
            className="w-full border-none focus:ring-0 text-gray-800 font-medium text-sm"
          />
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <label className="text-xs text-gray-500 block mb-1">总金额</label>
          <input
            type="number"
            step="0.01"
            value={editableRecord.totalAmount}
            onChange={(e) =>
              updateField('totalAmount', parseFloat(e.target.value) || 0)
            }
            className="w-full border-none focus:ring-0 text-gray-800 font-medium text-sm"
          />
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <label className="text-xs text-gray-500 block mb-1">派抽</label>
          <input
            type="number"
            step="0.01"
            value={editableRecord.paiChou}
            onChange={(e) =>
              updateField('paiChou', parseFloat(e.target.value) || 0)
            }
            className="w-full border-none focus:ring-0 text-gray-800 font-medium text-sm"
          />
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <label className="text-xs text-gray-500 block mb-1">团抽</label>
          <input
            type="number"
            step="0.01"
            value={editableRecord.tuanChou}
            onChange={(e) =>
              updateField('tuanChou', parseFloat(e.target.value) || 0)
            }
            className="w-full border-none focus:ring-0 text-gray-800 font-medium text-sm"
          />
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <label className="text-xs text-gray-500 block mb-1">陪抽</label>
          <input
            type="number"
            step="0.01"
            value={editableRecord.peiChou}
            onChange={(e) =>
              updateField('peiChou', parseFloat(e.target.value) || 0)
            }
            className="w-full border-none focus:ring-0 text-gray-800 font-medium text-sm"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
        >
          ✅ 添加记录
        </button>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-400 transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );
}
