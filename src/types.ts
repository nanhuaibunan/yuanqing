export interface OrderRecord {
  id: string;
  type: string;
  paiDan: string;
  daiPei: string;
  totalAmount: number;
  paiChou: number;
  tuanChou: number;
  peiChou: number;
  date: string;
}

export interface Statistics {
  totalRevenue: number;
  paiDanRanking: { name: string; amount: number }[];
  daiPeiRanking: { name: string; amount: number }[];
}

export interface DateRange {
  startDate: string;
  endDate: string;
}
