import { useState } from 'react';
import { useOrderStore } from '../hooks/useOrderStore';
import { EditModal } from './EditModal';
import { OrderRecord } from '../types';

export function RecordTable() {
  const records = useOrderStore((state) => state.getFilteredRecords());
  const deleteRecord = useOrderStore((state) => state.deleteRecord);
  const updateRecord = useOrderStore((state) => state.updateRecord);
  const [editingRecord, setEditingRecord] = useState<OrderRecord | null>(null);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-3">📋 订单记录</h2>

      {records.length === 0 ? (
        <p className="text-gray-500 text-center py-6 text-sm">暂无记录</p>
      ) : (
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-3 py-2 font-medium text-gray-700 whitespace-nowrap">日期</th>
                <th className="text-left px-3 py-2 font-medium text-gray-700 whitespace-nowrap">类型</th>
                <th className="text-left px-3 py-2 font-medium text-gray-700 whitespace-nowrap">派单</th>
                <th className="text-left px-3 py-2 font-medium text-gray-700 whitespace-nowrap">代陪</th>
                <th className="text-right px-3 py-2 font-medium text-gray-700 whitespace-nowrap">总金额</th>
                <th className="text-right px-3 py-2 font-medium text-gray-700 whitespace-nowrap">派抽</th>
                <th className="text-right px-3 py-2 font-medium text-gray-700 whitespace-nowrap">团抽</th>
                <th className="text-right px-3 py-2 font-medium text-gray-700 whitespace-nowrap">陪抽</th>
                <th className="text-center px-3 py-2 font-medium text-gray-700 whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr
                  key={record.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-3 py-2 whitespace-nowrap">{record.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{record.type}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{record.paiDan}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{record.daiPei}</td>
                  <td className="px-3 py-2 text-right font-medium whitespace-nowrap">
                    {record.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{record.paiChou.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{record.tuanChou.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{record.peiChou.toFixed(2)}</td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setEditingRecord(record)}
                        className="text-blue-500 hover:text-blue-700 transition-colors text-sm"
                      >
                        ✏️ 编辑
                      </button>
                      <button
                        onClick={() => deleteRecord(record.id)}
                        className="text-red-500 hover:text-red-700 transition-colors text-sm"
                      >
                        🗑️ 删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingRecord && (
        <EditModal
          record={editingRecord}
          onUpdate={updateRecord}
          onClose={() => setEditingRecord(null)}
        />
      )}
    </div>
  );
}
