import request from "../config";
import { ProductRequest } from "@interfaces";

export const product: ProductRequest = {
  get_products: (params) => request.get("/products/search", { params }),
  get_product_by_id: (id) => request.get(`/products/${id}`),
  create_product: (data) => request.post("/products/create", data),
  delete_product: (id) => request.delete(`/products/delete/${id}`),
  update_product: (id: number, data: any) => request.patch(`/products/update/${id}`, data),
};
