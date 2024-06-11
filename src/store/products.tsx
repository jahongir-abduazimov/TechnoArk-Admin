import { create } from "zustand";
import { ProductStore } from "@interfaces";
import { product } from "@services";
import Notification from "@notification";

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  totalCount: 1,
  getProducts: async (params) => {
    set({ isLoading: true });
    try {
      const response = await product.get_products(params);
      if (response.status === 200) {
        set({
          totalCount: Math.ceil(response.data.data.count),
          products: response.data.data.products,
        });
      }
      set({ isLoading: false });
      return response;
    } catch (error: any) {
      set({ isLoading: false });
      Notification({
        title: error.message,
        type: "error",
      });
      console.error(error);
    }
  },
  getProductById: async (id) => {
    try {
      const response = await product.get_product_by_id(id);
      return response;
    } catch (error: any) {
      Notification({
        title: error.message,
        type: "error",
      });
    }
  },
  createProduct: async (data) => {
    try {
      const response = await product.create_product(data);
      if (response.status === 201) {
        set((state) => ({
          products: [...state.products, response.data.data],
        }));
        Notification({
          title: response.data.message,
          type: "success",
        });
      }
      return response;
    } catch (error: any) {
      Notification({
        title: error.message,
        type: "error",
      });
    }
  },
  deleteProduct: async (id: number) => {
    try {
      const response = await product.delete_product(id);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        set((state) => ({
          products: state.products.filter((item: any) => item.id != id),
        }));
      }
      return response;
    } catch (error: any) {
      Notification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  },
  updateProduct: async (id, data) => {
    try {
      const response = await product.update_product(id, data);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        set((state) => ({
          products: state.products.map((item: any) =>
            item.id === id ? response.data.data : item
          ),
        }));
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

export default useProductStore;
