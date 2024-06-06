import request from "../config";
import { BrandRequest } from "@interfaces";

export const brands: BrandRequest = {
  get_brands: (params) => request.get("/brand/search", {params}),
  create_brand: (data: any) => request.post("/brand", data),
  delete_brand: (id: string) => request.delete(`/brand/${id}`),
  update_brand: (id: string, data: any) => request.put(`/brand/update/${id}`, data),
};
