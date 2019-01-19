<template>
  <section class="apply">
    <user-info></user-info>
    <form class="login">
      <div class="form-item">
        <input type="text" v-model="userName" maxlength="20" placeholder="请输入姓名" />
        <i class="mintui mintui-field-error icon-delete" v-show="isXUsername" @click="clearUserName"></i>
      </div>
      <div class="form-item">
        <input type="tel" v-model="number" placeholder="请输入手机号" maxlength="11" />
        <i class="mintui mintui-field-error icon-delete" v-show="isXNumber" @click="clearNumber"></i>
      </div>
      <div class="form-item code-wrap">
        <input type="tel" v-model="code" placeholder="请输入验证码" maxlength="4" />
        <i class="mintui mintui-field-error icon-delete" v-show="isXClose" @click="clearCode"></i>
        <get-code class="code"></get-code>
      </div>
      <mt-button type="primary" class="btn-large btn-disabled" :disabled="isShowJoin" @click="join">立即加入</mt-button>
      <a @click="handleGetPhoneNumber" class="useWeChatPhone">使用微信绑定的手机号?</a>
    </form>
  </section>
</template>

<script>
import wx from "wx";
import UserInfo from "@/components/private/recruit/apply/UserInfo";
import GetCode from "@/components/common/GetCode";
import { vPhone, vSMS } from "@/mixins/regCheck.js";
import { Toast } from "mint-ui";
export default {
  components: {
    "user-info": UserInfo,
    "get-code": GetCode
  },
  data() {
    return {
      hadPhone: false,
      nickName: "",
      avatarUrl: "",
      userName: "",
      number: "",
      code: "",
      isXUsername: false,
      isXNumber: false,
      isXClose: false,
      isShowJoin: true
    };
  },
  watch: {
    userName(val) {
      this.handleWatch(val, "isXUsername");
    },
    number(val) {
      this.handleWatch(val, "isXNumber");
    },
    code(val) {
      this.handleWatch(val, "isXClose");
    }
  },
  methods: {
    // 监听变动赋值
    handleWatch(val, isX) {
      if (val.trim().length > 0) {
        this[isX] = true;
        if (this.isShowJoin) {
          this.isShowJoin = false;
        }
      } else if (
        this.userName.trim() === "" &&
        this.number.trim() === "" &&
        this.code.trim() === ""
      ) {
        if (!this.isShowJoin) {
          this.isShowJoin = true;
        }
      }
    },
    // 清除用户名
    clearUserName() {
      this.userName = "";
      this.isXUsername = false;
    },
    // 清除手机号
    clearNumber() {
      this.number = "";
      this.isXNumber = false;
    },
    // 清除验证码
    clearCode() {
      this.code = "";
      this.isXClose = false;
    },
    join(e) {
      e.preventDefault();

      if (this.userName === "") {
        Toast({
          message: "请输入姓名",
          position: "bottom",
          duration: 2000
        });
        return false;
      } else if (this.userName.length > 20) {
        Toast({
          message: "姓名不能超过20个字",
          position: "bottom",
          duration: 2000
        });
        return false;
      }

      if (this.number === "") {
        Toast({
          message: "请输入手机号",
          position: "bottom",
          duration: 2000
        });
        return false;
      } else if (vPhone(this.number)) {
        Toast({
          message: "请输入正确的手机号码",
          position: "bottom",
          duration: 2000
        });
        return false;
      }

      if (this.code === "") {
        Toast({
          message: "请输入验证码",
          position: "bottom",
          duration: 2000
        });
        return false;
      } else if (vSMS(this.code)) {
        Toast({
          message: "请输入正确的验证码",
          position: "bottom",
          duration: 2000
        });
        return false;
      }
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        name: this.userName,
        phone: this.number
      };
      this.$emit("addSalesmanInfo", params);
    },
    // 获取绑定手机号
    handleGetPhoneNumber() {
      console.log("点击微信绑定手机号");
      if (window.__wxjs_environment === "miniprogram") {
        let path = `../getNumber/getNumber?page=/Apply`;
        wx.miniProgram.navigateTo({
          url: path
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/recruit/apply";
</style>
