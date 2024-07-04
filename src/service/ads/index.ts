import request from "../config";
import { AdsRequest } from "@interfaces";
export const ads:AdsRequest = {
    get_ads: () => request.get("/ads"),
    create_ads: (data) => request.post("/ads/create", data),
    delete_ads: (id) => request.delete(`/ads/delete/${id}`),
    // update_ads: (id, data) => request.patch(`/ads/update/${id}`, data),
}