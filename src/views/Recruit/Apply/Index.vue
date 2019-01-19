<template>
  <main>
    <!-- 系统有用户手机号 -->
    <had-number v-if="hadPhone" :phone="phone" @addSalesmanInfo="addSalesmanInfo"></had-number>
    <!-- 系统没有用户手机号 -->
    <dont-had-number v-else-if="!hadPhone" @addSalesmanInfo="addSalesmanInfo"></dont-had-number>
  </main>
</template>

<script>
import HadNumber from "@/components/private/recruit/apply/HadNumber";
import DontHadNumber from "@/components/private/recruit/apply/DontHadNumber";
import { getByOpenId } from "@/api/audience/index.js";
import { addSalesmanInfo } from "@/api/distribution/index.js";
import { Toast } from "mint-ui";
import { getQueryString } from "@/mixins";
export default {
  components: {
    "had-number": HadNumber,
    "dont-had-number": DontHadNumber
  },
  data() {
    return {
      // 数商-营销系统是否拥有该用户的手机号
      hadPhone: false,
      phone: "",
      audienceId: ""
    };
  },
  created() {
    document.title = "立即成为分销员";
    this.getUserInfo();
    // 是否是由小程序的手机号授权跳入
    const hadAuth = getQueryString("number");
    if (hadAuth) {
      this.phone = hadAuth;
      this.hadPhone = true;
    }
  },
  methods: {
    // -------------------------------------------------------------- 获取数据  -------------------------------------------------------------------
    // 获取用户信息
    getUserInfo() {
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        openId: localStorage.getItem("openid")
      };
      getByOpenId(params)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.audienceId = res.data.id;
            if (res.data.phone) {
              this.phone = res.data.phone;
              this.hadPhone = true;
            }
          }
        })
        .catch(err => console.error(err));
    },
    // -------------------------------------------------------------- 添加分销员  -------------------------------------------------------------------
    // 添加分销员
    addSalesmanInfo(params) {
      params.audienceId = this.audienceId;
      addSalesmanInfo(params)
        .then(res => {
          let { respCode, message } = res;
          if (respCode === "0000") {
            Toast({
              message: message,
              position: "bottom",
              duration: 2000
            });
            this.$router.push({
              path: "/Result",
              query: {
                status: res.data.status
              }
            });
          }
        })
        .catch(err => console.error(err));
    }
  }
};
</script>
