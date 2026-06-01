import { useState } from 'react';
import { parseOrderText, isRecordValid } from '../utils/parser';
import { useOrderStore } from '../hooks/useOrderStore';

export function InputArea() {
  const [text, setText] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const addRecord = useOrderStore((state) => state.addRecord);

  const handleParse = () => {
    setError(null);
    setSuccess(null);
    const parsed = parseOrderText(text, selectedDate);

    if (!isRecordValid(parsed)) {
      setError('解析失败，请检查结单表格式是否正确');
      return;
    }

    addRecord(parsed);
    setText('');
    setSuccess('✓ 解析成功，已添加记录！');
    
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📝 输入结单表</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          订单日期:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          粘贴结单表文本:
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder=".·:*¨¨*:·.⏜♡‎ﻌﻌ♡⏜˖.·:*¨¨*:·.
🦋 『鸢青』结单表 🦋
╰︶˖⁺. ༶ ❤︎ ⋆˙⊹ ෆ ⊹˙⋆❤︎ ༶ .⁺˖︶╯
⪩类型⪨：代肝
⪩派单⪨：江瓷
⪩代陪⪨：染卿
⪩总金额⪨：10
⪩派抽⪨：1
⪩团抽⪨：0.4
⪩陪抽⪨：8.6ᘏ⑅ᘏ"
          rows={8}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none font-mono text-sm"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-700 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}

      <button
        onClick={handleParse}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity"
      >
        ✨ 解析结单表
      </button>
    </div>
  );
}
