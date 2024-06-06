import request from "../config";
import { CategoryRequest } from "@interfaces";

export const category: CategoryRequest = {
  get_categories: (params) => request.get("/category/search", {params}),
  create_category: (data: any) => request.post("/category", data),
  update_category: (id: number, data) => request.patch(`/category/${id}`, data),
  delete_category: (id: number) => request.delete(`/category/${id}`),
  get_subcategory: (id: any) => request.get(`/sub-category/${id}`),
};
