<template>
  <main>
    <!-- 筛选 -->
    <form-filter @onSelect="onSelect" />
    <!-- 列表 -->
    <ul class="customer-list">
      <!--mescroll滚动区域的基本结构-->
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <li v-for="(item,index) in dataList" :key="index">
          <router-link :to="'/MyCustomerDetails/' + item.salesmanId">
            <div class="wrap">
              <div class="wrap-img">
                <img :src="item.headPhotoUrl" alt="" />
              </div>
              <div class="info">
                <h4>{{item.nickName}}</h4>
                <p>成交金额：￥{{item.transactionAmount}}</p>
              </div>
              <div class="status">
                <span>{{ getStatus(item.status) }}</span>
                <span>{{ isPermit(item.invalidTime) ? "允许抢客" : item.differenceStr }}</span>
              </div>
            </div>
          </router-link>
        </li>
      </mescroll-vue>
    </ul>
    <nodata v-if="dataList.length === 0"></nodata>
  </main>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import FormFilter from "@/components/private/distribution/MyCustomer/FormFilter.vue";
import Nodata from "@/components/common/Nodata.vue";
import { getMescrollDown, getMescrollUp } from "@/mixins/mescroll";
import { getCustomerlist } from "@/api/distribution";
import { Toast } from "mint-ui";
export default {
  name: "goods",
  components: {
    FormFilter,
    MescrollVue,
    Nodata
  },
  data() {
    return {
      keyword: "",
      mescroll: null, // mescroll实例对象
      dataList: [],
      status: "",
      isChangeState: false,
      salesmanId: "",
      page: {
        pageNumber: 0,
        pageSize: 10
      },
      mescrollDown: getMescrollDown(this.downCallback),
      mescrollUp: getMescrollUp(this.upCallback)
    };
  },
  created() {
    document.title = "我的客户";
    this.salesmanId = this.$route.query.id;
  },
  methods: {
    // 获取数据 type: 1 上拉刷新-加载更多  0 下拉刷新-刷新列表
    getData(type) {
      if (!this.isChangeState) {
        this.page.pageNumber++;
      }
      let params = {
        status: this.status,
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        salesmanId: this.salesmanId,
        ...this.page
      };
      getCustomerlist(params)
        .then(res => {
          console.log(res.data);
          let { respCode, message } = res;
          if (respCode === "0000") {
            // let arr = res.data.items || [];
            let arr = [
              {
                id: 9,
                compId: 2,
                contentId: "168418001228398592",
                audienceId: "168092161974206464",
                salesmanId: "168525348852465664",
                status: 0,
                invalidTime: 1547974882000,
                differenceStr: "1天22小时不允许抢客",
                transactionAmount: "0.00",
                createTime: 1547553730000,
                updateTime: 1547553730000,
                headPhotoUrl:
                  "https://wx.qlogo.cn/mmopen/vi_32/868afDa0VXYhYUf2o0gxD1MzrP1hsxqoWUkWtlWIWtDHibFq1hIric4LIlUTDoiaaslh5hlm8a38P7uL01Popr8kw/132",
                nickName: "【夏梦】"
              }
            ];

            if (this.page.pageNumber == 1) this.dataList = [];
            if (type) {
              this.dataList = this.dataList.concat(arr);
            } else {
              this.dataList = arr;
            }
            this.isChangeState = false;
          } else {
            Toast({
              message: message,
              position: "bottom",
              duration: 2000
            });
          }
          //数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            this.mescroll.endSuccess();
          });
        })
        .catch(err => {
          console.error(err);
          this.mescroll.endErr();
        });
    },
    // 获取状态
    getStatus(status) {
      let getStatus = "0";
      switch (status) {
        case 0:
          getStatus = "长期有效";
          break;
        case 1:
          getStatus = "关系到15天后";
          break;
        default:
          getStatus = "已失效";
      }
      return getStatus;
    },
    // 是否允许抢客
    isPermit(invalidTime) {
      let isPermit = true;
      if (invalidTime - Date.now()) {
        isPermit = false;
      }
      return isPermit;
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
    // 筛选
    onSelect(status) {
      this.status = status;
      this.isChangeState = true;
      this.downCallback();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/distribution/customer";
</style>
