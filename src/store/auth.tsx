import { create } from "zustand";
import { AuthStore } from "@interfaces";
import { auth } from "@services";
import Notification from "@notification";
const useAuthStore = create<AuthStore>(() => ({
  getData: async (data: any) => {
    try {
      const response = await auth.sign_in(data);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  createData: async (data: any) => {
    try {
      const response = await auth.sign_up(data);
      return response;
    } catch (error:any) {
      if (typeof error.response.data.message === "string") {
        Notification({
          title: error.response.data.message,
          type: "error",
        })
      } else {
        error.response.data.message.map((item: any) => (
          Notification({
            title: item,
            type: "error",
          })
        ));
      }
    }
  }
}));

export default useAuthStore;
