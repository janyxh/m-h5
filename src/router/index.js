import Vue from "vue";
import Router from "vue-router";
import { routes } from "./routes";
import wx from "wx";

import { getQueryString } from "@/mixins/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});

router.beforeEach((to, from, next) => {
  // 是否登录
  const hasLogin =
    getQueryString("nickName") || localStorage.getItem("nickName");

  if (!hasLogin && to.path !== "/" && to.path !== "/Goods") {
    // 未授权登录
    console.log("未授权登录");
    let path = `../getUserInfo/getUserInfo?page=${to.path}`;
    wx.miniProgram.navigateTo({
      url: path
    });
    next();
  } else if (hasLogin && !localStorage.getItem("nickName")) {
    // 已登录 && 本地存储未保存
    let nickName = decodeURIComponent(getQueryString("nickName"));
    let avatarUrl = decodeURIComponent(getQueryString("avatarUrl"));
    localStorage.setItem("nickName", nickName);
    localStorage.setItem("avatarUrl", avatarUrl);
    next();
  }

  // 是否有openid
  const hasOpenid = getQueryString("openid") || localStorage.getItem("openid");
  if (hasOpenid && !localStorage.getItem("openid")) {
    let openid = decodeURIComponent(getQueryString("openid"));
    localStorage.setItem("openid", openid);
    next();
  }

  // 是否有compId
  const hasCompId = getQueryString("compId") || localStorage.getItem("compId");
  if (hasCompId && !localStorage.getItem("compId")) {
    let compId = decodeURIComponent(getQueryString("compId"));
    let contentId = decodeURIComponent(getQueryString("contentId"));
    localStorage.setItem("compId", compId);
    localStorage.setItem("contentId", contentId);
    next();
  }
  next();
});

export default router;
