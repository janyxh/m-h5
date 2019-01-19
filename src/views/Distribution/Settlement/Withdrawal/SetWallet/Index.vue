<template>
  <!-- 设置钱包账户 -->
  <section>
    <!-- 用户信息 -->
    <user-info notInvited></user-info>
    <!-- 表单 -->
    <form class="login">
      <div class="form-item">
        <input type="tel" v-model="number" placeholder="请输入手机号" maxlength="11" disabled />
      </div>
      <div class="form-item code-wrap">
        <input type="number" v-model="code" placeholder="请输入验证码" maxlength="6" />
        <i class="mintui mintui-field-error" v-show="isXClose" @click="clearCode"></i>
        <get-code class="code"></get-code>
      </div>
      <mt-button type="primary" class="btn-large btn-disabled" :disabled="isShowJoin" @click="handleSave">完成</mt-button>
    </form>
  </section>
</template>

<script>
import UserInfo from "@/components/private/recruit/apply/UserInfo.vue";
import GetCode from "@/components/common/GetCode";
export default {
  components: {
    UserInfo,
    "get-code": GetCode
  },
  data() {
    return {
      number: "158630201",
      code: "",
      isXClose: false,
      isShowJoin: true
    };
  },
  watch: {
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
      } else if (this.number.trim() === "" && this.code.trim() === "") {
        if (!this.isShowJoin) {
          this.isShowJoin = true;
        }
      }
    },
    // 清除验证码
    clearCode() {
      this.code = "";
      this.isXClose = false;
    },
    handleSave(e) {
      e.preventDefault();
      // this.$router.push("/Result");
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
form.login {
  padding-top: 8rem;
}
</style>
