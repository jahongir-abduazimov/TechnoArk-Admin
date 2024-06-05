import { create } from "zustand";
import { BrandStore } from "@interfaces";
import { brands } from "@services";
import Notification from "@notification";

const useBrandsStore = create<BrandStore>((set) => ({
  brand: [],
  isLoading: false,
  getBrands: async () => {
    set({ isLoading: true });
    try {
      const response = await brands.get_brands();
      if (response.status === 200) {
        set({ brand: response.data.brands });
      }
      set({ isLoading: false });
      return response;
    } catch (error: any) {
      set({ isLoading: false });
      Notification({
        title: error.message,
        type: "error",
      });
    }
  },
  createBrand: async (data) => {
    try {
      const response = await brands.create_brand(data);
      if (response.status === 201) {
        set((state) => ({
          brand: [...state.brand, response.data.brand],
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
  deleteBrand: async (id) => {
    try {
      const response = await brands.delete_brand(id);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        set((state) => ({
          brand: state.brand.filter((item: any) => item.id != id),
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
  updateBrand: async (id, data) => {
    try {
      const response = await brands.update_brand(id, data);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        set((state) => ({
          brand: state.brand.map((item: any) =>
            item.id === id? response.data.brand : item
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
  }
}));

export default useBrandsStore;
