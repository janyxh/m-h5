/**
 * 商品中心
 */

import service from "@/api/fetch";
// import "@/mock/Goods/index";

//  ------------------------------------------------------  收支明细  --------------------------------------------------------------

// 获取收支明细列表

export const getGoodsList = params => {
  return service.post(`/goodslist`, params).then(res => res.data);
};
