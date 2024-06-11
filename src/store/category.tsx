import { create } from "zustand";
import { CategoryStore } from "@interfaces";
import { category } from "@services";
import Notification from "@notification";

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  subCategories: [],
  isLoading: false,
  totalCount: 1,
  totalSubCategories: 1,
  getCategories: async (params) => {
    set({ isLoading: true });
    try {
      const response = await category.get_categories(params);
      if (response.status === 200) {
        set({
          totalCount: Math.ceil(response.data.data.count),
          categories: response.data.data.categories,
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
    }
  },
  createCategory: async (data: any) => {
    try {
      const response = await category.create_category(data);
      if (response.status === 201) {
        set((state) => ({
          categories: [...state.categories, response?.data.data],
        }));
        Notification({
          title: response.data.message,
          type: "success",
        });
        return response;
      }
      return response;
    } catch (error: any) {
      Notification({
        title: error.response.data.message,
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
        set((state) => ({
          categories: state.categories.map((item: any) =>
            item.id === id ? response.data.data : item
          ),
        }));
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
        }));
      }
      return response;
    } catch (error) {
      Notification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  },
  getSubCategory: async (id, parmas) => {
    set({ isLoading: true });
    try {
      const response = await category.get_subcategory(id, parmas);
      if (response.status === 200) {
        set({
          totalSubCategories: Math.ceil(response.data.data.count),
          subCategories: response.data.data.subcategories,
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
    }
  },
  createSubCategory: async (data) => {
    try {
      const response = await category.create_subcategory(data);
      if (response.status === 201) {
        set((state) => ({
          subCategories: [...state.subCategories, response.data.data],
        }));
        Notification({
          title: response.data.message,
          type: "success",
        });
      }
      return response;
    } catch (error: any) {
      Notification({
        title: error.response.data.message,
        type: "error",
      });
    }
  },
  deleteSubCategory: async (id: number) => {
    try {
      const response = await category.delete_subcategory(id);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        set((state) => ({
          subCategories: state.subCategories.filter(
            (item: any) => item.id != id
          ),
        }));
      }
      return response;
    } catch (error) {
      Notification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  },
  updateSubCategory: async (id: number, data) => {
    try {
      const response = await category.update_subcategory(id, data);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        set((state) => ({
          subCategories: state.subCategories.map((item: any) =>
            item.id === id ? response.data.data : item
          ),
        }));
      }
      return response;
    } catch (error) {
      Notification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  },
}));

export default useCategoryStore;
