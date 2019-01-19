<template>
  <section>
    <div class="status">
      <img src="@/assets/images/distribution/settlement/cash.png" alt="" />
      你的提现申请后台正在处理...
    </div>
    <div class="btns">
      <mt-button type="primary" plain class="btn-to-index" @click="toDistribution">返回分销中心</mt-button>
    </div>
  </section>
</template>

<script>
export default {
  name: "withdrawalResult",
  created() {
    document.title = "操作结果";
  },
  methods: {
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
