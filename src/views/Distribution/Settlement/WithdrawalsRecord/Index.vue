<template>
  <section class="list">
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <!--内容...-->
      <mt-cell v-for="(item,index) in dataList" :key="index" :title="index + item.name" :label="item.updateTime" class="padding">
        <span :class="{ positive : item.money > 0 }">{{ item.money > 0 ? "+" + item.money : item.money}}</span>
      </mt-cell>
    </mescroll-vue>
    <nodata v-if="dataList.length === 0"></nodata>
  </section>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import moment from "moment";
import Nodata from "@/components/common/Nodata.vue";
import { getMescrollDown, getMescrollUp } from "@/mixins/mescroll";
import { withdrawRecord } from "@/api/distribution";
export default {
  name: "withdrawalsRecord",
  components: {
    MescrollVue, // 注册mescroll组件
    Nodata
  },
  data() {
    return {
      mescroll: null, // mescroll实例对象
      dataList: [],
      page: {
        pageNumber: 0,
        pageSize: 10
      },
      mescrollDown: getMescrollDown(this.downCallback),
      mescrollUp: getMescrollUp(this.upCallback)
    };
  },
  created() {
    document.title = "提现记录";
  },
  methods: {
    // 获取数据 type: 1 上拉刷新-加载更多  0 下拉刷新-刷新列表
    getData(type) {
      this.page.pageNumber++;
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        salesmanId: localStorage.getItem("id"),
        ...this.page
      };
      withdrawRecord(params)
        .then(res => {
          // debugger;
          console.log(res.data);
          if (res.data.items && res.data.items.length > 0) {
            let arr = res.data.items.map(item => {
              item.updateTime = moment(item).format("YYYY-MM-DD HH:mm");
              return item;
            });
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
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        });
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    //上拉回调
    upCallback() {
      console.log("进入上拉");
      this.getData(1);
    },
    downCallback() {
      console.log("进入下拉");
      this.getData(0);
    }
  }
};
</script>
