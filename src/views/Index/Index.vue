<template>
  <div class="index">
    <header>江湖招募令</header>
    <main class="recruit">
      <div class="userInfo">
        <img src="@/assets/images/recruit/home_btn_head.png" alt class="head">
        <div>
          <p>东北安琪拉</p>
          <span>邀请您成为分销员</span>
          <!-- <p>{{url}}</p> -->
        </div>
      </div>
      <div class="activities">
        <iframe :src="urlContent" frameborder="0" class="iframe-content"></iframe>
        <footer>
          <mt-button v-if="isResponse &&( !isDistributor || isDistributor && status !==  1 )" type="primary" class="btn-large"
            @click="whereGo">立即成为分销员</mt-button>
          <div v-else-if="isResponse && isDistributor" class="btns">
            <mt-button class="btn-large info" @click="toInvitation">邀请好友齐推广</mt-button>
            <mt-button type="primary" class="btn-large" @click="toDistribution">进入分销中心</mt-button>
          </div>
        </footer>
      </div>
    </main>
    <!-- 佣金小图标 -->
    <!-- <IconCommission></IconCommission> -->
  </div>
</template>

<script>
import wx from "wx";
import { getByOpenId } from "@/api/audience/index.js";
import { Toast } from "mint-ui";
// import IconCommission from "@/components/common/IconCommission.vue";
export default {
  name: "index",
  // components: {
  //   IconCommission
  // },
  data() {
    return {
      isResponse: false, // 接口是否已经正确响应
      isDistributor: false, // 是否成为分销员
      status: "", // 分销员的状态
      deleteFlag: 0, // 是否已经清退 0 未清退 1 已经清退
      nickName: null,
      urlContent: `http://192.168.0.16:8020/wap/index.html`
      // url: ""
    };
  },
  created() {
    if (localStorage.getItem("openid")) {
      this.getUserInfo();
    }
    this.getContent();
  },
  methods: {
    // -------------------------------------------------------------- 获取数据  -------------------------------------------------------------------
    // 获取用户信息 判断是否是分销员
    getUserInfo() {
      // 判断openid是否存在
      if (localStorage.getItem("openid")) {
        let params = {
          compId: localStorage.getItem("compId"),
          contentId: localStorage.getItem("contentId"),
          openId: localStorage.getItem("openid")
        };
        getByOpenId(params)
          .then(res => {
            let { respCode, message } = res;
            if (respCode === "0000") {
              this.audienceId = res.data.id;
              if (res.data.salesmanId) {
                let status = res.data.status;
                this.isDistributor = true;
                this.status = status;
                this.deleteFlag = res.data.deleteFlag;
              }
              this.isResponse = true;
            } else {
              Toast({
                message: message,
                position: "bottom",
                duration: 2000
              });
            }
          })
          .catch(err => console.error(err));
      }
    },
    // 获取内容
    getContent() {
      const compId = localStorage.getItem("compId");
      const contentId = localStorage.getItem("contentId");

      this.urlContent += `?compId=${compId}&contentId=${contentId}`;
    },
    // 立即成为分销员
    whereGo() {
      // 被清退 且是分销员
      if ((this.isDistributor && this.deleteFlag) || !this.isDistributor) {
        this.toApply();
      } else if (this.isDistributor && !this.deleteFlag) {
        // 未被清退 且不是分销员
        this.toResult();
      }
    },
    // 去申请页
    toApply() {
      // 是否在小程序内
      if (window.__wxjs_environment) {
        let path = `../webview/webview`;
        wx.miniProgram.navigateTo({
          url: path + "?page=/Apply"
        });
      }
    },
    // 去结果页
    toResult() {
      this.$router.push({
        path: "/Result",
        query: {
          status: this.status
        }
      });
    },
    // 进入邀请好友
    toInvitation() {
      // 是否在小程序内
      if (window.__wxjs_environment) {
        let path = `../webview/webview`;
        wx.miniProgram.navigateTo({
          url: path + "?page=/InvitationCard"
        });
      }
    },
    // 进入分销中心
    toDistribution() {
      // 是否在小程序内
      if (window.__wxjs_environment) {
        let path = `../webview/webview`;
        wx.miniProgram.navigateTo({
          url: path + "?page=/Distribution"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/index/index";
</style>
