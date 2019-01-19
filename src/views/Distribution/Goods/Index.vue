<template>
  <main>
    <!-- 搜索 -->
    <mop-search placeholder="请输入商品关键字" @getKeyword="getKeyword" @onSearch="handleSearch" />
    <!-- 筛选 -->
    <form-filter @onSelect="onSelect" />
    <!-- 列表 -->
    <div class="goods-list">
      <!--mescroll滚动区域的基本结构-->
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="item" v-for="(item,index) in dataList" :key="index">
          <div class="wrap-img">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="info">
            <h4>{{item.name}}</h4>
            <div>
              <p>佣金比例：{{ item.saleCommissionRate }}%</p>
              <b><i>￥</i>{{ item.amount }}</b>
              <span>预计收益</span>
            </div>
          </div>
        </div>
      </mescroll-vue>
    </div>
    <!-- 佣金小图标 -->
    <icon-commission />
  </main>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import search from "@/components/common/Search.vue";
import FormFilter from "@/components/private/distribution/Goods/FormFilter.vue";
import IconCommission from "@/components/common/IconCommission.vue";
import { getMescrollDown, getMescrollUp } from "@/mixins/mescroll";
import { getGoodsList } from "@/api/distribution";
export default {
  name: "goods",
  components: {
    "mop-search": search,
    FormFilter,
    MescrollVue,
    IconCommission
  },
  data() {
    return {
      isFormSelect: false,
      keyword: "",
      mescroll: null, // mescroll实例对象
      dataList: [],
      salesmanId: "",
      orderByClause: "",
      orderByMode: "desc",
      page: {
        pageNumber: 0,
        pageSize: 10
      },
      mescrollDown: getMescrollDown(this.downCallback),
      mescrollUp: getMescrollUp(this.upCallback)
    };
  },
  created() {
    document.title = "商品列表";
    this.salesmanId = this.$route.query.id;
  },
  methods: {
    // 获取数据 type: 1 上拉刷新-加载更多  0 下拉刷新-刷新列表
    getData(type) {
      if (!this.isFormSelect) {
        this.page.pageNumber++;
      }
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        name: this.keyword,
        orderByClause: this.orderByClause,
        orderByMode: this.orderByMode,
        salesmanId: this.salesmanId,
        ...this.page
      };
      getGoodsList(params)
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
    },
    // 排序筛选
    onSelect(orderByClause, orderByMode) {
      this.isFormSelect = true;
      this.orderByClause = orderByClause;
      this.orderByMode = orderByMode;
      this.getData(0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/distribution/goods";
</style>
