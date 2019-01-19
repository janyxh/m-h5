<template>
  <section class="apply">
    <user-info></user-info>
    <form>
      <div class="form-item">
        <input type="text" v-model="userName" placeholder="请输入姓名" />
        <i class="mintui mintui-field-error icon-delete" v-show="isXUsername" @click="clearUserName"></i>
      </div>
      <div class="form-item">
        <input type="tel" v-model="number" placeholder="请输入手机号" maxlength="11" :disabled="true" />
        <!-- <i class="mintui mintui-field-error" v-show="isXNumber" @click="clearNumber"></i> -->
      </div>
      <mt-button type="primary" class="btn-large btn-disabled" :disabled="isShowJoin" @click="join">立即加入</mt-button>
      <div class="form-item form-text">
        <a class="useWeChatPhone" @click="visble = true">更换手机号?</a>
        <a class="useWeChatPhone" @click="handleFast">快速绑定</a>
      </div>
    </form>
    <mop-dialog :visble="visble" @onOk="onChangeNumber" @onCancel="onCancelChangeNumber">
      <span slot="title">更换手机号</span>
      <div slot="body">
        <edit-phone-number ref="editPhoneNumber" @closeChangeNumber="closeChangeNumber" @onOkChangeNumber="onOkChangeNumber"></edit-phone-number>
      </div>
    </mop-dialog>
  </section>
</template>

<script>
import wx from "wx";
import UserInfo from "@/components/private/recruit/apply/UserInfo";
import Dialog from "@/components/common/Dialog";
import EditPhoneNumber from "@/components/common/EditPhoneNumber";

export default {
  props: ["phone"],
  components: {
    "user-info": UserInfo,
    "mop-dialog": Dialog,
    "edit-phone-number": EditPhoneNumber
  },
  data() {
    return {
      hadPhone: false,
      nickName: "",
      avatarUrl: "",
      userName: "",
      number: this.phone,
      audienceId: "",
      isXUsername: false,
      // isXNumber: false,
      isShowJoin: true,
      visble: false
    };
  },
  watch: {
    userName(val) {
      this.handleWatch(val, "isXUsername");
    }
    // number(val) {
    //   this.handleWatch(val, "isXNumber");
    // }
  },
  methods: {
    // -------------------------------------------------------------- 操作  -------------------------------------------------------------------
    // 监听变动赋值
    handleWatch(val, isX) {
      if (val.trim().length > 0) {
        this[isX] = true;
        if (this.isShowJoin) {
          this.isShowJoin = false;
        }
      } else if (this.userName.trim() === "") {
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
    // clearNumber() {
    //   this.number = "";
    //   this.isXNumber = false;
    // }
    // 快速绑定
    handleFast() {
      if (window.__wxjs_environment === "miniprogram") {
        let path = `../getNumber/getNumber?page=/Apply`;
        wx.miniProgram.navigateTo({
          url: path
        });
      }
    },
    // 立即加入
    join(e) {
      e.preventDefault();
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        name: this.userName,
        phone: this.number
      };
      this.$emit("addSalesmanInfo", params);
    },
    // -------------------------------------------------------------- 更换手机号  -------------------------------------------------------------------
    // 关闭弹出框  更换手机号
    closeChangeNumber() {
      this.visble = false;
    },
    // 点击取消 更换的手机号
    onCancelChangeNumber() {
      this.visble = false;
      this.$refs.editPhoneNumber.clearNumber();
      this.$refs.editPhoneNumber.clearCode();
    },
    // 点击保存 更换的手机号
    onChangeNumber() {
      this.$refs.editPhoneNumber.onOk();
    },
    // 更换手机号
    onOkChangeNumber(number) {
      this.number = number;
      this.visble = false;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../../assets/css/recruit/apply";
</style>
