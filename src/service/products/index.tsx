import request from "../config";
import { ProductRequest } from "@interfaces";

export const product: ProductRequest = {
  get_products: async (params) => request.get("/products/search", { params }),
  create_product: (data) => request.post("/products/create", data),
  delete_product: (id) => request.delete(`/products/delete/${id}`),
  update_product: (id: number, data: any) => request.patch(`/products/update/${id}`, data),
};
