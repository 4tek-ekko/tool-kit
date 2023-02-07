import { MiniData } from "./MiniType";
import { UserRequest } from "./User/Type";

let supperData: MiniData;
export const init = (params: MiniData) => {
  supperData = params;
};

export const requestUser = (params: UserRequest, callback: Function) => {
  return supperData?.callback?.call("user", params, callback);
};
