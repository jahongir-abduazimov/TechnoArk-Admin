import request from "../config";
import { CategoryRequest } from "@interfaces";

export const category: CategoryRequest = {
  get_categories: () => request.get("/category/get-all-category/q?"),
  create_category: (data: any) => request.post("category/create", data),
  update_category: (id: number, data) => request.put(`/category/update/${id}`, data),
  delete_category: (id: number) => request.delete(`/category/delete/${id}`),
  get_subcategory: (id: any) => request.get(`/category/get-all-subcategory/${id}/q`),
};
