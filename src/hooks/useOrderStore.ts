import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrderRecord, DateRange } from '../types';

interface OrderStore {
  records: OrderRecord[];
  dateRange: DateRange;
  addRecord: (record: Omit<OrderRecord, 'id'>) => void;
  updateRecord: (id: string, record: Partial<OrderRecord>) => void;
  deleteRecord: (id: string) => void;
  setDateRange: (range: DateRange) => void;
  getFilteredRecords: () => OrderRecord[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const formatDate = (date: Date) => date.toISOString().split('T')[0];

      return {
        records: [],
        dateRange: {
          startDate: formatDate(firstDay),
          endDate: formatDate(today),
        },
        addRecord: (record) => set((state) => ({
          records: [...state.records, { ...record, id: crypto.randomUUID() }],
        })),
        updateRecord: (id, record) => set((state) => ({
          records: state.records.map((r) =>
            r.id === id ? { ...r, ...record } : r
          ),
        })),
        deleteRecord: (id) => set((state) => ({
          records: state.records.filter((r) => r.id !== id),
        })),
        setDateRange: (range) => set({ dateRange: range }),
        getFilteredRecords: () => {
          const { records, dateRange } = get();
          return records.filter((r) => {
            return r.date >= dateRange.startDate && r.date <= dateRange.endDate;
          }).sort((a, b) => b.date.localeCompare(a.date));
        },
      };
    },
    {
      name: 'yuanqing-orders',
    }
  )
);
