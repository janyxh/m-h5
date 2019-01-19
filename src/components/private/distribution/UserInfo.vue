<template>
  <section class="distributor">
    <!-- 用户信息 -->
    <router-link :to="{path:'/User',query:{id:salesmanId}}">
      <div class="user-info">
        <img :src="userInfo.avatarUrl" />
        <p>
          <span>{{userInfo.name}}</span>
          <span>{{userInfo.phone}}</span>
        </p>
      </div>
    </router-link>
    <!-- 用户佣金 -->
    <div class="commission">
      <i class="iconfont icon-help" @click="isShowExplain = true"></i>
      <span>当前累计收益（元）</span>
      <b>{{userInfo.cumulativeIncome}}</b>
      <span class="tip">包含已结佣{{userInfo.withdrawAmount}}元</span>
      <div class="status">
        <div>
          <span>待结算</span>
          <p>{{userInfo.pendingSettlement}}</p>
        </div>
        <div @click="toSettlement">
          <span>可提现</span>
          <p>{{userInfo.balance}}</p>
        </div>
      </div>
    </div>
    <!-- 累计 -->
    <div class="statistics">
      <router-link :to="{ path:'/MyCustomerList',query:{ id:salesmanId }}">
        <i></i>
        <span class="text-muted">累计客户</span>
        <p>{{userInfo.customerCount}}</p>
      </router-link>
      <router-link :to="{ path:'/MyInvitationList',query:{ id:salesmanId }}">
        <i></i>
        <span class="text-muted">累计邀请</span>
        <p>{{userInfo.invitationCount}}</p>
      </router-link>
      <router-link :to="{ path:'/MyOrderList',query:{ id:salesmanId }}">
        <i></i>
        <span class="text-muted">推广订单</span>
        <p>{{userInfo.popularizeOrderCount}}</p>
      </router-link>
    </div>
    <explain v-if="isShowExplain" :isShowExplain="isShowExplain" @onCancel="isShowExplain = false"></explain>
  </section>
</template>

<script>
import wx from "wx";
import explain from "@/components/private/distribution/Explain";
import { getCenterDetail } from "@/api/distribution/index.js";
import { getByOpenId } from "@/api/audience/index.js";
import { Toast } from "mint-ui";
export default {
  components: {
    explain
  },
  data() {
    return {
      isShowExplain: false, // 是否显示佣金说明弹出框
      salesmanId: "", // 分销员id
      userInfo: {}
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // -------------------------------------------------------------- 获取数据  -------------------------------------------------------------------
    // 获取用户信息 判断是否是分销员
    getUserInfo() {
      if (localStorage.getItem("nickName")) {
        this.userInfo.nickName = localStorage.getItem("nickName");
        this.userInfo.avatarUrl = localStorage.getItem("avatarUrl");
      } else {
        // 是否在小程序内
        if (window.__wxjs_environment) {
          let path = `../webview/webview`;
          wx.miniProgram.navigateTo({
            url: path + "?page=/Distribution"
          });
        }
      }
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        openId: localStorage.getItem("openid")
      };
      getByOpenId(params)
        .then(res => {
          let { respCode, message } = res;
          if (respCode === "0000") {
            this.salesmanId = res.data.salesmanId;
            this.$emit("onPushId", res.data.salesmanId);
            this.getCenterDetail(res.data.salesmanId);
            localStorage.setItem("id", res.data.salesmanId);
          } else {
            Toast({
              message: message,
              position: "bottom",
              duration: 2000
            });
          }
        })
        .catch(err => console.error(err));
    },
    getCenterDetail(salesmanId) {
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        salesmanId: salesmanId
      };
      getCenterDetail(params)
        .then(res => {
          let { respCode, message } = res;
          if (respCode === "0000") {
            const data = res.data;
            for (let i in data) {
              this.$set(this.userInfo, i, data[i]);
            }
            const number = this.userInfo.phone;
            const first = number.slice(0, 3);
            const last = number.slice(-4);
            this.$set(this.userInfo, "phone", first + "***" + last);
          } else {
            Toast({
              message: message,
              position: "bottom",
              duration: 2000
            });
          }
        })
        .catch(err => console.error(err));
    },
    // 去结算中心
    toSettlement() {
      this.$router.push({
        path: "/Settlement",
        query: {
          balance: this.userInfo.balance
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../assets/css/distribution/index";
</style>
