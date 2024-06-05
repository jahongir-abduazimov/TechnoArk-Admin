import request from "../config";
import { BrandRequest } from "@interfaces";

export const brands: BrandRequest = {
  get_brands: () => request.get("/brand/get-all/q"),
  create_brand: (data: any) => request.post("/brand/create", data),
  delete_brand: (id: string) => request.delete(`/brand/delete/${id}`),
  update_brand: (id: string, data: any) => request.put(`/brand/update/${id}`, data),
};
