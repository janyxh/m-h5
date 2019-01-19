/**
 * 累计推广订单
 */

import service from "@/api/fetch";
// import "@/mock/MyOrder/index";

//  ------------------------------------------------------  累计推广订单  --------------------------------------------------------------

// 获取累计推广订单列表

export const getOrderlist = params => {
  return service.post(`/orderlist`, params).then(res => res.data);
};

// // 获取累计推广订单详情

// export const getInvitationDetails = params => {
//   return axios.post(`/invitationDetails`, params).then(res => res.data);
// };
