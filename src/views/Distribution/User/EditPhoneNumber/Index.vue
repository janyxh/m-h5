<template>
  <form class="login bg-gray">
    <h2>更换手机号</h2>
    <div class="form-item">
      <input type="tel" v-model="number" placeholder="请输入手机号" maxlength="11" />
      <i class="mintui mintui-field-error icon-delete" v-show="isXNumber" @click="clearNumber"></i>
    </div>
    <div class="form-item code-wrap">
      <input type="tel" v-model="code" placeholder="请输入验证码" maxlength="4" />
      <i class="mintui mintui-field-error icon-delete" v-show="isXClose" @click="clearCode"></i>
      <get-code class="code"></get-code>
    </div>
    <mt-button type="primary" class="btn-large btn-disabled" :disabled="isShowSave" @click="join">确定</mt-button>
  </form>
</template>
<script>
import GetCode from "@/components/common/GetCode";
import { Toast } from "mint-ui";
import { vPhone, vSMS } from "@/mixins/regCheck.js";
export default {
  components: {
    "get-code": GetCode
  },
  data() {
    return {
      number: "",
      code: "",
      isXNumber: true,
      isXClose: false,
      isShowSave: false
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
  created() {
    this.number = this.$route.query.number;
  },
  methods: {
    handleSave() {
      // this.$router.go(-1);
      this.$router.push("/User");
    },
    // 监听变动赋值
    handleWatch(val, isX) {
      if (val.trim().length > 0) {
        this[isX] = true;
        if (this.isShowSave) {
          this.isShowSave = false;
        }
      } else if (this.number.trim() === "" && this.code.trim() === "") {
        if (!this.isShowSave) {
          this.isShowSave = true;
        }
      }
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
      localStorage.setItem("number", this.number);
      this.$router.push({
        path: "/User",
        query: {
          id: this.$route.query.id
        }
      });
    }
  }
};
</script>


<style lang="scss">
@import "../../../../assets/css/color";

h2 {
  margin-bottom: 8rem;
  font-size: 2.4rem;
}
</style>
