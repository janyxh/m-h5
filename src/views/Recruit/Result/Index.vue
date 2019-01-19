<template>
  <section>
    <!-- 状态 0 未审核 1 通过 2 不通过 -->
    <div class="status">
      <img v-if="status === 1" src="@/assets/images/recruit/success.png" alt="" />
      <img v-else-if="status === 0" src="@/assets/images/recruit/ing.png" alt="" />
      <img v-else-if="status === 2" src="@/assets/images/recruit/failed.png" alt="" />
      {{text}}
    </div>
    <div class="btns">
      <mt-button type="primary" plain :class="status === 1 ? 'btn-large' : 'btn-to-index'" @click="toIndex">返回招募令</mt-button>
      <mt-button v-if="status === 1" type="primary" class="btn-large" @click="toDistribution">前往分销中心</mt-button>
    </div>
  </section>
</template>

<script>
export default {
  name: "applyResult",
  data() {
    return {
      status: 0,
      text: ""
    };
  },
  created() {
    document.title = "操作结果";
    this.status = Number(this.$route.query.status);
    console.log("status", this.status);
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      this.text = this.status != 1 ? "审核中" : "参加成功";
    },
    // 返回招募令
    toIndex() {
      this.$router.push("/");
    },
    // 前往分销中心
    toDistribution() {
      this.$router.push("/Distribution");
    }
  }
};
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12rem 0 10rem;

  img {
    width: 6rem;
    height: auto;
    margin-bottom: 2rem;
  }
}

.btns {
  padding: 0 2rem;

  .btn-to-index {
    width: 50%;
    margin: auto;
  }
}
</style>
