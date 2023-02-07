import { UserRequest, UserResponse } from "./Type";
import * as MiniAPP from "../Miniapp";

export function requestUser(
  params: UserRequest,
  callback: Function
): UserResponse {
  return MiniAPP.requestUser(params, callback);
}
