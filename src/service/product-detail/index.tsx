import request from "../config";
import { ProductDetailRequest } from "@interfaces";

export const productDetail:ProductDetailRequest = {
    create_product_detail: (data) => request.post("/product-detail/create", data),
    delete_product_detail: (id) => request.delete(`/product-detail/delete/${id}`),
    update_product_detail: (id, data) => request.patch(`/product-detail/update/${id}`, data)
}