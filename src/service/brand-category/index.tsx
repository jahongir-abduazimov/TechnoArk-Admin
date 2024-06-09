import request from "../config";
import { BrandCategoryRequest } from "@interfaces";

export const brand_category: BrandCategoryRequest = {
    get_brand_category: (params) => request.get("/brand-category/search", {params}),
    get_brand_category_by_brand: (id) => request.get(`/brand-category/brand/${id}?limit=1000&page=1`),
    create_brand_category: (data) => request.post("/brand-category/create", data),
    delete_brand_category: (id) => request.delete(`/brand-category/delete/${id}`),
    update_brand_category: (id, data) => request.patch(`/brand-category/update/${id}`, data),
};
