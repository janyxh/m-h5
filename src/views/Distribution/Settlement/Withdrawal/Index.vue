<template>
  <main class="bg-gray">
    <!-- 提现信息 -->
    <section class="withdrawal-info">
      <img src="@/assets/images/distribution/settlement/sett_btn_settl.png" alt="" />
      <span class="text-muted">正在处理的提现申请</span>
      <p>9698696</p>
    </section>
    <!-- 列表 -->
    <section>
      <div class="list">
        <list-view>
          <mt-cell title="可提现金额" :value="balance" is-link href="/WithdrawalsRecord" class="padding"></mt-cell>
          <div class="form-padding wrap-inp">
            <p>
              <span>提现金额</span>
              <span>单笔最多提现2万元</span>
            </p>
            <div class="money">
              <span>￥</span>
              <input type="number" v-model="money" />
            </div>
          </div>
          <a class="account" @click="handleSettingAccount">
            <label>提现账户</label>
            <span :class="{'is-link':wallet === ''}">{{wallet !== '' ? wallet : '去设置'}}</span>
            <i v-if="wallet === ''"></i>
          </a>
        </list-view>
      </div>
      <div class="btn-form-under">
        <mt-button type="primary" class="btn-large" @click="handleWithdrawal">提现</mt-button>
      </div>
    </section>
    <!-- 提现说明 -->
    <section class="withdrawal-explain form-padding">
      <h3>提现说明：</h3>
      <p>金额低于1元时不可提现</p>
      <p>预计三个工作日可到账</p>
      <p>未实名认证的微信用户，将无法提现到微信钱包</p>
    </section>
  </main>
</template>

<script>
import ListView from "@/components/common/ListView.vue";
import { Toast } from "mint-ui";
export default {
  components: {
    ListView
  },
  data() {
    return {
      balance: "",
      wallet: "",
      money: ""
    };
  },
  created() {
    this.balance = Number(this.$route.query.balance);
    let nickName = localStorage.getItem("nickName");
    console.log(nickName);
    if (nickName) {
      this.wallet = `微信钱包(${nickName})`;
    }
  },
  methods: {
    // 去设置 提现账户
    handleSettingAccount() {
      if (this.wallet === "") {
        this.$router.push("/SetWallet");
      }
    },
    // 提现
    handleWithdrawal() {
      if (this.money === "") {
        Toast({
          message: "请输入提现金额",
          position: "bottom",
          duration: 5000
        });
        return false;
      } else if (isNaN(Number(this.money))) {
        Toast({
          message: "请输入数字",
          position: "bottom",
          duration: 5000
        });
        return false;
      } else if (this.money > this.balance) {
        Toast({
          message: "余额不足",
          position: "bottom",
          duration: 5000
        });
        return false;
      } else if (Number(this.money) < 1) {
        Toast({
          message: "提现不得少于1元",
          position: "bottom",
          duration: 5000
        });
        return false;
      }
      this.$router.push("/WithdrawalResult");
    }
  }
};
</script>



<style lang="scss">
@import "../../../../assets/css/color";

// 提现信息
.withdrawal-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding-bottom: 1rem;

  img {
    width: 6rem;
    height: auto;
    margin: 5rem 0 3rem;
  }

  span {
    font-size: 1.2rem;
  }

  p {
    font-size: 2.4rem;
    margin: 1rem 0;
  }

  button {
    margin-bottom: 4rem;
  }

  .form-padding {
    width: 100%;
    box-sizing: border-box;
  }
}

// 列表
.list {
  .mint-cell {
    .mint-cell-wrapper {
      .mint-cell-value {
        font-size: 1.6rem;
      }
    }
  }

  .wallet.mint-cell {
    .mint-cell-wrapper {
      .mint-cell-value {
        font-size: 1.4rem;
      }
    }
  }

  // 提现金额输入栏
  .wrap-inp {
    p {
      display: flex;

      span {
        flex: 1;
        display: block;
        color: $mop-text-gray;
      }

      span:last-child {
        text-align: right;
        font-size: 1.2rem;
      }
    }

    .money {
      font-size: 1.8rem;
      position: relative;

      span {
        position: absolute;
        bottom: 0.7rem;
      }

      input {
        width: 100%;
        height: 3.4rem;
        border: none;
        border-bottom: 1px solid $mop-bg;
        font-size: 2.4rem;
        padding-left: 2rem;
        box-sizing: border-box;
      }
    }
  }

  // 提现账户
  .account {
    display: flex;
    min-height: 48px;
    line-height: 48px;
    padding: 0 2rem;
    position: relative;

    label {
      // flex: 1;
      font-size: 1.6rem;
      color: $mop-text;
    }

    span {
      flex: 1;
      text-align: right;
      color: $mop-text-gray;
    }

    .is-link {
      padding-right: 24px;
    }

    i {
      width: 5px;
      height: 5px;
      top: 50%;
      right: 2.5rem;
      position: absolute;
      border: 1px solid $mop-text-gray;
      border-bottom-width: 0;
      border-left-width: 0;
      transform: translateY(-50%) rotate(45deg);
    }
  }
}

// 提现说明
.withdrawal-explain {
  h3 {
    font-weight: normal;
    font-size: 1.4rem;
    margin: 0 0 1rem;
  }

  p {
    font-size: 1.2rem;
    color: $mop-text-gray;
    margin: 0.5rem 0;
  }
}
</style>
