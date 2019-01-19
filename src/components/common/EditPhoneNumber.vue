<template>
  <div class="dialog-form">
    <form>
      <div class="form-item">
        <input type="tel" v-model="number" placeholder="请输入手机号" maxlength="11" />
        <i class="mintui mintui-field-error icon-delete" v-show="isXNumber" @click="clearNumber"></i>
      </div>
      <div class="form-item code-wrap">
        <input type="tel" v-model="code" placeholder="请输入验证码" maxlength="4" />
        <i class="mintui mintui-field-error icon-delete" v-show="isXClose" @click="clearCode"></i>
        <get-code class="code" type="ghost"></get-code>
      </div>
    </form>
  </div>
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
      isXNumber: false,
      isXClose: false
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
    // 确定
    onOk() {
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

      this.$emit("onOkChangeNumber", this.number);
      this.clearNumber();
      this.clearCode();
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/css/recruit/apply";
@import "../../assets/css/color";

.dialog-form {
  form {
    padding: 0;

    .form-item {
      input {
        border: 1px solid $mop-bg-dark;
        padding: 0 1rem;
        box-sizing: border-box;
      }

      i {
        //   position: absolute;
        right: 0.8rem;
        //   top: calc(50% - 0.5rem);
        //   transform: translateY(-50%);
        //   color: $mop-text-gray-deep;
        //   opacity: 0.2;
      }
    }

    .form-item.code-wrap {
      position: relative;

      .code {
        top: 0rem;
      }

      input {
        width: 50%;
      }

      i {
        right: 10rem;
      }
    }
  }
}
</style>
