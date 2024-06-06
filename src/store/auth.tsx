import { create } from "zustand";
import { AuthStore } from "@interfaces";
import { auth } from "@services";
import Notification from "@notification";
const useAuthStore = create<AuthStore>((set) => ({
  data:[],
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
      console.log(error);
      Notification({
        title: error.response.data.message,
        type: "error",
      })
    }
  },
  getAdmin: async (id) => {
    try {
      const response = await auth.get_admin(id);
      console.log(response);
      if (response.status === 200) {
        set({ data: response.data.data });
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updateAdmin: async (id, data) => {
    try {
      const response = await auth.update_admin(id, data);
      console.log(response);
      // if (response.status === 200) {
      //   set({ data: response.data.data });
      // }
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}));

export default useAuthStore;
