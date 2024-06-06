import request from "../config";
import { BrandCategoryRequest } from "@interfaces";

export const brand_category: BrandCategoryRequest = {
    get_brand_category: (params) => request.get("/brand-category/search", {params}),
    create_brand_category: (data) => request.post("/brand-category", data),
    delete_brand_category: (id) => request.delete(`/brand-category/${id}`),
    update_brand_category: (id, data) => request.patch(`/brand-category/${id}`, data),
};
