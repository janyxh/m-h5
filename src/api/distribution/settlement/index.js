/**
 * 结算中心
 */

import service from "@/api/fetch";
// import "@/mock/DetailsList/index";

//  ------------------------------------------------------  收支明细  --------------------------------------------------------------

// 获取收支明细列表

export const getDetailsList = params => {
  return service.post(`/user/getUserList`, params).then(res => res.data);
};
