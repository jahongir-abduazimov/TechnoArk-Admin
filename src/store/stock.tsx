import { create } from "zustand";
import { StockStore } from "@interfaces";
import { stock } from "@services";
import Notification from "@notification";

const useStockStore = create<StockStore>((set) => ({
  stocks: [],
  isLoading: false,
  totalCount: 1,
  getStocks: async (params) => {
    set({ isLoading: true });
    try {
      const response = await stock.get_stocks(params);
      if (response.status === 200) {
        set({
          totalCount: Math.ceil(response.data.data.count),
          stocks: response.data.data.stocks,
        });
      }
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      Notification({
        title: error.message,
        type: "error",
      });
    }
  },
  get_stock_by_brand: async (id) => {
    try {
      const response = await stock.get_stock_by_brand(id);
      if (response.status === 200) {
        set({ stocks: response.data.data });
      }
      return response;
    } catch (error: any) {
      Notification({
        title: error.message,
        type: "error",
      });
    }
  },
  createStock: async (data) => {
    try {
      const response = await stock.create_stock(data);
      if (response.status === 201) {
        set((state) => ({
          stocks: [...state.stocks, response.data.data],
        }));
        Notification({
          title: response.data.message,
          type: "success",
        });
      }
      return response;
    } catch (error: any) {
      Notification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  },
  deleteStock: async (id) => {
    try {
      const response = await stock.delete_stock(id);
      if (response.status === 200) {
        set((state) => ({
          stocks: state.stocks.filter((item: any) => item.id != id),
        }));
        Notification({
          title: response.data.message,
          type: "success",
        });
      }
      return response;
    } catch (error: any) {
      Notification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  },
  updateStock: async (id, data) => {
    try {
      const response = await stock.update_stock(id, data);
      if (response.status === 200) {
        set((state) => ({
          stocks: state.stocks.map((item: any) =>
            item.id === id ? response.data.data : item
          ),
        }));
        Notification({
          title: response.data.message,
          type: "success",
        });
      }
      return response;
    } catch (error: any) {
      Notification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  },
}));

export default useStockStore;
