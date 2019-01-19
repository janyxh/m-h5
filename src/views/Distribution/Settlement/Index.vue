<template>
  <main>
    <!-- 结算中心信息 -->
    <section class="settlement-info">
      <img src="@/assets/images/distribution/settlement/sett_btn_settl.png" alt="" />
      <span class="text-muted">可提现金额</span>
      <p>{{ balance }}</p>
      <div class="form-padding">
        <mt-button type="primary" class="btn-large" @click="toWithdrawal">提现</mt-button>
      </div>
    </section>
    <!-- 列表 -->
    <section class="list">
      <hr class="hr-divider">
      <mt-cell title="收支明细" is-link href="/DetailsList" class="padding"></mt-cell>
      <mt-cell title="提现记录" is-link href="/WithdrawalsRecord" class="padding"></mt-cell>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      balance: ""
    };
  },
  created() {
    document.title = "结算中心";
    this.balance = this.$route.query.balance;
  },
  methods: {
    toWithdrawal() {
      this.$router.push({
        path: "/Withdrawal",
        query: {
          balance: this.balance
        }
      });
    }
  }
};
</script>


<style lang="scss">
.settlement-info {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 8rem;
    height: auto;
    margin: 8rem 0 3rem;
  }

  span {
    font-size: 1.2rem;
  }

  p {
    font-size: 2.4rem;
    margin: 0.8rem 0;
  }

  button {
    margin: 5rem 0 4rem;
  }

  .form-padding {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
