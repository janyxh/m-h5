/**
 * 受众接口
 */

import service from "@/api/fetch";
// import service from "../api";

//  ------------------------------------------------------  受众  --------------------------------------------------------------

// 添加受众
export const addAudience = params => {
  return service.post(`/audience/add`, params).then(res => res.data);
};

// 获取用户信息
export const getByOpenId = params => {
  return service.post(`/audience/getByOpenId`, params).then(res => res.data);
};
