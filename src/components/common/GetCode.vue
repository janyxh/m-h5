<template>
  <button type="button" @click="handleCode" :class="type">
    {{text}}
  </button>
</template>

<script>
export default {
  name: "getcode",
  props: ["type"],
  data() {
    return {
      text: "获取验证码",
      num: 0,
      isSend: false,
      timer: null
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    handleCode() {
      if (!this.isSend) {
        this.isSend = true;
        // 这里写发送短信接口
        this.num = 60;
        this.text = this.num + "S后获取";
        this.num--;
        this.timer = setInterval(() => {
          if (this.num >= 0) {
            this.text = this.num + "S后获取";
            this.num--;
          } else {
            this.text = "获取验证码";
            this.isSend = false;
            clearInterval(this.timer);
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/color";

button {
  display: inline-block;
  height: 3.4rem;
  color: $mop-primary;
  background: none;
  border: none;
  outline: none;
  min-width: 8rem;
}

.ghost {
  color: $mop-text-gray;
  border: 1px solid $mop-bg-dark;
}
</style>
