import { create } from "zustand";
import { AuthStore } from "@interfaces";
import { auth } from "@services";
const useAuthStore = create<AuthStore>(() => ({
  getData: async (data: any) => {
    try {
      const response = await auth.sign_in(data);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAuthStore;
