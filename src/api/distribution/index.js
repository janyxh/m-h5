/**
 * 分销员信息
 */

import service from "@/api/fetch";
// import service from "../api";

//  ------------------------------------------------------  添加  --------------------------------------------------------------

// 添加分销员
export const addSalesmanInfo = params => {
  return service
    .post(`/salesman/addSalesmanInfo`, params)
    .then(res => res.data);
};

//  ------------------------------------------------------  分销中心  --------------------------------------------------------------

// 获取分销中心详情
export const getCenterDetail = params => {
  return service
    .post(`/salesman/getCenterDetail`, params)
    .then(res => res.data);
};

//  ------------------------------------------------------  个人资料  --------------------------------------------------------------

// 获取分销员详情
export const getSalesmanInfo = params => {
  return service
    .post(`/salesman/getSalesmanInfo`, params)
    .then(res => res.data);
};

// 更新分销员信息
export const updateSalesmanInfo = params => {
  return service
    .post(`/salesman/updateSalesmanInfo`, params)
    .then(res => res.data);
};

//  ------------------------------------------------------  我的客户  --------------------------------------------------------------

// 我的客户
export const getCustomerlist = params => {
  return service.post(`/salesman/myCustomerPage`, params).then(res => res.data);
};
// 我的客户详情
// export const getCustomerlist = params => {
//   return service.post(`/salesman/myCustomerPage`, params).then(res => res.data);
// };

//  ------------------------------------------------------  我的邀请  --------------------------------------------------------------

// 我的邀请
export const getInvitationlist = params => {
  return service.post(`/salesman/myInvite`, params).then(res => res.data);
};

// 我的邀请详情
export const getInvitationDetails = params => {
  return service.post(`/salesman/myInviteDetail`, params).then(res => res.data);
};

//  ------------------------------------------------------  我的订单  --------------------------------------------------------------

// 我的推广订单
export const getOrderlist = params => {
  return service
    .post(`/salesman/pagePopularizeOrder`, params)
    .then(res => res.data);
};

//  ------------------------------------------------------  商品中心  --------------------------------------------------------------

// 商品列表
export const getGoodsList = params => {
  return service
    .post(`/salesman/pageSalesmanCommodity`, params)
    .then(res => res.data);
};

//  ------------------------------------------------------  结算中心  --------------------------------------------------------------

// 收支明细
export const getDetailsList = params => {
  return service.post(`/salesman/billDetail`, params).then(res => res.data);
};

// 提现记录
export const withdrawRecord = params => {
  return service.post(`/salesman/withdrawRecord`, params).then(res => res.data);
};
