import { create } from "zustand";
import { CategoryStore } from "@interfaces";
import { category } from "@services";
import Notification from "@notification";

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  subCategories: [],
  isLoading: false,
  getCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await category.get_categories();
      if (response.status === 200) {
        set({ categories: response.data.categories });
      }
      set({ isLoading: false });
      return response;
    } catch (error:any) {
      Notification({
        title: error.message,
        type: "error"
      })
    }
  },
  createCategory: async (data: any) => {
    try {
      const response = await category.create_category(data);
      if (response.status === 201) {
        set((state) => ({
          categories: [...state.categories, response?.data.categories],
        }));
        Notification({
          title: response.data.message,
          type: "success",
        });
        return response;
      }
      return response;
    } catch (error:any) {
      console.log(error);
      Notification({
        title: "Somthing went wrong!",
        type: "error",
      });
    }
  },
  updateCategory: async (id: number, data) => {
    try {
      const response = await category.update_category(id, data);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
      }
      return response;
    } catch (error) {
      Notification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  },
  deleteCategory: async (id: any) => {
    try {
      const response = await category.delete_category(id);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        set((state) => ({
          categories: state.categories.filter((item: any) => item.id != id),
          subCategories:state.subCategories.filter((item: any) => item.id != id),
        }));
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  getSubCategory: async (id: any) => {
    set({ isLoading: true });
    try {
      const response = await category.get_subcategory(id);
      if (response.status === 200) {
        set({ subCategories: response.data.categories });
      }
      set({ isLoading: false });
      return response;
    } catch (error:any) {
      Notification({
        title: error.message,
        type: "error",
      });
    }
  }
}));

export default useCategoryStore;
