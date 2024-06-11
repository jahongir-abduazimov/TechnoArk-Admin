import request from "../config";
import { BrandRequest } from "@interfaces";

export const brands: BrandRequest = {
  get_brands: (params) => request.get("/brand/search", {params}),
  get_brands_by_category: (id) => request.get(`/brand/category/${id}?limit=1000&page=1`),
  create_brand: (data: any) => request.post("/brand/create", data),
  delete_brand: (id: string) => request.delete(`/brand/delete/${id}`),
  update_brand: (id: string, data: any) => request.patch(`/brand/update/${id}`, data),
};
