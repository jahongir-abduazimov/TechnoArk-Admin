import request from "../config";
import { StockRequest } from "@interfaces";
export const stock:StockRequest = {
    get_stocks: async () => request.get("/stock"),
    get_stock_by_brand: (id) => request.get(`/stock/brand/${id}`),
    create_stock: (data) => request.post("/stock/create", data),
    delete_stock: (id) => request.delete(`/stock/delete/${id}`),
    update_stock: (id, data) => request.patch(`/stock/update/${id}`, data),
}