import { useState } from 'react';
import { OrderRecord } from '../types';

interface EditModalProps {
  record: OrderRecord;
  onUpdate: (id: string, data: Partial<OrderRecord>) => void;
  onClose: () => void;
}

export function EditModal({ record, onUpdate, onClose }: EditModalProps) {
  const [formData, setFormData] = useState({
    date: record.date,
    type: record.type,
    paiDan: record.paiDan,
    daiPei: record.daiPei,
    totalAmount: record.totalAmount.toString(),
    paiChou: record.paiChou.toString(),
    tuanChou: record.tuanChou.toString(),
    peiChou: record.peiChou.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(record.id, {
      ...formData,
      totalAmount: parseFloat(formData.totalAmount) || 0,
      paiChou: parseFloat(formData.paiChou) || 0,
      tuanChou: parseFloat(formData.tuanChou) || 0,
      peiChou: parseFloat(formData.peiChou) || 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">✏️ 编辑订单</h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors text-xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">派单</label>
              <input
                type="text"
                value={formData.paiDan}
                onChange={(e) => setFormData({ ...formData, paiDan: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">代陪</label>
              <input
                type="text"
                value={formData.daiPei}
                onChange={(e) => setFormData({ ...formData, daiPei: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">总金额</label>
              <input
                type="number"
                step="0.01"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">派抽</label>
              <input
                type="number"
                step="0.01"
                value={formData.paiChou}
                onChange={(e) => setFormData({ ...formData, paiChou: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">团抽</label>
              <input
                type="number"
                step="0.01"
                value={formData.tuanChou}
                onChange={(e) => setFormData({ ...formData, tuanChou: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">陪抽</label>
              <input
                type="number"
                step="0.01"
                value={formData.peiChou}
                onChange={(e) => setFormData({ ...formData, peiChou: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
            >
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
