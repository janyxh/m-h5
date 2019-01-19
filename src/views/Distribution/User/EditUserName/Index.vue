<template>
  <form class="bg-gray">
    <div class="form-padding">
      <h2>修改姓名</h2>
      <mt-field label="姓名" placeholder="请输入姓名" v-model="userName"></mt-field>
    </div>
    <div class="btn-form">
      <mt-button type="primary" class="btn-large btn-disabled" :disabled="isShowSave" @click="handleSave">确定</mt-button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      isXUsername: false,
      isShowSave: false
    };
  },
  watch: {
    userName(val) {
      this.handleWatch(val, "isXUsername");
    }
  },
  created() {
    this.userName = decodeURI(this.$route.query.userName);
  },
  methods: {
    // 监听变动赋值
    handleWatch(val, isX) {
      if (val.trim().length > 0) {
        console.log(val);
        this[isX] = true;
        if (this.isShowSave) {
          this.isShowSave = false;
        }
      } else if (this.userName.trim() === "") {
        if (!this.isShowSave) {
          this.isShowSave = true;
        }
      }
    },
    // 清除用户名
    clearUserName() {
      this.userName = "";
    },
    // 保存
    handleSave(e) {
      e.preventDefault();
      // this.$router.go(-1);
      // this.$router.back();
      localStorage.setItem("name", this.userName);
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


<style lang="scss" scoped>
@import "../../../../assets/css/color";

h2 {
  margin-bottom: 8rem;
  font-size: 2.4rem;
}
</style>
