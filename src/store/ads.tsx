import { create } from "zustand";
import { AdsStore } from "@interfaces";
import { ads } from "@services";
import Notification from "@notification";

const useAdsStore = create<AdsStore>((set) => ({
  ads: [],
  isLoading: false,
  getAds: async () => {
    set({ isLoading: true });
    try {
      const response = await ads.get_ads();
      console.log(response);
      if (response.status === 200) {
        set({
          ads: response.data.data,
        });
      }
      return response;
    } catch (error: any) {
      Notification({
        title: error.message,
        type: "error",
      });
    } finally {
        set({ isLoading: false });
    }
  },
  createAds: async (data) => {
    try {
      const response = await ads.create_ads(data);
      if (response.status === 201) {
        set((state) => ({
          ads: [...state.ads, response.data.data],
        }));
        Notification({
          title: "Banner created successfully",
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
  deleteAds: async (id) => {
    try {
      const response = await ads.delete_ads(id);
      if (response.status === 200) {
        set((state) => ({
          ads: state.ads.filter((ads) => ads.id!== id),
        }));
        Notification({
          title: "Banner deleted successfully",
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
  }
}));

export default useAdsStore;
