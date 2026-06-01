import { OrderRecord } from '../types';

export function parseOrderText(text: string, date: string): Partial<OrderRecord> {
  const result: Partial<OrderRecord> = { date };

  const typeMatch = text.match(/⪩类型⪨：(.*?)(\n|$)/);
  if (typeMatch) result.type = typeMatch[1].trim();

  const paiDanMatch = text.match(/⪩派单⪨：(.*?)(\n|$)/);
  if (paiDanMatch) result.paiDan = paiDanMatch[1].trim();

  const daiPeiMatch = text.match(/⪩代陪⪨：(.*?)(\n|$)/);
  if (daiPeiMatch) result.daiPei = daiPeiMatch[1].trim();

  const totalAmountMatch = text.match(/⪩总金额⪨：([\d.]+)/);
  if (totalAmountMatch) result.totalAmount = parseFloat(totalAmountMatch[1]);

  const paiChouMatch = text.match(/⪩派抽⪨：([\d.]+)/);
  if (paiChouMatch) result.paiChou = parseFloat(paiChouMatch[1]);

  const tuanChouMatch = text.match(/⪩团抽⪨：([\d.]+)/);
  if (tuanChouMatch) result.tuanChou = parseFloat(tuanChouMatch[1]);

  const peiChouMatch = text.match(/⪩陪抽⪨：([\d.]+)/);
  if (peiChouMatch) result.peiChou = parseFloat(peiChouMatch[1]);

  return result;
}

export function isRecordValid(record: Partial<OrderRecord>): record is Omit<OrderRecord, 'id'> {
  return (
    record.type !== undefined &&
    record.paiDan !== undefined &&
    record.daiPei !== undefined &&
    record.totalAmount !== undefined &&
    record.paiChou !== undefined &&
    record.tuanChou !== undefined &&
    record.peiChou !== undefined &&
    record.date !== undefined
  );
}
