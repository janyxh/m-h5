<template>
  <!-- 累计邀请详情 -->
  <main class="invitation-details bg-gray">
    <!-- 用户信息 -->
    <section class="info">
      <div class="user-info">
        <img :src="data.avatarUrl" />
        <div>
          <p>{{data.nickName}}</p>
          <span>2018.12.13</span>
          <i>普通分销员</i>
        </div>
      </div>
      <div class="statistics">
        <p>
          <b>86</b>
          <span>累计成交订单</span>
        </p>
        <p>
          <b>86</b>
          <span>为我带来收益</span>
        </p>
        <p>
          <b>86</b>
          <span>累计成交金额</span>
        </p>
      </div>
    </section>
    <!-- 销售佣金订单 -->
    <section class="order">
      <list-view>
        <h4>销售佣金订单</h4>
        <div class="statistics">
          <div class="item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-order"></use>
              </svg>
            </i>
            <div>
              <p>累计订单</p>
              <p>55</p>
            </div>
          </div>
          <div class="item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-money"></use>
              </svg>
            </i>
            <div>
              <p>累计金额</p>
              <p>￥556万</p>
            </div>
          </div>
          <div class="item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-commission"></use>
              </svg>
            </i>
            <div>
              <p>佣金比例</p>
              <p>55%</p>
            </div>
          </div>
          <div class="item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-profit"></use>
              </svg>
            </i>
            <div>
              <p>为我带来</p>
              <p>￥98</p>
            </div>
          </div>
        </div>
      </list-view>
    </section>
    <!-- 邀请奖励佣金订单 -->
    <section class="order">
      <list-view>
        <h4>邀请奖励佣金订单</h4>
        <div class="statistics">
          <div class="item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-order"></use>
              </svg>
            </i>
            <div>
              <p>累计订单</p>
              <p>55</p>
            </div>
          </div>
          <div class="item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-money"></use>
              </svg>
            </i>
            <div>
              <p>累计金额</p>
              <p>￥556</p>
            </div>
          </div>
          <div class="item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-commission"></use>
              </svg>
            </i>
            <div>
              <p>佣金比例</p>
              <p>55%</p>
            </div>
          </div>
          <div class="item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-profit"></use>
              </svg>
            </i>
            <div>
              <p>为我带来</p>
              <p>￥98</p>
            </div>
          </div>
        </div>
      </list-view>
    </section>
  </main>
</template>

<script>
import ListView from "@/components/common/ListView.vue";
import { getInvitationDetails } from "@/api/distribution";
export default {
  components: {
    ListView
  },
  data() {
    return {
      data: {
        avatarUrl:
          "https://wx.qlogo.cn/mmopen/vi_32/LJ3rqdmMO7pdYArP81A7g5s9BlEQuzqVIibEcYaqUZibnkrsbLgx4Meq3E1dJqwJ1VYvYMjAc66L3KuibuJqgYvkg/132",
        nickName: "薄弱Angel"
      }
    };
  },
  created() {
    this.salesmanId = this.$route.params.id;
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        salesmanId: this.salesmanId
      };
      getInvitationDetails(params)
        .then(res => {})
        .catch(err => console.error(err));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/distribution/invitation";
</style>
