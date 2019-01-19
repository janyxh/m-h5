<template>
  <div>
    <div class="useInfo"><img :src="avatarUrl" alt="" srcset="">{{nickName}}</div>
    <div v-if="notInvited" class="apply-info">
      东北安琪拉 邀请您成为分销员
    </div>
  </div>
</template>

<script>
import { addAudience } from "@/api/audience";
export default {
  props: ["notInvited"],
  data() {
    return {
      nickName: "",
      avatarUrl: ""
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      // if (window.__wxjs_environment === "miniprogram") {
      if (localStorage.getItem("nickName")) {
        this.nickName = decodeURI(localStorage.getItem("nickName"));
        this.avatarUrl = localStorage.getItem("avatarUrl");

        this.addAudience();
      }
      // }
    },
    // 添加受众
    addAudience() {
      let params = {
        compId: decodeURI(localStorage.getItem("compId")),
        nickName: decodeURI(localStorage.getItem("nickName")),
        headPhotoUrl: localStorage.getItem("avatarUrl"),
        openId: decodeURI(localStorage.getItem("openid")),
        fromTo: 2 // 创自 1 服务号 2 小程序 3 手动创建 4 openId导入 ...
      };
      addAudience(params)
        .then()
        .catch(err => console.error(err));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/color";

.useInfo {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin: 6rem 0 1.5rem 0;
  }
}

.apply-info {
  padding: 2rem;
  color: $mop-text;
  font-size: 1.6rem;
  text-align: center;
}
</style>
