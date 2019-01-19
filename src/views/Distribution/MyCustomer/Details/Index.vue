<template>
  <section class="customer-details bg-gray">
    <!-- 累计客户详情 -->
    <list-view>
      <div class="info">
        <img :src="data.headPhotoUrl" alt="" />
        <div>
          <h4>{{data.nickName}}</h4>
          <span>绑定时间：{{data.updateTime}}</span>
        </div>
      </div>
    </list-view>
    <list-view>
      <mt-cell title="订单数量" :value="data.orderNumber"></mt-cell>
      <mt-cell title="成交金额" :value="data.transactionAmount +' 元'"></mt-cell>
    </list-view>
    <list-view>
      <mt-cell v-if="data.status !== 2" title="保护期剩余" :value="data.protect"></mt-cell>
      <mt-cell v-if="data.status === 0" title="有效期剩余" value="长期有效"></mt-cell>
      <mt-cell v-if="data.status === 1" title="有效期剩余" :value="data.differenceStr"></mt-cell>
      <mt-cell v-if="data.status === 2" title="失效时间" :value="data.invalidTime"></mt-cell>
      <mt-cell v-if="data.status === 2" title="原因" :value="data.description"></mt-cell>
    </list-view>
  </section>
</template>

<script>
import moment from "moment";
import ListView from "@/components/common/ListView.vue";
// import {} from "@/api/distribution"
export default {
  components: {
    ListView
  },
  data() {
    return {
      nickName: "",
      avatarUrl: "",
      data: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.nickName = localStorage.getItem("nickName");
      this.avatarUrl = localStorage.getItem("avatarUrl");
      this.data = {
        id: 9,
        compId: 2,
        contentId: "168418001228398592",
        audienceId: "168092161974206464",
        salesmanId: "168525348852465664",
        status: 0,
        headPhotoUrl:
          "https://wx.qlogo.cn/mmopen/vi_32/868afDa0VXYhYUf2o0gxD1MzrP1hsxqoWUkWtlWIWtDHibFq1hIric4LIlUTDoiaaslh5hlm8a38P7uL01Popr8kw/132",
        nickName: "\ufffd\ufffd\ufffd",
        updateTime: 1547553730000,
        invalidTime: 1547974882000,
        transactionAmount: "0.00",
        orderNumber: 78
      };
      const d = this.data.invalidTime - Date.now();
      moment.locale("es");
      // console.log("d", d);
      this.data.protect = new Date(d);
      // this.data.protect = ;
      this.data.updateTime = moment(this.data.updateTime).format(
        "YYYY-MM-DD HH:mm"
      );
      this.data.invalidTime = moment(this.data.invalidTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
  }
};
</script>

<style lang="scss">
@import "../../../../assets/css/color";

.customer-details {
  // 面板内最后一个cell去掉border
  .list-view {
    .mint-cell:last-child {
      .mint-cell-wrapper {
        border-bottom: 0;
      }
    }
  }

  .mint-cell {
    padding-left: 2rem;

    img {
      border-radius: 50%;
      width: 3.4rem;
      height: 3.4rem;
    }
  }

  .info {
    display: flex;
    padding: 1.2rem 2rem;

    img {
      flex: 0 0 5rem;
      width: 5rem;
      height: 5rem;
      margin-right: 1.2rem;
      border-radius: 50%;
    }

    div {
      flex: 1 1 auto;
      position: relative;

      h4 {
        margin: 0;
        padding-top: 0.5rem;
        font-size: 1.6rem;
        color: $mop-text;
      }

      span {
        position: absolute;
        bottom: 0.5rem;
        font-size: 1.2rem;
        color: $mop-text-gray;
      }
    }
  }
}
</style>
