/**
 * 累计邀请
 */

import service from "@/api/fetch";
// import "@/mock/MyInvitation/index";

//  ------------------------------------------------------  累计邀请  --------------------------------------------------------------

// 获取累计邀请列表

export const getInvitationlist = params => {
  return service.post(`/invitationlist`, params).then(res => res.data);
};

// 获取累计邀请详情

export const getInvitationDetails = params => {
  return service.post(`/invitationDetails`, params).then(res => res.data);
};
