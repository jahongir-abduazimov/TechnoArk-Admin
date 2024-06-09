import request from "../config";
import { CategoryRequest } from "@interfaces";

export const category: CategoryRequest = {
  get_categories: (params) => request.get("/category/search", {params}),
  create_category: (data) => request.post("/category/create", data),
  update_category: (id, data) => request.patch(`/category/update/${id}`, data),
  delete_category: (id) => request.delete(`/category/delete/${id}`),
  get_subcategory: (id, params) => request.get(`/sub-category/search/${id}`, {params}),
  create_subcategory: (data) => request.post("/sub-category/create", data),
  delete_subcategory: (id) => request.delete(`/sub-category/delete/${id}`),
  update_subcategory: (id, data) => request.patch(`/sub-category/update/${id}`, data),
};
