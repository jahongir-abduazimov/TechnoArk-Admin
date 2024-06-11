import { create } from "zustand";
import { ProductDetailStore } from "@interfaces";
import { productDetail } from "@services";
import Notification from "@notification";

const useProductDetailStore = create<ProductDetailStore>(() => ({
  createProductDetail: async (data) => {
    try {
      const response = await productDetail.create_product_detail(data);
      if (response.status === 201) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        return response;
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  deleteProductDetail: async (id) => {
    try {
      const response = await productDetail.delete_product_detail(id);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        return response;
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  updateProductDetail: async (id, data) => {
    try {
      const response = await productDetail.update_product_detail(id, data);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        return response;
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}));

export default useProductDetailStore;
