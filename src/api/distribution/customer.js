/**
 * 累计客户
 */

import service from "@/api/fetch";
// import "@/mock/MyCustomer/index";

//  ------------------------------------------------------  累计客户  --------------------------------------------------------------

// 获取累计客户列表

export const getCustomerlist = params => {
  return service.post(`/customerlist`, params).then(res => res.data);
};
