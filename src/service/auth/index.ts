import request from "../config";
import { Request } from "@interfaces";

export const auth: Request = {
  sign_in: (data) => request.post("/admin/login", data),
  sign_up: (data) => request.post("/admin/create", data),
};
