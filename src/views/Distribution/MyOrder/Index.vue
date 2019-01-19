<template>
  <main class="order-list bg-gray">
    <!-- 搜索 -->
    <mop-search @getKeyword="getKeyword" @onSearch="handleSearch" />
    <!-- 列表 -->
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <list-view v-for="(item,index) in dataList" :key="index">
        <h4 class="title">
          订单号：{{item.tradeNo}}
          <!-- 状态 1未完成 2待结算 3已失效 4可提现 5已结佣 -->
          <span :class="{'active':item.status === 1 || item.status === 2}">{{getStatus(item.status)}}</span>
        </h4>
        <div class="good">
          <div class="wrap-img">
            <img :src="item.headPhotoUrl" alt="" />
          </div>
          <div class="info">
            <h4>分销员：{{item.nickName}}</h4>
            <!-- 结算方式 0 交易完成后结算 1售后维权处理期结束后再结算 -->
            <p>结佣模式：{{item.settlementMethod ? "售后维权处理期结束后再统计":"交易完成后统计" }}</p>
            <div>
              <span>订单金额：</span>
              <b><i>￥</i>{{item.amount}}</b>
            </div>
          </div>
        </div>
        <div class="commission">待结算销售佣金：￥<span>{{item.salesCommissionAmount}}</span></div>
        <div class="note">
          备注：{{item.remarks}}
        </div>
      </list-view>
    </mescroll-vue>
    <nodata v-if="dataList.length === 0"></nodata>
  </main>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import search from "@/components/common/Search.vue";
import Nodata from "@/components/common/Nodata.vue";
import ListView from "@/components/common/ListView.vue";
import { getMescrollDown, getMescrollUp } from "@/mixins/mescroll";
import { getOrderlist } from "@/api/distribution";
export default {
  name: "goods",
  components: {
    "mop-search": search,
    MescrollVue,
    ListView,
    Nodata
  },
  data() {
    return {
      keyword: "",
      mescroll: null, // mescroll实例对象
      dataList: [],
      salesmanId: "",
      page: {
        pageNumber: 1,
        pageSize: 10
      },
      mescrollDown: getMescrollDown(this.downCallback),
      mescrollUp: getMescrollUp(this.upCallback)
    };
  },
  created() {
    document.title = "推广订单";
    this.salesmanId = this.$route.query.id;
  },
  methods: {
    // 获取数据 type: 1 上拉刷新-加载更多  0 下拉刷新-刷新列表
    getData(type) {
      if (type) {
        this.page.pageNumber++;
      }
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        inviteId: this.salesmanId,
        phone: this.keyword,
        ...this.page
      };
      getOrderlist(params)
        .then(res => {
          console.log(res.data);
          if (res.data.items && res.data.items.length > 0) {
            let arr = res.data.items;
            if (this.page.pageNumber == 1) this.dataList = [];
            if (type) {
              this.dataList = this.dataList.concat(arr);
            } else {
              this.dataList = arr;
            }
          }
          //数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            this.mescroll.endSuccess(res.data.items.length);
          });
        })
        .catch(err => {
          console.error(err);
          this.mescroll.endErr();
        });
    },
    // 获取状态
    getStatus(status) {
      // 状态 1未完成 2待结算 3已失效 4可提现 5已结佣
      let getStatus = "";
      switch (status) {
        case 1:
          getStatus = "未完成";
          break;
        case 2:
          getStatus = "待结算";
          break;
        case 3:
          getStatus = "已失效";
          break;
        case 4:
          getStatus = "可提现";
          break;
        case 5:
          getStatus = "已结佣";
          break;
        default:
          getStatus = "";
      }
      return getStatus;
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    //上拉回调
    upCallback() {
      console.log("进入上拉");
      this.getData(1);
    },
    downCallback() {
      console.log("进入下拉");
      this.getData(0);
    },
    // 获取关键字
    getKeyword(val) {
      console.log(val);
      this.keyword = val;
    },
    // 搜索
    handleSearch() {
      this.getData(0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/distribution/order";
</style>
